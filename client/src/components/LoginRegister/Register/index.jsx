import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../../../utils/mutations.js';

import Auth from '../../../utils/auth.js';

function Register({ setAccountStep }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });

    const [createUser, { error, data }] = useMutation(CREATE_USER);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleNextStep = (e) => {
        e.preventDefault();
        setCurrentStep(2);
    };

    const handlePrevStep = () => {
        setCurrentStep(1);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await createUser({
                variables: {
                    input: {
                        ...formData
                    }
                }
            });

            Auth.login(data.createUser.token);
        } 
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row w-100 justify-content-center flex-column flex-md-row">
                <div className="col-12 col-md-5 d-flex justify-content-center align-items-center text-center text-md-start pe-md-5">
                    <div className="text-center">
                        <h1 className='text-light'>NoteNest</h1>
                        <p style={{ color: '#F63366' }}>Nest Your Ideas, Watch Them Grow</p> 
                    </div>
                </div>

                <div className="col-12 col-md-5 ps-md-5">

                    <form className="border border-5 rounded p-4 position-relative" onSubmit={currentStep === 1 ? handleNextStep : handleFormSubmit}>
                        <h2 className="text-center mb-4 text-light">Create Account</h2>
                        <div className="row gy-3">
                            {currentStep === 1 && (
                                <>
                                    <div className="col-12 has-validation">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="firstName"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg w-100"
                                            style={{ backgroundColor: '#F63366', borderColor: '#ba0837' }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <div className="col-12">
                                        <p className="text-center text-light">
                                            {'Already have an account?' + ' '} 
                                                <span 
                                                    onClick={() => setAccountStep('login')} 
                                                    style={{ cursor: 'pointer', textDecoration: 'underline', color: '#F63366' }}
                                                >
                                                    Login
                                                </span>
                                        </p>
                                        {error && <div className="alert alert-danger">{error.message}</div>}
                                    </div>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <div className="col-12">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="username"
                                            name="username"
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-lg w-100 text-dark"
                                            onClick={handlePrevStep}
                                            style={{ backgroundColor: '#c2c2c2', borderColor: '#a8a8a8' }}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg w-100 mt-3"
                                            style={{ backgroundColor: '#F63366', borderColor: '#ba0837' }}
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <div className="position-relative m-4 mx-auto" style={{ width: '50%' }}>
                            <div 
                                className="progress" 
                                role="progressbar" 
                                aria-valuenow={currentStep === 1 ? "50" : "100"} 
                                aria-valuemin="0" 
                                aria-valuemax="100" 
                                style={{ height: '1px' }}
                            >
                                <div 
                                    className="progress-bar" 
                                    style={{ 
                                        background: 'linear-gradient(to right, #59041b, #F63366)',
                                        width: currentStep === 1 ? '50%' : '100%', 
                                        transition: 'width 0.5s ease-in-out'
                                    }}
                                ></div>
                            </div>
                            <button 
                                type="button" 
                                className='position-absolute top-0 start-0 translate-middle btn btn-sm rounded-pill' 
                                style={{ 
                                    backgroundColor:'#F63366',
                                    width: '2rem', 
                                    height: '2rem' }}
                            >1</button>
                            <button 
                                type="button" 
                                className='position-absolute top-0 start-100 translate-middle btn btn-sm rounded-pill' 
                                style={{ 
                                    backgroundColor: currentStep === 2? '#F63366' : '#c2c2c2',
                                    width: '2rem', 
                                    height: '2rem' }}
                            >2</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;