import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard";
import Login from '../pages/Login';
import Transactions from '../pages/Transactions';

function RoutesElements() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/transaction' element={<Transactions />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesElements