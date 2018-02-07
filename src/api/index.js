import axios from 'axios'

const { REACT_APP_API_URL: API_URL } = process.env

export const save = async (request, provider) => {
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