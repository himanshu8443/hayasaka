'use client'
import React from 'react'
import  logo from '../assets/hayasaka.png'
import  logoWhite from '../assets/logoWhite.png'
import Image from 'next/image'
import Searchbar from './Searchbar'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setProgress } from '@/redux/features/loadingBarSlice'
import {MdOutlineMenu} from 'react-icons/md'
import Languages from './Sidebar/Languages'
import { IoClose } from 'react-icons/io5'
import Favourites from './Sidebar/Favourites'
import { FaGithub } from 'react-icons/fa'


const Navbar = () => {
  const dispatch = useDispatch();
  const [showNav, setShowNav] = React.useState(false);
  return (
    <>
    <div className='navbar h-[70px] text-white flex justify-between relative'>
      <div className=' flex'>
      <MdOutlineMenu onClick={
        ()=>setShowNav(true)
      } className=' mx-4 text-2xl lg:text-3xl my-auto cursor-pointer' />
      <div className=' flex justify-center items-center'>
        <Link href='/'>
      <Image onClick={()=>{dispatch(setProgress(100))}} 
      src={logo} alt="logo"  className=' lg:py-2  aspect-video w-[135px] h-[30.741px] lg:h-[58px] lg:w-[190px]'/>
      </Link>
      </div>
      </div>
      <Searchbar/>
    </div>
    
    <div className={`${showNav ? '':'translate-x-[-100%]' } transition-all duration-200  h-screen lg:w-96 w-96 fixed top-0 left-0 z-40 navGradient flex flex-col justify-between`}>
    <div>
    <div className=' flex mt-3'>
      <MdOutlineMenu onClick={()=>setShowNav(false)} className=' mx-4 text-2xl lg:text-3xl my-auto text-white cursor-pointer' />
      <div className=' flex justify-center items-center'>
      <Link href='/'>
      <Image onClick={()=>{dispatch(setProgress(100))}} src={logoWhite} alt="logo" 
      className=' lg:py-2  aspect-video w-[139px] h-[31px] lg:h-[62px] lg:w-[190px]'/>
      </Link>
      </div>
      </div>
      <div className=' mt-10 border-b border-gray-400 w-[50%]'>
        <Languages/>
      </div>
     <Favourites setShowNav={setShowNav} />
     </div>
     <div className=' mb-28 text-gray-200 mx-3 flex gap-3'>
      <Link href='/dmca'>
      <p className='hover:border border-gray-200 p-1 font-medium w-fit rounded cursor-pointer text-sm'>DMCA</p>
      </Link>
      <a href='https://github.com/himanshu8443/hayasaka' target='_blank' rel="noreferrer">
      <p className=' hover:border border-gray-200 p-1 font-medium w-fit rounded cursor-pointer text-sm flex items-center gap-1'><FaGithub/>Github</p>
      </a>
     </div>
    </div>
    {/* overlay */}
    <div onClick={()=>setShowNav(false)} 
    className={`${showNav ? '':'hidden' } transition-all duration-200 fixed top-0 left-0 z-30 w-screen h-screen bg-black bg-opacity-50`}></div>
    {/* cross */}
    <div onClick={
      ()=>setShowNav(false)
    } className={`${showNav ? '':'hidden' } md:hidden fixed top-7 right-10 z-50 text-3xl text-white`}>
      <IoClose/>
    </div>
    </>
  )
}

export default Navbar