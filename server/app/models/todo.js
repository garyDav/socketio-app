import mongoose, { Schema } from 'mongoose'
// import uniqueValidator from 'mongoose-unique-validator'

const TodoSchema = new Schema({
  // nit_passport: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
})

// TodoSchema.plugin(uniqueValidator)
export default mongoose.model('Todo', TodoSchema)
