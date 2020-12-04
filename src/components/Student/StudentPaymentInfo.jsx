import React from 'react'
import { connect } from 'react-redux'

export const StudentPaymentInfo = ({payment}) => {
  return (
    <>
      <div className="right__info_complete mb-4">
        <div className="down">
          <div className="row">
            <div className="col-md-3">
              <span className="bold__label">Amount</span>
                <p>{payment.amount} {payment.currency}</p>
            </div>
            <div className="col-md-3">
              <span className="bold__label">Deposit</span>
              <p>{payment.deposit} {payment.currency}</p>
            </div>
            <div className="col-md-3">
              <span className="bold__label">Quantity</span>
              <p>{payment.quantity}</p>
            </div>
            <div className="col-md-3">
              <span className="bold__label">Currency</span>
              <p>{payment.currency}</p>
            </div>
            <div className="col-md-3"> 
              <span className="bold__label">{payment.paymentType} Amount</span>
              <p>{payment.paymentTypeAmount} {payment.currency}</p>
            </div>
            <div className="col-md-3"> 
              <span className="bold__label">Original Plan</span>
              <p>
                <span>{payment.paymentTypeAmount} {payment.currency} &times; {payment.quantity} </span>
                <span>
                  {payment.paymentType === 'Fortnightly' ? 'Fortnights' : ''}
                  {payment.paymentType === 'Weekly' ? 'Weeks' : ''}
                  {payment.paymentType === 'Monthly' ? 'Months' : ''}
                </span>
              </p>
            </div>
            <div className="col-md-3"> 
              <span className="bold__label">Status</span>
              <p>{payment.paymentStatus}</p>
            </div>
            <div className="col-md-3"> 
              <span className="bold__label">Signed Contract</span>
              <p>{payment.contractSigned}</p>
            </div>
            <div className="col-md-3"> 
              <span className="bold__label">Sales Guy</span>
              <p>{payment.salesGuy}</p>
            </div>
            <div className="col-md-3"> 
              <span className="bold__label">Payment Method</span>
              <p>{payment.paymentMethod}</p>
            </div>
            <div className="col-md-3"> 
              <span className="bold__label">Payment Tag</span>
              <p>{payment.paymentTag}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(StudentPaymentInfo)
