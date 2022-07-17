const express=require('express');
const router=express.Router();
const passport=require("passport");
const Teacher=require("../controllers/teacher");

router.get("/", Teacher.home);
router.get("/class/:id/students", Teacher.students);
router.get("/class/:id/attendance", Teacher.attendance.form);
router.post("/class/:id/attendance", Teacher.attendance.record);
router.get("/class/:id/attendance/:student", Teacher.attendance.student);

module.exports=router;