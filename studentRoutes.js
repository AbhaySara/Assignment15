const express = require("express");

const Student = require("../models/Student");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async(req,res)=>{

    const students = await Student.find();

    res.json(students);
});

router.post("/", auth, async(req,res)=>{

    const student = new Student(req.body);

    await student.save();

    res.json(student);
});

router.put("/:id", auth, async(req,res)=>{

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.json(student);
});

router.delete("/:id", auth, async(req,res)=>{

    await Student.findByIdAndDelete(req.params.id);

    res.json({
        msg:"Student Deleted"
    });
});

module.exports = router;