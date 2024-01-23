import React, { useState } from 'react';
import Chart from "react-apexcharts";
import { Button, Container, Card, Form, Row, Col, Image, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaFile, FaSignOutAlt, FaChartBar, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

function graph() {

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
    const handleFileNavigate = () => {
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
                    navigate('/QMRAFile', { state: { userId: userId } });
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



    const [state, setState] = useState({
        options: {
            colors: ["#4472c4", "#ed7d31", "#a5a5a5", "#ffc000", "#5b9bd5", "#70ad47", "#264478", "#9e480e"],
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                categories: ['Tshilapfene', 'Njhakanjhaka', 'Ha-mutsha', 'Tsiada'],
            },
            plotOptions: {
                bar: {
                    columnWidth: '80%',
                    barPadding: 20,
                    dataLabels: {
                        position: 'top',
                        enabled: false,
                        style: {
                            fontSize: '0px',
                            fontWeight: 'bold',
                        },
                    },
                },
                barHeight: '80%',
                distributed: true,

            },
            yaxis: {
                title: {
                    text: 'MEAN CFU/100 ml',
                },
            },

            grid: {
                show: false,
            },
        },
        series: [
            {
                name: "C.perfringes",
                data: [100, 100, 250, 250],
                barWidth: 10,

            },
            {
                name: "C. perfriges wet",
                data: [18000, 25000, 22000, 19000],
                barWidth: 10,

            },
            {
                name: "Faecal coliform dry",
                data: [180000, 250000, 220000, 190000],
                barWidth: 10,

            },
            {
                name: "Faecal coliform wet",
                data: [205000, 215000, 217000, 190000],
                barWidth: 10,

            },
            {
                name: "E. coli dry",
                data: [10000, 5000, 9000, 10000],
                barWidth: 10,

            },
            {
                name: "E. coli wet",
                data: [120000, 110000, 120000, 105000],
                barWidth: 10,

            },
            {
                name: "E. faecalis dry",
                data: [130000, 175000, 200000, 130000],
                barWidth: 10,
            },
            {
                name: "E. faecalis wet",
                data: [190000, 175000, 180000, 220000],
                barWidth: 10,
            },
        ],
    });
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
                        <Card >

                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleFileNavigate}><FaFile /> Records </Button></Card.Body>
                            <Card.Body><Link to="/"> <Button variant="primary" size="lg" style={{ width: '100%' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>

                        </Card>
                    </Container>
                </Col>

           
            <Col xs={30} sm={8} md={6} lg={10}>
                <Row>
                    <Container className="mt-5" >

                        <h1 style={{ textAlign: 'center' }}>
                            Results: FIB
                        </h1>
                        <div>
                            <div>
                                <Chart
                                    options={state.options}
                                    series={state.series}
                                    type="bar"
                                    width="100%"
                                    height="400%"

                                />
                            </div>

                        </div>

                    </Container>
                </Row>
            </Col>

            </Row>

        </div>

    );
}

export default graph