import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export const Navbar = () => {
    return (
        <AppBar position='sticky' >
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    onClick={() => console.log('holiiii')}
                >
                    <MenuOutlinedIcon/>
                </IconButton>
                <Typography variant='h6' color={'black'} >OpenJira</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
