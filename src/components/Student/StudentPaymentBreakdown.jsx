import Axios from 'axios'
import { inputTypeDateValue } from 'helpers'
import React, {useState, useCallback} from 'react'
import { connect } from 'react-redux'

const style = {
    background: '#fff',
    padding: '30px',
}

const labelStyle = {
  fontWeight: '300',
  color: '#888888',
  fontSize: '15px'
}

const StudentPaymentBreakdown = ({breakdown, qty, recurrence, currency, studentId}) => {
  const [breakdownValue, setBreakdownValue] = useState(recurrence)
  const [breakdownDate, setBreakdownDate] = useState('')
  const [newBreakdown, setNewBreakdown] = useState(breakdown)

  let suffix = 'th'
  if (newBreakdown.length === 0) suffix = 'st'
  if (newBreakdown.length === 1) suffix = 'nd'
  if (newBreakdown.length === 2) suffix = 'rd'

  const handleAdd = useCallback((e) => {
    e.preventDefault()
    const payload = {
      name: `${newBreakdown.length + 1}${suffix} Payment`,
      value: `${breakdownValue}`,
      date: breakdownDate
    }

    Axios.post(`/api/student/add-payment-breakdown/${studentId}`, {payload})
      .then(res => {
        setNewBreakdown(res.data)
      })
      .catch(err => console.log(err))

  }, [breakdownValue, breakdownDate, suffix, newBreakdown.length, studentId])

  return (
    <div className="StudentPaymentBreakdown mb-4" style={style}>
      <p style={{fontWeight: 'bold', color: '#000'}}>Payment Breakdown</p>
      {newBreakdown.length !== qty ? (
        <form onSubmit={handleAdd}>
          <table className="mb-5" >
            <tbody>
              <tr>
                <td><span className="label" style={labelStyle}>{`${newBreakdown.length + 1}${suffix}`} payment: </span></td>
                <td><span className="label" style={labelStyle}>Date paid: </span></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <input type="text" className="form-control form-control-sm" 
                    required
                    value={breakdownValue} 
                    onChange={e => setBreakdownValue(e.target.value)} 
                  />
                </td>
                <td>
                  <input type="date" className="form-control form-control-sm" 
                    required
                    value={breakdownDate}
                    onChange={e => setBreakdownDate(e.target.value)}
                  />
                </td>
                <td>
                  <button className="btn btn-sm btn-secondary" type="submit">
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      ) : ''}

      {newBreakdown && newBreakdown.map((item, i) => (
        <p className="breakdown-list" key={i}>
          {item.name}: 
          <span className="ml-3">{item.value} {currency}</span>
          <span className="ml-5">{inputTypeDateValue(item.date)}</span>
        </p>
      ))}

    </div>
  )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(StudentPaymentBreakdown))
