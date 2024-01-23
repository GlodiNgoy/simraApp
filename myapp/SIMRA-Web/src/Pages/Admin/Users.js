import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Image, Stack, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';;
import './Admin.css'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaHome, FaFil, FaVideo, FaSignOutAlt, FaChartBar, FaQuestionCircle, FaCheckCircle,FaDownload } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';
import axios from 'axios';
import Survey from '../Survey/Survey';
import H2S from '../HTest/H2S';
import Popup from 'reactjs-popup';



function Home() {

    const tempData = useLocation();
    const [uploadMessage, setUploadMessage] = useState('');
    const [count, setCount] = useState(null);
    const [allusers, setallusers] = useState([]);
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [qmraData, setQmraData] = useState([]);
    const [level, setLevel] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const UserId = tempData.state?.userId || '';
    const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
    const [editedFirstName, setEditedFirstName] = useState(userName);
    const [editedLastName, setEditedLastName] = useState(lastName);
    const [editedMobileNo, setEditedMobileNo] = useState(mobile);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState('All Levels');

    // Function to handle PDF download
    const handleDownloadPDF = () => {
        // Send a request to the backend to generate and download the PDF
        axios.get(`http://localhost:3001/api/downloadUsersPDF?level=${selectedLevel}`, {
            responseType: 'blob', // Set responseType to 'blob' to handle binary data
        })
            .then(response => {
                // Create a blob object from the binary data
                const blob = new Blob([response.data], { type: 'application/pdf' });

                // Create a link element to trigger the download
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'users.pdf';
                document.body.appendChild(link);

                // Trigger the click event on the link to start the download
                link.click();

                // Remove the link from the DOM
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error downloading PDF:', error);
            });
    };


    const handleDownload = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/downloadUsersExcel?level=${selectedLevel}`);

            if (response.ok) {
                const blob = await response.blob();

                // Create a link element
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);

                // Specify the filename for the download
                link.download = 'users.xlsx';

                // Append the link to the document
                document.body.appendChild(link);

                // Trigger a click on the link to start the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            } else {
                console.error('Error downloading Excel:', response.statusText);
            }
        } catch (error) {
            console.error('Error downloading Excel:', error.message);
        }
    };


    const [editedProfile, setEditedProfile] = useState({
        firstName: '',
        lastName: '',
    });

    // Function to handle opening the popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };
    // Function to handle closing the popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        // Fetch data from the server
        fetch('http://localhost:3001/api/count')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update the count state with the obtained count
                    setCount(data.results[0].count);
                } else {
                    console.error('Error fetching count:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching count:', error);
            });
    }, []);


    useEffect(() => {
        // Fetch event data from the API endpoint
        axios.get('http://localhost:3001/api/allusers')
            .then(response => {
                // Set the retrieved event data in state
                const updatedusers = response.data.map(user => {
                    // Extract the file name from the given path

                    const myeventId = user.userId;
                    console.log('data', myeventId);

                    return {
                        ...user
                    };


                });
                setallusers(updatedusers);
                console.log('data', updatedusers);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);




    useEffect(() => {
        const adminId = localStorage.getItem('adminId');
        if (adminId) {
            // Fetch user data using adminId
            axios
                .get(`http://localhost:3001/api/theuseradmin`, {
                    params: {
                        adminId: adminId,

                    }

                })

                .then(response => {
                    if (response.data.success) {
                        const user = response.data.results[0];
                        const userFirstName = user.firstname;
                        const userLastName = user.lastname;
                        setUserName(userFirstName);
                        setLastName(userLastName);
                        console.log('lastname', userLastName);
                    } else {
                        console.error('Error fetching user data:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error while fetching user data:', error);
                });
        }
    }, []);


    const navigate = useNavigate();

    const handleEventsNavigate = () => {
        const adminId = localStorage.getItem('adminId');

        if (adminId) {
            // Make an HTTP request to fetch data based on the user ID if needed
            axios.get('http://localhost:3001/api/QMRA', {
                params: {
                    adminId: adminId,
                },
            })
                .then((response) => {
                    // Handle the response if needed
                    console.log(response.data);
                    navigate('/AdminHome', { state: { adminId: adminId } });
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
        <div className='mainpage'>
            <Navbar className="bg-body-tertiary">

                <Container>

                    <Navbar.Toggle />

                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="#home" >
                                <Image
                                    alt=""
                                    src="images/SimraLogo.png"
                                    width="60"
                                    height="40"
                                    className="d-inline-block align-left"
                                />{' '}
                                SIMRA
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
                </Container>
                <Container>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '18px', color: 'black' }}>
                                ADMIN : {userName} {lastName}
                            </div>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row>
                <Col xs={6} sm={0} md={0} lg={2} >
                    <Container className='mt-5' fluid >
                        <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)', height: '320px' }}>

                            <Card.Body > <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleEventsNavigate}><FaHome /> Home </Button></Card.Body>
                            <Card.Body > <Link to="/"><Button style={{ width: '100%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
                        </Card>
                    </Container>
                </Col>
                <Col xs={30} sm={8} md={6} lg={10} >
                    <Row>
                        <Container className='mt-5 mb-5 mx-auto mytable ' style={{ background: 'rgba(255, 255, 255, 0.8)', width: '100%' }}  >
                            <Card className='mt-5 mb-5 text-center mx-auto ' >
                                <div className="userpage" >
                                    <div className='secbar' >
                                        <h1 className='count mt-2 mb-2'>AVAILABLE SIMRA USERS : {count}</h1>
                                        <div class="myscroll">
                                            <table className="table table-striped table-sticky mytable">
                                                <thead>
                                                    <tr>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Mobile Number</th>
                                                        <th>level</th>
                                                        {/*<th>Password</th>*/}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allusers.map(user => (
                                                        <tr key={user.id}>
                                                            <td>{user.firstname}</td>
                                                            <td>{user.lastname}</td>
                                                            <td>{user.mobileNo}</td>
                                                            <td>{user.level}</td>
                                                            {/*<td>{user.password}</td>*/}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <select class="form-select" aria-label="Default select example" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                                            <option value="All Levels">All Levels</option>
                                            <option value="1">Level 1</option>
                                            <option value="2">Level 2</option>
                                            <option value="3">Level 3</option>
                                        </select>
                                        <Button onClick={handleDownloadPDF}>Download PDF <FaDownload /></Button>
                                        <Button onClick={handleDownload}>Download EXCEL <FaDownload /></Button>
                                    </div>
                                </div>
                            </Card>
                        </Container>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
export default Home;