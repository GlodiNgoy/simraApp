// ForgotPassword.js
import React, { useState } from 'react';
import backgroundImage from './image.jpg';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    

    const handleSendCode = () => {
        // Implement logic to send a verification code to the provided phone number
        // You might use an API or other services for this purpose
        console.log(`Sending verification code to ${phoneNumber}`);
    };
    const onSuccess = () => {


        // Implement logic to verify the code and reset the password
        console.log(`Verifying code ${verificationCode} and resetting password to ${newPassword}`);
    };
    return (
        <div className='login template' style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className='login template d-flex  justify-content-center align-items-center vh-100 background: #ffffff'>
                <div className='form_container p-5 rounded' style={{ background: 'rgba(255, 255, 255, 0.5)' }} >
                    <h3 className='text-center mb-5'>Forgot Password</h3>
                    <div className='mb-4 '>
                        <label htmlFor='mobileNo' >Phone Number:</label> <br />
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            {...register("phoneNumber", { required: true, minLength: 10, maxLength: 12 })}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                        />
                        <small>
                            <error>
                                {errors.phoneNumber && 'phone number is required'}
                            </error>
                        </small>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit" onClick={handleSendCode}>Send Verification Code</button>
                        </div>
                    </div>
                    <div>
                        <label>Verification Code:</label> <br />
                        <input
                            type="text"
                            placeholder="Enter the verification code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            {...register("verificationCode", { required: true})}
                            className={`form-control ${errors.verificationCode ? "is-invalid" : ""}`}
                        />
                        <small>
                            <error>
                                {errors.verificationCode && 'verification code is required'}
                            </error>
                        </small>
                    </div>
                    <div>
                        <label htmlFor='password'>New Password:</label> <br />
                        <input
                            type="password"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            {...register("newPassword", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, })}
                            className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                        />
                        <small>
                            <error>
                                {errors.newPassword && 'Password is required'}
                            </error>
                        </small>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit" onClick={handleSubmit(onSuccess)}>Reset Password</button>
                        </div>
                        <br></br>
                        <div className='mt-2'>
                            DONE ? <Link to="/" className='ms-2 signup-link'>GO BACK</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
