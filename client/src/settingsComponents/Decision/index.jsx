import { useSettings } from '../../context/SettingsContext.jsx';

import UpdatePassword from './UpdatePassword.jsx';

import '../Dashboard/index.css';

function Decision() {
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
                    {/* <h4 className='mb-3'>Change Password</h4>
                    <form 
                        id="updatePasswordForm" 
                        className="text-light p-0 pt-4 form-floating needs-validation novalidate"
                        onSubmit={handleFormSubmit}
                        style={{ 
                            // border: '2px solid rgba(0, 255, 4, 0.1)' ,
                            borderTop: '1px solid hsl(0, 0.00%, 36%)',
                        }}
                    >
                        <div className='mb-3'>
                            <input 
                                className={`form-control ps-2 ${error && currentPWError ? 'is-invalid error' : 'decision-input'}`}
                                type="text" 
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                placeholder='Enter old password'
                                autoComplete="off"
                                style={{ width: '60%' }}
                                required
                            />
                            {error && incorrectPassword ? <div class="invalid-feedback error-feedback">Incorrect Password</div> : ''}
                        </div>
                        <div className='mb-3'>
                            <input 
                                className={`form-control ps-2 ${error && newPWError ? 'is-invalid error' : 'decision-input'}`}
                                type="text" 
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                placeholder='Enter new password'
                                autoComplete="off"
                                style={{ width: '60%' }}
                                required
                            />
                            {error && minChar ? <div className="invalid-feedback error-feedback">Password must be at least 8 characters long.</div> : ''}
                            {error && maxChar ? <div className="invalid-feedback error-feedback">Password cannot exceed 50 characters.</div> : ''}
                            {error && specialChar ? <div className="invalid-feedback error-feedback">Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.</div> : ''}
                        </div>
                        <div>
                            <input 
                                className={`form-control ps-2 ${error && confirmPWError ? 'is-invalid error' : 'decision-input'}`}
                                type="text" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder='Confirm new password'
                                autoComplete="off"
                                style={{ width: '60%' }}
                                required
                            />
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
                    </form> */}
                    {settingsSelection === 'updatePassword' ? (
                        <UpdatePassword />
                    ) : ''}
                </div>
            </div>
        </div>
    );
};

export default Decision;