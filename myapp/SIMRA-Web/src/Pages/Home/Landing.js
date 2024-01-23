import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaQuestion, FaArrowRight, FaArrowLeft, FaTimes } from 'react-icons/fa';
import { FaLinkedinIn } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './Landing.css';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';

const initialState = {
    name: '',
    email: '',
    message: '',
};
function graph() {
    const [{ name, email, message }, setState] = useState(initialState);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    const [activeDotIndex, setActiveDotIndex] = useState(0);

    const handlePrev = () => {
        setCurrentEventIndex((prevIndex) => (prevIndex === 0 ? events.length - 1 : prevIndex - 1));
        updateActiveDot(-1);
    };

    const handleNext = () => {
        setCurrentEventIndex((prevIndex) => (prevIndex === events.length - 1 ? 0 : prevIndex + 1));
        updateActiveDot(1);
    };

    const updateActiveDot = (direction) => {
        const newIndex = activeDotIndex + direction;
        setActiveDotIndex(newIndex < 0 ? events.length - 1 : newIndex % events.length);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };
    const clearState = () => setState({ ...initialState });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the data from the form
        const formData = {
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value, // Assuming the form field has the name attribute set to "lastname"
            message: e.target.message.value,   // Assuming the form field has the name attribute set to "message"
        };

        // Make an HTTP POST request to your backend API
        axios.post('http://localhost:3001/api/message', formData)
            .then(response => {
                console.log(response.data.message);
                clearState();
                alert('MESSSGE SENT SUCCESSFULLY!!!!')
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };
    const [events, setEvents] = useState([]);
    useEffect(() => {
        // Fetch event data from the API endpoint
        axios.get('http://localhost:3001/api/Events')
            .then(response => {
                // Set the retrieved event data in state
                const updatedEvents = response.data.map(event => {
                    // Extract the file name from the given path
                    const fileName = event.image.split('\\').pop();
                    const myeventId = event.id;
                    console.log('data', myeventId);
                    // Create a new image path with a corrected format
                    const imagePath = `images/${fileName}`.replace(/\\/g, '/');
                    return {
                        ...event,
                        image: imagePath
                    };
                });
                setEvents(updatedEvents);
                console.log('data', updatedEvents);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const SocialIcons = () => {
        //const linkedinUrl = 'https://www.linkedin.com/login'; // Replace with your LinkedIn login URL
        const facebookUrl = 'https://www.facebook.com/login'; // Replace with your Facebook login URL
        const instagramUrl = 'https://www.instagram.com/accounts/login/'; // Replace with your Instagram login URL
        const closeUrl = 'https://www.twitter.com/i/flow/login/'; // Placeholder since there's no specific "close" login page

        return (
            <div className="socialicoins">

                <a href={facebookUrl} style={{ backgroundColor: 'blue' }}><FaFacebookF style={{ fontSize: '28px' }} /></a>
                <a href={closeUrl} style={{ backgroundColor: '#1e1a1b' }}><FaTimes style={{ fontSize: '28px', color: 'white' }} /></a>
                <a href={instagramUrl} style={{ background: 'linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d, #f56040, #f77737, #fcaf45, #ffdc80)' }}><FaInstagram style={{ fontSize: '28px' }} /></a>

            </div>
        );
    };




    return (
        <div>
            <div className="header">
                <div className="top">
                    <div className="logo">
                        <img src="images/SimraLogo.png" alt="" />
                        <h1 className="logoname">SIMRA</h1>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/Login" className="link">SIGN IN</Link></li>
                            <li><Link to="/Register" className="link2">SIGN UP</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="bottom">
                    <nav>
                        <ul>
                            <li><a href="#home">HOME</a></li>
                            <li><a href="#about">ABOUT</a></li>
                            <li><a href="#events">EVENTS</a></li>
                            <li><a href="#contact">CONTACT</a></li>
                        </ul>
                    </nav>
                </div>
            </div>



            <div id="home" className="landingContainer">

                <h1 className="simra">Single Integrated<br /> Microbial Risk<br /> Assessment</h1>
                <SocialIcons />



            </div>

            <div className='' style={{ background: 'white' }}>

                <div id="about" className="landingContainer">
                    <h1 className="containerHead">About</h1>
                    <div className="about_row">
                        <div className="about_row_col">
                            <img src="images/about.jpg" className="img-responsive" alt="" />

                            <div className="about-text">
                                <h2 className="text1">A Guide to Sanitary Inspection and H2S test for Water Quality Testing</h2>
                                <h3 className="text2">What is the importance of regular surveys and how often can it be done?</h3>
                                <p>
                                    Regular sanitary inspections ensure that water quality remains safe over time are essential for preserving and maintaining high water quality standards, safeguarding public health, and preserving a clean environment by identifying and mitigating potential contamination sources in water resources. In high-risk sources inspections should be done on a monthly or quarterly basis, while lower-risk sources could be inspected annually.
                                </p>
                                <Link
                                    to="/About"
                                    className="link3"
                                >
                                    Read More <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="events" className="landingContainer">
                    <h1 className="containerHead">Events</h1>

                    <div className="Eventslider">
                        <div className="arrow1" onClick={handlePrev}>
                            <FaArrowLeft />
                        </div>

                        {events.map((event, index) => (
                            <div key={event.id} className={`Events ${index === currentEventIndex ? 'active' : ''}`}>
                                <div className="Event">

                                    <div className="EventImage" style={{ backgroundImage: `url(${event.image})` }}>
                                        <div className="Overlay"></div>
                                    </div>
                                    <div className="Eventtext" style={{ fontWeight: 'bold', marginTop: '20px' }}>
                                        <h>Event Name : {event.name}</h>
                                        <p>Date        : {formatDate(event.date)}</p>
                                        <p>Time        : {event.time}</p>
                                        <p>Location    : {event.venue}</p>
                                        <p>Description : {event.description}</p>
                                    </div>

                                </div>

                            </div>
                        ))}

                        <div className="arrow2" onClick={handleNext}>
                            <FaArrowRight />
                        </div>

                    </div>
                    <div className="dots">
                        {events.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${index === activeDotIndex ? 'active' : ''}`}
                                onClick={() => updateActiveDot(index - activeDotIndex)}
                            ></div>
                        ))}
                    </div>

                </div>
                <div id="contact" className="landingContainer">
                    {/*<h1 className="containerHead">Contact</h1>
                    <div className='formContainer'>
                        <p >
                            Please fill out the form below to send us an email and we will
                            get back to you as soon as possible.
                        </p>
                        <form validate onSubmit={handleSubmit}>
                            <div className="name_email_row">
                                <div className="group1">
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        className="control"
                                        placeholder="Firstname"
                                        required
                                        onChange={handleChange}
                                    />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="group2">
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        className="control"
                                        placeholder="Lastname"
                                        required
                                        onChange={handleChange}
                                    />
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="form-group-msg">
                                <textarea
                                    name="message"
                                    id="message"
                                    className="form-control-2"
                                    rows="5"
                                    placeholder="Message"
                                    required
                                    onChange={handleChange}
                                ></textarea>
                                <p className="help-block text-danger"></p>
                            </div>
                            <div id="success"></div>
                            <button type="submit" className="btn btn-custom btn-lg">
                                Send Message
                            </button>
                        </form>
                        </div>*/}

                    <div className="contact-info">
                        <h1 className="containerHead">Contact</h1>
                        <br></br>
                        <div className='contact-info-title'>
                            <h3>For more information:</h3>
                        </div>
                        <form>
                            <div className='contact-details' style={{ background: 'rgba(0, 0, 0, 0.5)', height: '300px' }}>
                                <div className='contact-detail ' style={{ color: 'white' }} >
                                    <p>Name:Prof Maggy NB Momba</p>
                                    <p>Phone:+27 82 513 7395</p>
                                    <p>Email:MombaMNB@tut.ac.za</p>
                                </div>
                                <div className='contact-detail' style={{ color: 'white' }} >
                                    <p>Name:Prof Lizzy Monyatsi</p>
                                    <p>Phone:+27 12 382 6201</p>
                                    <p>Email:monyatsil@tut.ac.za</p>
                                </div>
                                <div className='contact-detail' style={{ color: 'white' }} >
                                    <p>Name:Miss Arinao Murei</p>
                                    <p>Phone:+27 76 772 4697</p>
                                    <p>Email:mureiarinao@gmail.com</p>
                                </div>
                                <div className='contact-detail' style={{ color: 'white' }} >
                                    <p>Name:Ms Anza-vhudziki Mboyi</p>
                                    <p>Phone:+27 382 6376</p>
                                    <p>Email:MboyiA@tut.ac.za</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="footer">
                    <img src="images/SimraLogo.png" alt="" />
                    <p className="logoname">Copyright © 2023 SIMRA</p>
                </div>
            </div>
        </div>


    );
}

export default graph;