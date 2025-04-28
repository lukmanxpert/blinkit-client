import React from 'react'
import { Outlet } from 'react-router'

const Dashboard = () => {
    return (
        <div>
            <div></div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Dashboard