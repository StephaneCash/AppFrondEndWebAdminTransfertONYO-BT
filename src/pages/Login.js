import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, FormControlLabel, Button, Typography, Link } from "@material-ui/core"
import Checkbox from '@mui/material/Checkbox';
import '../assets/Login.css';
import logo from '../images/logo.jpeg';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({})

  let navigate = useNavigate();

  const paperStyle = { padding: 20, height: 'auto', width: 340, margin: '20px auto' }
  const backgroundColorAvatar = {
    width: "50px"
  };
  const styleTextField = { marginBottom: '10px' }
  const ButtonStyle = { margin: '8px 0', backgroundColor: '#fd07070', color: '#fff' }

  const formControlLabel = {
    marginLeft: 0,
    marginBottom: '15px'
  }

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      setUser(res.data);
      if (res.data.jeton) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }
      console.log('RES : ', res.data);
      navigate('/dashboardTransfert', { state: res.data })
    } catch (err) {
      console.log(err)
      setError(err.response);
    }
  }

  return (
    <div className="login">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <img src={logo} style={backgroundColorAvatar} />
            <h2 className='mt-3'>S'identifier</h2>
          </Grid>

          <TextField placeholder="Nom d'utilisateur ou email"
            label="Username" fullWidth required
            className='mt-2' onChange={(e) => setEmail(e.target.value)}
          />
          <TextField className='mt-3' style={styleTextField} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}
            label="Mot de passe" type="password" fullWidth required />

          <FormControlLabel
            style={formControlLabel}
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="Se souvenir de moi"
          />

          <Button type="submit" variant="contained" onClick={handleSubmit} style={ButtonStyle} fullWidth>
            Se connecter
          </Button>
          <Typography>
            <Link href="#">
              Mot de passe oublié ?
            </Link>
          </Typography>

          <Typography> Avez-vous un compte ?
            <Link href="#">
              S'inscrire
            </Link>
          </Typography>
          {
            error.data ? <div className="alert alert-danger mt-1 mb-5">
              {error.data.message ? <h6 style={{ fontSize: "14px" }}>{error.data.message}</h6> : ""}
            </div> : <><div className='mt-5'></div><br /><br /></>
          }

        </Paper>
      </Grid>
    </div>
  )
}

export default Login