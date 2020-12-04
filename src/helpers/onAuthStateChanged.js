import axios from 'axios'

function onAuthStateChanged(cb) {
  axios.get('/api/user/onAuthStateChanged')
    .then(res => {
      cb(res.data.loggedIn)
    })
    .catch(() => {
     cb(false)
    })
}

export default onAuthStateChanged