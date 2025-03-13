import { useSettings } from '../../context/SettingsContext.jsx';

import UpdatePassword from './UpdatePassword.jsx';
import DeleteUser from './DeleteUser.jsx';

function Decision({ user }) {
    const { settingsSelection } = useSettings();

    return (
        <div 
            className="p-0" 
        >
            <div className="container-fluid d-flex flex-column">

                <div className='text-light'>
                    {settingsSelection === 'updatePassword' ? (
                        <UpdatePassword />
                    ) : settingsSelection === 'deleteUser' ? (
                        <DeleteUser user={user}/>
                    ) : ''}
                </div>
            </div>
        </div>
    );
};

export default Decision;