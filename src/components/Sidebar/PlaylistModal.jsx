import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { createPlaylist } from '@/services/playlistApi';
import { useDispatch } from 'react-redux';
import { setIsTyping } from '@/redux/features/loadingBarSlice';





const PlaylistModal = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setName(e.target.value)
    }
    
    const handelCreate = async () => {
        console.log(name)
        if(name === ''){
            toast.error('Playlist name is required')
        }
        else{
            setLoading(true)
            const res = await createPlaylist(name);
            if(res.success == true){
                toast.success(res.message)
                setName('')
                setShow(false)
            }
            else{
                toast.error(res.message)
            }
            setLoading(false)
        }
    }

    // handle focus
    const handleFocus = () => {
        dispatch(setIsTyping(true));
      };
      const handleBlur = () => {
        dispatch(setIsTyping(false));
      };
    
    return (show &&
        <div>
            <div onClick={() => setShow(false)} className='fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-50 flex justify-center items-center text-white'>
                <div onClick={(e) => e.stopPropagation() } className='bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg w-[500px]'>
                    <div className='flex justify-between items-center px-4 py-2'>
                        <h1 className='text-lg font-semibold'>Create Playlist</h1>
                        <button onClick={() => setShow(false)} className='text-white text-lg font-semibold'>X</button>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className=" flex gap-4 items-end mb-3">
                            <label className=" mr-9 lg:mr-11" htmlFor='name'>Name</label>
                            <input onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} value={name} name='name' type="text" placeholder="Playlist Name" required className=' appearance-none bg-white/5 bg-opacity-100 backdrop-blur-sm border-b border-white focus:outline-none text-base lg:text-lg' />
                        </div>
                            <button onClick={handelCreate} className='text-sm group font-semibold mb-7 flex gap-2 border-[1.5px] border-white rounded-lg px-2 items-center py-2'>
                                {
                                    loading ? <div className='custom-loader w-[20px] h-[20px]'></div> : <FaPlus className=' w-[20] h-[20px] group-hover:text-[#00e6e6]' />
                                }
                                Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistModal