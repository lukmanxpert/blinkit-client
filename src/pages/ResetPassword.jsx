import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
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