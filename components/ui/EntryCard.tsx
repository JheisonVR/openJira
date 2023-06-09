import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import React, { DragEvent, FC, useContext } from 'react'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'
import { useRouter } from 'next/router'
import { dateFunctions } from '../../utils'

interface Props {
    entry: Entry
}

export const EntryCard:FC<Props> = ( {entry} ) => {

    const {startDragging, endDragging} = useContext(UIContext)
    const router = useRouter()

    const onDragStart = ( event: DragEvent ) => {
        
        event.dataTransfer.setData('text', entry._id)
        //TODO: modificar el estado para indicar que estoy haciendo dag
        startDragging()
    }

    const onDragEnd = () =>{
        endDragging()
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            sx={{marginBottom:1,}}
            //TODO: Eventos del Dragg
            onClick={onClick}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{whiteSpace:'pre-line'}} >{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'end', paddingRight:2}} >
                    <Typography variant='body2' >Creada hace { dateFunctions.getFormatDistanceToNow(entry.createdAt) }</Typography>
                </CardActions>  
            </CardActionArea>

        
        </Card>
    )
}
