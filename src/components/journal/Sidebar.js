import React from 'react'
import { JournalEntries } from './JournalEntries';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';


export const Sidebar = () => {
    const dispatch = useDispatch();

    const { name } = useSelector(state => state.auth);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(startLogout());
        console.log('loggedout');
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-user-circle"></i>
                    &nbsp;<span>{name}</span>
                </h3>
                <button
                    className="btn"
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </button>
            </div>
            <div className="journal__new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">Nueva gestión</p>
            </div>
            <JournalEntries />
        </aside>
    )
}
