'use client';
import React from 'react'
import { MdOutlineFileDownload } from 'react-icons/md';
import DownloadLink from 'react-download-link';

const Downloader = ({activeSong}) => {
    const [loading, setLoading] = React.useState(false);

  return (
    <div onClick={(e)=>{e.stopPropagation();}} className={`flex  mb-1 cursor-pointer`}>
    <DownloadLink  label={
      <div title={loading ?'Downloading' : 'Download'} className={loading ? 'download-button':''}>
      <MdOutlineFileDownload  size={25} color={'#ffff'}/>
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
    </div>
  )
}

export default Downloader