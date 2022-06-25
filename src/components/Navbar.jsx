import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Toolbar, Badge, makeStyles } from "@material-ui/core";
import { Menu, Mail, Notifications } from "@material-ui/icons";
import '../assets/Navbar.css';
import logo from '../images/logo.jpeg'
import { useNavigate } from 'react-router-dom';

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

  let navigate = useNavigate()

  const deconnectHandle = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('data');
    navigate('/')
  }

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='navbar'>
      <AppBar style={{ backgroundColor: '#fff' }}>
        <Toolbar className={classes.tooBar}>
          <div className='d-flex logoMenu'>
            <Menu style={{ color: "#333", fontSize: "30px" }} />
            <img src={logo} alt='logo' />
            <h5 style={{ color: '#444' }}>ONYO-BT</h5>
          </div>
          <div className={classes.icons}>
            <span style={{ color: '#333', marginRight: '5px' }}>Salut {user?.user.nom}</span>
            <Badge badgeContent={4} color="secondary" className={classes.badge}>
              <Mail style={{ color: "#333" }} />
            </Badge>
            <Badge badgeContent={7} color="secondary" className={classes.badge}>
              <Notifications style={{ color: "#333" }} />
            </Badge>

            <button className="btn" onClick={deconnectHandle}>Déconnexion</button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar