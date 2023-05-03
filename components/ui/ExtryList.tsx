import { List, Paper } from '@mui/material'
import React, { DragEvent, FC, useContext, useMemo } from 'react'
import { EntryCard } from './'
import { EntryStatus } from '../../interfaces'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}


export const ExtryList:FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDragging, endDragging } = useContext(UIContext)
    //esLint
    const entriesByStatus = useMemo(()=> entries.filter( e => e.status === status ), [entries] );
    
    const allowDrop = (event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault()
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')
        const entry = entries.find(e => e._id===id)!;
        entry.status = status
        updateEntry(entry);
        endDragging()
    }

    return (
        // TODO: Aqui haremos Drop
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
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
                <List sx={{opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}  >
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
