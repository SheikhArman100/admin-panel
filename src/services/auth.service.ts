import { axiosPublic } from "@/libs/axios"

export const signinUser = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const response = await axiosPublic.post('/user/signin', data, {
      withCredentials: true
    })
  
    return response.data
  }

  export const signoutUser = async () => {
    const response = await axiosPublic.post('/user/signout', {
      withCredentials: true
    })
  
    return response.data
}


export const forgetPassword = async (data: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const response = await axiosPublic.post('/user/forget-password', data, {
    withCredentials: true
  })

  return response.data
}

export const resetPassword = async (data: any, token: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const response = await axiosPublic.put(
    `/user/reset-password?token=${token}`,
    data,
    {
      withCredentials: true
    }
  )

  return response.data
}