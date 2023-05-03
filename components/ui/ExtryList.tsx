import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo } from 'react'
import { EntryCard } from './'
import { EntryStatus } from '../../interfaces'
import { EntriesContext } from '../../context/entries'

interface Props {
    status: EntryStatus
}


export const ExtryList:FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext)

    //esLint
    const entriesByStatus = useMemo(()=> entries.filter( e => e.status === status ), [entries] );
    
    

    return (
        // TODO: Aqui haremos Drop
        <div>
            <Paper 
                sx={{
                    height: 'calc(100vh - 250px)', 
                    overflow:'hidden', 
                    backgroundColor:'transparent', 
                    padding:'2px 5px', 
                    }}
                elevation={2}
                
            >
                {/* TODO: cambiara dependiendo si estoy haciendo drag o no */}
                <List sx={{opacity: 1,}}  >
                    {
                        entriesByStatus.map((e,i)=>(
                            <EntryCard
                                key={i}
                                entry={e}
                            />
                        ))
                    }

                </List>
            </Paper>
        
        </div>
    )
}
