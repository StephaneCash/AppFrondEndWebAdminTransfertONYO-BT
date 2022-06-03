import React from 'react'
import { Grid, Paper, Avatar, TextField } from "@material-ui/core"
import LockIcon from '@mui/icons-material/Lock';
import '../assets/Login.css';

function Login() {

  const paperStyle = { padding: 20, height: '70vh', width: 340, margin: '20px auto' }
  const backgroundColorAvatar = { background: 'blue' };
  const styleTextField = { height: '11vh' }

  return (
    <div className="login">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={backgroundColorAvatar}> <LockIcon /></Avatar>
            <h2 className='mt-3'>S'identifier</h2>
          </Grid>

          <TextField style={styleTextField} placeholder="Nom d'utilisateur ou email" label="Username" fullWidth />

        </Paper>
      </Grid>
    </div>
  )
}

export default Login