import mongoose from "mongoose";

const mongoURI = 'mongodb+srv://Cluster46730:VE9vWGN0YkFm@cluster46730.bv6pq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster46730';

async function testConnection() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
}

testConnection();
