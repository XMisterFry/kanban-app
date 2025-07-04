require('dotenv').config();
const express = require ("express")
const mongoose = require ("mongoose")
let {Products,Users} = require ('./db')
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');


async function main() {
        try {
          await mongoose.connect(process.env.MONGO_URI);
          console.log("Connected to MongoDB");
  
        } catch (error) {
          console.error("Error connecting to MongoDB:", error);
        }
      }
    
      main();



const app = express();
app.use(cors()); // Enable all CORS requests
app.use (express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', (req, res) => {
  res.send('pong');
});


app.post("/new-user-signup", async (req,res)=> {
let name=req.body.name;
let email = req.body.email;
let password = req.body.password;

//t/c block
try {
const userEntry = await Users.create ({
  name,email,password
})

res.status(201).json({ 
    success: true,
    user: {
      id: userEntry._id,
      name: userEntry.name,
      email: userEntry.email
     
    }
  });
}
catch (error) {
    console.error("Detailed error:", error);  // Add this line
    res.json({
        error: "Entry was not posted",
        details: error.message  // Include the actual error message
    })
}
//ends


})

















app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


