import { useSettings } from '../../context/SettingsContext.jsx';

import UpdatePassword from './UpdatePassword.jsx';
import DeleteUser from './DeleteUser.jsx';

import '../Dashboard/index.css';

function Decision({ user }) {
    const { settingsSelection } = useSettings();

    return (
        // Removed 'col-3'
        <div 
            className="p-0 pt-4 ps-4 settings-decision" 
            style={{ 
                // border: '5px solid rgba(0, 255, 4, 0.1)',
                borderTop: '1px solid hsl(0, 0.00%, 36%)',
            }}
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