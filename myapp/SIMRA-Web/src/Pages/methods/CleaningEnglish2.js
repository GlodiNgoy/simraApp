import React, { useState } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Table, Carousel   } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaSignOutAlt, FaHome } from 'react-icons/fa';
import axios from 'axios';

function Cleaning() {

    const images = [
        '/images/boiling.jpg',
        '/images/sodis.png',
        '/images/filtering.jpg',
        '/images/Bleachh.jpg',
        '/images/trii.jpg',
        '/images/Distillation.png',
        '/images/carbon.png',
        '/images/Purification.jpeg',
    ];
    const navigate = useNavigate()

    const [showButton, setShowButton] = useState(false);
    const toggleButton = () => {
        setShowButton(!showButton);
    };

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
    const handleH2SClick = () => {
        navigate('/Pathogen');
    };
    


    const methods = [
        {
            title: '1. Boiling',
            description:
                'Bring the water to a rolling boil and maintain it for at least one minute (three minutes at higher altitudes).',
        },
        {
            title: '2. SODIS (Solar Water Disinfection)',
            description:
                "Fill clear, plastic bottles with water and leave them in direct sunlight for at least six hours (or longer if it's cloudy). The UV radiation from the sun will help disinfect the water.",
        },
        {
            title: '3. Filtration',
            description:
                'Choose a water filter certified for the removal of specific contaminants (e.g., use a cloth folded 8 times, clay pots, and ceramic filters).',
        },
        {
            title: '4. Chemical Disinfection',
            description:
                'Chemicals like chlorine bleach can be used to disinfect water. Add a cap full of bleach in 25L of water. Allow the treated water to sit for a specific contact time before consuming.',
        },
        {
            title: '5. Ultraviolet (UV) Treatment',
            description:
                'UV water purifiers use UV light to disinfect water by inactivating microorganisms.Install a UV purifier according to the manufacturer instructions and regularly replace the UV lamp if required. ',
        },
        {
            title: '6. Distillation',
            description:
              'Distillation involves boiling water and then collecting the condensed vapor. Collect the condensed vapor in a clean container, leaving impurities behind.',
        },
        {
            title: '7. Activated Carbon',
            description:
              ' Activated carbon filters can remove organic chemicals, chlorine, and bad tastes and odors from water. Install and maintain an activated carbon filter according to the manufacturer instructions.',
        }, 
        {
            title: '8. Portable Water Purification Tablets',
            description:
              'Use commercially available water purification tablets or drops according to the instructions on the packaging. Allow the specified contact time before drinking the water.',
        },  
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const carouselItems = images.map((image, index) => (
        <Carousel.Item key={index}>
            <img
                className="d-block w-100"
                src={image}
                alt={`Step ${index + 1}`}
            />
        </Carousel.Item>

));


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
                        <Card  style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }}>
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                            <Card.Body>
                                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleH2SClick}>
                                    <FaChartBar /> PATHOGEN DATA
                                </Button>
                            </Card.Body> 
                           


                            <Card.Body><Link to="/"><Button  size="lg" style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
                        </Card>
                    </Container>
                </Col>

                <Col xs={30} sm={8} md={6} lg={10}>
                    <Row className='mt-5' style={{ backgroundColor: 'rgba(255, 255, 255,0.8)' }}>
                        <Container fluid style={{ maxWidth: '950px'}}>
                            <Row className="justify-content-center mt-5">
                                <Col md={8}>
                                    <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
                                        {carouselItems}
                                    </Carousel>
                                    <div className="method-details mt-3">
                                        <div className="method-detail">
                                            <h3>{methods[activeIndex].title}</h3>
                                            <p>{methods[activeIndex].description}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <style>
                                {`
                    .carousel {
                        border-radius: 10px;
                        overflow: hidden;
                    }
                    .carousel-item img {
                        height: 500px;
                        width: 500px
                        object-fit: cover;
                    }
                    .method-detail {
                        background-color: #b9b2b2;
                        padding: 30px;
                        border-radius: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .method-detail h3 {
                        margin-bottom: 10px;
                    }
                `}
                            </style>
                        </Container>
                    </Row>

                </Col>
            </Row>



        </div>

    )
}

export default Cleaning








