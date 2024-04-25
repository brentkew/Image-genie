// const mongoose = require('mongoose');
import { Document, Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface IUser extends Document {
  clerkId: number;
  email: string;
  username: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
  creditBalance?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: Number, required: true, unique: true },
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  photo: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  planId: {type: Number, default: 1},
  creditBalance: {type: Number, default: 100},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = models?.User || model('User', UserSchema);
export default User;