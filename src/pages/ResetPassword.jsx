import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const ResetPassword = () => {
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }
        if (location?.state?.email) {
            setData((prevData)=>({...prevData, email: location.state.email}))
        }
    }, [])
    console.log(location);
    return (
        <div>
            Reset password
        </div>
    );
};

export default ResetPassword;