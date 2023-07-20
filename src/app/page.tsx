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
      path: ['password', 'confirmPassword']
    })
  
  const { register, handleSubmit } = useForm<FormData>({
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
        
        <label>Last name</label>
        <input type="text" {...register("lastName")} />
        
        <label>Email</label>
        <input type="email" {...register("email")} />
        
        <label>Age</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        
        <label>Password</label>
        <input type="text" {...register("password")} />
        
        <label>Confirm password</label>
        <input type="text" {...register("confirmPassword")} />

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}
