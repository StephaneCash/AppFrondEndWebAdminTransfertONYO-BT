import React from 'react'
import { Grid, Paper, Avatar, TextField, FormControlLabel, Button, Typography, Link } from "@material-ui/core"
import LockIcon from '@mui/icons-material/Lock';
import Checkbox from '@mui/material/Checkbox';
import '../assets/Login.css';

function Login() {

  const paperStyle = { padding: 20, height: '70vh', width: 340, margin: '20px auto' }
  const backgroundColorAvatar = { background: 'blue' };
  const styleTextField = { marginBottom: '10px' }
  const ButtonStyle = { margin: '8px 0' }

  const formControlLabel = {
    marginLeft: 0,
    marginBottom: '15px'
  } 
 
  return (
    <div className="login">
      <Grid> 
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={backgroundColorAvatar}> <LockIcon /></Avatar>
            <h2 className='mt-3'>S'identifier</h2>
          </Grid>

          <TextField placeholder="Nom d'utilisateur ou email"
            label="Username" fullWidth required
            className='mt-2'
          />
          <TextField style={styleTextField} placeholder="Mot de passe"
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

          <Button type="submit" variant="contained" style={ButtonStyle} color='primary' fullWidth>Se connecter</Button>
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