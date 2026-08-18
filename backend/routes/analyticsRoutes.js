const express = require("express");

const Task = require("../models/task");

const router = express.Router();

router.get("/", async(req,res)=>{

    try{

        const totalTasks =
        await Task.countDocuments();

        const completedTasks =
        await Task.countDocuments({
            completed:true
        });

        res.json({

            totalTasks,
            completedTasks

        });

    }catch(error){

        res.status(500).json(error);

    }

});

module.exports = router;