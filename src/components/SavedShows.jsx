import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';



const SavedShows = () => {
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();

    const slideRight = () => {
        const slider = document.getElementById("slider");
        if (slider) {
            slider.scrollLeft += 500;
        }
    };

    const slideLeft = () => {
        const slider = document.getElementById("slider");
        if (slider) {
            slider.scrollLeft -= 500;
        }
    };

    useEffect(() => {
        if (user?.email) {
            const unsubscribe = onSnapshot(doc(db, 'users', user.email), (docSnap) => {
                const savedShows = docSnap.data()?.savedShows || []; // Valor por defecto: [] si no existe
                setMovies(savedShows);
            });

            // Limpiar el listener cuando el componente se desmonte
            return () => unsubscribe();
        }
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteShow = async (passedID)=> {
        try {
          const result = movies.filter((item)=> item.id !== passedID);
          await updateDoc(movieRef, {
            savedShows: result
          })  
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h2 className='p-4 font-bold text-white md:text-xl'>My Favorites</h2>
            <div className='relative flex items-center content-center group'>
                <MdChevronRight
                    onClick={slideRight}
                    className='absolute right-0 z-10 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block'
                    size={40}
                />
                <div id="slider" className='relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {movies.length > 0 ? (
                        movies.map((item, id) => (
                            <div
                                key={id} // Usamos 'id' ya que es un índice único
                                className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                                <img
                                   src={`https://image.tmdb.org/t/p/w500/${item?.img}`}


                                    alt={item?.title}
                                    className='block object-cover w-full h-auto'
                                />
                                <div className='absolute top-0 left-0 w-full h-full text-white opacity-0 hover:bg-black/80 hover:opacity-100'>
                                    <p className='flex items-center justify-center h-full text-xs font-bold text-center whitespace-normal md:text-sm'>
                                        {item?.title}
                                    </p>
                                    <p onClick={()=> deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-white'>No shows found</p> // Mensaje en caso de que no haya películas
                    )}
                </div>
                <MdChevronLeft
                    onClick={slideLeft}
                    className='absolute left-0 z-10 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block'
                    size={40}
                />
            </div>
        </>
    );
};

export default SavedShows;
