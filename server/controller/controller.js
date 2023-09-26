const bcrypt = require('bcrypt');
var Userdb = require('../model/model');
// const { use } = require('../routes/router');

//create and save new user

exports.create= async (req,res)=>{
    const {password}=req.body;
    // validate request
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        gender:req.body.gender,
        status:req.body.status
    })

    // save user in the database
     await user
        .save(user)
        .then(data=>{
            // res.send(data)  
            res.redirect('/add-user')
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "Some error occured while creating a create operator"
            })
        })

}

// retrive and return all user/retrive and retun a single user
exports.find=(req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not Found user with id"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with id"+id})
            })
    }else{
        Userdb.find()
        .then(user=>{
           res.send(user)
        })
        .catch(err=>{
           res.status(500).send({message:err.message || "Error Occurred while retriving user information"})
        })
    }
    
}

// update a new identified user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"Date to update can not be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(400).send({message:'Cannot Update user with ${id}.Maybe user not found'})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:'Error update user information'})
        })
}

// Delete a user a specified user id in the request
exports.delete=(req,res)=>{
    const id =req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Delete with id $(id).Maybe id is worng`})
            }else{
                res.send({
                    message:`User was deleted successfully!`
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete User with id="+id
            });
        });
}

