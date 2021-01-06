import React, { useContext,useState,useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';



const Dashboard = () => {
    const { currentUser, userProfile } = useContext(AuthContext)
    const [flag, setFlag] = useState(0)
    useEffect(() => {
        setFlag(flag+1)
    }, [userProfile])

    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) { 
            return <Redirect to='/creategroup' />
        }
    }
    else {
            return <Redirect to='/' />
        }
    return <div></div>
}

export default Dashboard;