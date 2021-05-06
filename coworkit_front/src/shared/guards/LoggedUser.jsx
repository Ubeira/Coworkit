import React from 'react'
import PrivateRoute from './PrivateRoute'
import ShowToLoggedInUsers from './ShowToLoggedInUsers'

export default function LoggedUser({children}) {
    return (
        <PrivateRoute>
        <ShowToLoggedInUsers>
            {children}
        </ShowToLoggedInUsers>
        </PrivateRoute>


    )
}
