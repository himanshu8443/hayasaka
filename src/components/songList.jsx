import React from 'react'

const songList = ({playlistData}) => {
  return (
    <div className="w-11/12 m-auto mt-16">
      <div className=" flex">
        <img className=" rounded-full"
          src={playlistData?.image?.[2]?.link}
          alt={playlistData?.title}
          width={300}
          height={300}
        />
        <div className="ml-10 text-gray-100 mt-12">
          <h1 className="text-4xl font-bold">{playlistData?.name}</h1>
          <h2 className="text-xl font-semibold">{playlistData?.subtitle}</h2>
          <h3 className="text-xl font-semibold">{playlistData?.primaryArtists}</h3>
          <ul className="flex items-center gap-3 text-gray-300">
          <li className="text-lg font-semibold">• {playlistData?.year}</li>
            <li className="text-lg font-semibold">• {playlistData?.followerCount} followers</li>
            <li className="text-lg font-semibold">
              • {playlistData?.songCount} songs
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-gray-200">
        <h1 className="text-3xl font-bold">Songs</h1>
        <div className="mt-5">
          {playlistData?.songs?.map((song,index) => (
            <div
            onClick={() => {
                handlePlayClick(song,index);
            }
            }
             className="flex items-center  mt-5 cursor-pointer group border-b-[1px] border-gray-400 justify-between">
                <div className="flex items-center gap-5">
              <div className=" relative">
                <img src={song?.image?.[2]?.link} alt={song?.name} width={50} height={50} className="rounded- mb-3"
                />
                {/* <p className=" group-hover:hidden font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200">
                    {index+1}.
                </p> */}
                <BsPlayFill
                  size={25}
                  className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                />
              </div>
              <div className=" w-80">
                <h1 className="text-lg font-semibold truncate">{
                    song?.name.replace("&#039;", "'").replace("&amp;", "&")
                }</h1>
              </div>
              </div>
              <div className=" w-40">
                {song?.playCount && (
                    <p className="text-gray-400">{song?.playCount} plays</p>
                )}
                </div>
                <div>
                <p>{formatDuration(song?.duration)}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default songList