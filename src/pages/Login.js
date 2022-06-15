import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, FormControlLabel, Button, Typography, Link } from "@material-ui/core"
import Checkbox from '@mui/material/Checkbox';
import '../assets/Login.css';
import logo from '../images/logo.jpeg';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";


function Login() {

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({})

  let navigate = useNavigate();

  const paperStyle = { padding: 20, height: 'auto', width: 340, margin: '20px auto', backgroundColor: 'white' }
  const backgroundColorAvatar = {
    width: "50px"
  };
  const styleTextField = { marginBottom: '10px' }
  const ButtonStyle = { margin: '8px 0', backgroundColor: 'red', color: '#fff', boxShadow: 'none', content: 'Se connecter' }

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
          <Grid align="center" style={{ backgroundColor: 'white' }}>
            <img src={logo} style={backgroundColorAvatar} />
            <h4 className='mt-3'>S'identifier</h4>
          </Grid>

          <div className="form-group mt-4">
            <label className="mt-1">Entrer votre adresse email</label>
            <input placeholder="Nom d'utilisateur ou email" required
              className='form-control mt-1' onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group mt-2">
            <label>Votre mot de passe</label>
            <input className='form-control mt-1' style={styleTextField} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}
              required />
          </div>

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

          <input type="submit" className='form-control' value="Se connecter" onClick={handleSubmit} style={ButtonStyle} />

          <Typography>
            <Link href="#">
              Mot de passe oublié ?
            </Link>
          </Typography>


          <Typography>
            N'avez-vous pas un compte ? <NavLink to="/inscription">
              S'inscrire
            </NavLink>
          </Typography>
          {
            error.data ? <div className="alert alert-danger mt-1 mb-5" style={{ backgroundColor: 'white', color: 'red' }}>
              {error.data.message ? <h6 style={{ fontSize: "14px" }}>{error.data.message}</h6> : ""}
            </div> : <><div className='mt-5'></div><br /><br /></>
          }

        </Paper>
      </Grid>
    </div>
  )
}

export default Login