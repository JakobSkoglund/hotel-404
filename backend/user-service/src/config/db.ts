import mongoose from "mongoose"; 

const mongoURI = 'mongodb+srv://emilfroding:asd123@scaledb.tql8n.mongodb.net/Hotel-404?retryWrites=true&w=majority&appName=ScaleDb'
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
