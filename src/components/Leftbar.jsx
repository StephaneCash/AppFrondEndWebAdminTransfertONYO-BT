import { Container, makeStyles } from "@material-ui/core";
import { Dashboard } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import SoapIcon from '@mui/icons-material/Soap';
import CameraIcon from '@mui/icons-material/Camera';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import '../assets/Leftbar.css';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        backgroundColor: "#efefef",
        height: "100vh",
        position: "fixed",
    }
}));

const Leftbar = () => {

    const classes = useStyles();

    const [showTransfet, setShowTransfert] = useState(false)
    const [changeBtn, setChangeBtn] = useState(false)
    const [deuxieme, setDeuxieme] = useState(false)
    const [troisieme, setTroisieme] = useState(false)

    const handleTransfert = () => {
        setShowTransfert(!showTransfet);
        setChangeBtn(!changeBtn);
    }

    useEffect(() => {
        handleTransfert()
    }, showTransfet)

    console.log('TRANSFERT ICON ETAT ::: ', showTransfet)

    return (
        <div className='leftbar'>
            <Container className={classes.container} id="conatiner">

                <div className='d-flex menu'>
                    <div className='d-flex'>
                        <div className='icon iconTransfert'>
                            {changeBtn ? <KeyboardControlKeyIcon className='iconTransf' onClick={handleTransfert} />
                                : <KeyboardArrowRightIcon className='iconTransf' onClick={handleTransfert} />}
                        </div>
                        <div className='text textTransfert' style={{fontSize: '20px' }}>Transfert</div>
                    </div>
                </div>

                {
                    showTransfet ?
                        <>
                            <div className='d-flex menu'>
                                <NavLink to='/dashboardTransfert'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><Dashboard /></div>
                                        <div className='text'>Dashboard</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/transaction'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><AttachMoneyIcon /></div>
                                        <div className='text'>Transaction</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/clients'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><CoPresentIcon /></div>
                                        <div className='text'>Clients</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><PublicIcon /></div>
                                        <div className='text'>Parténaires</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><SoapIcon /></div>
                                        <div className='text'>Ressources</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><CircleNotificationsIcon /></div>
                                        <div className='text'>Notifications</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/users'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><PeopleAltIcon /></div>
                                        <div className='text ml-4'>Users</div>
                                    </div>
                                </NavLink>
                            </div>
                        </> : ''

                }
                <hr />

                <div className='d-flex menu'>
                    <div className='d-flex'>
                        <div className='icon iconTransfert'>
                            {changeBtn ? <KeyboardControlKeyIcon className='iconTransf' onClick={handleTransfert} />
                                : <KeyboardArrowRightIcon className='iconTransf' onClick={handleTransfert} />}
                        </div>
                        <div className='text textTransfert' style={{fontSize: '20px' }}>Vidéos</div>
                    </div>
                </div>


                {
                    deuxieme ?
                        <>
                            <div className='d-flex menu'>
                                <NavLink to='/dashboard'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><Dashboard /></div>
                                        <div className='text'>Dashboard</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/postes'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><CameraIcon /></div>
                                        <div className='text'>Publications</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/clients'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><CoPresentIcon /></div>
                                        <div className='text'>Clients</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><SettingsIcon /></div>
                                        <div className='text'>Administrateurs</div>
                                    </div>
                                </NavLink>
                            </div>
                        </> : ''}

                        <hr />

                        <div className='d-flex menu'>
                    <div className='d-flex'>
                        <div className='icon iconTransfert'>
                            {changeBtn ? <KeyboardControlKeyIcon className='iconTransf' onClick={handleTransfert} />
                                : <KeyboardArrowRightIcon className='iconTransf' onClick={handleTransfert} />}
                        </div>
                        <div className='text textTransfert' style={{fontSize: '20px' }}>Live streaming</div>
                    </div>
                </div>

                {
                    troisieme ?
                        <>
                            <div className='d-flex menu'>
                                <NavLink to='/dashboard'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><Dashboard /></div>
                                        <div className='text'>Dashboard</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><AttachMoneyIcon /></div>
                                        <div className='text'>Transaction</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/clients'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><CoPresentIcon /></div>
                                        <div className='text'>Clients</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><SoapIcon /></div>
                                        <div className='text'>Ressources</div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='d-flex menu'>
                                <NavLink to='/as'>
                                    <div className='d-flex'>
                                        <div className='icon iconNav'><PeopleAltIcon /></div>
                                        <div className='text ml-4'>Users</div>
                                    </div>
                                </NavLink>
                            </div>
                        </> : ''}
            </Container>
        </div>
    );
}

export default Leftbar;