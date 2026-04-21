import mongoose, { Document, Schema } from 'mongoose';

import { ROLES } from '../utils/constant';
import { encrypt } from '../utils/encrypt';
import env from '../utils/env';
import { renderMailHtml, sendMail } from '../utils/mail/mail';

export interface User extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
  createdAt?: string;
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
      enum: [ROLES.ADMIN, ROLES.MEMBER],
      default: ROLES.MEMBER,
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
  if (this.isModified('password')) {
    this.password = encrypt(this.password);
  }

  if (this.isNew) {
    this.activationCode = encrypt(this._id.toString());
  }
});

UserSchema.post('save', async function (doc, next) {
  try {
    const user = doc;

    console.log('Send email to: ', user);

    const contentMail = await renderMailHtml('registration-success.ejs', {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
      activationLink: `${env.CLIENT_HOST}/user-activation?code=${user.activationCode}`,
    });

    await sendMail({
      from: env.EMAIL_SMTP_USER,
      to: user.email,
      subject: 'Aktivasi akun anda',
      html: contentMail,
    });
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
