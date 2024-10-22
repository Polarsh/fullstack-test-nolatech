import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Employee"],
    default: "Employee",
  },
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Método para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Obtiene el salt desde env
  const genSalt = parseInt(process.env.GEN_SALT);

  const salt = await bcrypt.genSalt(genSalt);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model("User", userSchema);

export default User;
