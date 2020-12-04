const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const notesSchema = new mongoose.Schema({
  note: String
}, { timestamps: true, strict: false })

const commentSchema = new mongoose.Schema({
  comment: String
}, { timestamps: true, strict: false })

const breakdownSchema = new mongoose.Schema({
  name: String,
  value: Number,
  date: Date
}, { timestamps: true, strict: false })

const paymentSchema = new mongoose.Schema({
  amount: Number,
  quantity: Number,
  deposit: Number,
  paymentTypeAmount: Number,
  currency: String,
  breakdown: [breakdownSchema],
  paymentStatus: String,
  tag: String,
  salesGuy: String,
  paymentMethod: String,
  contractSigned: String,
  paymentType: String,
  joinedDate: Date,
}, { timestamps: true, strict: false })

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  country: String,
  suburb: String,
  birthdate: Date,
  zipcode: String,
  photoUrl: String,
  payment: paymentSchema,
  notes: [notesSchema],
  comment: [commentSchema]
}, { timestamps: true, strict: false })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('Student', schema)
