
// movie 
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import showAlert from '../alerts/sweetalert';

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);  // Estado para manejar el like
  const { user } = UserAuth();

  // Verificar si user?.uid está definido antes de intentar acceder a Firestore
  if (!user?.email) {
 
    return null;  // No se renderiza el componente si no hay usuario autenticado
  }

  const movieID = doc(db, "users", user.email);  // Usar user.uid en lugar de user?.uid

  // Función para guardar la película
  const SavedShows = async () => {
    try {
      // Cambiar el estado de like cuando el usuario guarda la película
      setLike(!like);

      // Actualizar el documento de usuario en Firestore
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
          email: user.email // Guardar el correo electrónico del usuario
        })
      });
      showAlert('success', 'Movie Saved', 'Your movie has been saved successfully!');
    } catch (error) {
      showAlert('error', 'Error guardando película', error.message); 
    }
  };

  return (
    <div
      key={item.id}  // Usamos 'item.id' como la clave única para cada elemento
      className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
      <img
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
        className='block object-cover w-full h-auto'
      />
      <div className='absolute top-0 left-0 w-full h-full text-white opacity-0 hover:bg-black/80 hover:opacity-100'>
        <p className='flex items-center justify-center h-full text-xs font-bold text-center whitespace-normal md:text-sm'>
          {item?.title}
        </p>
        <p onClick={SavedShows}>
          {like ? (
            <FaHeart className='absolute text-gray-200 size-5 top-4 left-4' />
          ) : (
            <FaRegHeart className='absolute text-gray-300 size-5 top-4 left-4' />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
