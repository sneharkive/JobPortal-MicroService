import axiosInstance from '../Interceptor/AxiosInterceptor';
// import { removeUser } from '../Slices/UserSlice';


const loginUser = async (login:any) => {
  return axiosInstance.post(`/auth/login`, login)
  .then (res => res.data)
  .catch(error => {throw error});
}

// const navigateToLogin = (navigate:any) =>{
//   localStorage.removeItem('token');
//   removeUser();
//   navigate("/login")
// }


const sendOtp = async (email:any) => {
  return axiosInstance.post(`/auth/sendOtp/${email}`)
  .then (res => res.data)
  .catch(error => {throw error});
}


const verifyOtp = async (email:any, otp:any) => {
  return axiosInstance.get(`/auth/verifyOtp/${email}/${otp}`)
  .then (res => res.data)
  .catch(error => {throw error});
}


export {loginUser, sendOtp, verifyOtp};