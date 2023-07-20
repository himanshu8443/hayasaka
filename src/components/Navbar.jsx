'use client'
import React from 'react'
import  logo from '../assets/hayasaka6.png'
import Image from 'next/image'
import { GiHamburgerMenu } from 'react-icons/gi'
import Searchbar from './Searchbar'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setProgress } from '@/redux/features/loadingBarSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className='navbar h-[70px] text-white flex justify-between relative'>
      <div className=' flex'>
      <GiHamburgerMenu className=' mx-4 text-xl lg:text-3xl my-auto' />
      <div className=' flex justify-center items-center'>
        <Link href='/'>
      <Image onClick={
        ()=>{
          dispatch(setProgress(100))
        }
      } src={logo} alt="logo"  className=' lg:py-2  aspect-video w-[130px] h-[40px] lg:h-[70px] lg:w-[192px]'/>
      </Link>
      </div>
      </div>
      <Searchbar/>
    </div>
  )
}

export default Navbar