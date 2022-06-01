

import React from 'react'
import { NavLink } from "react-router-dom"

const App = () => {
    return (
        <>
            <NavLink to='/contacts'>Contacts</NavLink>
            <NavLink to='/about'>A propos</NavLink>
        </>
    )
}

export default App