const router = require('express').Router()
const requiredAuth = require('../middleware')
const Student = require('../models/Student.model')
const Note = require('../models/Note.model')
const StudentStatus = require('../models/StudentStatus.model')
const Status = require('../models/Status.model')

router.get('/', requiredAuth, (req, res) => {
  const {order, orderBy, name, tag, qtyOp, qtyNum, currency, paymentType, status, recurrence, paymentTypeOp, page} = req.query
  const perPage = 10

  const allStudent = Student.find()

  if (paymentType) {
    allStudent.find({
      $and: [{'payment.paymentType': {$regex: paymentType, $options: 'i'}}]
    })
  }

  if (recurrence && paymentTypeOp) {
    if (paymentTypeOp === '<=') {
      allStudent.find({
        $and: [
          {'payment.paymentTypeAmount': {$lte: recurrence}},
          {'payment.paymentType': {$regex: paymentType, $options: 'i'}}
        ],
      })
    }
    if (paymentTypeOp === '>=') {
      allStudent.find({
        $and: [
          {'payment.paymentTypeAmount': {$gte: recurrence}},
          {'payment.paymentType': {$regex: paymentType, $options: 'i'}}
        ],
      })
    }
  }

  if (qtyNum && qtyOp) {
    if (qtyOp === '<=') {
      allStudent.find({
        $and: [{'payment.quantity': {$lte: qtyNum}}]
      })
    }
    if (qtyOp === '>=') {
      allStudent.find({
        $and: [{'payment.quantity': {$gte: qtyNum}}]
      })
    }
  }

  if (order && orderBy) {
    allStudent.sort({[orderBy]: order})
  }

  if (name) {
    allStudent.find({
      $or: [
        {firstName: {$regex: name, $options: 'i'}}, 
        {lastName: {$regex: name, $options: 'i'}},
      ]
    })
  }

  if (status) {
    allStudent.find({'payment.paymentStatus': {$regex: status, $options: 'i'}})
  }

  if (currency) {
    allStudent.find({'payment.currency': {$regex: currency, $options: 'i'}})
  }

  if (tag) {
    allStudent.find({
      $and: [
        {'payment.paymentTag': {$regex: tag, $options: 'i'}},
      ]
    })
  }

  if (page) {
    allStudent.skip((parseInt(page) - 1) * perPage)
  }

  allStudent
    .limit(perPage)
    .sort({createdAt: 'asc'})
    .then(student => {
      Student.countDocuments((err, count) => {
        res.send({
          student, 
          count, 
          allDocsOfPage: perPage * (parseInt(page) || 1),
          perPage,
        })
      })
    })
  allStudent.catch(err => res.status(400).send({err}))
})


router.post('/create', requiredAuth, (req, res) => {
  const {studentInfo, paymentInfo} = req.body
  new Student({ ...studentInfo, payment: {...paymentInfo} })
        .save((err, saved) => {
          res.send(saved)
        })
  // res.send({studentInfo, paymentInfo})
})


router.get('/edit/:studentId', requiredAuth, (req, res) => {
  const {studentId} = req.params
  Student.findById(studentId, (err, student) => {
    if (err) return res.status(400).send(err)
    res.send({student})
  })
})


router.get('/:studentId', requiredAuth, (req, res) => {
  const {studentId} = req.params
  Student.findById(studentId, (err, student) => {
    if (err) return res.status(400).send(err)
    res.send({student})
  })
})


router.post('/update/:studentId', requiredAuth, (req, res) => {
  const {studentId} = req.params
  const {studentInfo, paymentInfo} = req.body
  Student.findByIdAndUpdate(studentId, { ...studentInfo, payment: {...paymentInfo} }, (err, student) => {
                if (err) return res.status(400).send(err)
                res.send(student)
              })
})


router.delete('/:studentId', requiredAuth, (req, res) => {
  const {studentId} = req.params
  Student.findByIdAndDelete(studentId, (err, student) => {
    if(err) return res.status(400).send(err)
    res.send({msg: `Student ${student.firstName} ${student.lastName} is deleted.`})
  })
})


router.post('/deleteNote/:studentId/:noteId', requiredAuth, (req, res) => {
  const {studentId, noteId} = req.params
  Student.findById(studentId, (err, result) => {
    if (err) return res.status(400).send({err})
    result.notes.id(noteId).remove()
    result.save(err2 => {
      if (err2) return res.status(400).send({err: err2})
      res.send('test')
    })
  })
})


router.post('/addNotes/:studentId', requiredAuth, (req, res) => {
  const {studentId} = req.params
  const {note} = req.body
  Student.findById(studentId, (err, student) => {
    student.notes.push({note})
    student.save().then(result => {
      res.send(result.notes)
    })
  })
})


router.get('/notes/:studentId', requiredAuth, (req, res) => {
  const {studentId} = req.params
  Note.find().where({studentId})
    .then(studentNote => {
      res.send({studentNote})
    })
    .catch(err => res.status(400).send({err}))
})


router.post('/add-payment-breakdown/:studentId', requiredAuth, (req, res) => {
  const {studentId} = req.params
  const {payload} = req.body

  Student.findById(studentId, (err, result) => {
    if (err) return res.status(400).send({err})
    result.payment.breakdown.push({...payload})
    result.save().then(student => {
      res.send(student.payment.breakdown)
    })
  })
})


module.exports = router