'use client'
import { setProgress } from '@/redux/features/loadingBarSlice';
import { resetPassword } from '@/services/dataAPI';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const page = ({params}) => {
    const Router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        password: '',
        confirmPassword: ''
    });
    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Password and Confirm Password are not same');
            return;
        }
        const { password, confirmPassword } = formData;
        try{
            dispatch(setProgress(70));
        const res = await resetPassword(password, confirmPassword, params.token);
        if (res.success === true) {
            toast.success('Password reset successfully');
            Router.push('/login');
        }
        else {
            toast.error('Invalid Token');
        }
        } catch (error) {
            toast.error(error?.message || 'Something went wrong');
        } finally {
            dispatch(setProgress(100));
        }

    };
    

  return (
    <div className=' w-11/12 mx-auto mt-32 min-h-screen'>
    <div className=" flex justify-center items-center">
        <div className="container flex justify-center flex-col items-center w-[90vw] lg:w-1/2">
            <h1 className=" text-4xl text-cyan-400 font-medium mb-8">Reset Password</h1>
            <form onSubmit={handelSubmit} className="text-white flex flex-col items-end text-base lg:text-xl gap-5 font-medium">
                <div className=" flex gap-4 items-end">
                    <label className="" htmlFor='password'>New Password</label>
                    <input onChange={onchange} value={formData.password} name='password' type="password" placeholder="Password" required className=' appearance-none bg-black border-b border-white focus:outline-none text-base lg:text-lg' />
                </div>
                <div className=" flex gap-4 items-end">
                <label className="" htmlFor='confirmPassword'>Confirm Password</label>
                <input onChange={onchange} value={formData.confirmPassword} name='confirmPassword' type="password" placeholder="Confirm Password" required className=' appearance-none bg-black border-b border-white focus:outline-none text-base lg:text-lg' />
            </div>
                <div className=" w-full flex justify-center">
                    <button type='submit' className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-cyan-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-black border-2 border-white group-hover:bg-"></span>
                        <span className="relative text-white group-hover:text-cyan-400">Save</span>
                    </button>
                </div>
               
            </form>
        </div>
    </div>

</div>
  )
}

export default page