import { ZodType, z } from 'zod';

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
    password: z.string().min(8).max(30),
    confirmPassword: z.string().min(8).max(30)
  })
    .refine(data => data.firstName !== data.lastName, {
      message: 'First name and last name cannot be the same',
      path: ['firstName', 'lastName']
    })
    .refine(data => data.age >= 13, {
      message: 'You must be 13 or older',
      path: ['age']
    })
    .refine(data => data.email !== data.password, {
      message: 'Email and password cannot be the same',
      path: ['email', 'password']
    })
    .refine(data => data.email !== data.confirmPassword, {
      message: 'Email and password cannot be the same',
      path: ['email', 'confirmPassword']
    })
    .refine(data => data.password !== data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['password', 'confirmPassword']
    })
    .refine(data => data.password !== data.firstName, {
      message: 'Password and first name cannot be the same',
      path: ['password', 'firstName']
    })
    .refine(data => data.password !== data.lastName, {
      message: 'Password and last name cannot be the same',
      path: ['password', 'lastName']
    });
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <label>First name</label>
        <input type="text"/>
        
        <label>Last name</label>
        <input type="text"/>
        
        <label>Email</label>
        <input type="email"/>
        
        <label>Age</label>
        <input type="number"/>
        
        <label>Password</label>
        <input type="text"/>
        
        <label>Confirm password</label>
        <input type="text"/>

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}
