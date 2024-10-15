'use client';
import Spinner from '@/components/Spinner';
import TextInput from '@/components/TextInput';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { registerSchema } from '@/validation/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const CreateAdmin = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const router = useRouter();

  type IRegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    image: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  //registration mutation
  const registerMutation: UseMutationResult<IRegisterFormData> = useMutation({
    mutationFn: async (data) => {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axiosPrivate.post('/user/create-admin', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      return response.data;
    },
    onSuccess: async () => {
      return queryClient.invalidateQueries({
        queryKey: ['admins'],
        refetchType: 'all',
      });
    },
  });

  const handleRegister = async (data: IRegisterFormData) => {
    const jsonPayload = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    const formData = new FormData();
    formData.append('data', jsonPayload);
    formData.append('file', data.image[0]);

    registerMutation.mutate(formData, {
      onError: (data: any) => {
        toast.error(data.response.data.message);
      },
      onSuccess: (data: any) => {
        router.push('/');
        setTimeout(() => {
          toast.success(data.message);
          reset();
        }, 100);
      },
    });
  };

  return (
    <div className='flex w-full justify-center'>
      <div className='w-full max-w-[1200px]'>
        <form
          autoComplete='off'
          className='card-body flex flex-col gap-9'
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className='mb-2.5 text-center'>
            <h3 className='mb-2.5 text-xl font-semibold leading-none text-gray-900'>
              Create Admin
            </h3>
          </div>
          <div className='grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:gap-x-10 lg:gap-y-8'>
            {/* ----------------------------------------------first name----------------------------- */}
            <TextInput
              label='First name'
              placeholder='Enter first name'
              name='firstName'
              register={register}
              errors={errors.firstName?.message}
            />
            <TextInput
              label='Last name'
              placeholder='Enter last name'
              name='lastName'
              register={register}
              errors={errors.lastName?.message}
            />
            <TextInput
              label='Email'
              placeholder='email@email.com'
              name='email'
              register={register}
              errors={errors.email?.message}
              type='email'
            />
            <TextInput
              label='Phone number'
              placeholder='Phone number'
              name='phoneNumber'
              register={register}
              errors={errors.phoneNumber?.message}
            />
            <div className='col-span-1 flex flex-col gap-1'>
              <label className='form-label text-gray-900'>Image</label>
              <input
                className='file-input'
                type='file'
                accept='image/*'
                {...register('image')}
              />
              {errors.image?.message && (
                <p className='form-hint text-red-700'>
                  *{errors.image?.message}
                </p>
              )}
            </div>
          </div>
          <div className='flex w-full items-center justify-center gap-3'>
            <button
              type='button'
              className='btn btn-light flex max-w-[300px] grow justify-center'
              onClick={() => {
                reset();
              }}
            >
              Reset
            </button>
            <button
              type='submit'
              className='btn btn-primary flex max-w-[300px] grow justify-center'
            >
              {registerMutation.isPending ? <Spinner /> : <p>Create</p>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
