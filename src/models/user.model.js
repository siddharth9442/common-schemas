import mongoose, { Schema, Types } from 'mongoose';
const userSchema = new Schema({
    // username: { type: String, required: true, lowercase: true, unique: true, trim: true, index: true },
    firstName: { type: String, required: true, uppercase: true, trim: true },
    lastName: { type: String, uppercase: true, trim: true },
    email: { type: String, lowercase: true, unique: true, trim: true, index: true },
    mobileNo: { type: String, required: true, unique: true, trim: true, index: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    dob: { type: String },
    profileImage: { type: String },  // cloud url
    coverImage: { type: String },  // cloud url
    countryId: { type: Types.ObjectId },
    stateId: { type: Types.ObjectId },
    discrictId: { type: Types.ObjectId },
    subDiscrictId: { type: Types.ObjectId },
    cityId: { type: Types.ObjectId },
    status: { type: Number, default: 1 } // 1: active, 9: soft delete
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);