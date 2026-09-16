import React from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';


const FavouriteButton = ({
  favouriteSongs,
  activeSong,
  loading,
  handleAddToFavourite,
  style,
  size = 25,
}) => {
  return (
    <div onClick={(e) => e.stopPropagation()} className="inline-flex items-center">
      {favouriteSongs?.length > 0 && favouriteSongs?.includes(activeSong?.id) ? (
        <button
          disabled={loading}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.currentTarget.blur();
            handleAddToFavourite(activeSong);
          }}
          className={`cursor-pointer outline-none focus:outline-none focus:ring-0`}
        >
          <AiFillHeart
            title="Favourite"
            size={size}
            color={"#00e6e6"}
            className={`${style}`}
          />
        </button>
      ) : (
        <button
          disabled={loading}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.currentTarget.blur();
            handleAddToFavourite(activeSong);
          }}
          className={`cursor-pointer outline-none focus:outline-none focus:ring-0`}
        >
          <AiOutlineHeart
            title="Favourite"
            size={size}
            color={"white"}
            className={`${style}`}
          />
        </button>
      )}
    </div>
  );
};

export default FavouriteButton