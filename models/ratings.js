const MySQL=require("../config/mysql");
const RATING_ELIGIBILITY=0.6;

module.exports.QUESTIONS=[
    'Is the teacher punctual for the class?',
    'Does the teacher clear your doubts?',
    'How is the teaching quality?',
    'How is the attendance strength of the class',
    'What is the level of interaction of the teacher with the students?',
    'How much do you enjoy the teaching?',
];

module.exports.access=async function(userId, classId) {
    let db=new MySQL(),
        init=false;

    try {
        await db.connect();
        init=true;

        let [r, f]=await db.query(
            "SELECT c.id, c.paper, m.attendance, c.ratings, m.rated, c.count FROM map m INNER JOIN class c ON m.class=c.id WHERE m.student=? AND c.id=? AND c.active=1",
            [userId, classId]
        );

        if(r.length==0)
        throw 404;

        await db.close();

        let a=r[0],
            v=(a.count > 0 && a.ratings==1 && a.rated==0)? ((a.attendance / a.count) >= RATING_ELIGIBILITY) : false;

        return {
            access: v,
            paper: a.paper,
        };
    }
    catch(e) {
        if(init)
        db.close();

        throw e;
    }
};

module.exports.check=async function() {
    let db=new MySQL(),
        init=false;

    try {
        await db.connect();
        init=true;

        let [r, f]=await db.query("SELECT COUNT(id) as total FROM class WHERE active=1 AND ratings=0");

        await db.close();
        return (r[0].total!=0);
    }
    catch(e) {
        if(init)
        db.close();

        throw e;
    }
};

module.exports.enable=async function() {
    let db=new MySQL(),
        init=false;

    try {
        await db.connect();
        init=true;

        let [r, f]=await db.query("UPDATE class SET ratings=1 WHERE active=1");

        await db.close();
        return;
    }
    catch(e) {
        if(init)
        db.close();

        throw e;
    }
};

module.exports.fetch=async function(userId, classId) {
    let db=new MySQL(),
        init=false;

    try {
        await db.connect();
        init=true;

        let [r1, f1]=await db.query(
            "SELECT paper FROM class WHERE id=?",
            [classId]
        );

        if(r1.length==0)
        throw 404;

        let [r2, f2]=await db.query(
            "SELECT question, AVG(value) as average, COUNT(value) as total FROM ratings WHERE class=? GROUP BY question",
            [classId]
        );

        await db.close();
        return {
            paper: r1[0].paper,
            ratings: r2.map(a => a),
        };
    }
    catch(e) {
        if(init)
        db.close();

        throw e;
    }
};

module.exports.record=async function(userId, classId, data) {
    let db=new MySQL(),
        init=false;

    classId=parseInt(classId);

    try {
        await db.connect();
        init=true;

        let r=await this.access(userId, classId);
        if(!r.access)
        throw 403;

        await db.beginTransaction();

        let [r2, f2]=await db.query(
            "UPDATE map SET rated=1 WHERE student=? AND class=?",
            [userId, classId]
        );

        let rs=[];

        for(let key in data) {
            rs.push([userId, classId, parseInt(key.substring(1)), parseInt(data[key])]);
        }

        let [r3, f3]=await db.query("INSERT INTO ratings (student, class, question, value) VALUES ?", [rs]);

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