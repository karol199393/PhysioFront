import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



return (
    <div>
        <Button
            aria-controls="basic-menu"
            aria-haspopup="true"
            onClick={handleClick}
        >
            MENU
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>
                <Link to="/profil">Profil</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link to="/moje-konto">Moje Konto</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link to="/wyloguj">Wyloguj</Link>
            </MenuItem>
        </Menu>
    </div>
);


}

