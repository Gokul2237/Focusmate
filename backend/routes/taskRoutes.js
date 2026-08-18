const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// CREATE TASK
// ===============================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const task = await Task.create({

            userId: req.user.id,

            title: req.body.title,

            category: req.body.category,

            priority: req.body.priority,

            dueDate: req.body.dueDate,

            recurring: req.body.recurring || false

        });


        res.status(201).json(task);


    } catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

});



// ===============================
// GET USER TASKS
// ===============================

router.get("/", authMiddleware, async(req,res)=>{

    try{

        const tasks = await Task.find({

            userId:req.user.id

        });


        res.json(tasks);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});



// ===============================
// COMPLETE TASK + POINTS + STREAK
// ===============================

router.put("/:id", authMiddleware, async(req,res)=>{

    try{


        const task = await Task.findOne({

            _id:req.params.id,

            userId:req.user.id

        });



        if(!task){

            return res.status(404).json({

                message:"Task not found"

            });

        }



        // Reward only first completion

        if(

            task.completed === false &&

            req.body.completed === true

        ){


            const user = await User.findById(

                req.user.id

            );



            if(user){


                // ===================
                // POINT SYSTEM
                // ===================

                user.points += 10;



                // ===================
                // STREAK SYSTEM
                // ===================

                const today = new Date();

                today.setHours(0,0,0,0);



                if(!user.lastCompletedDate){


                    user.streak = 1;


                }

                else{


                    const lastDate =
                        new Date(
                            user.lastCompletedDate
                        );


                    lastDate.setHours(
                        0,
                        0,
                        0,
                        0
                    );


                    const difference =

                    (today - lastDate)

                    /

                    (1000 * 60 * 60 * 24);



                    if(difference === 1){

                        user.streak += 1;

                    }

                    else if(difference > 1){

                        user.streak = 1;

                    }


                }



                user.lastCompletedDate = today;



                // ===================
                // POINT BADGES
                // ===================


                if(

                    user.points >= 10 &&

                    !user.badges.includes(
                        "🏅 First Task Completed"
                    )

                ){

                    user.badges.push(
                        "🏅 First Task Completed"
                    );

                }



                if(

                    user.points >= 50 &&

                    !user.badges.includes(
                        "⭐ Productivity Star"
                    )

                ){

                    user.badges.push(
                        "⭐ Productivity Star"
                    );

                }



                if(

                    user.points >= 100 &&

                    !user.badges.includes(
                        "🔥 Focus Master"
                    )

                ){

                    user.badges.push(
                        "🔥 Focus Master"
                    );

                }



                // ===================
                // STREAK BADGE
                // ===================


                if(

                    user.streak >= 7 &&

                    !user.badges.includes(
                        "🔥 7 Day Streak"
                    )

                ){

                    user.badges.push(
                        "🔥 7 Day Streak"
                    );

                }



                await user.save();


            }


        }



        const updatedTask =

        await Task.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );



        res.json(updatedTask);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }

});



// ===============================
// DELETE TASK
// ===============================

router.delete("/:id", authMiddleware, async(req,res)=>{


    try{


        await Task.findOneAndDelete({

            _id:req.params.id,

            userId:req.user.id

        });



        res.json({

            message:"Task Deleted"

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});



module.exports = router;