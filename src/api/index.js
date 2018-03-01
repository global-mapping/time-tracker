import axios from 'axios'

const { REACT_APP_API_URL: API_URL } = process.env

export const save = async request => {
  try {
    const token = localStorage.getItem('access_token')
    const { data } = await axios({
      url: `${API_URL}/save`,
      method: 'post',
      data: request,
      headers: { token },
    })
    return data
  } catch (e) {
    console.log(e)
    return e
  }
}

export const list = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const { data } = await axios({
      url: `${API_URL}/list`,
      method: 'get',
      headers: { token },
    })
    return data
  } catch (e) {
    console.log(e)
    return e
  }
}

export const reportByWeek = async startDate => {
  try {
    const token = localStorage.getItem('access_token')
    const { data } = await axios({
      url: `${API_URL}/reportByWeek/${startDate}`,
      method: 'get',
      headers: { token },
    })
    return data
  } catch (e) {
    console.log(e)
    return e
  }
}

export const updateCreateUser = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const { data } = await axios({
      url: `${API_URL}/updateCreateUser`,
      method: 'post',
      headers: { token },
    })
    return data
  } catch (e) {
    console.log(e)
    return e
  }
}
