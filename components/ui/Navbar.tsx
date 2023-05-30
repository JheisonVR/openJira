import React, { useContext, useState } from 'react'
import NextLink from 'next/link';
import { AppBar, IconButton, Toolbar, Typography, Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';

export const Navbar = () => {

    const [state, setState] = useState(false)
    const {openSideMenu} = useContext(UIContext)

    return (
        <AppBar position='sticky' >
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    onClick={ openSideMenu }
                >
                    <MenuOutlinedIcon/>
                </IconButton>
                <NextLink 
                    style={{
                        textDecoration:'none'
                    }}
                    href='/' 
                    passHref>
                    <Link 
                        color='white'
                        underline='none'
                    >
                        <Typography variant='h6' >OpenJira</Typography>
                    </Link>
                </NextLink>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
