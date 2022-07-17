const Class=require("../models/class");
const Attendance=require("../models/attendance");
const Ratings=require("../models/ratings");

module.exports.home=async function(req, res) {
    try {
        let result=await Class.fetch(req.user.roll, 1);
        res.render("student/index", result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports.attendance=async function(req, res) {
    try {
        let result=await Attendance.fetch(req.user.id, req.params.id, req.user.roll);
        res.render("student/attendance", result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports.classmates=async function(req, res) {
    try {
        let result=await Class.students(req.user.id, req.params.id, 1);
        res.render("student/classmates", result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports.rate={
    form: async function(req, res) {
        try {
            let r=await Ratings.access(req.user.roll, req.params.id),
                data={
                    access: r.access,
                    info: {
                        class: req.params.id,
                        paper: r.paper, 
                    },
                    questions: Ratings.QUESTIONS
                };

            res.render("student/rate", data);
        }
        catch(e) {
            console.log(e);
            res.status(500).send();
        }
    },

    record: async function(req, res) {
        try {
            let result=await Ratings.record(req.user.roll, req.params.id, req.body);

            res.status(200).json({
                success: true,
            });
        }
        catch(e) {
            console.log(e);
            res.status(500).send();
        }
    }
};