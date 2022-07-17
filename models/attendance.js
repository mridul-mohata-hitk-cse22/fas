const MySQL=require("../config/mysql");

module.exports.fetch=async function(userId, classId, studentId) {
    let db=new MySQL(),
        init=false,
        fields=[
            'date',
            'value'
        ];

    classId=parseInt(classId);
    studentId=parseInt(studentId);

    try {
        await db.connect();
        init=true;

        let [r1, f1]=await db.query(
            "SELECT student, paper FROM map INNER JOIN class ON map.class=class.id WHERE student=? AND map.class=? AND class.active=1",
            [studentId, classId]
        );

        if(r1.length==0)
        throw 404;

        let [r2, f2]=await db.query(
                "SELECT ?? FROM attendance WHERE student=? AND class=?",
                [fields, studentId, classId],
            );

        await db.close();

        return {
            info: {
                paper: r1[0].paper,
                roll: r1[0].student
            },
            attendance: r2.map(a => a)
        };
    }
    catch(e) {
        if(init)
        db.close();

        throw e;
    }
};

module.exports.record=async function(userId, classId, attendance, date, count) {
    let db=new MySQL(),
        init=false;

    classId=parseInt(classId);

    try {
        await db.connect();
        init=true;

        let [r1, f1]=await db.query(
            "SELECT id FROM class WHERE id=? AND teacher=? AND active=1",
            [classId, userId]
        );

        if(r1.length==0)
        throw 403;

        await db.beginTransaction();

        let [r2, f2]=await db.query(
            "UPDATE class SET count=count + ? WHERE id=?",
            [parseInt(count), classId]
        );

        let ars=attendance.map(x => {
            return [parseInt(x.student), classId, date, x.value];
        });

        let [r3, f3]=await db.query("INSERT INTO attendance (student, class, date, value) VALUES ?", [ars]);

        for(let ar of attendance) {
            let [r, f]=await db.query(
                "UPDATE map SET attendance = attendance + ? WHERE student=? AND class=?", 
                [parseInt(ar.value), parseInt(ar.student), classId]
            );
        }

        await db.commit();
        await db.close();

        return;
    }
    catch(e) {
        try {
            if(init) {
                await db.rollback();
                await db.close();
            }
        }
        catch(e) {}
        finally {
            throw e;
        }
    }
};