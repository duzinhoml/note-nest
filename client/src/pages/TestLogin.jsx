import { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";

import { LOGIN_USER } from "../utils/mutations";

import Auth from '../utils/auth.js';

function TestLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
          const { data } = await login({
            variables: { ...formData }
          });

          Auth.login(data.login.token);
        } 
        catch (err) {
            console.error(err);
        }

        setFormData({
            username: '',
            password: ''
        });
    };

    return (
        <div className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Login</h4>
                    <div className="card-body">
                        {data ? (
                        <p>
                            Success! You may now head{' '}
                            {/* <Link to="/">back to the homepage.</Link> */}
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
        </div>
    );
};

export default TestLogin;