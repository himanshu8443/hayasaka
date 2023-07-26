'use client'
import React from 'react'
import  logo from '../assets/hayasaka6.png'
import  logoBlack from '../assets/logoBlack.png'
import Image from 'next/image'
import Searchbar from './Searchbar'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setProgress } from '@/redux/features/loadingBarSlice'
import {MdOutlineMenu} from 'react-icons/md'
import Languages from './Sidebar/Languages'


const Navbar = () => {
  const dispatch = useDispatch();
  const [showNav, setShowNav] = React.useState(false);
  return (
    <>
    <div className='navbar h-[70px] text-white flex justify-between relative'>
      <div className=' flex'>
      <MdOutlineMenu onClick={
        ()=>setShowNav(true)
      } className=' mx-4 text-xl lg:text-3xl my-auto cursor-pointer' />
      <div className=' flex justify-center items-center'>
        <Link href='/'>
      <Image onClick={()=>{dispatch(setProgress(100))}} 
      src={logo} alt="logo"  className=' lg:py-2  aspect-video w-[130px] h-[40px] lg:h-[70px] lg:w-[192px]'/>
      </Link>
      </div>
      </div>
      <Searchbar/>
    </div>
    
    <div className={`${showNav ? '':'translate-x-[-100%]' } transition-all duration-200  h-screen w-96 fixed top-0 left-0 z-40 navGradient`}>
    <div className=' flex'>
      <MdOutlineMenu onClick={
        ()=>setShowNav(false)
      } className=' mx-4 text-xl lg:text-3xl my-auto text-white' />
      <div className=' flex justify-center items-center'>
        <Link href='/'>
      <Image onClick={
        ()=>{
          dispatch(setProgress(100))
        }
      } src={logoBlack} alt="logo"  className=' lg:py-2  aspect-video w-[130px] h-[40px] lg:h-[70px] lg:w-[192px]'/>
      </Link>
      </div>
      </div>
      <div className=' mt-10 border-b border-gray-400 w-[50%]'>
        <Languages/>
      </div>
    </div>
    </>
  )
}

export default Navbar