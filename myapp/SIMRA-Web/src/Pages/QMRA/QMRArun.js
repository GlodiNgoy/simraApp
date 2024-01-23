import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Image, Navbar } from 'react-bootstrap';
import { FaSignOutAlt, FaChartBar, FaHome, FaFile } from 'react-icons/fa';


function RunQMRA() {

  const navigate = useNavigate();
  const [pathogenResult, setPathogenResult] = useState(null);
  const [pathogenName, setPathogenName] = useState(null);

  const containerStyle = {
    border: '1px solid grey',
    borderRadius: '10px',
    padding: '20px',

    alignItems: 'center',
  };

  // Function to display pathogenResult
  function displayPathogenResult(pathogenResult) {
    try {
      // Code for displaying pathogenResult
      console.log('Pathogen Result:', pathogenResult);
    } catch (error) {
      console.error('Error displaying pathogenResult:', error);
    }
  }


  let riskLevelBlock = null;

  if (Math.round(pathogenResult) <= 0) {
    riskLevelBlock = (
      <>
        <div className='text-center mb-5'>
          <h3>Absence of faecal contamination  </h3>

        </div>

        <div className='text-center' style={{ backgroundColor: 'green', padding: '15px' }}>

          <span style={{ color: 'black' }}>LOW RISK</span>
        </div>
        <div className="text-center">

        </div>
      </>
    );
  } else {
    riskLevelBlock = (

      <>
        <div className='text-center mb-5' style={{ color: 'red' }}>
          <h3>Presence of faecal contamination  </h3>

        </div>

        <div className='text-center' style={{ backgroundColor: 'red', padding: '5px' }}>
          <span style={{ color: 'black' }}>VERY HIGH RISK </span>
        </div>
        <div className="text-center">
          <Card.Text className="text-center ">
            <h3>Select language to show your methods  </h3>
            <Link to="/CleaningEnglish"><button variant="outline-primary" className='show' >ENGLISH</button></Link>
          </Card.Text>
          <Card.Text className="text-center">
            <Link to="/Zulu2"><button variant="outline-primary" className='show' >ZULU</button></Link>
          </Card.Text>
          <Card.Text className="text-center  mb-3">
            <Link to="/Afrikaans2"><button variant="outline-primary" className='show' >AFRIKAANS</button></Link>
          </Card.Text></div></>
    );
  }

  const handleH2SClick = () => {
    navigate('/FIB');
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
          navigate('/Level', { state: { userId: userId } });
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

  useEffect(() => {
    axios.get('http://localhost:3001/api/referencepathogen')
      .then((response) => {
        console.log('API Response:', response.data);
        const pathogenName = response.data.pathogenName;
        setPathogenName(pathogenName);
      })
      .catch((error) => {
        console.error('Error fetching pathogenName:', error);
      });

  }, []); 

  const sendData = () => {
    if (!pathogenName) {
      console.error('Pathogen name is missing.');
      return;
    }

    // Make a POST request to calculate pathogenResult using the fetched pathogenName
    axios.post('http://localhost:3001/api/parameters', { pathogenName: pathogenName })
      .then((response) => {
        const pathogenResult = response.data.pathogenResult;
        setPathogenResult(pathogenResult);
        displayPathogenResult(pathogenResult);
        console.error('parameters added successfully:', response);
      })
      .catch((error) => {
        console.error('Error calculating pathogenResult:', error);
      });
  };
  const handleQMRA = () => {
    navigate('/LikelihoodOfInfection');
  };
  return (
    <div className='App'>
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
          <Container fluid className="side mt-5" >
            <Card >
              <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate} ><FaHome /> Home</Button></Card.Body>
              <Card.Body>
                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleH2SClick}>
                  <FaChartBar /> FIB DATA
                </Button>
              </Card.Body>
              <Card.Body>
                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleQMRA}>
                  <FaChartBar /> QMRA
                </Button>
              </Card.Body>
              <Card.Body><Link to="/"> <Button variant="primary" size="lg" style={{ width: '100%' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
            </Card>
          </Container>
        </Col>
        <Col xs={30} sm={8} md={6} lg={10}>
          <Container fluid>
            <Row className="justify-content-center mt-5">
              <Col xs={12} sm={8} md={6}>
                <div backgroundColor='white' style={containerStyle}>

                  <Popup
                    trigger={
                      <div>
                        <Button variant="outline-primary mt-5 mb-5" style={{ width: '100%' }} onClick={sendData} >RUN PROBABILITY OF INFECTION </Button>

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
                            <p>THE SELECTED PATHOGEN NAME: {pathogenName} </p>
                            <p>THE PROBABILITY OF INFECTION : {pathogenResult} </p>
                          </div>
                        </Card.Text>
                        <Card.Text>{riskLevelBlock}</Card.Text>
                      </Card>
                    )}
                  </Popup>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
export default RunQMRA
