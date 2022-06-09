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
  const [clic, setClic] = useState(false);

  let navigate = useNavigate();

  const paperStyle = { padding: 20, height: '70vh', width: 340, margin: '20px auto' }
  const backgroundColorAvatar = {
    width: "50px"
  };
  const styleTextField = { marginBottom: '10px' }
  const ButtonStyle = { margin: '8px 0' }

  const formControlLabel = {
    marginLeft: 0,
    marginBottom: '15px'
  }

  const handleSubmit = async (e) => {
    setClic(true);
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      setUser(res.data);
      navigate('/dashboard', { state: res.data })
    } catch (error) {
      console.log(error)
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
          <TextField style={styleTextField} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}
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

          <Button type="submit" variant="contained" onClick={handleSubmit} style={ButtonStyle} color='primary' fullWidth>
            {clic ? "Se connecter..." : "Se connecter"}
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
        </Paper>
      </Grid>
    </div>
  )
}

export default Login