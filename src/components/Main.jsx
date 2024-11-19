import React, { useEffect, useState } from 'react'
import requests from '../Requests'
import axios from 'axios'
import { truncate} from 'lodash'


const Main = () => {
    const [movies, setMovies] = useState([])

    const movie = movies[Math.floor(Math.random() * movies.length)]

    useEffect(()=>{
        axios.get(requests.requestPopular).then((response)=>{
            setMovies(response.data.results);
        })
    },[])
    // console.log(movie)

    const truncateString = (str,num) =>{
        if (str?.length > num) {
               return str.slice(0, num) + '...'
        }else {
            return str;
        }
    }
console.log(truncateString)

  return (
    <div className='w-full h-[550px] text-white'>
        <div className='w-full h-full'>
            <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
            <img className='object-cover w-full h-full' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
      
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
            <h1 className='text-3xl font-bold md:text-5xl'>{movie?.title}</h1>
            <div className='my-4'>
            <button className='px-5 py-2 text-black bg-gray-300 border border-gray-300'>Play</button>
            <button className='px-5 py-2 ml-4 text-white border border-gray-300'>Wacht Later</button>
        </div>
        <p className='text-sm text-gray-400'>Released: {movie?.release_date}</p>
        <p className='w-full md:max-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 '>{truncateString(movie?.overview, 150)}</p>
        </div>
    </div>
 </div>
  )
}

export default Main
