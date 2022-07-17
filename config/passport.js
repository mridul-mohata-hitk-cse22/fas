const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const MySQL=require("./mysql");
const md5=require("md5");

var strategy=new LocalStrategy(async function verify(username, password, done) {
    let db=new MySQL(),
        init=false;

    try {
        init=true;

        let [r1, f1]=await db.query(
            "SELECT id, type, email, phone FROM user WHERE email=? && password=?",
            [username, md5(password)]
        );

        if(r1.length==0) {
            await db.close();
            return done(null, false);
        }

        let temp={};
        
        if(r1[0].type==1 || r1[0].type==2) {
            let q2='SELECT id as roll, name FROM student WHERE user=?';
            if(r1[0].type==2)
            q2='SELECT id as empId, name FROM teacher WHERE user=?';

            let [r2, f2]=await db.query(q2, [r1[0].id]);
            temp=r2[0];
        }
        await db.close();

        done(null, {
            ...r1[0],
            ...temp
        });
    }
    catch(e) {
        if(init)
        db.close();

        done(e);
    }
});

passport.use(strategy);

passport.serializeUser( (userObj, done) => {
    done(null, userObj)
});

passport.deserializeUser((userObj, done) => {
    done (null, userObj )
});

module.exports=passport;