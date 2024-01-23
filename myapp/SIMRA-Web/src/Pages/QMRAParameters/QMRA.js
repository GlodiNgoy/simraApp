import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { FaFile, FaSignOutAlt, FaChartBar, FaHome } from 'react-icons/fa';
import { Button, Card, Form, Row, Col, Image, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './QMRA.css';


function QMRA() {

 

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
                    <Container fluid className="side mt-5" >
                        <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)', height: '500px'}}>

                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>

                           
                            <Card.Body><Link to="/"> <Button style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>

                        </Card>
                    </Container>
                </Col>
                <Col xs={30} sm={8} md={6} lg={10} style={{ backgroundImage: 'url("/images/back.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', filter: blur('25px') }}>
                    <Container className="mt-5 " style={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '30px' }}>
                        <h4 className="mt-5 mb-5"> QMRA PARAMETERS </h4>
                        <Table bordered hover striped responsive="md mt-5 " className="custom-table mb-5">
                            <thead>
                                <tr>
                                    <th>This study organism</th>
                                    <th>Best fit model</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Campylobacter jejuni</td>
                                    <td>beta-poisson</td>
                                    <td>a = 0.145</td>
                                </tr>
                                <tr>
                                    <td>E. coli O157:H7</td>
                                    <td>beta-poisson</td>
                                    <td>a = 0.4 and ß = 45.9</td>
                                </tr>
                                <tr>
                                    <td>Salmonella typhi</td>
                                    <td>beta-poisson</td>
                                    <td>a = 0.21  ß = 49.78</td>
                                </tr>
                                <tr>
                                    <td>S. Flexneri</td>
                                    <td>beta-poisson</td>
                                    <td>a = 0.265  ß = 1480</td>
                                </tr>
                                <tr>
                                    <td>Vibrio cholera</td>
                                    <td>beta-poisson</td>
                                    <td>a = 0.169  ß = 2305</td>
                                </tr>
                                <tr>
                                    <td>Cryptosporidium parvum</td>
                                    <td>exponential</td>
                                    <td>r = 0.059</td>
                                </tr>
                                <tr>
                                    <td>Entamoeba coli</td>
                                    <td>beta-poisson</td>
                                    <td>a = 1.01E-01  N50 = 3.41E+02</td>
                                </tr>
                                <tr>
                                    <td>Giardia lambia</td>
                                    <td>exponential</td>
                                    <td>k = 0.0199</td>
                                </tr >
                            </tbody>
                        </Table>
                    </Container>


                </Col>





            </Row>




        </div >


    );
};

export default QMRA;