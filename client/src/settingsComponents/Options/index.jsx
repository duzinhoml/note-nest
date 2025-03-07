import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext.jsx';

import Auth from '../../utils/auth.js';

import '../Dashboard/index.css';
// import '../../testComponents/Sidebar/index.css';
import './index.css';

function Notes() {
    const navigate = useNavigate();
    const { settingsSelection, setSettingsSelection } = useSettings();

    const toggleSettingsSelection = (option) => {
        if (settingsSelection === option) {
            setSettingsSelection('');
        }
        else {
            setSettingsSelection(option)
        }
    }

    return (
        <div 
            className="p-0 pt-3 settings-notes" 
            style={{ 
                borderTop: '1px solid hsl(0, 0.00%, 36%)',
            }}
        >
            <div className="container-fluid d-flex flex-column">
                <ul className="list-group list-group-flush">
                    <li className={`list-group-item ml-background ${settingsSelection === 'updatePassword' ? 'settings-options d-flex justify-content-between' : ''} text-light rounded settings-interact border-bottom-0`} onClick={() => toggleSettingsSelection('updatePassword')}>
                        <div>
                            <span className="me-2"><i class="fa-solid fa-lock" style={{ color: settingsSelection === 'updatePassword' ? '#F63366' : '#f8f9fa' }}></i></span>
                            Change Password
                        </div>
                        {settingsSelection === 'updatePassword' ? (<span><i class="fa-solid fa-chevron-right" style={{ color: '#F63366' }}></i></span>) : ''}
                    </li>
                    <li className={`list-group-item ml-background ${settingsSelection === 'deleteUser' ? 'settings-options d-flex justify-content-between' : ''} text-light rounded settings-interact border-bottom-0`} onClick={() => toggleSettingsSelection('deleteUser')}>
                        <div>
                            <span className="me-2"><i class="fa-solid fa-user" style={{ color: settingsSelection === 'deleteUser' ? '#F63366' : '#f8f9fa', marginLeft: '1px' }}></i></span>
                            Delete Account
                        </div>
                        {settingsSelection === 'deleteUser' ? (<span><i class="fa-solid fa-chevron-right" style={{ color: '#F63366' }}></i></span>) : ''}
                    </li>

                    <hr style={{ color: 'hsl(0, 0.00%, 100%)' }}/>

                    <li className={`list-group-item text-light rounded settings-logout border-bottom-0`} onClick={() => Auth.logout()}>
                        <span className="me-2" style={{ marginLeft: '1px' }}><i class="fa-solid fa-right-from-bracket"></i></span>
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Notes;