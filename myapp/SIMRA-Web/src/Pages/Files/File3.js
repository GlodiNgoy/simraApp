import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaChartBar, FaSignOutAlt, FaHome, } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Survey from '../Survey/Survey';




function File() {


  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [qmraData, setQmraData] = useState([]);
  const [UserId, setUserId] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);

    if (userId) {
      axios
        .get('http://localhost:3001/api/theuser', {
          params: {
            userId: userId,
          },
        })
        .then(response => {
          if (Array.isArray(response.data.results)) {
            // Check if the response data is an array
            setQmraData(response.data.results);

            const user = response.data.results[0]; // Assuming there's only one user
            const userFirstName = user.firstname;
            const lastName = user.lastname;
            setUserName(userFirstName);
            setLastName(lastName);

          } else {
            console.error('User data is not in the expected format:', response.data);
          }
        })
        .catch(error => {
          console.error('Error while fetching QMRA data:', error);
        });
    }
  }, []);


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
          navigate('/level3', { state: { userId: userId } });
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

  const handleMSTNavigate = () => {
    axios.get('http://localhost:3001/api/MST', {
      params: {
        userId: UserId,
      }

    })
      .then(response => {
        console.log(response.data);
        navigate('/MST', { state: { userId: UserId } });
      })
      .catch(error => {
        console.log(error);
      })

  }



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
        </Container>
      </Navbar>

      <Row>
        <Col xs={6} sm={0} md={0} lg={2}>
          <Container fluid className="side mt-5" >
            <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)', height: '500px' }} >
              <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>

              <Card.Body><Link to="/"> <Button style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
            </Card>
          </Container>
        </Col>

        <Col xs={30} sm={8} md={6} lg={10}>


          <Container fluid style={{ width: '100%', height: '100%' }}>
            <div class="card1 mt-5" style={{
              background: 'rgba(255, 255, 255, 0.5)', borderRadius: '30px', margin: 'auto',
              width: '70%', height: '500px'
            }}>
              <div className="page">
                <div class="card1">
                  <h3>Reports</h3>
                  <p>choose report to view and download</p>
                  <button type="button" class="btn btn-secondary"><Link to="/MSTFiles" className="link"><FaChartBar /> .MST Report</Link></button>

                  <button type="button" class="btn btn-secondary"><Link to="/PathogenFiles" className="link"><FaChartBar /> .Pathogen Report</Link></button>

                </div>
              </div>


            </div>
            <Card>

            </Card>
          </Container>

        </Col>
      </Row>

    </div>
  );

}

export default File;