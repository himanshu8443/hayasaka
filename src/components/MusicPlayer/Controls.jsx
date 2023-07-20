import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
import { MdOutlineFileDownload } from 'react-icons/md';
import DownloadLink from 'react-download-link';

const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong, activeSong }) => {
  const [loading, setLoading] = React.useState(false);
  return (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">

    <BsArrowRepeat title='Repeat' size={20} color={repeat ? '#00e6e6' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer" />
    {<MdSkipPrevious title='Previous' size={30}  color={currentSongs?.length ? '#ffff' : '#b3b3b3'} className="cursor-pointer" onClick={handlePrevSong} />}
    {isPlaying ? (
      <BsFillPauseFill size={45} color="#00e6e6" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <BsFillPlayFill size={45} color="#00e6e6" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    { <MdSkipNext title='Next' size={30} color={currentSongs?.length ? '#ffff' : '#b3b3b3'} className="cursor-pointer" onClick={handleNextSong} />}
    <BsShuffle title='Shuffle' size={20} color={shuffle ? '#00e6e6' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" />
    { activeSong?.downloadUrl?.[4]?.link &&
    <DownloadLink className="hidden sm:block cursor-pointer" label={
      <div title={loading ?'Downloading' : 'Download'} className={loading ? 'download-button':''}>
      <MdOutlineFileDownload size={25} color={'#ffff'}/>
      </div>
    } filename={`${activeSong?.name?.replace("&#039;", "'")?.replace("&amp;", "&")  }.mp3`} exportFile={
      async () => {
        setLoading(true);
        const res = await fetch(activeSong?.downloadUrl?.[4]?.link);
        const blob = await res.blob();
        setLoading(false);
        return blob;
      }
    }/>
    }
  </div>
  )
  };

export default Controls;
