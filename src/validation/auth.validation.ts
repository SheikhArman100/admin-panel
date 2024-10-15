import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z.string().min(1, 'User first name is required'),
  lastName: z.string().min(1, 'User last name is required'),
  email: z.string().min(1, 'Email is required').email({
    message: 'Not a valid email'
  }),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  image: z
    .unknown()
    .transform(value => {
      return value as FileList
    })
    .refine(file => file?.length == 1, 'File is required.'),
})


export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email({
    message: 'Not a valid email'
  }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, {
      message: 'Password should be 6 chars minimum'
    })
})

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: 'Old Password is required'
      })
      .min(6, {
        message: 'Password should be 6 chars minimum'
      }),
    newPassword: z
      .string({
        required_error: 'New Password is required'
      })
      .min(6, {
        message: 'Password should be 6 chars minimum'
      }),
      confirmNewPassword: z
      .string({
        required_error: 'Confirm New Password is required'
      })
      .min(6, {
        message: 'Password should be 6 chars minimum'
      })
  }).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Confirm Password doesn't not match with new password",
    path: ["confirmNewPassword"],
  })
  .refine(data => data.oldPassword !== data.newPassword, {
    message: 'New and old password can not be same',
    path: ['newPassword']
  })

export const forgetPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email({
    message: 'Not a valid email'
  })
})

export const resetPasswordSchema = z.object({
  newPassword: z
    .string({
      required_error: 'New Password is required'
    })
    .min(6, {
      message: 'Password should be 6 chars minimum'
    })
})
