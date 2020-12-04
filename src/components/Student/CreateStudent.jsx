import BaseLayout from 'components/BaseLayout'
import React, {useState, useCallback, useEffect} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import BackButton from 'statelessComponent/BackButton'
import { currencies, paymentRecurrenceType, studentStatus } from 'helpers'
import Axios from 'axios'

export const CreateStudent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [country, setCountry] = useState('')
  const [suburb, setSuburb] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [amount, setAmount] = useState('')
  const [deposit, setDeposit] = useState('')
  const [quantity, setQuantity] = useState('')
  const [paymentType, setPaymentType] = useState('Weekly')
  const [paymentTag, setPaymentTag] = useState('')
  const [contractSigned, setContractSigned] = useState('')
  const [currency, setCurrency] = useState('')
  const [salesGuy, setSalesGuy] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')  
  const [paymentTypeAmount, setPaymentTypeAmount] = useState('')  
  const [tagsDropdown, setTagsDropdown] = useState([])
  const [joinedDate, setJoinedDate] = useState('')
  const [phone, setPhone] = useState('')
  const history = useHistory()
  const [formBtnText, setformBtnText] = useState('Submit')
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false)
  const [alertMsg, setAlertMsg] = useState(false)
 
  useEffect(() => {
    Axios.get('/api/tag')
      .then(res => {
        setTagsDropdown(res.data.tags)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setformBtnText('Loading...')
    setDisableSubmitBtn(true)
    setAlertMsg(false)
    const studentInfo = {
                          firstName, 
                          lastName, 
                          email, 
                          birthdate, 
                          country, 
                          suburb, 
                          zipcode,
                          phone,
                        }
    const paymentInfo = {
                          amount, 
                          deposit, 
                          quantity, 
                          paymentType, 
                          paymentTag, 
                          contractSigned, 
                          currency, 
                          salesGuy, 
                          paymentMethod, 
                          paymentStatus, 
                          paymentTypeAmount,
                          joinedDate,
                        }
    if (
      firstName !== '' ||
      lastName !== '' ||
      email !== '' ||
      zipcode !== '' ||
      amount !== '' ||
      deposit !== '' ||
      paymentType !== '' ||
      contractSigned !== '' ||
      currency !== '' ||
      paymentMethod !== '' ||
      paymentStatus !== '' ||
      paymentTypeAmount !== ''
      ) {
        axios.post('/api/student/create', {studentInfo, paymentInfo,})
          .then(res => {
            setformBtnText('Redirecting...')
            setDisableSubmitBtn(true)
            setAlertMsg(true)
            setTimeout(() => history.push(`/student/${res.data._id}`), 3000)
          })
          .catch(err => {
            setAlertMsg(false)
            setDisableSubmitBtn(false)
            console.log(err)
          })
      }                   
    
    return () => {}
  }, [
        history,
        paymentTypeAmount,
        paymentStatus, 
        firstName, 
        lastName, 
        email, 
        birthdate, 
        country, 
        suburb, 
        zipcode,
        amount, 
        deposit, 
        quantity, 
        paymentType, 
        paymentTag, 
        contractSigned, 
        currency, 
        salesGuy, 
        paymentMethod,
        joinedDate,
        phone
      ])

  return (
    <BaseLayout>
      <BackButton to="/student/s" text="Back" />
      <h2 style={{marginTop: '20px', marginBottom: '20px'}}>Add Student</h2>
      <div className="StudentCreatePage">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="StudentInfo">
                <h4 style={{marginBottom: '25px'}}>Student Info</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input className="form-control" type="text"
                        required
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input className="form-control" type="text"
                        required
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>  
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                      <input className="form-control" type="email"
                        required
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Phone</label>
                      <input className="form-control" type="tel"
                        required
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                      />
                    </div>
                  </div>
                </div> 
                <div className="form-group">
                  <label>Birthdate (optional)</label>
                  <input className="form-control" type="date"
                    value={birthdate} 
                    onChange={e => setBirthdate(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Country (optional)</label>
                  <input className="form-control" type="text" 
                    value={country} 
                    onChange={e => setCountry(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Suburb (optional)</label>
                  <input className="form-control" type="text"
                    value={suburb} 
                    onChange={e => setSuburb(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Zipcode (optional)</label>
                  <input className="form-control" type="text"
                    value={zipcode} 
                    onChange={e => setZipcode(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="PaymentInfo">
                <h4 style={{marginBottom: '25px'}}>Payment Info</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Amount</label>
                      <input type="text" className="form-control" 
                        required
                        value={amount} 
                        onChange={e => setAmount(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Deposit</label>
                      <input type="text" className="form-control"                 
                        value={deposit} 
                        onChange={e => setDeposit(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Quantity</label>
                      <input type="text" className="form-control"
                        required
                        value={quantity} 
                        onChange={e => setQuantity(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Currency</label>
                      <select className="form-control" 
                        required
                        value={currency}
                        onChange={e => setCurrency(e.target.value)} 
                      >
                        <option value=""></option>
                        {currencies && currencies.map(curr => (
                          <option key={curr} value={curr}>{curr}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Payment Type</label>
                      <select className="form-control"
                        required
                        value={paymentType}
                        onChange={e => setPaymentType(e.target.value)}
                      >
                        <option value=""></option>
                        {paymentRecurrenceType && paymentRecurrenceType.map(rt => (
                          <option key={rt} value={rt}>{rt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {paymentType !== '' ? (
                      <div className="form-group">
                        <label>{paymentType} Amount</label>
                        <input type="text" className="form-control" 
                          required
                          value={paymentTypeAmount} 
                          onChange={e => setPaymentTypeAmount(e.target.value)} 
                        />
                      </div>
                    ) : ''}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Payment Tag</label>
                      <select className="form-control"
                        value={paymentTag}
                        onChange={e => setPaymentTag(e.target.value)}
                      >
                        <option value=""></option>
                        {tagsDropdown && tagsDropdown.map((tag, i) => (
                          <option key={i} value={tag.name}>{tag.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Signed Contract</label>
                      <input type="text" className="form-control"
                        required
                        value={contractSigned} 
                        onChange={e => setContractSigned(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Sales Guy</label>
                      <input type="text" className="form-control"
                        value={salesGuy} 
                        onChange={e => setSalesGuy(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Payment Method</label>
                      <input type="text" className="form-control"
                        value={paymentMethod} 
                        onChange={e => setPaymentMethod(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Payment Status</label>
                      <select className="form-control"
                        required
                        value={paymentStatus} 
                        onChange={e => setPaymentStatus(e.target.value)} 
                      >
                        <option value=""></option>
                        {studentStatus && studentStatus.map((sts, i) => (
                          <option value={sts.name} key={i}>{sts.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Joined Date</label>
                      <input type="date" className="form-control"
                        value={joinedDate}
                        onChange={e => setJoinedDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-primary" disabled={disableSubmitBtn}>{formBtnText}</button>
          </div>
          {alertMsg && (
            <div className="alert alert-success mt-3 mb-0">
              Student added successfully.
            </div>
          )}
        </form>
      </div>
    </BaseLayout>
  )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CreateStudent))
