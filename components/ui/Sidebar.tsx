import React, { useContext } from 'react'
import { Box, Divider , Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts' ]

export const Sidebar = () => {

    const {sideMenuOpen, closeSideMenu} = useContext(UIContext)

    const [checked, setChecked] = React.useState( ['']);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        // console.log(checked)
    };


    return (
        <Drawer
            anchor='left'
            open={sideMenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{padding: '5px 10 px' }} >
                <Typography variant='h4'> Menú </Typography>  
            </Box>

            <List>
                {menuItems.map((text, index) => (
                    <ListItemButton 
                        key={index}
                    >
                        <ListItemIcon>
                            {index % 2 ? <InboxIcon/> : <ForwardToInboxIcon/> }
                        </ListItemIcon>
                        <ListItemText primary= {text}/>                            
                    </ListItemButton>
                )) }
                <Divider />

                <ListItem>
                    <ListItemIcon>
                        <DarkModeIcon/>
                    </ListItemIcon>
                    <ListItemText id='switch-theme' primary='Dark' />                
                    <Switch 
                        edge='start'
                        onChange={handleToggle('Dark')}
                        checked={ checked.indexOf('Dark') !== 1 } 
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-dark'
                        }}
                    />
                </ListItem>

                
            </List>


        </Drawer>
    )
}
