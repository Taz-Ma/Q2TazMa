const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const URL = 'mongodb+srv://tm721:tm721@tm-1.3rfpsev.mongodb.net/Summer24';


 
// Connect to MongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB!!!!");
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    myName: { type: String, required: true },
    mySID: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/form.html");
});

app.post('/newuser', async (req, res) => {
    // Hardcoded values
    const myName = "Taz Hei Ching MA";
    const mySID = "300379455";

    const newUser = new User({ myName, mySID });

    try {
        await newUser.save();
        res.json("New User Added");
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
});
