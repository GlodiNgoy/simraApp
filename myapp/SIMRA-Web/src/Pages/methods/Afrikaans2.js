import React, { useState } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaSurvey, FaFile, FaChartBar, FaSignOutAlt, FaHome } from 'react-icons/fa';
import axios from 'axios';

function Cleaning() {
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
    const handleH2SClick = () => {
        navigate('/FIB');
      };
      const handleQMRA = () => {
        navigate('/LikelihoodOfInfection');
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
                        <Card >
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
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
                    <Row>
                        <Container fluid >
                            <Card >
                                <Card.Body>


                                    <p className="text-danger">VOLG ASSEBLIEF HIERDIE METODES OM WATER TE SUIVER</p>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>METODE 1: Kook</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Bring die water tot 'n rollende kookpunt en hou dit vir ten minste een minuut (drie minute op hoër hoogtes) in stand. Laat die water afkoel voor gebruik.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 2: SODIS (Solar Water Disinfection)</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Vul deursigtige plastiekbottels met water en laat dit vir ten minste ses uur in direkte sonlig (of langer as dit bewolk is). Die UV-straling van die son sal help om die water te ontsmet.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 3: Filtrering</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Kies 'n waterfilter wat gesertifiseer is vir die verwydering van spesifieke kontaminante (gebruik bv. 'n lap wat 8 keer gevou is, kleipotte en keramiekfilters).</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 4: Chemiese ontsmetting</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Chemikalieë soos chloorbleikmiddel kan gebruik word om water te ontsmet. Voeg 'n doppie vol bleikmiddel in 25L water by. Laat die behandelde water vir 'n spesifieke kontaktyd sit voordat dit verbruik word.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 5: Ultraviolet (UV) Behandeling</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>UV-watersuiweraars gebruik UV-lig om water te ontsmet deur mikroörganismes te deaktiveer. Installeer 'n UV-suiweraar volgens die vervaardiger se instruksies en vervang gereeld die UV-lamp indien nodig.</li>

                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 6: Distillasie</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Distillasie behels kookwater en dan die opvang van die gekondenseerde damp. Versamel die gekondenseerde damp in 'n skoon houer en laat onsuiwerhede agter.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 7: Geaktiveerde koolstof</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Geaktiveerde koolstoffilters kan organiese chemikalieë, chloor en slegte smaak en reuke uit water verwyder. Installeer en onderhou 'n geaktiveerde koolstoffilter volgens die vervaardiger se instruksies.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 8: Draagbare watersuiweringstablette</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Gebruik kommersieel beskikbare watersuiweringstablette of -druppels volgens die instruksies op die verpakking. Laat die gespesifiseerde kontaktyd toe voordat die water gedrink word.</li>
                                                </td>
                                            </tr>



                                        </tbody>
                                    </table>

                                </Card.Body>


                            </Card>
                        </Container>
                    </Row>

                </Col>
            </Row>



        </div>

    )
}

export default Cleaning








