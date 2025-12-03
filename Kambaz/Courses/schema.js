import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  course: String,
  lessons: Array,
});

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  number: String,
  credits: Number,
  description: String,
  modules: [moduleSchema],  // Add modules array
},
{ collection: "courses" }
);

export default courseSchema;