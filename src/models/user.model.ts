import mongoose, { Document, Schema } from 'mongoose';

import { encrypt } from '../utils/encrypt';

export interface User extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
}

const UserSchema = new Schema<User>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    profilePicture: {
      type: Schema.Types.String,
      default: 'user.jpg',
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activationCode: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function () {
  this.password = encrypt(this.password);
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
