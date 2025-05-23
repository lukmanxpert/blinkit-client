import useIsAdmin from '../hooks/useIsAdmin';
import { useSelector } from 'react-redux';

const AdminPermission = ({ children }) => {
    const user = useSelector(state => state.user)
    if (useIsAdmin(user.role)) {
        return children
    }
    return <div>
        <p className='bg-red-200'>You do not have permission to access.</p>
    </div>
};

export default AdminPermission;