require('dotenv').config();
const express = require ("express")
const mongoose = require ("mongoose")
let Products = require ('./db')
const path = require('path');

async function main() {
        try {
          await mongoose.connect(process.env.MONGO_URI);
          console.log("Connected to MongoDB");
      
          app.listen(3000, () => {
            console.log("Server is running on port 3000");
          });
      
        } catch (error) {
          console.error("Error connecting to MongoDB:", error);
        }
      }
    
      main();
const cors = require ("cors")

const app = express (); 


