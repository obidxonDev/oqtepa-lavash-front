import axios from 'axios'

const mainUrl = axios.create({
   baseURL: 'http://localhost:8000'
})

mainUrl.interceptors.request.use(req => {
   if(localStorage.getItem("auth-token")){
      req.headers.token = localStorage.getItem("auth-token")
   }
   return req;
})

export default mainUrl