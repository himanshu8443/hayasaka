import React from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';


const FavouriteButton = ({favouriteSongs, activeSong, loading, handleAddToFavourite}) => {
  return (
    <>
    { favouriteSongs?.length>0 && favouriteSongs?.includes(activeSong.id) ?
        <button disabled={loading} onClick={(e)=>{
          e.stopPropagation();
         handleAddToFavourite(activeSong)}} className={` disabled:cursor-not-allowed cursor-pointer`}>
           <AiFillHeart title='Favourite' size={25} color={'#00e6e6'} className={` sm:block hidden cursor-pointer`} />
             </button>
          :
          <button disabled={loading} onClick={(e)=>{
            e.stopPropagation();
            handleAddToFavourite(activeSong)}} className={` disabled:cursor-not-allowed cursor-pointer`}>
          <AiOutlineHeart  title='Favourite' size={25} color={'white'} className={` sm:block hidden`} />
          </button>
        }
    </>
  )
}

export default FavouriteButton