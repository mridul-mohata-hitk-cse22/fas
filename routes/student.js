const express=require('express');
const router=express.Router();
const passport=require("passport");
const Student=require("../controllers/student");

router.get("/", Student.home);
router.get("/class/:id/attendance", Student.attendance);
router.get("/class/:id/classmates", Student.classmates);
router.get("/class/:id/rate", Student.rate.form);
router.post("/class/:id/rate", Student.rate.record);

module.exports=router;