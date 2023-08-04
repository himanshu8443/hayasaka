'use client'
import { setProgress } from '@/redux/features/loadingBarSlice';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    });
    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const dispatch = useDispatch();

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setProgress(70));
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    email: formData.email,
                    password: formData.password,
                    imageUrl: `https://api.dicebear.com/6.x/thumbs/svg?seed=${formData.userName}&mouthColor=ffffff,transparent&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,transparent`
                })
            });
            const data = await res.json();
            if (data.success === true) {
                toast.success('Account created successfully');
                router.push('/login');

            } else {
                toast.error(data?.message);
            }
            console.log(data);
            
        } catch (error) {
            toast.error(error?.message);
        }finally{
            dispatch(setProgress(100));
        }

    };
    return (
        <div className=' w-11/12 mx-auto min-h-screen my-32'>
            <div className=" flex justify-center items-center">
                <div className="container flex justify-center flex-col items-center w-1/2">
                    <h1 className=" text-4xl text-cyan-400 font-medium mb-8">Sign up</h1>
                    <form onSubmit={handelSubmit} className="text-white flex flex-col text-xl gap-5 font-medium">
                        <div className=" flex gap-4 items-end">
                            <label className="" htmlFor='userName'>Username</label>
                            <input onChange={onchange} value={formData.userName} type="text" placeholder="Name" required id='userName' name='userName' className=' appearance-none bg-black border-b border-white focus:outline-none' />
                        </div>
                        <div className=" flex gap-4 items-end">
                            <label  className=" mr-11" htmlFor='email'>Email</label>
                            <input onChange={onchange} value={formData.email} name='email' type="email" placeholder="Email" required className=' appearance-none bg-black border-b border-white focus:outline-none' />
                        </div>
                        <div className=" flex gap-4 items-end">
                            <label className="" htmlFor='password'>Password</label>
                            <input onChange={onchange} value={formData.password} name='password' type="password" placeholder="Password" required className=' appearance-none bg-black border-b border-white focus:outline-none' />
                        </div>
                        <div className=" w-full flex justify-center">
                            <button type='submit' className="relative inline-block px-4 py-2 font-medium group">
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-cyan-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span className="absolute inset-0 w-full h-full bg-black border-2 border-white group-hover:bg-"></span>
                                <span className="relative text-white group-hover:text-cyan-400">Sign Up</span>
                            </button>
                        </div>
                        <p className=" w-full flex justify-center gap-2">
                            Already have an account? <Link href={'/login'} className=' text-cyan-400 font-semibold'> Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page