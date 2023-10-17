import { render } from "ejs";
import express from "express";
import mongoose, { Schema } from "mongoose";
import _ from 'lodash';
import bodyParser from "body-parser";

const app = express();
const port = 2000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://127.0.0.1:27017/Register_Login").then(() => console.log("connected to todoDB database"));

const userSchema = {
    name: String,
    email: String,
    password: String
};

const User  = mongoose.model("user", userSchema);

// const user = new User({
//     name: "MOHD SAIF",
//     email: "mohdsaif9990@gmail.com",
//     password: "saif9990"
// })

//user.save().then(() => console.log("user details saved."));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/login-page", (req, res) => {
    res.render("login.ejs");
});


app.post("/", (req,res) => {
    const user_name = _.upperCase(req.body.input_name);
    const user_email = req.body.input_email;
    const user_password = req.body.input_password;

    const user = new User({
        name: user_name,
        email: user_email,
        password: user_password
    })                                                                                       

    User.find({email: user_email}).then(result => {
        if(result.length === 0){
            if(user_name.length!=0 && user_email.length!=0 && user_password.length!=0)
            user.save().then(() => {
                console.log("registration successful!");
                res.redirect("/");
            })
            else{
                console.log("fill all the details");
                res.redirect("/register");
            }
        } else {
            console.log("already registered!");
            res.redirect("/"); 
        }
    });

});


app.get("/login", (req, res) => {
    const login_mail = req.body.login_id;
    const login_pass = req.body.login_password;
    console.log(login_mail);
    console.log(login_pass);
    res.render("profile.ejs");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  