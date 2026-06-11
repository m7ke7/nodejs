import mongoose from 'mongoose';

const local_string_connection = 'mongodb+srv://mike:mike0527@cluster0.jsmnmur.mongodb.net/?appName=Cluster0';

async function dbConection() {
    try {
      await mongoose.connect(process.env.MONGO_URI || local_string_connection);
      console.log('Connnect to local MongoDb')
    } catch (error) {
      console.error(error);
      console.error("connnect Failed :c")
    }

}



export default dbConection;

