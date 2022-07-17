const Class=require("../models/class");
const Attendance=require("../models/attendance");
const Ratings=require("../models/ratings");

module.exports.home=async function(req, res) {
    try {
        let result=await Ratings.check();
        res.render("admin/index", {enableRatings: result});
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports.teacher=async function(req, res) {
    try {
        let result=await Class.fetch(req.params.id, 3);
        res.render("admin/classes", result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports.students=async function(req, res) {
    try {
        let result=await Class.students(req.user.id, req.params.id, 2);
        res.render("admin/students", result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports.attendance=async function(req, res) {
    try {
        let result=await Attendance.fetch(req.user.id, req.params.id, req.params.student);
        res.render("admin/attendance", result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports.ratings={
    enable: async function(req, res) {
        try {
            let result=await Ratings.enable();
            res.status(200).json({
                success: true
            });
        }
        catch(e) {
            console.log(e);
            res.status(500).send();
        }
    },

    fetch: async function(req, res) {
        try {
            let r=await Ratings.fetch(req.user.id, req.params.id);
                data={
                    info: {
                        class: req.params.id,
                        paper: r.paper
                    },
                    questions: Ratings.QUESTIONS,
                    ratings: r.ratings,
                    total: (r.ratings[0])? r.ratings[0].total : 0,
                };

            res.render("admin/ratings", data);
        }
        catch(e) {
            console.log(e);
            res.status(500).send();
        }
    },
};