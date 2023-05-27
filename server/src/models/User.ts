import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:false
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

UserSchema.methods.comparePassword=async function(candidatePassword:string) {
    const isPasswordCorrect=await bcrypt.compare(candidatePassword,this.password);
    return isPasswordCorrect;
}

UserSchema.methods.generateAccessToken=function() {
    const accessToken=jwt.sign({id:this._id},process.env.JWT_ACCESS_TOKEN_SECRET!,{expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRE!});
    return accessToken;
}

UserSchema.methods.generateRefreshToken=function() {
  const refreshToken=jwt.sign({id:this._id},process.env.JWT_REFRESH_TOKEN_SECRET!,{expiresIn:process.env.JWT_REFRESH_TOKEN_EXPIRE});
  return refreshToken;
}
export default mongoose.model('User',UserSchema);
