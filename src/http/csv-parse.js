import axios from 'axios'

export async function csvGetRequisition() {
  try {
    const response = axios.get('http://localhost:3333/tasks')
    return response
  } catch (err) {
    console.error('Não foi possível realizar a requisição', err)
    throw new Error(err)
  }
}

export async function csvPostRequisition(data) {
  try {
    const response = await axios.post('http://localhost:3333/tasks', data)

    return response
  } catch (err) {
    console.error('Não foi possível realizar a requisição', err)
    throw new Error(err)
  }
}
