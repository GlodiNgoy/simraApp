

import React, { useState } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaFile, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';
import axios from 'axios';
function Video() {

  const [showButton, setShowButton] = useState(false);
  const toggleButton = () => {
    setShowButton(!showButton);
  };


  const navigate = useNavigate()

  const handleHomeNavigate = () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      // Make an HTTP request to fetch data based on the user ID if needed
      axios.get('http://localhost:3001/api/sampling_data', {
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
        <Col xs={6} sm={0} md={0} lg={2} >
          <Container fluid className="side mt-5" style={{ marginTop:'200px' }} >
            <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }} >
      
                <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                <Card.Body ><Link to="/Survey"><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaQuestionCircle /> Survey</Button></Link></Card.Body>
                <Card.Body><Link to="/H2S"><Button variant="secondary" size="lg" style={{ width: '100%' }} ><IoWaterOutline /> H2S</Button></Link></Card.Body>

                <Card.Body ><Link to="/File"><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaFile /> Reports </Button></Link></Card.Body>
                <Card.Body><Link to="/"> <Button style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
              </Card>
          </Container>
        </Col>

        <Col xs={30} sm={8} md={6} lg={10}>
          <Row>
            <Container fluid >
              <Card  style={{ backgroundColor: 'rgba(108, 117, 125, 0.1)' }} >
                
                <Card.Body style={{ backgroundColor: 'white' }} >Method 1: Boiling Method</Card.Body>
                <Card.Body>

                  <div class="embed-responsive embed-responsive-1by1">

                    <iframe width="716" height="403" src="https://www.youtube.com/embed/zlxFkfVO8E0" title="How To Purify Water At Home | Purifying Water With Boiling Method | Remove Bacteria From Tap Water" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                  </div>

                </Card.Body>
                <Card.Body style={{ backgroundColor: 'white' }} >METHOD 2: Water Chlorination</Card.Body>
                <Card.Body>

                  <div class="embed-responsive embed-responsive-1by1">

                    <iframe width="716" height="403" src="https://www.youtube.com/embed/WTxRxQsVXsY" title="Water disinfection with chlorine" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                  </div>

                </Card.Body>
              </Card>
            </Container>
          </Row>+

        </Col>
      </Row>




    </div>
  );
}

export default Video;

