import React from 'react'
import { EntriesState } from './'

type EntriesActionType = 
| {type:''}


export const entriesReducer = (state:EntriesState, action:EntriesActionType):EntriesState  => {
    switch(action.type){

        default:
            return state
    }
}
