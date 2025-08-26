import axiosInstance from '../Interceptor/AxiosInterceptor';

const getEmpProfile = async (id:any) => {
  return axiosInstance.get(`/profiles/getEmp/${id}`)
  .then (res => res.data)
  .catch(error => {throw error});
}

const updateEmpProfile = async (profile:any) => {
  return axiosInstance.put(`/profiles/updateEmp`, profile)
  .then (res => res.data)
  .catch(error => {throw error});
}


const getAllEmpProfile = async () => {
  return axiosInstance.get(`/profiles/getAllEmp`)
  .then (res => res.data)
  .catch(error => {throw error});
}

export { getEmpProfile, getAllEmpProfile, updateEmpProfile };