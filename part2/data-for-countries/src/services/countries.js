import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  const request = axios.get(baseUrl + 'api/all')
  console.log('request', request)
  return request.then(response => response.data)
}

const getByName = (name) => {
  const request = axios.get(`${baseUrl}api/name/${name}`)
  console.log('request by name', request)
  return request.then(response => response.data)
}

export default { getAll, getByName }