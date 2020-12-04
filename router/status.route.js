const router = require('express').Router()
const requiredAuth = require('../middleware')
const Status = require('../models/Status.model')
const StudentStatus = require('../models/StudentStatus.model')

router.get('/', requiredAuth, (req, res) => {
  Status.find((err, status) => {
    if (err) return res.status(400).send(err)
    res.send({status})
  })
})

router.post('/create', requiredAuth, (req, res) => {
  const {name} = req.body
  const newStatus = new Status({name})
  newStatus.save()
    .then(status => {
      res.send({status})
    })
    .catch(err => res.send({err}))
})

router.post('/update/:statusId', requiredAuth, (req, res) => {
  const {statusId} = req.params
  const {name} = req.body
  Status.findByIdAndUpdate(statusId, {name}, (err, updatedStatus) => {
    res.send(updatedStatus)
  })
})

router.delete('/:statusId', requiredAuth, (req, res) => {
  const {statusId} = req.params
  Status.findByIdAndDelete(statusId, (err, deletedStatus) => {
    if (err) return res.status(400).send({err})
    StudentStatus.deleteMany({statusId}, (err, deletedStudentStatus) => {
      if (err) return res.status(400).send({err})
      res.send({deletedStatus, deletedStudentStatus})
    })
  })
})

router.post('/update-student-status', requiredAuth, (req, res) => {
  const {studentId, statusId} = req.body
  StudentStatus.findOne({studentId}, (err, studentStatus) => {
    if (studentStatus === null) {
      return new StudentStatus({studentId, statusId}).save((err, newStatusId) => {
        res.send(newStatusId)
      })
    } 
    StudentStatus.findOneAndUpdate({studentId}, {statusId}, (err, updatedStatus) => {
      res.send(updatedStatus)
    })
  })
})

router.get('/student-status/:studentId', requiredAuth, (req, res) => {
  const {studentId} = req.params
  StudentStatus.findOne({studentId}, (err, studentStatus) => {
    if (err) return res.status(400).send({err})
    res.send(studentStatus)
  })
})

module.exports = router