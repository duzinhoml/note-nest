import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useMutation } from "@apollo/client";
import { useSettings } from "../../context/SettingsContext.jsx";

import { DELETE_USER } from "../../utils/mutations";

import Auth from '../../utils/auth.js';

// import './index.css';

function DeleteUser({ user }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        confirmDelete: ''
    });

    const { setSettingsSelection } = useSettings();


    const [deleteUser, { error }] = useMutation(DELETE_USER);

    const confirmDeleteError = error?.message === 'Incorrect confirmation';

    const handleInputChange = (e) => {
        const { value } = e.target;
        setFormData({
            confirmDelete: value
        });

        if (error) {
            error.message = null;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await deleteUser({
                variables: {
                    confirmDelete: formData.confirmDelete
                }
            });

            if (formData.confirmDelete === user.username) {
                Auth.logout();
                setFormData({
                    confirmDelete: ''
                });
            }
        } 
        catch (err) {
            console.error(err);
        }
    };

    const handleCancelForm = () => {
        setFormData({
            confirmDelete: ''
        });

        if (error) {
            error.message = null;
        }
    };

    const goBack = () => {
        setFormData({
            confirmDelete: ''
        });
        
        setSettingsSelection('');
        navigate('/');
    }

    return (
        <>
            <div className="my-3 d-flex align-items-center justify-content-between">
                <div className="ms-1" onClick={() => goBack()}>
                    <button className="btn text-light px-0 small-cancel-note">
                        <span className="me-2"><i className="fa-solid fa-angle-left"></i></span>
                        <span>Go Back</span>
                    </button>
                </div>
            </div>

            <h4 className='mb-3'>Delete Account</h4>
            <form 
                id="deleteUserForm" 
                className="text-light p-0 pt-4 needs-validation"
                onSubmit={handleFormSubmit}
                style={{ 
                    borderTop: '1px solid hsl(0, 0.00%, 36%)',
                }}
            >
                <div>
                    <p>
                        Are you sure you want to delete your account? <br />
                        This action is irreversible, and all your notes will be <span className="delete-message">permanently</span> deleted.
                    </p>
                </div>
                <div className='mb-3 form-floating'>
                    <input 
                        id="confirmDeleteInput"
                        className={`form-control ${error && confirmDeleteError ? 'is-invalid error' : 'decision-input'}`}
                        type="text" 
                        name="confirmDelete"
                        value={formData.confirmDelete}
                        onChange={handleInputChange}
                        placeholder={`To confirm, type "${user.username}"`}
                        autoComplete="off"
                        // style={{ width: '60%' }}
                        required
                    />
                    <label htmlFor="confirmDeleteInput" style={{ color: 'grey' }}>{`To confirm, type "${user.username}"`}</label>
                    {error ? <div className="invalid-feedback error-feedback">{error.message}</div> : ''}
                </div>
                <div className="mt-3">
                    <button 
                        form="deleteUserForm"
                        className="btn text-light me-3 settings-save-btn"
                        type="submit"
                    >
                        Delete Account
                    </button>
                    <button 
                        type="button" 
                        className="btn text-light settings-discard-btn" 
                        onClick={() => handleCancelForm()}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
};

export default DeleteUser;