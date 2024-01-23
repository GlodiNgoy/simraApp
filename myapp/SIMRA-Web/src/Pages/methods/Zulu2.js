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
                        <Card  style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }} >
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
                                    <p className="text-danger"></p>                                   
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>INDLELA 1: Ukubilisa</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <li>Bilisa amanzi bese uwagcina okungenani umzuzu owodwa (imizuzu emithathu endaweni ephakeme). Vumela amanzi aphole ngaphambi kokusetshenziswa.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 2: I-SODIS (I-Solar Water Disinfection)</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Gcwalisa amabhodlela epulasitiki acwebile ngamanzi futhi uwashiye elangeni okungenani amahora ayisithupha (noma ngaphezulu uma kunamafu). Imisebe ye-UV evela elangeni izosiza ekubulaleni amagciwane emanzini.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 3: Ukuhlunga</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Khetha isihlungi samanzi esigunyazwe ukususwa kokungcola okuthile (isb., sebenzisa indwangu egoqwe izikhathi ezingu-8, izimbiza zobumba, nezihlungi ze-ceramic).</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 4: Ukubulala Amagciwane Ngamakhemikhali</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Amakhemikhali afana ne-chlorine bleach angasetshenziswa ukuqeda amagciwane emanzini. Faka ikepisi eligcwele i-bleach emanzini angama-25L. Vumela amanzi ahlanzekile ukuthi ahlale isikhathi esithile sokuthintana ngaphambi kokuwadla.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 5: Ukwelashwa kwe-Ultraviolet (UV)</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Izihlanzi zamanzi ze-UV zisebenzisa ukukhanya kwe-UV ukuze zibulale amagciwane emanzini ngokuvala ama-microorganisms angasebenzi. Faka isihlanzi se-UV ngokwemiyalelo yomkhiqizi bese ushintsha njalo isibani se-UV uma kudingeka.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 6: Ukuhluza</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Ukucwiliswa kwamanzi kuhlanganisa amanzi abilayo bese kuqoqwa umhwamuko ojiyile. Qoqa umhwamuko ojiyile esitsheni esihlanzekile, ushiye ukungcola ngemuva.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 7: Ikhabhoni ecushiwe</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Izihlungi zekhabhoni ezicushiwe zingasusa amakhemikhali e-organic, i-chlorine, nokunambitheka okubi namaphunga emanzini. Faka futhi ulondoloze isihlungi sekhabhoni esicushiwe ngokuya ngemiyalelo yomkhiqizi.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 8: Amathebulethi Aphathekayo Okuhlanza Amanzi</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Sebenzisa amaphilisi noma amaconsi atholakalayo ukuze athengiselwe amanzi ngokulandela imiyalelo esephaketheni. Vumela isikhathi sokuxhumana esishiwo ngaphambi kokuphuza amanzi.</li>
                                                </td>
                                            </tr>
                                            
                                           

                                        </tbody>
                                    </table>
                                    <div className='mt-5'>
                                       
                                    </div>
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








