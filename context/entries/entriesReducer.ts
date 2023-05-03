import React from 'react'
import { EntriesState } from './'
import { Entry } from '../../interfaces'

type EntriesActionType = 
| {type:'[Entry] add-Entry', payload:Entry }


export const entriesReducer = (state:EntriesState, action:EntriesActionType):EntriesState  => {
    switch(action.type){
        case '[Entry] add-Entry': {
            return{
                ...state,
                entries: [...state.entries, action.payload ] 
            }
        }

        default:
            return state
    }
}
