'use client'

import { axiosPublic } from '@/libs/axios'
import { useAuthStore } from '@/state/auth.state'

const useUpdatedToken = () => {
  const setAccessToken = useAuthStore((state: any) => state.setAccessToken)

  const update = async () => {
    const response = await axiosPublic.get('/auth/token', {
      withCredentials: true
    })

    setAccessToken(response.data.data.accessToken)
    return response.data.data.accessToken
  }
  return update
}

export default useUpdatedToken
