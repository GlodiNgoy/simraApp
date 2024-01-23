import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backgroundImage from './image.jpg';
import { GoogleLogin } from 'react-google-login';
//const client_id = "642282152016-vhutl900u76f6b22ifgigurkj359qtr3.apps.googleusercontent.com";

function Login() {
    const navigate = useNavigate();
    //  react hook form start here 
    const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm();
    const isAdmin = watch("isAdmin");


    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    //for seeing the data in the console bar
    //const onSubmit = (data) => console.log(data);
    // Add an error state variable
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangeUpdate = e => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleCheckboxChange = (e) => {
        setValue("isAdmin", e.target.checked);
    };



    // set up login button using gmail account
    const onSuccess = async () => {
        if (values.username === "" && values.password === "") {
            setLoginError('All fields should be filled');
            return;
        }
        // Show loading indicator
        setLoading(true);
        if (values.username === "") {
            console.log("Enter username");
            return;
        }
        if (values.password === "") {
            console.log("Enter password");
            return;
        }
        setLoading(false);
        // Send a GET request to your backend with the mobileNo
        try {
            let apiEndpoint;

            if (isAdmin !== undefined && isAdmin) {
                // If the checkbox is checked, use the admin login API
                apiEndpoint = `http://localhost:3001/api/login/admin/${values.username}`;
            } else {
                // If the checkbox is not checked, use the regular user login API
                apiEndpoint = `http://localhost:3001/api/login/${values.username}`;
            }

            console.log(apiEndpoint);
            const response = await axios.get(apiEndpoint);

            // Check if the response contains user data
            if (response.data.length > 0) {
                // Assuming you want to use the first user in the response
                const user = response.data[0];
                const { userId, password, level } = user;
                localStorage.setItem('userId', userId);
                const users = user.lastname;

                const admin = response.data[0];
                const { adminId } = admin;

                localStorage.setItem('adminId', adminId);

                const admins = admin.lastname;


                console.log('username', users)

                console.log('isAdmin value:', admins);

                // Check if the password matches
                if (password === values.password) {
                    if (values.isAdmin) {
                        console.log('Navigating to AdminHome');
                        // If the checkbox is checked, navigate to the admin home

                    }
                    else if (level === 1) {
                        navigate('/Home', { state: { userId } });

                    } else if (level === 2) {
                        navigate('/Level', { state: { userId } });
                    }
                    else if (level === 3) {
                        navigate('/Level3', { state: { userId } });
                    }
                    else {
                        //navigate('/Home', { state: { userId }});
                        navigate('/AdminHome', { state: { adminId: adminId } });
                    }

                } else {
                    setLoginError('Wrong username or password');
                }
            } else {
                setLoading(false);
                setLoginError('User not found');
            }
        } catch (error) {
            setLoading(false);
            console.error("Error while logging in:", error);
            setLoginError('An error occurred while attempting to log in.');
        }
    };
    return (
        <div className='login template' style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className='login template d-flex  justify-content-center align-items-center vh-100 background: #ffffff'>
                <div className='form_container p-5 rounded' style={{ background: 'rgba(255, 255, 255, 0.5)' }} >
                    <h3 className='text-center mb-5'><b>SIGN IN</b></h3>

                    <div className="mb-2 text-center" style={{ background: 'rgba(255, 255, 255)', height: '40px' }}>

                        <div className='mb-2 mt-2 '>
                            <label htmlFor="isAdmin" style={{ paddingRight: '30px' }}>SIGN IN AS ADMIN</label>
                            <input
                                type="checkbox"
                                {...register("isAdmin")}
                                checked={isAdmin}
                                onChange={handleCheckboxChange}
                                className="form-check-input"
                                style={{ borderColor: 'black' }}
                            />
                        </div>
                    </div>
                    <div className='mb-4 '>
                        <label htmlFor='username' className='lables'>Username</label> <br />
                        <input
                            type="text"
                            {...register('username', { required: true })}
                            onChange={handleChangeUpdate}
                            name='username'
                            value={values.username}
                            placeholder='Enter username'
                            className='form-control mt-2'
                        />
                        <small>
                            <error>
                                {errors.username && 'Username is required'}
                            </error>
                        </small>
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='password'>Password</label> <br />
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            onChange={handleChangeUpdate}
                            name='password'
                            value={values.password}
                            placeholder='Enter password '
                            className='form-control mt-2'
                        />
                        <small>
                            <error>
                                {errors.password && 'Password is required'}
                            </error>
                        </small>

                        <br></br>
                        {/*<div className='mt-2'>
                            <Link to='/forgot' className='ms-2 signup-link' >Forgot password ? </Link>
    </div>*/}
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-dark' onClick={handleSubmit(onSuccess)}>SIGN IN</button>
                    </div>
                    {loading && <p>Loading...</p>}
                    {loginError && !loading && <p className="error-message">{loginError}</p>} {/* Show error message only when not loading */}
                    <div className='mt-2'>
                        Don't have an account? <Link to="/Register" className='ms-2 signup-link'>SIGN UP</Link> 
                        <Link to="/" className='ms-2 signup-link'>GO BACK</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
