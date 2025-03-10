import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { useSettings } from '../../context/SettingsContext.jsx';

import { QUERY_ME } from '../../utils/queries';
import { UPDATE_PASSWORD } from '../../utils/mutations';

import './index.css';

function UpdatePassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const { setSettingsSelection } = useSettings();

    const [updatePassword, { error }] = useMutation(UPDATE_PASSWORD, {
        refetchQueries: [
            QUERY_ME
        ]
    });

    const currentPWError = error?.message === 'Incorrect password';
    const newPWError = error?.message?.includes('character');
    const confirmPWError = error?.message === 'Passwords do not match';

    const incorrectPassword = error?.message === 'Incorrect password';
    const minChar = error?.message === 'Password must be at least 8 characters long.';
    const maxChar = error?.message === 'Password cannot exceed 50 characters.';
    const specialChar = error?.message === 'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.';
    const noMatch = error?.message === 'Passwords do not match';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (error) {
            error.message = null;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await updatePassword({
                variables: {
                    input: {
                        ...formData
                    }
                }
            });
            setSettingsSelection('');
            navigate('/');
        } 
        catch (err) {
            console.error(err);
        }
    }

    const handleCancelForm = () => {
        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });

        if (error) {
            error.message = null;
        }
    }


    return (
        <>
            <h4 className='mb-3'>Change Password</h4>
            <form 
                id="updatePasswordForm" 
                className="text-light p-0 pt-4 needs-validation"
                onSubmit={handleFormSubmit}
                style={{ 
                    borderTop: '1px solid hsl(0, 0.00%, 36%)',
                }}
            >
                <div className='mb-3 form-floating'>
                    <input 
                        id="currentPWInput"
                        className={`form-control ${error && currentPWError ? 'is-invalid error' : 'decision-input'}`}
                        type="password" 
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder='Enter old password'
                        autoComplete="off"
                        style={{ width: '60%' }}
                        required
                    />
                    <label for="currentPWInput" style={{ color: 'grey' }}>Enter old password</label>
                    {error && incorrectPassword ? <div class="invalid-feedback error-feedback">Incorrect Password</div> : ''}
                </div>
                <div className='mb-3 form-floating'>
                    <input 
                        id="newPWInput"
                        className={`form-control ${error && newPWError ? 'is-invalid error' : 'decision-input'}`}
                        type="password" 
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder='Enter new password'
                        autoComplete="off"
                        style={{ width: '60%' }}
                        required
                    />
                    <label for="newPWInput" style={{ color: 'grey' }}>Enter new password</label>
                    {error && minChar ? <div className="invalid-feedback error-feedback">Password must be at least 8 characters long.</div> : ''}
                    {error && maxChar ? <div className="invalid-feedback error-feedback">Password cannot exceed 50 characters.</div> : ''}
                    {error && specialChar ? <div className="invalid-feedback error-feedback">Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.</div> : ''}
                </div>
                <div className='form-floating'>
                    <input 
                        id="confirmPWInput"
                        className={`form-control ${error && confirmPWError ? 'is-invalid error' : 'decision-input'}`}
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder='Confirm new password'
                        autoComplete="off"
                        style={{ width: '60%' }}
                        required
                    />
                    <label for="confirmPWInput" style={{ color: 'grey' }}>Confirm new password</label>
                    {error && noMatch ? <div className="invalid-feedback error-feedback">Passwords do not match</div> : ''}
                </div>
                <div className="mt-3">
                    <button 
                        form="updatePasswordForm"
                        className="btn text-light me-3 settings-save-btn"
                        type="submit"
                    >
                        Save Changes
                    </button>
                    <button 
                        type="button" 
                        className="btn text-light settings-discard-btn" 
                        onClick={() => handleCancelForm()}
                    >
                        Discard Changes
                    </button>
                </div>
            </form>
        </>
    );
};

export default UpdatePassword;