import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        
    },
    aed: {
        type: String,
        required: true,
    },
    usdt: {
        type: String,
        required: true,
    },
})

const Rate = mongoose.models.Rate || mongoose.model("Rate", rateSchema);

export default Rate;