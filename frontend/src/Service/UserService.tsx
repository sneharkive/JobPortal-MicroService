import axiosInstance from '../Interceptor/AxiosInterceptor';

const registerUser = async (user:any) => {
  return axiosInstance.post(`/users/register`, user)
  .then (res => res.data)
  .catch(error => {throw error});
}


const loginUser = async (login:any) => {
  return axiosInstance.post(`/users/login`, login)
  .then (res => res.data)
  .catch(error => {throw error});
}





const changePass = async (email:string, password:string) => {
  return axiosInstance.post(`/users/changePass`, {email, password})
  .then(res => res.data)
  .catch(error => {throw error})
}


// By Me
const getUserById = async (id:any) => {
  return axiosInstance.get(`/users/getUser${id}`)
  .then(res => res.data)
  .catch(error => {throw error})
}

export {registerUser, loginUser, changePass,getUserById};