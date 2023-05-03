import React, { FC, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'
import { NewEntry } from '../ui/NewEntry';


interface Props {
    children : React.ReactNode

}

export interface EntriesState {
    entries: Entry[]
}

const ENTRIES_INITIAL_STATE:EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Velit Lorem commodo nostrud est laboris aliquip occaecat.',
            status: 'in-progress',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'Exercitation non sunt laboris reprehenderit.',
            status: 'pending',
            createdAt: Date.now() - 1000
        },
        {
            _id: uuidv4(),
            description: 'Eu id non excepteur nostrud sint fugiat laboris labore qui nisi ullamco ex.',
            status: 'pending',
            createdAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'Eiusmod laboris cillum mollit non eu sit amet consequat minim.',
            status: 'finished',
            createdAt: Date.now() - 10000
        },
    ]
}


export const EntriesProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addNewEntry = (description:string) => {
        const NewEntry : Entry = {
            _id: uuidv4(),
            description: description,
            createdAt: Date.now(),
            status: 'pending'
        }
        dispatch({
            type:'[Entry] add-Entry',
            payload:NewEntry
        })
    }

    const updateEntry = (entry:Entry) => {
        dispatch({type:'[Entry] Entry-Updated', payload:entry})
    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            
            // TODO: Methods
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}
