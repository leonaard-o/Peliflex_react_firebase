import { createContext, useContext, useEffect, useState } from "react";
import { ImOpt } from "react-icons/im";
import {auth, db} from '../firebase';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {setDoc,doc} from 'firebase/firestore'
import showAlert from "../alerts/sweetalert";
import { getDoc } from "firebase/firestore";

const AuthContext = createContext()
 
export function AuthContextProvider({ children }){
    const [user, setUser] = useState({});

    async function signUp(email, password,username) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password,username);
            const user = userCredential.user;
    
            // Guarda los datos del usuario en Firestore usando el email(tambien se puede y es recomendble uid) como ID de documento
            await setDoc(doc(db, 'users', user.email), {
                email: user.email,
                username: username,
                savedShows: []
            });
        } catch (error) {
            showAlert('Error registrando usuario o almacenando datos:', error);
        }
    }
    

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

   

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.email));
                    if (userDoc.exists()) {
                        // Actualiza el estado con los datos del usuario
                        setUser({
                            ...currentUser,
                            username: userDoc.data().username,
                        });
                    } else {
                        console.warn("No se encontró el documento del usuario.");
                        setUser(currentUser); // Establece al menos el usuario autenticado
                    }
                } catch (error) {
                    console.error("Error recuperando datos del usuario:", error);
                    setUser(currentUser); // Establece al usuario aunque no se pueda recuperar Firestore
                }
            } else {
                setUser(null); // No hay usuario autenticado
            }
        });
    
        return () => {
            unsubscribe();
        };
    }, []);
    

    return (
        
        <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
     
    )
}
export function UserAuth(){
    return useContext(AuthContext)
}