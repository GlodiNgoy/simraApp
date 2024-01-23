import React from 'react';
import './Registration.css';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './image.jpg';


function RegisterForm() {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  //const isAdmin = watch("isAdmin");

  // Custom validation function to check for non-whitespace characters
  const isNotEmpty = (value) => value.trim() !== '';
  const doesNotStartWithWhitespace = (value) => value[0] !== ' ';

  const onSuccess = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      return alert('PASSWORDS DO NOT MATCH, PLEASE ENTER A VALID PASSWORD AND CONFIRM PASSWORD!!!!'), {
        style: {
          backgroungColor: '#f00',
          color: '#fff',
        },
      }
    }
    try {
      /*let apiUrl = 'http://localhost:3001/api/register';

    if (isAdmin) {
      apiUrl += '/admin';
    }*/

      const response = await axios.post('http://localhost:3001/api/register', formData);
      console.log(response.data.message);
      //alert(isAdmin ? 'ADMIN REGISTERED SUCCESSFULLY!' : 'USER REGISTERED SUCCESSFULLY!');
      alert('USER REGISTERED SUCCESSFULLY!');
      navigate('/Login');
    } catch (error) {
      if (error.response.status === 400 && error.response.data.message === 'Mobile number already registered') {
        alert('WE ARE SORRY !!! THE MOBILE NUMBER IS ALREADY REGISTERED!. PLEASE USE A DIFFERENT NUMBER.');
      } else {
        console.error('Error during registration:', error);
      }
      console.error('Error during registration:', error);
    }

  };
  // Custom validation function to check for a valid phone number format
  const isPhoneNumberValid = (value) => {
    // Use a regex pattern to check if the phone number matches the desired format
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
  };
  return (
    <div className='login template' style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className="signup template d-flex justify-content-center align-items-center vh-80 background: #ffffff;">
        <div className="form_container p-5 rounded" style={{ background: 'rgba(255, 255, 255, 0.5)', width: '600px' }}>
          <h3 className="text-center mt-5 ">
            <b>SIGN UP</b>
          </h3>
          <form onSubmit={handleSubmit(onSuccess)} className="w-100" style={{ background: 'rgba(255, 255, 255,0.3)' }}>

            <div className="mb-2">
              <label htmlFor="firstname" >Firstname</label> <br />
              <input
                type="text"
                placeholder="Enter your firstname"
                {...register("firstname", { required: true, validate: { isNotEmpty, doesNotStartWithWhitespace } })}
                className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
              />
              {errors.firstname && (
                <div className="invalid-feedback">
                  {errors.firstname.type === "required" && "Firstname is required"}
                  {errors.firstname.type === "isNotEmpty" && "Firstname cannot be just whitespace"}
                  {errors.firstname.type === "doesNotStartWithWhitespace" && "Firstname cannot start with whitespace"}
                </div>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="lastname" >Lastname</label> <br />
              <input
                type="text"
                placeholder="Enter your lastname"
                {...register("lastname", { required: true, validate: { isNotEmpty, doesNotStartWithWhitespace } })}
                className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
              />
              {errors.lastname && (
                <div className="invalid-feedback">
                  {errors.lastname.type === "required" && "lastname is required"}
                  {errors.lastname.type === "isNotEmpty" && "lastname cannot be just whitespace"}
                  {errors.lastname.type === "doesNotStartWithWhitespace" && "lastname cannot start with whitespace"}
                </div>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="password" >Password</label> <br />
              <input
                type="password"
                {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, })}
                placeholder="Enter your password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              {errors.password && <div className="invalid-feedback">Password is required and must 8 digit also contain at least one letter and one number</div>}

            </div>
            <div className="mb-2">
              <label htmlFor="confirmPassword" >Confirm Password</label> <br />
              <input
                type="password"
                {...register("confirmPassword", { required: true })}
                placeholder="Confirm your password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              />
              {errors.confirmPassword && <div className="invalid-feedback">Password is required</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNo">Phone Number</label> <br />
              <input
                type="text"
                {...register("mobileNo", { required: true, minLength: 10, maxLength: 10, validate: { isNotEmpty, doesNotStartWithWhitespace, isPhoneNumberValid } })}
                placeholder="Enter your number"
                className={`form-control ${errors.mobileNo ? "is-invalid" : ""}`}
              />
              {errors.mobileNo && (
                <div className="invalid-feedback">
                  {errors.mobileNo.type === "required" && "Phone number is required"}
                  {errors.mobileNo.type === "minLength" && "Entered number is less than 10 digits"}
                  {errors.mobileNo.type === "maxLength" && "Entered number is more than 10 digits"}
                  {errors.mobileNo.type === "isNotEmpty" && "Phone number cannot be just whitespace"}
                  {errors.mobileNo.type === "doesNotStartWithWhitespace" && "Phone number cannot start with whitespace"}
                  {errors.mobileNo.type === "isPhoneNumberValid" && "Invalid phone number"}
                </div>
              )}
            </div>
            <div>
              <h4 > SELECT YOUR LEVEL</h4>
              <div className="mb-2">
                <label htmlFor="level">SELECT YOUR LEVEL</label>
                <select
                  {...register("level", { required: true })}
                  className={`form-select ${errors.level ? "is-invalid" : ""}`}
                >
                  <option value="1">LEVEL 1: BASIC</option>
                  <option value="2">LEVEL 2: INTERMEDIATE</option>
                  <option value="3">LEVEL 3: EXPERT</option>
                </select>
                {errors.level && <div className="invalid-feedback">Level is required</div>}
              </div>
            </div>
            {errors.level && <div className="invalid-feedback">Level is required</div>}
            <div className="d-grid">
              <button className="btn btn-dark" type="submit">
                SIGN UP
              </button>
            </div>
          </form>
          <br></br>
          <div>
            Already have an account ? <Link to="/Login" className="ms-2 signup-link">
              SIGN IN
            </Link>
            <Link to="/" className='ms-2 signup-link'>GO BACK</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
export default RegisterForm;
