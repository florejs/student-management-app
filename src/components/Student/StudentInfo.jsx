import Axios from 'axios'
import BaseLayout from 'components/BaseLayout'
import React, {useEffect, useState, useCallback} from 'react'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom'
import BackButton from 'statelessComponent/BackButton'
import AddNotesForm from './AddNotesForm'
import { connect } from 'react-redux'
import StudentNotes from './StudentNotes'
import './student-info.css'
import StudentPaymentInfo from './StudentPaymentInfo'
import StudentProfileInfo from './StudentProfileInfo'
import StudentPaymentBreakdown from './StudentPaymentBreakdown'
import { studentStatus } from 'helpers'

function StudentInfo({dispatch}) {
  const {studentID} = useParams()
  const [studentInfoSingle, setStudentInfoSingle] = useState({})
  const {url} = useRouteMatch()
  const history = useHistory()

  useEffect(() => {
    Axios.get(`/api/student/${studentID}`)
      .then(res => {
        setStudentInfoSingle(res.data.student)
        dispatch({
          type: 'ALL_NOTES_BY_STUDENT', 
          payload: {
            data: res.data.student.notes
          }
        })
        // console.log(res.data.student)
        // console.log(res.data.student.notes)
      })
      .catch(err => console.log(err))
    return () => {}
  }, [studentID, dispatch])

  const studentDelete = useCallback(() => {
    const confirmDelete = window.confirm('Are you sure?')
    if (confirmDelete) {
      Axios.delete(`/api/student/${studentID}`)
        .then(res => {
          if (res.data.msg) {
            setTimeout(() => {
              history.push('/student/s')
            }, 500)
          }
        })
        .catch(err => console.log(err))
    }
    return () => {}
  },[studentID, history])

  const getStatusColor = (status) => {
    const stat = studentStatus.find(item => item.name === status)
    return (
      <div className="student_single__status mb-4">
        <div style={{background: stat.color}} className="student_single__status_color"></div>
        <span>{status}</span>
      </div>
    )
  }

  if (Object.keys(studentInfoSingle).length === 0) {
    return (
      <BaseLayout>
        <span>Loading...</span>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div className="StudentInfo">
        <BackButton/>
        <div className="action">
          <div className="row">
            <div className="col-md-3">
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
                }}>
                <Link to={`${url}/edit`}>Edit Info</Link>
                </div>
            </div>
            <div className="col-md-9">
              
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <StudentProfileInfo
              firstName={studentInfoSingle.firstName || ''}
              lastName={studentInfoSingle.lastName || ''}
              joinedDate={studentInfoSingle.payment.joinedDate || ''}
              country={studentInfoSingle.country || ''}
              suburb={studentInfoSingle.suburb || ''}
              email={studentInfoSingle.email || ''}
              birthDate={studentInfoSingle.birthdate || ''}
              phone={studentInfoSingle.phone || ''}
            />
            <div className="actions-wrapper">
              <button className="btn btn-danger delete__student_profile_btn" onClick={studentDelete}>Delete</button>
            </div>
          </div>
          <div className="col-md-9">
            {getStatusColor(studentInfoSingle.payment.paymentStatus)}
            <StudentPaymentInfo  
              payment={studentInfoSingle.payment}
            />
            <div className="text-right student_single__notes_action">
              <AddNotesForm studentId={studentID} />
            </div>
            <StudentNotes studentId={studentID} />
            <StudentPaymentBreakdown  
              breakdown={studentInfoSingle.payment.breakdown}
              qty={studentInfoSingle.payment.quantity}
              recurrence={studentInfoSingle.payment.paymentTypeAmount}
              currency={studentInfoSingle.payment.currency}
              studentId={studentID}
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default connect()(StudentInfo)
