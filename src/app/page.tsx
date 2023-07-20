'use client'

import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
}

export default function Home() {
  const formSchema: ZodType<FormData> = z.object({
    firstName: z.string().nonempty().min(2).max(30),
    lastName: z.string().nonempty().min(2).max(30),
    email: z.string().email(),
    age: z.number().positive().int(),
    password: z.string(),
    confirmPassword: z.string()
  })
    .refine(data => data.age >= 13, {
      message: 'You must be 13 or older',
      path: ['age']
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    })
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  function submitFormData (data: FormData) {
    console.log(data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit(submitFormData)}>
        <label>First name</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <br />

        <label>Last name</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
        <br />
        
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        
        <label>Age</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
        <br />
        
        <label>Password</label>
        <input type="text" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        
        <label>Confirm password</label>
        <input type="text" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <br />

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}
