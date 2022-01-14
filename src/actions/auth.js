import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import Swal from 'sweetalert2'
import { types } from '../types/types';
import { finishLoading, setError, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        const auth = getAuth();
        dispatch(startLoading());
        
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        }).catch( e => {
            dispatch(setError('Credenciales incorrectas'));
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error');
        });
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then(async ({user}) => {
            await updateProfile(user, {displayName: name});
            dispatch(login(user.uid, user.displayName));
        })
        .catch( e => {
            console.log(e);
            Swal.fire('Error', e.message, 'error');
        });
    }

}

export const startGooglelogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName))
        })
    }
}

export const login = (uid,displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
})

export const logout = () => ({
    type: types.logout
})

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch(logout());
    }
}