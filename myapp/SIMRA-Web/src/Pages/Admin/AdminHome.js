import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Image, Stack, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';;
import './Admin.css'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaFile, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';
import axios from 'axios';
import Survey from '../Survey/Survey';
import H2S from '../HTest/H2S';
import Popup from 'reactjs-popup';

function Home() {

    const navigate = useNavigate();
    const tempData = useLocation();
    // const [adminId] = useState(tempData.state.adminId);
    const [User] = useState(tempData.state.users);
    //const tempData = useLocation();
    const adminId = tempData.state?.adminId || '';
    const [uploadMessage, setUploadMessage] = useState('');
    const [editedPassword, setEditedPassword] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [events, setEvents] = useState([]);

    const [isEditFormVisible, setEditFormVisibility] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [editedEvent, setEditedEvent] = useState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventVenue: '',
        eventImage: null,
        eventDescription: '',
    });

    const handleEditInputChange = (field, value) => {
        setEditedEvent(prevEditedEvent => ({
            ...prevEditedEvent,
            [field]: value,
        }));
    };


    const handleUpdateClick = (event) => {
        setEditFormVisibility(true);
        setSelectedEvent(event);
    };

    const handleEditFormClose = () => {
        setEditFormVisibility(false);
        setSelectedEvent(null);
    };

    const handleEditFormSubmit = () => {
        // Send a PUT request to update the event
        axios.put(`http://localhost:3001/api/Event/${selectedEvent.id}`, editedEvent)
            .then(response => {
                console.log('Event updated successfully:', response.data);
                alert('EVENT UPDATED SUCCESSFULLY!!!');
    
                // Fetch the updated list of events after successfully updating an event
                axios.get('http://localhost:3001/api/Events')
                    .then(response => {
                        const updatedEvents = response.data.map(event => {
                            const fileName = event.image.split('\\').pop();
                            const imagePath = `images/${fileName}`.replace(/\\/g, '/');
                            return {
                                ...event,
                                image: imagePath
                            };
                        });
                        setEvents(updatedEvents);
                    })
                    .catch(error => {
                        console.error('Error fetching events:', error);
                    });
    
                // Reset the form and display a success message
                setUploadMessage('Event updated successfully!');
            })
            .catch(error => {
                console.error('Error updating event:', error);
                setUploadMessage('Error updating event. Please try again.');
            });
    
        // Close the edit form
        handleEditFormClose();
    };
    
    useEffect(() => {
        // Fetch event data from the API endpoint
        axios.get('http://localhost:3001/api/Events')
            .then(response => {
                // Set the retrieved event data in state
                const updatedEvents = response.data.map(event => {
                    // Check if the image property is not null
                    const fileName = event.image ? event.image.split('\\').pop() : null;
                    const myeventId = event.id;
                    console.log('data', myeventId, fileName);
                    // Create a new image path with a corrected format
                    const imagePath = fileName ? `images/${fileName}`.replace(/\\/g, '/') : null;
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
    console.log('adminId', adminId)
    console.log('username', User)
    localStorage.setItem('adminId', adminId);
    // Function to handle opening the popup
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [qmraData, setQmraData] = useState([]);
    const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
    const [editedFirstName, setEditedFirstName] = useState(userName);
    const [editedLastName, setEditedLastName] = useState(lastName);
    const [originalLastName, setOriginalLastName] = useState(lastName);
    const [originalFirstName, setOriginalFirstName] = useState(userName);
    const [editedProfile, setEditedProfile] = useState({
        firstName: '',
        lastName: '',
    });

    const handleFirstNameChange = (e) => {
        setEditedProfile({ ...editedProfile, firstName: e.target.value });
    };

    const handleLastNameChange = (e) => {
        setEditedProfile({ ...editedProfile, lastName: e.target.value });
    };
    useEffect(() => {
        const adminId = localStorage.getItem('adminId');
        if (adminId) {
            // Fetch user data using adminId
            axios
                .get(`http://localhost:3001/api/theuseradmin`, {
                    params: {
                        adminId: adminId,
                    },
                })
                .then(response => {
                    if (response.data.success) {
                        const user = response.data.results[0];
                        const userFirstName = user.firstname;
                        const userLastName = user.lastname;
                        setUserName(userFirstName);
                        setLastName(userLastName);
                        setEditedFirstName(userFirstName); // Initialize the editedFirstName with the default value
                        setEditedLastName(userLastName);
                        setOriginalLastName(userLastName);
                        setOriginalFirstName(userFirstName);
                    } else {
                        console.error('Error fetching user data:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error while fetching user data:', error);
                });
        }
    }, []);


    const handleOnUpload = () => {
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventVenue = document.getElementById('eventVenue').value;
        const eventImage = document.getElementById('eventImage').files[0];
        const eventDescription = document.getElementById('eventDiscription').value;
        const currentDate = new Date().toISOString().split('T')[0];
        if (eventDate < currentDate) {
            alert('Event date must be the current date or a future date.');
            return;
        }
        const formData = new FormData();
        formData.append('eventName', eventName);
        formData.append('eventDate', eventDate);
        formData.append('eventTime', eventTime);
        formData.append('eventVenue', eventVenue);
        formData.append('eventImage', eventImage);
        formData.append('eventDescription', eventDescription);

        axios.post('http://localhost:3001/api/Event', formData)
            .then(response => {
                console.log('Event added successfully:', response.data);
                // Fetch the updated list of events after successfully adding a new event
                axios.get('http://localhost:3001/api/Events')
                    .then(response => {
                        const updatedEvents = response.data.map(event => {
                            const fileName = event.image.split('\\').pop();
                            const imagePath = `images/${fileName}`.replace(/\\/g, '/');
                            console.log(fileName, imagePath
                            )
                            return {
                                ...event,
                                image: imagePath
                            };
                        });
                        setEvents(updatedEvents);
                    })
                    .catch(error => {
                        console.error('Error fetching events:', error);
                    });

                // Reset the form and display a success message
                setUploadMessage('Event added successfully!');
                // Optionally, you can also hide the card after adding an event
                setTimeout(() => {
                    setCardVisibility(false);
                    setUploadMessage('');
                }, 3000);
            })
            .catch(error => {
                console.error('Error adding event:', error);
                setUploadMessage('Error adding event. Please try again.');
            });
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [isCardVisible, setCardVisibility] = useState(false);

    const handleAddEventClick = () => {
        // Toggle the visibility of the card
        setCardVisibility(!isCardVisible);
    };
    const handleDelete = (eventId) => {
        // Implement logic to delete the event with the given eventId
        console.log('Deleting event with ID:', eventId);
        axios.delete(`http://localhost:3001/api/Event/${eventId}`)
            .then(response => {
                console.log('Event deleted successfully:', response.data);
                // Fetch the updated list of events after successfully deleting an event
                axios.get('http://localhost:3001/api/Events')
                    .then(response => {
                        const updatedEvents = response.data.map(event => {
                            const fileName = event.image.split('\\').pop();
                            const imagePath = `images/${fileName}`.replace(/\\/g, '/');
                            return {
                                ...event,
                                image: imagePath
                            };
                        });
                        setEvents(updatedEvents);
                    })
                    .catch(error => {
                        console.error('Error fetching events:', error);
                    });
            })
            .catch(error => {
                console.error('Error deleting event:', error);

            });
    };
    const handleSurveyClick = () => {
        if (isDataCompleted()) {
            navigate('/reportAdmin');
        } else {
            // Show the alert
            setShowAlert(true);
        }
    };
    const submitProfileEdit = () => {
        // Construct the updated profile data
        const updatedProfileData = {
            adminId: adminId,
            firstname: editedFirstName,
            lastname: editedLastName,
            password: editedPassword,
        };
        // Make a PUT request to update the profile
        axios.put('http://localhost:3001/api/updateProfileAdmin', updatedProfileData)
            .then((response) => {
                if (response.data.success) {
                    // Handle success, e.g., show a success message
                    console.log('Profile updated successfully');
                    return alert('PROFILE UPDATED SUCCESSFULLY');
                } else {
                    console.error('Failed to update profile:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error while updating profile:', error);
            });

        // Close the popup after updating the profile
        setIsProfileEditOpen(false);
    };

    const handleUsersNavigate = () => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            // Make an HTTP request to fetch data based on the user ID if needed
            axios.get('http://localhost:3001/api/QMRA', {
                params: {
                    userId: userId,
                },
            })
                .then((response) => {
                    // Handle the response if needed
                    console.log(response.data);
                    navigate('/Users', { state: { userId: userId } });
                })
                .catch((error) => {
                    // Handle any errors
                    console.error(error);
                });
        } else {
            // Handle the case where the user ID is not found in localStorage
            console.error('User ID not found in localStorage');
        }
    };
    return (
        <div className="App">
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle />
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="#home" >
                                <div className="d-flex align-items-center">
                                    <Image
                                        alt=""
                                        src="images/SimraLogo.png"
                                        width="60"
                                        height="40"
                                        className="d-inline-block align-left"
                                    />{' '}
                                    <div style={{ fontWeight: 'bold', fontSize: '18px', marginLeft: '10px' }}>
                                        SIMRA
                                    </div>
                                </div>
                            </Navbar.Brand>
                        </Container>
                    </Navbar>

                </Container>
                <Container>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link onClick={() => setIsProfileEditOpen(true)} className="ml-2" >
                            <div className="profile-icon">
                                <FaUser />
                            </div>
                            <div className="profile-text">
                                Profile
                            </div>
                        </Nav.Link>
                        <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '18px', marginLeft: '40px' }}>
                            ADMIN : {userName} {lastName}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Row >
                <Col xs={6} sm={0} md={0} lg={2} >
                    <Container className='mt-5' fluid >
                        <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)', height: '400px' }}>
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaTachometerAlt /> Dashboard </Button></Card.Body>
                            <Card.Body>
                                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleUsersNavigate}><FaFile /> History </Button>
                            </Card.Body>
                            <Card.Body><Link to="/"> <Button size="lg" style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
                        </Card>
                    </Container>
                </Col>
                <Col xs={30} sm={8} md={6} lg={10} >
                    <Row>
                        <Container className='mt-5 mb-5 mx-auto ' style={{ background: 'rgba(255, 255, 255, 0.5)', width: '100%', borderRadius: '15px' }}  >
                            <Card className='mt-5 mb-5 text-center mx-auto mytable ' style={{ background: 'rgba(255, 255, 255)' }}>
                                <div className="mt-2 mb-5" style={{ flexDirection: 'column', padding: '0em 6em 0em 6em ' }}>
                                    <Button className="addbutton mt-5 mb-5" variant="outline-secondary" onClick={handleAddEventClick} style={{
                                        background: 'rgba(108, 117, 125)',
                                        width: '200px',
                                        display: 'block',
                                        margin: '0 auto',
                                        color: 'white',
                                    }}>
                                        ADD EVENT
                                    </Button>
                                    {isCardVisible && (
                                        <div class="card3 text-center mx-auto  mytable">
                                            <h1 className="new">New Event</h1>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Event Name</span>
                                                <input id="eventName" type="text" class="form-control" aria-label="Event Name" aria-describedby="basic-addon1" required />
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Date</span>
                                                <input id="eventDate" type="date" class="form-control" aria-label="Date" aria-describedby="basic-addon1" required />
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Time</span>
                                                <input id="eventTime" type="time" class="form-control" aria-label="Time" aria-describedby="basic-addon1" required />
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Venue</span>
                                                <input id="eventVenue" type="text" class="form-control" aria-label="Venue" aria-describedby="basic-addon1" required />
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Image</span>
                                                <input id="eventImage" type="file" class="form-control" aria-label="Image" aria-describedby="basic-addon1" accept='image/*' required />
                                            </div>
                                            <div class="input-group">
                                                <span class="input-group-text">Description</span>
                                                <textarea id="eventDiscription" class="form-control" aria-label="With textarea"></textarea>
                                            </div>
                                            <button type="button" class="btn btn-outline-secondary" onClick={handleOnUpload}>Upload</button>
                                            {uploadMessage && <p style={{ color: 'green' }}>{uploadMessage}</p>}
                                        </div>
                                    )}
                                    <table className="table table-striped table-sticky mytable mt-2" style={{ backgroundColor: 'white' }}>
                                        <thead className="mytable" style={{ borderTop: '1px solid black', borderLeft: '1px solid black' }}>

                                            <tr >
                                                <th>Event Name</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Venue</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {events.map(event => (
                                                <tr key={event.id} className='mb-5'>
                                                    <td>{event.name}</td>
                                                    <td>{formatDate(event.date)}</td>
                                                    <td>{event.time}</td>
                                                    <td>{event.venue}</td>
                                                    <td>{event.description}</td>
                                                    <td style={{ textAlign: 'center', marginTop: '5px' }}>
                                                        <Button variant="outline-danger" onClick={() => handleDelete(event.id)} style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}>
                                                            Delete
                                                        </Button>
                                                        <Button variant="success" onClick={() => handleUpdateClick(event)} style={{ color: 'white' }}>
                                                            Update
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Popup
                                        open={isEditFormVisible}
                                        closeOnDocumentClick
                                        onClose={handleEditFormClose}
                                    >
                                        {selectedEvent && (
                                            <div class="card3 text-center mx-auto  mytable">
                                                <h1 className="new">Edit Event</h1>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">Event Name</span>
                                                    <input
                                                        id="eventName"
                                                        type="text"
                                                        className="form-control"
                                                        aria-label="Event Name"
                                                        aria-describedby="basic-addon1"
                                                        value={editedEvent.eventName}
                                                        onChange={(e) => handleEditInputChange('eventName', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">Date</span>
                                                    <input
                                                        id="eventDate"
                                                        type="date"
                                                        class="form-control"
                                                        aria-label="Date"
                                                        aria-describedby="basic-addon1"
                                                        value={editedEvent.eventDate}
                                                        placeholder={selectedEvent ? selectedEvent.date : 'Event Date'}
                                                        onChange={(e) => handleEditInputChange('eventDate', e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">Time</span>
                                                    <input
                                                        id="eventTime"
                                                        type="time"
                                                        class="form-control"
                                                        aria-label="Time"
                                                        aria-describedby="basic-addon1"
                                                        value={editedEvent.eventTime}
                                                        placeholder={selectedEvent ? selectedEvent.time : 'Event Time'}
                                                        onChange={(e) => handleEditInputChange('eventTime', e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">Venue</span>
                                                    <input
                                                        id="eventVenue"
                                                        type="text"
                                                        class="form-control"
                                                        aria-label="Venue"
                                                        aria-describedby="basic-addon1"
                                                        value={editedEvent.eventVenue}
                                                        placeholder={selectedEvent ? selectedEvent.venue : 'Event Venue'}
                                                        onChange={(e) => handleEditInputChange('eventVenue', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">Image</span>
                                                    <input
                                                        id="eventImage"
                                                        type="file"
                                                        class="form-control"
                                                        aria-label="Image"
                                                        aria-describedby="basic-addon1"
                                                        accept='image/*'
                                                        onChange={(e) => handleEditInputChange('eventImage', e.target.files[0])}
                                                        required
                                                    />
                                                </div>
                                                <div class="input-group">
                                                    <span class="input-group-text">Description</span>
                                                    <textarea
                                                        id="eventDiscription"
                                                        class="form-control"
                                                        aria-label="With textarea"
                                                        value={editedEvent.eventDescription}
                                                        placeholder={selectedEvent ? selectedEvent.description : 'Event Description'}
                                                        onChange={(e) => handleEditInputChange('eventDescription', e.target.value)}
                                                    ></textarea>
                                                </div>

                                                <button onClick={handleEditFormSubmit} style={{ color: 'black' }}>Save Changes</button>
                                            </div>
                                        )}
                                    </Popup>
                                </div>
                                <Popup
                                    open={isProfileEditOpen}
                                    closeOnDocumentClick
                                    onClose={() => setIsProfileEditOpen(false)}
                                >
                                    <div className="popup-content mb-4 mt-5" style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }}>
                                        <h3 className=' text-center'>Edit Profile</h3>
                                        <div className='mb-4 '>
                                            <label htmlFor='firstname' className='lables'>firstname</label> <br />

                                            <input
                                                type="text"
                                                placeholder={originalFirstName}
                                                value={editedFirstName}
                                                onChange={(e) => setEditedFirstName(e.target.value)}
                                                className='form-control mt-2'
                                            />
                                        </div>
                                        <div className='mb-4 '>
                                            <label htmlFor='laststname' className='lables'>laststname</label> <br />
                                            <input
                                                type="text"
                                                placeholder={originalLastName}
                                                value={editedLastName}
                                                onChange={(e) => setEditedLastName(e.target.value)}
                                                className='form-control mt-2'
                                            />
                                        </div>
                                        <div className='mb-4 '>
                                            <label htmlFor='password' className='lables'>Change password</label> <br />
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                value={editedPassword}
                                                onChange={(e) => setEditedPassword(e.target.value)}
                                                className='form-control mt-2'
                                            />
                                        </div>
                                        <button onClick={submitProfileEdit} style={{ color: 'black' }}>Save Changes</button>
                                    </div>
                                </Popup>
                            </Card>
                        </Container>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Home;