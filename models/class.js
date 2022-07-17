const MySQL=require("../config/mysql");
const RATING_ELIGIBILITY=0.6;

module.exports.fetch=async function(userId, type) {
    let db=new MySQL(),
        init=false,
        sql='';

    if(type==1)
    sql='SELECT c.id, c.paper, p.name, t.name as teacher, c.sem, c.year, m.attendance, c.count, c.ratings, m.rated FROM map m INNER JOIN class c ON m.class=c.id INNER JOIN paper p ON c.paper=p.code INNER JOIN teacher t ON c.teacher=t.id WHERE m.student=? AND c.active=1';
    else if(type==2) 
    sql='SELECT c.id, c.paper, p.name, c.name as classname, c.sem, c.year FROM map m INNER JOIN class c ON m.class=c.id INNER JOIN paper p ON c.paper=p.code WHERE c.teacher=? AND c.active=1';

    try {
        await db.connect();
        init=true;

        let [r1, f2]=await db.query(sql, [userId]),  
            results=r1.map(a => a);

        if(type==1) {
            results.forEach(a => {
                a.eligibility=(a.count > 0 && a.ratings==1 && a.rated==0)? ((a.attendance / a.count) >= RATING_ELIGIBILITY) : false;
            });
        }

        await db.close();

        return {
            classes: results
        };
    }
    catch(e) {
        if(init)
        db.close();

        throw e;
    }
};

module.exports.students=async function(userId, classId, type) {
    let db=new MySQL(),
        init=false,
        fields=[
            's.id',
            's.name'
        ];

    if(type==2)
    fields.push('attendance');

    classId=parseInt(classId);

    try {
        await db.connect();
        init=true;

        let [r1, f1]=await db.query(
            "SELECT name, paper, count FROM class WHERE id=? AND active=1",
            [classId]
        );

        if(r1.length==0)
        throw 404;

        let [r2, f2]=await db.query(
                "SELECT ?? FROM map INNER JOIN student s ON s.id=map.student WHERE class=?",
                [fields, classId],
            ),
            students=r2.map(a => a);

        await db.close();

        if(type==2 || type==3) {
            let total=r1[0].count;
            students.forEach(s => {
                s.percentage=(total==0)? 0 : (s.attendance * 100 / total);
            });
        }

        return {
            info: {
                class: classId,
                paper: r1[0].paper,
                name: r1[0].name
            },
            students: students
        };
    }
    catch(e) {
        if(init)
        db.close();

        throw e;
    }
};

