import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';


function NavBar() {
    return (
        <Box sx={{ flexGrow: 20, marginBottom:10 }} >
            <AppBar position="static" color="info" variant="elevation">
                <Toolbar>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 20, display: { xs: '-ms-flexbox', sm: 'block' }, padding:2}}
                    >
                        Hizdama App
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar