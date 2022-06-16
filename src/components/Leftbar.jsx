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

    //console.log('TRANSFERT ICON ETAT ::: ', showTransfet)

    return (
        <div className="menuLeft">
            <div className="vertical-menu">
                <NavLink to="/dashboardTransfert" > <i className="fa fa-dashboard"></i> Dashboard</NavLink>
                <NavLink to="/transaction"><i className="fa fa-user-secret"></i>Transaction</NavLink>
                <NavLink to="/config"> <i className="fa fa-gear"></i> Configuration</NavLink>
                <NavLink to="/"><i className="fa fa-sign-out"></i> Déconnection</NavLink>
            </div>
        </div>
    );
}

export default Leftbar;