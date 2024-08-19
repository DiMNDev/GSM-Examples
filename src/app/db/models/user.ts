import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "como se llama?"],
    unique: [true, "This username is taken :("],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please provide valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
});

UserSchema.pre("save", async function () {
  if (this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.createJWT = function () {
  try {
    if (process.env.JWT_SECRET) {
      return jwt.sign(
        {
          userId: this._id,
          email: this.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
    }
  } catch (error) {
    console.log(`Error creating JWT: ${error}`);
  }
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
let User;
try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", UserSchema);
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
