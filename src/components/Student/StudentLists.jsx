import React, {useState, useEffect, useCallback} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import BaseLayout from 'components/BaseLayout'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import './studentList.css'
import {studentStatus, useQuery} from 'helpers'
import StudentListsFilter from './StudentListsFilter'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa"
import { dateFormatMonthsPref } from 'helpers/dateCreateFormat'

const StudentList = () => {
  const [toggleName, setToggleName] = useState(false)
  const [allDocsOfPage, setAllDocsOfPage] = useState(0)
  const [allDocs, setAllDocs] = useState(0)
  const [perPage, setPerPage] = useState(0)
  const query = useQuery()
  const name = query.get('name') || ''
  const tag = query.get('tag') || ''
  const qtyOp = query.get('qtyOp') || ''
  const qtyNum = query.get('qtyNum') || ''
  const currency = query.get('currency') || ''
  const paymentType = query.get('paymentType') || ''
  const status = query.get('status') || ''
  const recurrence = query.get('recurrence') || ''
  const paymentTypeOp = query.get('paymentTypeOp') || ''
  const page = query.get('page') || ''
  const dispatch = useDispatch()
  const {students} = useSelector(state => state.studentReducer)
  const history = useHistory()

  const isFilterName = name !== '' ? `&name=${name}` : ''
  const isFilterTag = tag !== '' ? `&tag=${tag}` : ''
  const isFilterQtyOp = qtyOp !== '' ? `&qtyOp=${qtyOp}` : ''
  const isFilterQtyNum = qtyNum !== '' ? `&qtyNum=${qtyNum}` : ''
  const isFilterCurrency = currency !== '' ? `&currency=${currency}` : ''
  const isFilterPaymentType = paymentType !== '' ? `&paymentType=${paymentType}` : ''
  const isFilterStatus = status !== '' ? `&status=${status}` : ''
  const isFilterRecurrence = recurrence !== '' ? `&recurrence=${recurrence}` : ''
  const isFilterPaymentTypeOp = paymentTypeOp !== '' ? `&paymentTypeOp=${paymentTypeOp}` : ''
  const isFilterPage = page !== '' ? `&page=${page}` : ''

  const queryParams = `${isFilterName}${isFilterTag}${isFilterQtyOp}${isFilterQtyNum}${isFilterCurrency}${isFilterPaymentType}${isFilterStatus}${isFilterRecurrence}${isFilterRecurrence}${isFilterPaymentTypeOp}`

  const handleToggleName = useCallback(() => {
    Axios.get(`/api/student/?order=${toggleName ? 'asc' : 'desc'}&orderBy=lastName&${queryParams}`)
      .then(res => {
        setToggleName(!toggleName)
        dispatch({
          type: 'ALL_STUDENT',
          payload: {
            data: res.data.student
          }
        })
      }).catch(err => console.log(err.message))
    return () => {}
  }, [
      toggleName, 
      dispatch,
      queryParams
    ])


  useEffect(() => {
    Axios.get(`/api/student/?${isFilterPage}${queryParams}`)
      .then(res => {
        setAllDocsOfPage(res.data.allDocsOfPage)
        setAllDocs(res.data.count)
        setPerPage(res.data.perPage)
        dispatch({
          type: 'ALL_STUDENT',
          payload: {
            data: res.data.student
          }
        })
      })
      .catch(err => console.log(err.message))
    return () => {}
  }, [
      dispatch,
      queryParams,
      isFilterPage
    ])

  const handlePrevPage = useCallback(() => {
    if (page !== '' && parseInt(page) > 1) history.push(`?page=${parseInt(page) - 1}${queryParams}`)
    return () => {}
  }, [
    history, 
    queryParams,
    page
  ])

  const handleNextPage = useCallback(() => {   
    if (page === '') history.push(`?page=2${queryParams}`)
    else history.push(`?page=${parseInt(page) + 1}${queryParams}`)  
    return () => {}
  }, [
    history, 
    page, 
    queryParams
  ])


  const getStatusColor = (status) => {
    const stat = studentStatus.find(item => item.name === status)
    return (
      <div style={{background: stat.color}} className="color-status"></div>
    )
  }


  if (students === null) {
    return (
      <BaseLayout>
        Loading...
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <h2 className="title">Student Lists</h2>
      <div className="content-top">
        <div className="search-box"><StudentListsFilter/></div>
        <div className="status_legend">
          {studentStatus && studentStatus.map((item, i) => (
            <div key={i} className="status_legend__single_wrapper">
              <div style={{background: item.color}} className="status_legend__color"></div>
              <span className="status_legend__text">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="content-main">
        {students.length === 0 ? <span>No student.</span> : (
          <table className="student_lists">
            <thead>
              <tr>
                <th></th>
                <th>
                  <button 
                    onClick={handleToggleName}
                  >
                    Name {toggleName ? <FaChevronUp/> : <FaChevronDown/> }
                </button>
                </th>
                <th>Amount</th>
                <th>Deposit</th>
                <th>Qty</th>
                <th>Payment Type</th>
                <th>Payment Type Name</th>
                <th>Contract Signed</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students && students.map((item, key) => (
                <tr key={key}>
                  <td>
                    {getStatusColor(item.payment.paymentStatus)}
                  </td>
                  <td>
                    <span className="studentListName d-block">
                    {item.lastName}, {item.firstName}
                    </span>
                    <span className="studentListemail d-block">
                      {item.email}
                    </span>
                  </td>
                  <td>
                    <span className="studentListPaymentAmount">
                      {item.payment.amount} {item.payment.currency}
                    </span>
                  </td>
                  <td>
                    <span className="studentListDeposit">
                      {item.payment.deposit ? `${item.payment.deposit} ${item.payment.currency}` : ''}
                    </span>
                  </td>
                  <td>
                    <span className="studentListQty">
                      {item.payment.quantity}
                    </span>
                  </td>
                  <td>
                    <span className="studentListPaymentType">
                      {item.payment.paymentType}
                      </span>
                  </td>
                  <td>
                    <span className="studentListPaymentTypeName">
                      <span>{item.payment.paymentTypeAmount} {item.payment.currency} &times; {item.payment.quantity} </span>
                      <span>
                        {item.payment.paymentType === 'Weekly' ? 'Weeks' : '' }
                        {item.payment.paymentType === 'Monthly' ? 'Months' : '' }
                        {item.payment.paymentType === 'Fortnightly' ? 'Fortnights' : '' }
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className="studentListContract">
                      {item.payment.contractSigned}
                    </span>
                  </td>
                  <td>
                    <span className="studentListStatus">
                      {item.payment.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className="studentListContract">
                      {item.payment.joinedDate ? dateFormatMonthsPref(item.payment.joinedDate) : ''}
                    </span>
                  </td>
                  <td>
                    <Link to={`/student/${item._id}`}>
                      <button className="btn btn-sm mr-1 student_edit__btn">View</button>
                    </Link>
                    <Link to={`/student/${item._id}/edit`}>
                      <button className="btn btn-sm student_delete__btn">Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {allDocs > perPage  ? (
          <div className="custom_pagination">
            <button className="btn btn-sm"
              disabled={page === '' || parseInt(page) <= 1}
              onClick={handlePrevPage}
            >
              <FaLongArrowAltLeft/> Prev
            </button>
            <button className="btn btn-sm"
              disabled={allDocsOfPage > allDocs}
              onClick={handleNextPage}
            >
              Next <FaLongArrowAltRight/>
            </button>
          </div>
        ): ''}
        
      </div>
    </BaseLayout>
  )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StudentList))
