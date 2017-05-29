import fetch from 'isomorphic-fetch'
import LoginUtils from './LoginUtils'
import _ from 'lodash'

let iFetch = (req, opts) => {
  const username = LoginUtils.getUsername()
  if (_.isEmpty(opts)) {
    opts = {
      headers: {
        name: username
      }
    }
  } else {
    const headers = opts.headers
    if (_.isEmpty(headers)) {
      opts.headers = {
        name: username
      }
    } else {
      opts.headers.name = username
    }
  }
  return fetch(req, opts)
}

export let ajax = opts => {
  let xhr = new window.XMLHttpRequest()
  if (Object.prototype.toString.call(opts) === '[object String]') {
    opts = {
      method: 'GET',
      opts
    }
  }
  let { async, url, method, contentType, data, dataType } = opts
  if (opts.async != undefined) {
    async = opts.async
  }
  xhr.open(method, url, async)
  if (method.toUpperCase() === 'POST') {
    xhr.setRequestHeader('Content-Type', contentType)
  }
  xhr.send(data)
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let arg = null
        if (dataType === 'json') {
          arg = JSON.parse(xhr.responseText)
        } else if (
          dataType === 'text' || dataType === 'html' || dataType === 'script'
        ) {
          arg = xhr.responseText
        } else if (dataType === 'xml') {
          arg = xhr.responseXML
        }
        resolve(arg)
      } else {
        reject(xhr)
      }
    }
  })
}
export default iFetch
