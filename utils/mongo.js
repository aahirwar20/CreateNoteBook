import mongoose from 'mongoose';

export async function connectMongoDb( key ){
    mongoose.set("strictQuery", false);
    mongoose.connect( key );
    console.log("connected to mongoDb database")
}
