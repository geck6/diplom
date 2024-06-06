import { Link } from "react-router-dom";
import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 } }>
            <AppBar  position="static">
                <Toolbar className="toolbr">
                    <div className="happyface"></div>
                    <Button ><Link className="Nav_button" to="/">Модуль аналитики</Link></Button>
                    <Button ><Link className="Nav_button" to="/database">База данных</Link></Button>
                    <Button ><Link className="Nav_button" to="/export">Выгрузка</Link></Button>
                    <Button ><Link className="Nav_button" to="/manual">Инструкция пользователя</Link></Button>
                </Toolbar>
            </AppBar>
        </Box>


    )
}
export default Navbar;