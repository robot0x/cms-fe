import fetch from 'isomorphic-fetch'
import LoginUtils from './LoginUtils'
import _ from 'lodash'

let iFetch = (req, opts) => {
  const username = LoginUtils.getUsername()
  console.log(username)
  if(_.isEmpty(opts)){
    opts = {
      headers: {
        'name': username
      }
    }
  }else{
    const headers = opts.headers
    if(_.isEmpty(headers)){
      opts.headers = {
        name: username
      }
    } else {
      opts.headers.name = username
    }
  }
  return fetch(req, opts)
}

export default iFetch
