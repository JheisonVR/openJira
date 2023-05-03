import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import React, { DragEvent, FC, useContext } from 'react'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'

interface Props {
    entry: Entry
}

export const EntryCard:FC<Props> = ( {entry} ) => {

    const {startDragging, endDragging} = useContext(UIContext)

    const onDragStart = ( event: DragEvent ) => {
        
        event.dataTransfer.setData('text', entry._id)
        //TODO: modificar el estado para indicar que estoy haciendo dag
        startDragging()
    }

    const onDragEnd = () =>{
        endDragging()
    }

    return (
        <Card
            sx={{marginBottom:1,}}
            //TODO: Eventos del Dragg
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{whiteSpace:'pre-line'}} >{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'end', paddingRight:2}} >
                    <Typography variant='body2' >Hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>

        
        </Card>
    )
}
