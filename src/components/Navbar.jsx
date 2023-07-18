import React from 'react'
import  logo from '../assets/hayasaka6.png'
import Image from 'next/image'
import { GiHamburgerMenu } from 'react-icons/gi'
import Searchbar from './Searchbar'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='navbar h-[70px] text-white flex justify-between relative'>
      <div className=' flex'>
      <GiHamburgerMenu size={30} className=' m-4' />
      <div>
        <Link href='/'>
      <Image src={logo} alt="logo" width={180} height={170} className=' py-2' />
      </Link>
      </div>
      </div>
      <Searchbar />
    </div>
  )
}

export default Navbar