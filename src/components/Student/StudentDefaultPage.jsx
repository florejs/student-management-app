import React from 'react'
import { connect } from 'react-redux'
import BaseLayout from 'components/BaseLayout'

export const Home = () => {
  return (
    <BaseLayout>
      Student Home
    </BaseLayout>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
