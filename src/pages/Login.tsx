import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { login } from "../lib/pocketbase";
import { useState } from "react";



const schema = zod.object({
    email: zod.string().email('Invalid email address').min(1, 'Email is required'),
    password: zod.string().min(8, 'Password must be atleast 8 characters long').nonempty('Password is required'),
});

type AuthForm = zod.infer<typeof schema>;

const resolver = zodResolver(schema);



export default function Login() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>({
        resolver,
        });    
        const onSubmit: SubmitHandler<AuthForm> = (data) => {
            login(data.email, data.password).then((recordId)=>{
                navigate(`/dashboard/${recordId}`);
            }).catch((error)=>{
                console.error(error);            
                setLoginError("Incorrect username or password");

                
            });

        }

    return(
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-center font-bold text-lg">Login</h1>
                <form className="flex flex-col p-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email" className="input input-bordered" {...register('email')}/>
                    {errors.email && <p className='text-sm text-red-500'>{errors.email.message as string}</p>}

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" className="input input-bordered" {...register('password')}/>
                    {errors.password && <p className='text-sm text-red-500 '>{errors.password.message as string}</p>}
                    {loginError && <p className='text-sm text-red-500'>{loginError}</p>}

                    <button className="btn btn-neutral my-4">Login</button>
                    <p>Don't have an account? <Link to='/signup' className="link">Create account</Link></p>
                </form>
            </div>

        </div>
    )
}
