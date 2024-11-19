import React from 'react'
import SavedShows from '../components/SavedShows'

const Account = () => {
  return (
    <>
    <div className='w-full text-white'>
      <img className='w-full h-[500px] object-contain' src="https://wallpapercat.com/w/full/e/a/e/115807-1920x1080-desktop-1080p-netflix-background-image.jpg" alt="/"
       />
       <div className='bg-black/60 fixed top-0 left-0 w-full h-[500px]'></div>
       <div className='absolute top-[20%] p-4 md:p-8'>
        <h1 className='text-3xl font-bold md:text-5xl'>My Movies</h1>
        
        </div>
       </div>
        <SavedShows />
       
       
       

    </>
  )
}

export default Account