import React, { FC, useEffect, useReducer } from 'react'

import {useSnackbar} from 'notistack'

import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'
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
    const {enqueueSnackbar} = useSnackbar()

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

    const updateEntry  = async ({_id, description, status}: Entry, showSnackbar = false ) => {
        try{
            const {data} = await entriesApi.put<Entry> (`/entries/${_id}`, {description, status})
            dispatch({type:'[Entry] Entry-Updated', payload:data})

            //TODO: Mostrar Snackbar
            if(showSnackbar)
                enqueueSnackbar('Entrada Actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'right'
                    }
                })

        }catch(error){
            console.log({error})
        }
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
