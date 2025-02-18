import { useState} from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { CREATE_USER } from "../../../utils/mutations";

import Auth from '../../../utils/auth.js';

function Register() {
    // const [validation, setValidation] = useState({
    //     firstName: false,
    //     lastName: false,
    //     username: false,
    //     email: false,
    //     password: false
    // });

    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        // firstName: '',
        // lastName: '',
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

        if (value.trim() !== '') {
            setValidation({ ...validation, [name]: false})
        }
    };

    const handleNextStep = () => {
        if (formData.firstName.trim() === '') {
            setValidation({ ...validation, firstName: true});
            return;
        }
        else if (formData.lastName.trim() === '') {
            setValidation({ ...validation, lastName: true});
            return;
        }

        setCurrentStep(2);
      };
    
      const handlePrevStep = () => {
        setCurrentStep(1);
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (formData.email.trim() === '') {
            setValidation({ ...validation, email: true});
            return;
        }
        else if (formData.username.trim() === '') {
            setValidation({...validation, username: true});
            return;
        }
        else if (formData.password.trim() === '') {
            setValidation({...validation, password: true});
            return;
        }

        try {
            const { data } = await createUser({
                variables: {
                    input: {
                        ...formData
                    }
                }
            });

            // setFormData({
            //     firstName: '',
            //     lastName: '',
            //     username: '',
            //     email: '',
            //     password: ''
            // })
            Auth.login(data.createUser.token);
        } 
        catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
            {/* <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
                <div className="row w-100 justify-content-center">
                    <div className="col-12 col-md-5 d-flex justify-content-center align-items-center" style={{ paddingRight: '50px' }}>
                        <div className="text-center">
                            <h1>NoteNest</h1>
                            <p>Nest Your Ideas, Watch Them Grow</p> 
                        </div>
                    </div>

                    <div className="col-12 col-md-5" style={{ paddingLeft: '50px' }}>
                        <form className="border border-5 rounded p-4" onSubmit={handleFormSubmit}>
                            <h2 className="text-center mb-4">Create Account</h2> */}

                            {/* Step 1: First Name and Last Name */}
                            {/* {currentStep === 1 && (
                                <div className="row gy-3">
                                    <div className="col-12 has-validation">
                                        <input
                                        type="text"
                                        className={`form-control form-control-lg ${validation.firstName ? 'is-invalid' : ''}`}
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        style={{ fontSize: '16px' }}
                                        />
                                        <div id="validationServerFirstNameFeedback" className="invalid-feedback">
                                            Please enter your first name.
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <input
                                        type="text"
                                        className={`form-control form-control-lg ${validation.lastName ? 'is-invalid' : ''}`}
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        style={{ fontSize: '16px' }}
                                        />
                                        <div id="validationServerLastNameFeedback" className="invalid-feedback">
                                            Please enter your last name.
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button
                                            type="button"
                                            id="testBtn"
                                            className="btn btn-primary btn-lg w-100"
                                            onClick={handleNextStep}
                                        >
                                        Next
                                        </button>
                                    </div>
                                </div>
                            )} */}

                            {/* Step 2: Username, Email, Password */}
                            {/* {currentStep === 2 && (
                                <div className="row gy-3">
                                    <div className="col-12">
                                        <input
                                        type="email"
                                        className={`form-control form-control-lg ${validation.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        style={{ fontSize: '16px' }}
                                        />
                                        <div id="validationServerEmailFeedback" className="invalid-feedback">
                                            Please enter your email.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <input
                                        type="text"
                                        className={`form-control form-control-lg ${validation.username ? 'is-invalid' : ''}`}
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        style={{ fontSize: '16px' }}
                                        />
                                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                            Please enter your username.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <input
                                        type="password"
                                        className={`form-control form-control-lg ${validation.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        style={{ fontSize: '16px' }}
                                        />
                                        <div id="validationServerPasswordFeedback" className="invalid-feedback">
                                            Please enter your password.
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button
                                        type="button"
                                        className="btn btn-secondary btn-lg w-100"
                                        onClick={handlePrevStep}
                                        >
                                        Previous
                                        </button>
                                        <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100 mt-3"
                                        >
                                        Sign Up
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div> */}
            {/* <div className="container text-center" style={{ minHeight: '25vh' }}>Test</div> */}
        </>
    );
};

export default Register;