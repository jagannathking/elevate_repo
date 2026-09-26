import mongoose from 'mongoose'


const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})