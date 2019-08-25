import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts : [
            {
                id    : 1,
                name  : 'Pius Ademang',
                email : 'pkademang@gmail.com',
                phone : '233123456789',
                type  : 'personal'
            },
            {
                id    : 2,
                name  : 'Miguel Ademang',
                email : 'mkademang@gmail.com',
                phone : '233987654321',
                type  : 'personal'
            },
            {
                id    : 3,
                name  : 'Foster Konotey',
                email : 'shadez@gmail.com',
                phone : null,
                type  : 'professional'
            }
        ],
        current  : null,
        filtered : null
    };

    const [
        state,
        dispatch
    ] = useReducer(ContactReducer, initialState);

    const addContact = (contact) => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts       : state.contacts,
                current        : state.current,
                filtered       : state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
