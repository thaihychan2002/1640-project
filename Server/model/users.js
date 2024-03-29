import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default:
        'https://cdn.landesa.org/wp-content/uploads/default-user-image.png',
    },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    lastPasswordResetAt: { type: Date, required: false },
  },
  { timestamps: true }
)
export const UserModel = mongoose.model('User', schema)
