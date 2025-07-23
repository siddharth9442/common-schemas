import { Schema } from 'mongoose';
const stateSchema = new Schema({
    name: { type: String, required: true, uppercase: true, trim: true },
    status: { type: Number, default: 1 } // 1: active, 9: soft delete
}, { timestamps: true });

export default stateSchema;