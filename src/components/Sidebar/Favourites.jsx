import Link from 'next/link'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'


const Favourites = ({setShowNav}) => {
  return (
    <div className=' mt-10 border-b border-gray-400 w-[50%] '>
    <Link href='/favourite' className='flex cursor-pointer items-center' onClick={()=>setShowNav(false)}>
    <p className=' font-semibold text-lg text-white mx-3 mb-4'>Favourites</p>
    <AiFillHeart title='Favourites' size={25} color={'white'} className={` mb-3 `} />
    </Link>
    </div>
  )
}

export default Favourites