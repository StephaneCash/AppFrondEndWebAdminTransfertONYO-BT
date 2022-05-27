import { Container, makeStyles } from "@material-ui/core";
import { Dashboard } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import SoapIcon from '@mui/icons-material/Soap';
import '../assets/Leftbar.css';

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

    return (
        <div className='leftbar'>
            <Container className={classes.container} id="conatiner">
                <div className='d-flex menu'>
                    <NavLink to='/dashboard'>
                        <div className='d-flex'>
                            <div className='icon'><Dashboard /></div>
                            <div className='text'>Dashboard</div>
                        </div>
                    </NavLink>
                </div>

                <div className='d-flex menu'>
                    <NavLink to='/transaction'>
                        <div className='d-flex'>
                            <div className='icon'><AttachMoneyIcon /></div>
                            <div className='text'>Transaction</div>
                        </div>
                    </NavLink>
                </div>

                <div className='d-flex menu'>
                    <NavLink to='/clients'>
                        <div className='d-flex'>
                            <div className='icon'><CoPresentIcon /></div>
                            <div className='text'>Clients</div>
                        </div>
                    </NavLink>
                </div>

                <div className='d-flex menu'>
                    <div className='icon'><PublicIcon /></div>
                    <div className='text'>Parténaires</div>
                </div>

                <div className='d-flex menu'>
                    <div className='icon'><SoapIcon /></div>
                    <div className='text'>Ressources</div>
                </div>

                <div className='d-flex menu'>
                    <div className='icon'><CircleNotificationsIcon /></div>
                    <div className='text'>Notifications</div>
                </div>

                <div className='d-flex menu'>
                    <NavLink to='/users'>
                        <div className='d-flex'>
                            <div className='icon'><PeopleAltIcon /></div>
                            <div className='text ml-4'>Users</div>
                        </div>
                    </NavLink>
                </div>
            </Container>
        </div>
    );
}

export default Leftbar;