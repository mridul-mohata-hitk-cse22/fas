const express=require('express');
const router=express.Router();
const passport=require("passport");
const Admin=require("../controllers/admin");

router.get("/", Admin.home);
router.get("/teacher/:id", Admin.teacher);
router.get("/class/:id/ratings", Admin.ratings.fetch); 
router.get("/class/:id/students", Admin.students);
router.get("/class/:id/attendance/:student", Admin.attendance);
router.post("/ratings/enable", Admin.ratings.enable);

module.exports=router;