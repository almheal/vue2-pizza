const tokenKey = 'my_app_token'

function setTokenRequest(req){
  const isAuthLogin = req.url === '/auth'
  const method = req.method
  if(isAuthLogin || method === 'put' && req.url === '/user'){
    req.headers['Authorization'] = `Bearer ${localStorage.getItem(tokenKey)}`
  }
  return req
}

function setTokenOnLogin(res){
  const isLoginUrl = res.config.url.includes('login')
  if(isLoginUrl){
    const token = res.data.token
    localStorage.setItem(tokenKey, token)
  }

  return res
}

export default function (axios){
  axios.interceptors.request.use(setTokenRequest)
  axios.interceptors.response.use(setTokenOnLogin)
}