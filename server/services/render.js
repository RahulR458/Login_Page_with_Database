const axios = require('axios')

const bcrypt = require('bcrypt')

const User = require('../model/model');

// const userName = require('')

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
    if(req.session.userId){
        res.render("user_page")
    }else{
        res.render("login")
    }
    
}

exports.user_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(password);
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            res.render('login', { error: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (user.role === 0) {
            console.log(user.password);
            if (passwordMatch) {
                req.session.userId = user;
                if (req.session.userId) {
                    res.redirect("user-page")
                }
            }
        } else if (user.role === 1) {
            console.log(user.password);
            if (passwordMatch) {
                req.session.userId = user;
                if (req.session.userId) {
                    res.redirect("dashboad")
                }
            }
        }
    } catch (error) {
        res.status(500).send('Error during login.');
    }
}



exports.dashboad_user = (req,res)=>{
    if(req.session.userId){
        res.render('dashboad')
    }else{
        res.redirect("login")
    }
    }
    


exports.logout_admin = (req,res)=>{
    req.session.destroy();
    res.setHeader('Cache-Control', 'no-store');
    res.render("login",{title:"Express",logout:"logout Successfully...!"})
}

exports.page_user = (req,res)=>{
    if(req.session.userId){
        res.render("user_page")
    }else{
        res.redirect("login")
    }
    
}



    


// const data = await User.find(
//     {
//         "$or":[
//             {name:{$regex:req.params.key}}
//         ]
//     })
//     res.send(data)


// exports.search_user = async function searchfn(){
//     const searchValue = document.getElementById('search').value
//     const myTable =document.getElementById('myTable')
//     const tr=myTable.getElementsByTagName("tr");

// for(var i=0;i<tr.length;i++){
//     let td=tr[i].getElementsByTagName("td")[1];
//     if(td){
//       let textValue=td.textContent||td.innerHTML;
//       if(textValue.toUpperCase().indexOf(searchValue)>-1){
//         tr[i].style.display="";
//       }else{
//         tr[i].style.display="none";
//       }
//     }
         
//   }
// } 



