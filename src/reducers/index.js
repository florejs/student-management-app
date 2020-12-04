import {combineReducers} from 'redux'
import {currentUser, auth} from './currentUser'
import {notesReducer} from './notes'
import {statusState} from './status'
import {studentReducer} from './student'
import {tagReducer} from './tag'


export default combineReducers({
  currentUser,
  auth,
  notesReducer,
  statusState,
  studentReducer,
  tagReducer
})