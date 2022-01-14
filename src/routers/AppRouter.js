import React, { useEffect, useState } from 'react';
import { PrivateRoute } from './PrivateRoute';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
           if(user?.uid) {
               dispatch(login(user.uid, user.displayName));
               setIsLoggedIn(true);
           } else {
               setIsLoggedIn(false);
           }

           setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return <h1>Espere ...</h1>
    }
    return (
        <div>
            <Router>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        isAuthenticated= {isLoggedIn}
                        component={AuthRouter}
                        />
                    <PrivateRoute 
                        path="/"
                        isAuthenticated= {isLoggedIn}
                        exact
                        component={JournalScreen}
                        />
                    <Redirect to="/auth/login" />
                </Switch>
            </Router>
        </div>
    )
}
