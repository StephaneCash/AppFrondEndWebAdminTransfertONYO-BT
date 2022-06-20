import React, { useState } from 'react'
import { Grid, Paper, Typography } from "@material-ui/core"
import '../assets/Login.css';
import logo from '../images/logo.jpeg';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";


function Inscription() {

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [passRepete, setPassRepete] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({})
    const [role, setRole] = useState('Partenaire');

    let navigate = useNavigate();

    const paperStyle = { padding: 20, height: 'auto', width: 340, margin: '20px auto', backgroundColor: 'white' }
    const backgroundColorAvatar = {
        width: "50px"
    };
    const styleTextField = { marginBottom: '10px' }
    const ButtonStyle = { margin: '8px 0', backgroundColor: 'red', color: '#fff', boxShadow: 'none', content: 'Se connecter' }

    const selectHandle = (e) => {
        setRole(e.target.value)
    }
    
    const handleSubmit = async (e) => {

        try {
            if (password === passRepete) {
                const res = await axios.post('http://localhost:5000/api/users', { email, password, nom, role });
                swal({ title: "Succès", icon: 'success', text: res.data.message });
                navigate('/');
            } else {
                swal({ title: "Avertissement", icon: 'warning', text: "Les deux mots de passe ne correspondent pas." });
            }
        } catch (err) {
            console.log(err)
            setError(err.response);
        }

    }

    const handlePassRepete = (e) => {
        setPassRepete(e.target.value)
    }

    return (
        <div className="login">
            <Grid>
                <Paper elevation={12} style={paperStyle}>
                    <Grid align="center" style={{ backgroundColor: 'white' }}>
                        <img src={logo} style={backgroundColorAvatar} />
                        <h4 className='mt-3'>S'inscrire</h4>
                    </Grid>

                    <div className='form-group mt-4'>
                        <label>Entrer le nom</label>
                        <input placeholder="Le nom"
                            required className='mt-1 form-control' onChange={(e) => setNom(e.target.value)}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Entrer une adresse email</label>
                        <input placeholder="Adresse email"
                            required className='form-control mt-1' onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Créer un mot de passe</label>
                        <input className='form-control mt-1' placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}
                            label="Mot de passe" type="password" required />
                    </div>


                    <div className='form-group'>
                        <label>Répéter le mot de passe</label>
                        <input className='mt-1 form-control' placeholder="Répéter le mot de passe"
                            onChange={(e) => handlePassRepete(e)} type="password" required />
                    </div>

                    {passRepete && password && email && nom ? <input type="submit" className='form-control mt-3' value="S'inscrire" onClick={handleSubmit} style={ButtonStyle} /> :
                        <input type="submit" className='form-control mt-3' disabled value="S'inscrire" />
                    }

                    <Typography>
                        Avez-vous un compte ? <NavLink to="/">
                            Connectez-vous
                        </NavLink>
                    </Typography>
                    {
                        error.data ? <div className="alert alert-danger mt-1 mb-5" style={{ backgroundColor: 'white', color: 'red' }}>
                            {error.data ? <h6 style={{ fontSize: "14px" }}>{error.data}</h6> : ""}
                            {password !== passRepete ? "Les deux mots de passe ne correspondent" : ''}
                        </div> : <><div className='mt-5'></div><br /><br /></>
                    }

                </Paper>
            </Grid>
        </div>
    )
}

export default Inscription