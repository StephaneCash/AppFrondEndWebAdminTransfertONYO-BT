import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Toolbar, Badge, makeStyles, Avatar } from "@material-ui/core";
import { Menu, Mail, Notifications, People } from "@material-ui/icons";
import '../assets/Navbar.css';

const useStyles = makeStyles((theme) => ({
  tooBar: {
    display: "flex",
    justifyContent: 'space-between'
  },
  icons: {
    display: "flex",
    alignItems: "center"
  },
  badge: {
    marginRight: theme.spacing(2),
  },

}));

function Navbar() {

  const classes = useStyles();

  return (
    <div className='navbar'>
      <AppBar style={{ backgroundColor: '#fff' }}>
        <Toolbar className={classes.tooBar}>
          <Menu style={{ color: "#333", fontSize: "30px" }} />
          <div className={classes.icons}>
            <Badge badgeContent={4} color="secondary" className={classes.badge}>
              <Mail style={{ color: "#333" }} />
            </Badge>
            <Badge badgeContent={7} color="secondary" className={classes.badge}>
              <Notifications style={{ color: "#333" }} />
            </Badge>
            <Avatar style={{ backgroundColor: "#555", marginTop: '-10px', marginLeft:'25px' }} alt={'O'} src="s" />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar