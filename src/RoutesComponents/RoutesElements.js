import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Login from '../pages/Login';
import Transactions from '../pages/Transactions';
import AddTransaction from "../dialogs/AddTransaction";

function RoutesElements() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/transaction' element={<Transactions />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/addTransaction' element={<AddTransaction />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesElements