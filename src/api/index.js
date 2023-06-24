import axios from 'axios'

const mainUrl = axios.create({
   baseURL: 'http://localhost:8000'
})



export default mainUrl