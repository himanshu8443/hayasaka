import React from 'react'
import  logo from '../assets/hayasaka.png'
import Image from 'next/image'
import { GiHamburgerMenu } from 'react-icons/gi'
import Searchbar from './Searchbar'

const Navbar = () => {
  return (
    <div className=' h-16 bg-[rgba(0,8,20,1)] text-white flex justify-between'>
      <div className=' flex'>
      <GiHamburgerMenu size={30} className=' m-4' />
      <div>
      <Image src={logo} alt="logo" width={200} height={290} className=' py-2' />
      </div>
      </div>
      <Searchbar />
    </div>
  )
}

export default Navbar