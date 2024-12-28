const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
// const PORT = 5000;
require('dotenv').config();

const cors = require('cors');
app.use(cors());

//when pathname is required
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/merncrud').then(()=>{
    console.log("db connected successfully")
})
.catch((error)=>{
    console.log(error);
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},{timestamps: true});

//create collection
const User = mongoose.model("User", userSchema);

app.post("/createuser", async  (req, res)=>{
    try {
        const bodyData = req.body;
        const user = new User(bodyData);
        const userData = await user.save();
        res.send(userData);
    } catch (error) {
        res.send(error);
    }
});

//read all user
app.get("/readalluser", async(req, res)=>{
    try {
        const userData = await User.find({});
        res.send(userData);
    } catch (error) {
        res.send(error);
    }
});

//read one user
app.get("/read/:id", async (req,res)=>{
    try {
       const id = req.params.id;
       const user = await User.findById({_id: id})
       res.send(user);
    } catch (error) {
        res.send(error);
    }
});

//update user
app.put("/updateuser/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({_id: id},req.body,{new:true});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

//delete user
app.delete("/delete/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({_id: id});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})

app.get("/",(req, res)=>{
    res.send("from get route");
});

app.listen(PORT, ()=>{
    console.log(`server is running on: ${PORT}`)
})