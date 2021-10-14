import axios from 'axios'

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}

const request = (method, options, success, fail) => {
  if(!options.url) {
    throw new Error('Missing mandatory field \'options.url\'')
  }

  if(!options.isUnauthenticatedRequest) {
    const username = localStorage.getItem('username')
    const bearerToken = localStorage.getItem('bearer-token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${bearerToken}`
    axios.defaults.headers.common['Auth-token'] = username
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  }

  return axios({
    method,
    url: '/api2/' + options.url,
    data: options.payload,
  }).then(response => {
    if(success) {
      success(response.data)
    }
    else {
      return response.data
    }
  }).catch(error => {
    if(error.response && error.response.status === 401) {
      console.warn('Request 401', options.url)
      //localStorage.clear()
      window.location = '/'
    }
  })
}

const requestAsync = (method, options, success, fail) => new Promise(resolve => request(method, options, resolve))

export const server = {
  getUnits: async () => {
    const results = await requestAsync(METHODS.GET, {
      url: `/wishes`,
    })

    console.log(results)
  }
}
