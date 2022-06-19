import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Login from '../pages/Login';
import Transactions from '../pages/Transactions';
import AddTransaction from "../dialogs/AddTransaction";
import Users from "../pages/Users";
import Ressources from '../pages/Ressources';
import Partenaires from '../pages/Partenaires';
import AddCode from '../dialogs/AddCode';
import Inscription from '../pages/Inscription';
import AccueilPartenaire from '../pages/AccueilPartenaire';
import Categories from '../pages/Categories';
import Comptes from '../pages/Comptes';
import ConfigVideo from '../pages/ConfigVideo';
import Video from '../pages/Video';
import PageNonFound from '../pages/PageNonFound';
import CorbeilleCodes from "../pages/CorbeilleCodes";


function RoutesElements() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/dashboardTransfert' element={<Dashboard />} />
                <Route path='/transaction' element={<Transactions />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/transaction/addTransaction' element={<AddTransaction />} />
                <Route path='/users' element={<Users />} />
                <Route path='/ressources' element={<Ressources />} />
                <Route path='/ressources/add' element={<AddCode />} />
                <Route path='/partenaires' element={<Partenaires />} />
                <Route path='/accueil' element={<AccueilPartenaire />} />


                <Route path='/inscription' element={<Inscription />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/comptes" element={<Comptes />} />
                <Route path='/config' element={<ConfigVideo />} />
                <Route path='/videos' element={<Video />} />

                <Route path='*' element={<PageNonFound />} />
                <Route path='/corbeilleCodes' element={<CorbeilleCodes />} />   
            </Routes>
        </BrowserRouter>
    )
}
export default RoutesElements