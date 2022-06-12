import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Login from '../pages/Login';
import Transactions from '../pages/Transactions';
import AddTransaction from "../dialogs/AddTransaction";
import Users from "../pages/Users";
import Ressources from '../pages/Ressources';
import AddCode from '../dialogs/AddCode';

function RoutesElements() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboardTransfert' element={<Dashboard />} />
                <Route path='/transaction' element={<Transactions />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/transaction/addTransaction' element={<AddTransaction />} />
                <Route path='/users' element={<Users />} />
                <Route path='/ressources' element={<Ressources />} />
                <Route path='/ressources/add' element={<AddCode />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesElements