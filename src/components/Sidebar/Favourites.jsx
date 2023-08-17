import Link from 'next/link'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'


const Favourites = ({setShowNav}) => {
  return (
    <div className=' mt-7 border-b border-gray-400 w-[95%] '>
    <Link href='/favourite' className='flex cursor-pointer items-center' onClick={()=>setShowNav(false)}>
    <p className=' font-semibold text-lg text-white mx-3 mb-7'>Favourites</p>
    <AiFillHeart title='Favourites' size={25} color={'white'} className={` mb-7 `} />
    </Link>
    </div>
  )
}

export default Favourites