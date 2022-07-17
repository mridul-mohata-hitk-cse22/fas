const express=require('express');
const router=express.Router();
const passport=require("passport");
const student=require("./student");
const teacher=require("./teacher");
const admin=require("./admin");

const Authentication={
    check: (req, res, next) => {
        if (req.isAuthenticated()) { return next() }
        else res.redirect("/login")
    },  

    type: function(type) {
        return (req, res, next) => {
            if(req.user.type==type) next();
            else res.status(403).send('Unauthorized Access');
        }
    },
};

router.get(
    '/', 
    Authentication.check,
    (req, res) => {
        if(req.user.type==1)
        res.redirect("/student");
        else if(req.user.type==2)
        res.redirect("/teacher");
        else if(req.user.type==3)
        res.redirect("/admin");
    }
);

router.get(
    '/login',
    (req, res, next) => {
        if (req.isAuthenticated())
        res.redirect("/login");
        else 
        next();
    },
    (req, res) => {
        res.render("login");
    }
);

router.post("/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { next(err); }

        if (!user) { 
            return res.status(401).json({
                error: 'Invalid username or password'
            }); 
        }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            
            return res.status(200).json({
                success: true,
            });
        });
    })(req, res, next);
});

router.delete('/logout', (req, res) => {
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.status(200).json({ success: true });
    });
});

router.use('/student', Authentication.check, Authentication.type(1), student);
router.use('/teacher', Authentication.check, Authentication.type(2), teacher);
router.use('/admin', Authentication.check, Authentication.type(3), admin);

module.exports=router;