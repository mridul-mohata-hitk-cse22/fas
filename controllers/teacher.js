const Class=require("../models/class");
const Attendance=require("../models/attendance");

module.exports.home=async function(req, res) {
    try {
        let result=await Class.fetch(req.user.empId, 2);
        res.render("teacher/index", result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports.attendance={
    form: async function(req, res) {
        try {
            let result=await Class.students(req.user.id, req.params.id, 1);
            res.render("teacher/attendance/record", result);
        }
        catch(e) {
            console.log(e);
            res.status(500).send();
        }
    },

    record: async function(req, res) {
        try {
            let {
                attendance,
                count,
                date
            }=req.body;

            let result=await Attendance.record(req.user.empId, req.params.id, attendance, date, count);

            res.status(200).json({
                success: true,
            });
        }
        catch(e) {
            console.log(e);
            res.status(500).send();
        }
    },

    student: async function(req, res) {
        try {
            let result=await Attendance.fetch(req.user.id, req.params.id, req.params.student);
            res.render("teacher/attendance/student", result);
        }
        catch(e) {
            console.log(e);
            res.status(500).send();
        }
    },
};

module.exports.students=async function(req, res) {
    try {
        let result=await Class.students(req.user.id, req.params.id, 2);
        res.render("teacher/students", result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
};