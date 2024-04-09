require("dotenv").config();
const express = require("express");
const app = express();
const student_router = require("./routes/student_routes");
const connectDB = require("./MONGODB/DB_connections");

const PORT = process.env.PORT || 8100;


const cors = require('cors'); // Import the CORS middleware

const port = 8100;

app.use(cors()); // Use the CORS middleware for all routes


//! Direct Route Addressing.
app.get("/", (req, res) => {
  res.send("I am Live and running but might be down later");
});
//! Route Addressing through middleware.
app.use("/api/students", student_router);

const start = async () => {
  await connectDB(process.env.MONGODB_URL);
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};

start();
