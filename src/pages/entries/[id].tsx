//React
import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { Layout } from '../../../components/layouts'
//Next
import { GetServerSideProps } from 'next';
import { Entry, EntryStatus } from '../../../interfaces';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'
//Material-UI
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { isValidObjectId } from 'mongoose';
import { dbEntries } from '../../../database';
import { EntriesContext } from '../../../context/entries';

const validStatus: EntryStatus[] =  ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

export const EntryPage:FC<Props> = ({ entry }) => {

    const { updateEntry } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus> (entry.status);
    const [touched, setToucehd] = useState(false);

    const isNotValidInput = useMemo(() => inputValue.length <= 0 && touched , [inputValue, touched] )

    const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue ( event.target.value )
    }

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement>) => {        
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () => {
        if(inputValue.trim().length === 0 ) return
        const updatedEntry : Entry = {
            ...entry,
            status,
            description: inputValue
        }
        updateEntry(updatedEntry, true)
    }

    return (
        <Layout title={inputValue.substring(0,20)+'...'} >
            <Grid
                container
                justifyContent='center'
                sx={{marginTop:2}}
            >
                <Grid
                    item 
                    xs={12} sm={8} md={6}
                >
                    <Card>
                        <CardHeader
                            title='Entrada'
                            subheader={ `Creada hace ${entry.createdAt} minutos`}
                        />
                        <CardContent>
                            <TextField
                                sx={{marginTop:2, marginBottom:1}}
                                fullWidth
                                placeholder='Nueva Entrada'
                                autoFocus
                                multiline
                                label='Nueva Entrada'
                                value= {inputValue}
                                onBlur={ ()=> setToucehd(true) }
                                onChange={ onInputValueChanged }
                                helperText={ isNotValidInput && 'Ingrese un valor'}
                                error={isNotValidInput}
                            />
                            <FormControl>
                                <FormLabel sx={{color:'whitesmoke'}} >Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={ status }
                                    onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map(op=> (
                                            <FormControlLabel
                                                key={op}
                                                value={op}
                                                control={<Radio/>}
                                                label={ capitalize(op)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon/>}
                                variant='contained'
                                fullWidth
                                onClick={ onSave }
                                disabled= { inputValue.length <= 0 }
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right:30,
                    backgroundColor: 'error.dark'
                }}
            >
                <DeleteForeverOutlinedIcon/>
            </IconButton>
        
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps =async ({params}) => {

    const { id } = params as {id: string};

    const entry = await dbEntries.getEntriesById(id);

    if( !entry ){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    return {
        props:{
            entry
        }
    }
}



export default EntryPage
