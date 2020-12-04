import axios from 'axios'

function logout(cb) {
  axios.get('/api/user/logout')
    .then(res => {
      cb(res.data.loggedIn)
    })
    .catch(err => {
      cb(false)
    })
}

export default logout