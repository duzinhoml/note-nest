import { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { CREATE_USER } from "../../../utils/mutations";

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });

    const [createUser, { error }] = useMutation(CREATE_USER);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        // e.preventDefault();

        try {
            await createUser({
                variables: {
                    input: {
                        ...formData
                    }
                }
            });

            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: ''
            })

        } 
        catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <h1>Register Component</h1>
            <form class="row g-3" onSubmit={handleFormSubmit}>
                <div class="col-md-4">
                    <label for="validationDefault01" class="form-label">First name</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="validationDefault01"
                        name='firstName'
                        placeholder="Please enter first name..."
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />

                    {/* 
                        type="text" 
                        className="form-control" 
                        id="folderTitleInput" 
                        name="title"
                        placeholder="Please enter a folder name..." 
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                                         */}

                </div>
                <div class="col-md-4">
                    <label for="validationDefault02" class="form-label">Last name</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="validationDefault02" 
                        name='lastName'
                        placeholder="Please enter last name..."
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class="col-md-4">
                    <label for="validationDefaultUsername" class="form-label">Email</label>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroupPrepend2">@</span>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="validationDefaultUsername" 
                            aria-describedby="inputGroupPrepend2" 
                            name='email'
                            placeholder="Please enter email..."
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationDefault03" class="form-label">Username</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="validationDefault03" 
                        name='username'
                        placeholder="Please enter username..."
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class="col-md-6">
                    <label for="validationDefault05" class="form-label">Password</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="validationDefault05" 
                        name='password'
                        placeholder="Please enter password..."
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Submit form</button>
                </div>
            </form>
        </>
    );
};

export default Register;