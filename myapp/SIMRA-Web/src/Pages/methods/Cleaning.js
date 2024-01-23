
import React from 'react';
import { FaQuestionCircle, FaSurvey, FaFile, FaSignOutAlt, FaHome } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Table } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';


function H2SMethods() {
    const navigate = useNavigate()
    const methods = [
        {
            title: '1. Boiling',
            description: 'Bring the water to a rolling boil and maintain it for at least one minute. Allow the water to cool before use.',
            image: '/images/boiling.jpg'
        },
        {
            title: '2. SODIS (Solar Water Disinfection)',
            description: 'Fill clear, plastic bottles with water and leave them in direct sunlight for at least six hours (or longer if it’s cloudy) to disinfect the water.',
            image: '/images/sodis.png'
        },
        {
            title: '3. Chemical Disinfection',
            description: 'Add a cap full of bleach in 25L of water. Allow the treated water to sit for a specific contact time before consuming.',
            image: '/images/bleach.jpg'
        },
        {
            title: '4. Filtration',
            description: 'Choose a water filter certified for the removal of specific contaminants (e.g., use a cloth folded 8 times/clay pots/ceramic filters).',
            image: '/images/filtering.jpg'
        }
    ];

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
                    navigate('/Home', { state: { userId: userId } });
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
            </Navbar>
            <Row>
                <Col xs={6} sm={0} md={0} lg={2}>
                    <Container fluid className="side" >
                        <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }} >
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                            <Card.Body ><Link to="/Survey"><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaQuestionCircle /> Survey</Button></Link></Card.Body>


                            <Card.Body><Link to="/"><Button  size="lg" style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
                        </Card>
                    </Container>
                </Col>

                <Col xs={30} sm={8} md={6} lg={10}>
                
                     
                    <Row className='mt-5' style={{ backgroundColor: 'rgba(255, 255, 255,0.8)' }}>
                        <Container fluid style={{ maxWidth: '750px'}}>
                        <br></br>
                      
                            
                            {methods.map((method, index) => (
                                <Card key={index} className={`my-3 ${index !== 0 ? 'mt-5' : ''}`} style={{ marginBottom: '60px', minHeight: '250px', position: 'relative' }}>
                                    <div className="img-container" style={{ height: '100%', overflow: 'hidden' }}>
                                        <Card.Img
                                            variant="top"
                                            src={method.image}
                                            alt={method.title}
                                            className="img-fluid"
                                            style={{ objectFit: 'cover', minHeight: '70%', minWidth: '90%' }}
                                        />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{method.title}</Card.Title>
                                        <Card.Text>{method.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Container>

                    </Row>


                </Col>




            </Row>




        </div>

    );
};

export default H2SMethods;