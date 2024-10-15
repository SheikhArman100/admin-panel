




export type IRegisterFormData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
//   role: Role
  image: string
}
export type ISignInFormData = {
  email: string
  password: string
}

export type IChangePasswordFormData = {
  oldPassword: string
  newPassword: string,
  confirmNewPassword:string
}

export type IForgetPasswordFormData = {
  email: string
}
export type IResetPasswordFormData = {
  newPassword: string
}
// export type IFormFieldProps = {
//   type: string;
//   placeholder: string;
//   name:
//     | 'firstName'
//     | 'lastName'
//     | 'email'
//     | 'phoneNumber'
//     | 'password'
//     | 'role'
//     | 'image';
//   register: UseFormRegister<IRegisterFormData>;
//   error: FieldError | undefined;
//   valueAsNumber?: boolean;
// };
