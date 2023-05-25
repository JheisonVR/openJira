import React, { FC, useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'
import { NewEntry } from '../ui/NewEntry';
import { entriesApi } from '../../apis';


interface Props {
    children : React.ReactNode

}

export interface EntriesState {
    entries: Entry[]
}

const ENTRIES_INITIAL_STATE:EntriesState = {
    entries: []
}

export const EntriesProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addNewEntry = async (description:string) => {
        // const NewEntry : Entry = {
        //     _id: uuidv4(),
        //     description: description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }
        try{
            const {data} = await entriesApi.post<Entry> ('/entries', {description: description}) 
            
            dispatch({
                type:'[Entry] add-Entry',
                payload: data
            })
        }catch(e){
            console.log(e)
        }
    }

    const updateEntry = (entry:Entry) => {
        dispatch({type:'[Entry] Entry-Updated', payload:entry})
    }


    const refreshEntries =async () => {
        const {data} = await entriesApi.get<Entry[]> ('/entries')
        dispatch({type:'[Entry] Refresh-Data', payload:data})
    }

    useEffect(()=>{
        refreshEntries()
    },[])

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
