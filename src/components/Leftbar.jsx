import { Dashboard } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import '../assets/Leftbar.css';
import { useState, useEffect } from "react";
import roleUser from '../auth/roleUser';


const Leftbar = () => {

    const [showTransfet, setShowTransfert] = useState(false)
    const [changeBtn, setChangeBtn] = useState(false);

    const handleTransfert = () => {
        setShowTransfert(!showTransfet);
        setChangeBtn(!changeBtn);
    }

    useEffect(() => {
        handleTransfert()
    }, [])

    return (
        <div className="menuLeft">
            <div className="vertical-menu">
                {roleUser().role === 'Partenaire'
                    ? <NavLink to="/accueil" >
                        <div className='d-flex'>
                            <div className="icon"><i className="fa fa-home"></i> </div>
                            <div className="text"> Accueil</div>
                        </div>
                    </NavLink> : ''
                }

                {roleUser().role === 'Admin' ?
                    <>
                        <NavLink to="/dashboardTransfert" >
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-dashboard"></i> </div>
                                <div className="text"> Dashboard</div>
                            </div>
                        </NavLink>
                        <NavLink to="/transaction">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-usd"></i></div>
                                <div className="text">Transaction</div>
                            </div>
                        </NavLink>
                        <NavLink to="/partenaires">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-users"></i></div>
                                <div className="text">Partenaires</div>
                            </div>
                        </NavLink>

                        <NavLink to="/ressources">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-key"></i></div>
                                <div className="text">Générateur codes</div>
                            </div>
                        </NavLink>

                        <NavLink to="/corbeilleCodes">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-lock"></i></div>
                                <div className="text">Corbeille codes</div>
                            </div>
                        </NavLink>

                        <NavLink to="/categories">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-list-alt"></i></div>
                                <div className="text">Catégories</div>
                            </div>
                        </NavLink>

                        <NavLink to="/config">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-cog"></i></div>
                                <div className="text">Configuration Vidéos</div>
                            </div>
                        </NavLink>

                        <NavLink to="/users">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-user"></i></div>
                                <div className="text">Users</div>
                            </div>
                        </NavLink>

                        <NavLink to="/videos">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-video-camera"></i></div>
                                <div className="text">Vidéos</div>
                            </div>
                        </NavLink>
                        <NavLink to="/comptes">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-lock"></i></div>
                                <div className="text">Comptes</div>
                            </div>
                        </NavLink>
                    </> : <>
                        <NavLink to="/transaction">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-usd"></i></div>
                                <div className="text">Transaction</div>
                            </div>
                        </NavLink>
                        <NavLink to="/comptes">
                            <div className='d-flex'>
                                <div className="icon"><i className="fa fa-lock"></i></div>
                                <div className="text">Comptes</div>
                            </div>
                        </NavLink>

                    </>
                }


            </div>
        </div>
    );
}

export default Leftbar;