import BaseLayout from 'components/BaseLayout'
import React from 'react'
import { connect } from 'react-redux'

export const SalesGuy = () => {
  return (
    <BaseLayout>
      <div className="SalesGuy">
        
      </div>
    </BaseLayout>
  )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(SalesGuy)
