

import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaFile, FaSignOutAlt, FaVideo, FaHome } from 'react-icons/fa';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './H2S.css'

function H2S() {

  const [showButton, setShowButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isYellowTextVisible, setIsYellowTextVisible] = useState(false);
  const [isBlackTextVisible, setIsBlackTextVisible] = useState(false);
  const navigate = useNavigate();

  //const [UserId] = useState(tempData.state.userId);


  const tempData = useLocation();
  const SamplingData = tempData.state ? tempData.state.temp : null;

  const [maxId, setMaxId] = useState(null);

  // Function to fetch the max ID
  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/maxId');
        console.log('API response:', response.data);
        if (response.data.rows && response.data.rows[0] && response.data.rows[0].lastId) {
          setMaxId(response.data.rows[0].lastId);
        } else {
          console.error('Max ID not found in the response.');
        }
      } catch (error) {
        console.error('Error while fetching max ID:', error);
      }
    };

    fetchMaxId();
  }, []);

  const addRow = () => {
    setRowCount(rowCount + 1);
  };



  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  function handleSubmitButton() {
    let riskLevelBlock = null; // Initialize the risk level block to null

    // Handle submission here, you can use the selectedOption state.
    console.log(`Selected Option: ${selectedOption}`);
    if (selectedOption === 'NEGATIVE') {
      setIsYellowTextVisible(true); // Show the negative message
      setIsBlackTextVisible(false); // Hide the positive message
    } else if (selectedOption === 'POSITIVE') {
      setIsYellowTextVisible(false); // Hide the negative message
      setIsBlackTextVisible(true); // Show the positive message

    }
    const h2s_test = {
      status: selectedOption,
      risk_type: '',
      samplingId: maxId,
    };



    axios.post("http://localhost:3001/api/hydrogensulfide", h2s_test).then((response) => {

      if (response.data.success === true) {

      }
      else {
        console.error('H2S:', response.data.message);
      }
    })
      .catch((error) => {
        console.error('Error while making the API request:', error);
      });
  }

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
              <Navbar.Brand >
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
          <Container fluid className="side mt-5" >
            <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }} >

              <Card.Body ><Link to="/Home" ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Link></Card.Body>


              <Card.Body ><Link to="/Survey"><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaQuestionCircle /> Survey</Button></Link></Card.Body>

              <Card.Body><Link to="/Video"><Button variant="secondary" size="lg" style={{ width: '100%' }} ><FaVideo /> Video</Button></Link></Card.Body>
              <Card.Body ><Link to="/File"><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaFile /> Reports </Button></Link></Card.Body>
              <Card.Body><Link to="/"> <Button style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>

            </Card>
          </Container>
        </Col>

        <Col xs={30} sm={8} md={6} lg={10} style={{ backgroundImage: 'url("/images/back.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', filter: blur('25px') }}>
          <Row>
            <Container fluid className='mt-5 '  >
              <Card className='mt-2 mb-5 mx-auto text-center' style={{ background: 'rgba(255, 255, 255, 0.5)', width: '1000px', borderRadius: '30px' }}>


                <Card.Body style={{ background: 'rgba(255, 255, 255, 0.5)' }} >
                  <h4 className="text-dark mt-5" >PLEASE CHOOSE THE COLOUR OF THE STRIP</h4>
                  <button
                    className={`p-5 mb-2 ${selectedOption === 'NEGATIVE' ? 'bg-light' : 'bg-light'}`} style={{ marginRight: '100px', width: '10px' }}
                    id="yellow"
                    name="test_color"
                    value="YELLOW"

                  >
                  </button>

                  <button
                    className={`p-5 mb-2 ${selectedOption === 'POSITIVE' ? 'bg-dark ' : 'bg-dark'}`} style={{ width: '10px' }}
                    id="black"
                    name="test_color"
                    value="BLACK"

                  >
                  </button>
                  <div>
                    <label className='button_option'>
                      <input className='radio_button'
                        type="radio"
                        value="NEGATIVE"
                        checked={selectedOption === 'NEGATIVE'}
                        onChange={handleRadioChange}
                      />
                      NEGATIVE
                    </label>

                    <label className='button_option'>
                      <input className='radio_button'
                        type="radio"
                        value="POSITIVE"
                        checked={selectedOption === 'POSITIVE'}
                        onChange={handleRadioChange} style={{ marginRight: '10px' }}
                      />
                      POSITIVE
                    </label>
                  </div>
                  {showButton && (

                    <p>Absence of faecal contamination.</p>

                  )}
                </Card.Body>

                <div className='text-center mt-5'>
                  <br></br>
                  <button onClick={handleSubmitButton} className='submit_button' type="submit" value="Submit">
                    SUBMIT
                  </button>
                  <br></br>
                  {isYellowTextVisible && (
                    <div className='text-center mt-5' style={{ fontWeight: 'bold' }}>
                      <p>NO RISK !!!  ENJOY YOUR WATER!!</p>
                      <p>WATER IS CLEAN, THERE IS NO FAECAL CONTAMINATION </p>
                    </div>
                  )}

                  {isBlackTextVisible && (
                    <><div className='text-danger mt-5' style={{ fontWeight: 'bold' }}>

                      <p>WATER IS NOT CLEAN, THERE IS FAECAL CONTAMINATION </p>
                    </div><Card.Body>
                        <Popup
                          trigger={
                            <button className='show' variant="outline-primary">SHOW RISK LEVEL</button>}
                          modal
                          nested
                          overlayStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          }}

                        >
                          {() => (
                            <Card variant="outline-primary" className='text-center'>
                              <Card.Header>Risk Level:</Card.Header>
                              <Card.Text><div style={{ backgroundColor: 'red', padding: '5px' }}>
                                <span className='text-center' style={{ color: 'black' }}>High Risk</span>
                              </div></Card.Text>
                              <Card.Text className="text-center mb-5 ">
                                <h3>SHOW METHODS </h3>
                                <Link to="/Cleaning"><button variant="outline-primary" className='show' >METHODS</button></Link>
                              </Card.Text>

                            </Card>
                          )}
                        </Popup>
                      </Card.Body></>



                  )}

                </div>

              </Card>
            </Container>
          </Row>

        </Col>
      </Row>
    </div>
  );
}

export default H2S;
