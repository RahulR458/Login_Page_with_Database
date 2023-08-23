const axios = require('axios')


exports.homeRoutes = (req,res)=>{
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        // console.log(response.data);
        res.render("index",{users:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
   
}

exports.add_user = (req,res)=>{
    res.render("add_user");
}

exports.update_user = (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(function(userData){
        res.render("update_user",{user:userData.data});
    })
    .catch(err=>{
        res.send(err);
    })
}



exports.login_user = (req,res)=>{
    res.render("login")
}


exports.dashboad_user = (req,res)=>{
    res.render("dashboad")
}


exports.logout_admin = (req,res)=>{
    res.render("login")
}

exports.page_user = (req,res)=>{
    res.render("user_page")
}





