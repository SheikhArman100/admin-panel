'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import { useAuthStore } from '@/state/auth.state'
import { signoutUser } from '@/services/auth.service'

const SignOutButton = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const setAccessToken = useAuthStore((state: any) => state.setAccessToken)

  const signoutMutation = useMutation({
    mutationFn: signoutUser,
    onSuccess: async () => {
      setAccessToken(null)
      
    }
  })
  const handleClick = () => {
    signoutMutation.mutate(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      {},
      {
        onError: (data: any) => {
          toast.error(data.response.data.message)
        },
        onSuccess: data => {
          router.push('/auth/signin')
          
          queryClient.removeQueries();
          setTimeout(() => {
            
            toast.success(data.message)
          }, 500)
        }
      }
    )
  }

  return (
    <button
      className='btn btn-light w-full justify-center'
      onClick={handleClick}
    >
      {signoutMutation.isPending ? (
        <Spinner className='border-black border-t-transparent' />
      ) : (
        <p>Sign out</p>
      )}
    </button>
  )
}

export default SignOutButton
