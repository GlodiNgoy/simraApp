
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Card, Form, Row, Col, Image, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaFile, FaSignOutAlt, FaChartBar, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import Popup from 'reactjs-popup';

function LikelihoodOfInfection() {
    const [showExposureOptions, setShowExposureOptions] = useState(false);
    const [selectedExposure, setSelectedExposure] = useState('');
    const [infectionResult, setInfectionResult] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [customExposure, setCustomExposure] = useState('');
    const [showCalculateButton, setShowCalculateButton] = useState(false);
    const [pathogenResult, setPathogenResult] = useState(null);
    const [exposure, setExpose] = useState(null);
    const [exposureName, setPathogenName] = useState(null);
    const exposureOptions = ['--Select Exposure--', 'Weekly', 'Monthly', 'Half yearly', 'Yearly', 'Quarterly', 'Other'];
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isButtonHovered1, setIsButtonHovered1] = useState(false);


    function calculateLikelihoodOfInfection(exposureName, pathogenResult) {
        let n, pn;

        switch (exposureName) {
            case 'Weekly':
            case 'Monthly':
            case 'Half yearly':
            case 'Yearly':
            case 'Quarterly':
                n = getExposureDays(exposureName);
                pn = pathogenResult === 1 ? 1 : 1 - Math.pow(1 - pathogenResult, -n);
                break;
            case 'Other':
                break;
            default:
                break;
        }
        return Math.round(pn * 100) / 100;
    }
    function getExposureDays(exposureName) {
        switch (exposureName) {
            case 'Weekly':
                return 7;
            case 'Monthly':
                return 12;
            case 'Half yearly':
                return 183;
            case 'Yearly':
                return 365;
            case 'Quarterly':
                return 91;
            default:
                return 0;
        }
    }
    const handleExposureChange = (selectedExposure) => {
        setSelectedExposure(selectedExposure);
        setShowCalculateButton(true);
        if (selectedExposure === 'Other') {
            setShowCustomSelect(true);
        } else {
            setShowCustomSelect(false);
        }
    };



    const handleExposureClick = (exposure) => {
        setSelectedExposure(exposure);
        setShowCalculateButton(true);
        if (exposure === 'Other') {
            setShowCustomSelect(true);
        } else {
            setShowCustomSelect(false);
        }
        setShowExposureOptions(false);
    };

    // Function to display pathogenResult
    function displayMultipleExposure(exposure) {
        try {
            // Code for displaying pathogenResult
            console.log('Multiple Exposure Result:', exposure);
        } catch (error) {
            console.error('Error displaying Multiple Exposure :', error);
        }
    }



    useEffect(() => {
        axios.get('http://localhost:3001/api/parameters')
            .then((response) => {
                console.log('API Response:', response.data);
                const pathogenResult = response.data.pathogenResult;
                setPathogenResult(pathogenResult);
            })
            .catch((error) => {
                console.error('Error fetching pathogenResult:', error);
            });

    }, []);

    const sendData = () => {
        if (!pathogenResult) {
            console.error('Pathogen result is missing.');
            return;
        }

        if (selectedExposure !== 'Other') {
            calculateInfection(selectedExposure);
        } else {
            // Handle the case when 'Other' is selected
            console.error('Selected exposure is "Other". Please provide a custom exposure value.');
        }
    }
    const calculateInfection = () => {
        let selected = selectedExposure;
        if (selected === 'Other') {
            selected = customExposure;
        }
        const likelihoodOfInfection = calculateLikelihoodOfInfection(selected, pathogenResult);
        // Display the infection result or do any other necessary actions
        console.log('Likelihood of Infection:', likelihoodOfInfection);
        setInfectionResult(likelihoodOfInfection);
        // Show the popup
        setShowPopup(true);
    }
    const closePopup = () => {
        setShowPopup(false);
    };

    const [showCustomSelect, setShowCustomSelect] = useState(false);
    const navigate = useNavigate();
    const handleHomeNavigate = () => {
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
                    navigate('/Level3', { state: { userId: userId } });
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
        <div className="App" >
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

                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>

                <Container>

                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>

                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row>
                <Col xs={6} sm={0} md={0} lg={2}>
                    <Container fluid className="side mt-5"  >
                        <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)'}} >
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                            <Card.Body>
                                <Card.Body ><Link to="/MST"><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaChartBar /> MST DATA</Button></Link></Card.Body>
                                <Card.Body><Link to="/Pathogen"><Button variant="secondary" size="lg" style={{ width: '100%' }} ><FaChartBar /> PATHOGEN DATA</Button></Link></Card.Body>
                            </Card.Body>
                            <Card.Body><Link to="/"> <Button style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
                        </Card>
                    </Container>
                </Col>
                <Col xs={30} sm={8} md={6} lg={10}>
                    <Row>
                        <Container>
                            <div class="card1 mt-5" style={{
                                background: 'rgba(255, 255, 255, 0.8)', borderRadius: '30px', margin: 'auto',
                                width: '70%', height: '500px'
                            }}>

                                <div className="d-grid gap-2 col-6 mx-auto mt-2">                                    
                                        <Popup
                                            trigger={
                                                <div>
                                                    <Button  size="lg" style={{ backgroundColor: 'white', color: 'black'  }}>PROBABALITY OF INFECTION </Button>

                                                </div>
                                            }
                                            modal
                                            nested
                                            overlayStyle={{
                                                backgroundColor: 'rgba(5, 0, 0, 0.5)',
                                            }}
                                        >
                                            {(close) => (
                                                <Card variant="outline-primary">

                                                    <Card.Text>
                                                        <div className='text-center' style={{ color: 'black' }}>
                                                            <p>THE PROBABILITY OF INFECTION : {pathogenResult} </p>
                                                        </div>
                                                    </Card.Text>
                                                </Card>
                                            )}

                                        </Popup>
                                  
                                    <Button
                                        
                                        size="lg"
                                        onClick={() => setShowExposureOptions(true)}
                                        style={{ backgroundColor: 'white', color: 'black'  }}
                                        
                                    >
                                        LIKELIHOOD OF INFECTION
                                    </Button>
                                    {showExposureOptions && (
                                        <select
                                            value={selectedExposure}
                                            onChange={(e) => handleExposureChange(e.target.value)}
                                            style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }} 
                                            className="form-select form-select-lg my-3 text-center "
                                        >
                                            {exposureOptions.map((exposure, index) => (
                                                <option key={index} value={exposure}>
                                                    {exposure}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    {showCustomSelect && selectedExposure === 'Other' && (
                                        <input
                                            type="text"
                                            placeholder=""
                                            value={customExposure}
                                            onChange={(e) => setCustomExposure(e.target.value)}
                                            className="my-3 form-control"
                                        />
                                    )}

                                    {showCalculateButton && (
                                        <Button variant="dark" size="lg" onClick={sendData} className="my-3" style={{  backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>
                                            Calculate P(n)
                                        </Button>
                                    )}

                                    {showPopup && (
                                        <div className="custom-popup">
                                            <div className="popup-content">
                                                {infectionResult !== '' && (
                                                    <div className='text-center mt-5' style={{ fontWeight: 'bold' }}>
                                                        <p>LIKELIHOOD OF INFECTION : {infectionResult} </p>
                                                    </div>
                                                )}
                                                <button onClick={closePopup} className="close-button" style={{ color: 'black' }}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                    </div>
                        </Container>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
export default LikelihoodOfInfection;
