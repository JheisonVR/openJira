import React, { ChangeEvent, useContext, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import GppBadIcon from '@mui/icons-material/GppBad';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Box, Button, TextField } from '@mui/material'
import { EntriesContext } from '../entries';
import { UIContext } from './UIContext';

export const NewEntry = () => {

    const {addNewEntry} = useContext(EntriesContext)
    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext)

    // const [isAdding, setIsAdding] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [touch, setTouch] = useState(false)


    const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue(e.target.value)
    }

    const handleSaveEntries = () => {
        //TODO: Agregar funcion AddEntry del Context
        addNewEntry(inputValue);
        setInputValue('');
        setTouch(false);
    }

    return (
        <Box sx={{ marginBottom:2, paddingX:2 }}>
            {
                isAddingEntry ? 
            <>
                <TextField
                    fullWidth
                    sx={{marginTop:2, marginBottom:1}}
                    placeholder='New entry'
                    autoFocus
                    multiline
                    label='New entry'
                    helperText= {inputValue.length <=0 && touch && 'Ingrese un valor'}  
                    error={inputValue.length <=0 && touch }
                    value={inputValue}
                    onChange={handleOnChangeInput}
                    onBlur={() => setTouch(true)}
                />
                {inputValue.length > 0 ? 
                <Box
                    display='flex'
                    justifyContent='space-between'
                    padding='5px'
                >
                    <Button
                        variant='contained'
                        color='secondary'
                        endIcon= {<SaveIcon/>}
                        onClick={handleSaveEntries}
                    >Save
                    </Button>
                    <Button
                        variant='outlined'
                        color='error'
                        endIcon= {<GppBadIcon/>}
                        onClick={()=> {setIsAddingEntry(false); setTouch(false)} }
                    >Cancel
                    </Button>
                </Box>
                :
                <Box
                display='flex'
                justifyContent='end'
                padding='5px'
                >
                    <Button
                        variant='outlined'
                        color='error'
                        endIcon= {<GppBadIcon/>}
                        onClick={()=> {setIsAddingEntry(false); setTouch(false)} }
                    >Cancel
                    </Button>
            </Box>
                }
            </>
            :
            <Button 
                startIcon={<AddTaskIcon/>}
                fullWidth
                variant='contained'
                onClick={() => setIsAddingEntry(true)}
            >
            Agregar Tarea
            </Button>     
            }
        </Box>
    )
}
