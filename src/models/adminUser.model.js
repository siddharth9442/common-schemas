import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminUserSchema = new Schema({
    username: { type: String, required: true },
    mobileNo: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    status: { type: Number }
}, { timeseries: true });

adminUserSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    return next();
});

adminUserSchema.methods.isPasswordMatched = async function (password) {
    return await bcrypt.compare(password, this.password);
};

adminUserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            mobileNo: this, mobileNo
        },
        process.env.ACCESS_TOKEN_SECRETE,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

adminUserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRETE,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const AdminUser = mongoose.model('adminUser', adminUserSchema, 'adminUsers');