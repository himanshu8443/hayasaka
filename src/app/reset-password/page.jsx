'use client'
import { setProgress } from '@/redux/features/loadingBarSlice';
import { sendResetPasswordLink } from '@/services/dataAPI';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';


const page = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        email: '',
    });
    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handelSubmit = async (e) => {
        e.preventDefault();
        try{
            dispatch(setProgress(70));
        const res = await sendResetPasswordLink(formData.email);
        if (res.success === true) {
            toast.success('Password reset link sent to your email');
        }
        else {
            toast.error(res.message);
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
            <h1 className=" text-4xl text-cyan-400 font-medium mb-8">Forgot Password</h1>
            <p className=" text-white text-sm font-medium mb-8 text-center">Enter your email address and we will send you a link to reset your password.</p>
            <form onSubmit={handelSubmit} className="text-white flex flex-col text-base lg:text-xl gap-5 font-medium">
                <div className=" flex gap-4 items-end">
                    <label className=" mr-9 lg:mr-11" htmlFor='email'>Email</label>
                    <input onChange={onchange} value={formData.email} name='email' type="email" placeholder="Email" required className=' appearance-none bg-black border-b border-white focus:outline-none text-base lg:text-lg' />
                </div>
                <div className=" w-full flex justify-center">
                    <button type='submit' className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-cyan-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-black border-2 border-white group-hover:bg-"></span>
                        <span className="relative text-white group-hover:text-cyan-400">Send</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

</div>  )
}

export default page