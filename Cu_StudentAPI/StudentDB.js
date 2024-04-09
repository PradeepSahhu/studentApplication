require("dotenv").config();
const connectDB = require("./MONGODB/DB_connections");
const studentModel = require("./model/student_api_model");
const studentJson = require("./student_list.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await studentModel.deleteMany();
    await studentModel.create(studentJson);
    console.log("Successfully pushed data to the Mongoose Atlas");
  } catch (error) {
    console.log(error);
  }
};
start();
