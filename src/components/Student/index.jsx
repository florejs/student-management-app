import PrivateRoute from 'components/PrivateRoute'
import React from 'react'
import {Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import './create.css'
import { CreateStudent } from './CreateStudent'
import StudentDefaultPage from './StudentDefaultPage'
import StudentInfo from './StudentInfo'
import StudentList from './StudentLists'
import StudentEdit from './StudentEdit'

export const Student = () => {
  const {path} = useRouteMatch()

  return (
    <Switch>
      <PrivateRoute exact path={`${path}`} comp={StudentDefaultPage}/>
      <PrivateRoute exact path={`${path}/s`} comp={StudentList}/>
      <PrivateRoute exact path={`${path}/create`} comp={CreateStudent} />
      <PrivateRoute exact path={`${path}/:studentID`} comp={StudentInfo} />
      <PrivateRoute exact path={`${path}/:studentID/edit`} comp={StudentEdit} />
    </Switch>
  )
}

export default connect()(Student)
