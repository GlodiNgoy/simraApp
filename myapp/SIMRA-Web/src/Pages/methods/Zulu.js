import React, { useState } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { FaSurvey, FaFile, FaSignOutAlt,FaHome} from 'react-icons/fa';
import axios from 'axios';

function Zulu() {
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
                        <Card  style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }}>
                        <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                            

                            <Card.Body><Button variant="primary" size="lg" style={{ width: '100%' }}><FaSignOutAlt /> Logout</Button></Card.Body>
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
                                                <th>INDLELA 1: Amanzi abilayo</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Indlela elula yokuhlanza amanzi iwukubilisa isikhathi esihle.
                                                        Amazinga okushisa aphezulu abangela ukuba amagciwane kanye negciwane kuhlakazeke, kususwe konke ukungcola emanzini.
                                                        Ngokwenza kanjalo, izengezo zamakhemikhali ziyayeka ukuba khona emanzini. Nokho, ama-micro-organisms afile kanye nokungcola kuhlala phansi emanzini,
                                                        futhi ukubilisa akusizi ukuqeda konke ukungcola.
                                                        Kumele uhlunge amanzi ngesihlungo esincane ukuze ususe ngokuphelele ukungcola.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 2: Isihlanzi samanzi</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Isihlanzi samanzi sikagesi siyindlela ethembeke kakhulu yokuhlanza amanzi etholakala ezindlini eziningi namuhla.
                                                        Isihlanzi samanzi sisebenzisa inqubo enezigaba eziningi ehlanganisa ukuhluzwa kwe-UV ne-UF, i-carbon block,
                                                        kanye nobuchwepheshe besimanje bokuhlunga amanzi obuqeda iningi lamakhemikhali nokungcola, okuwenza abe amanzi ahlanzekile okuphuza.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 3: Reverse Osmosis</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>I-RO Purifier ifakazela ukuthi ingenye yezindlela ezingcono kakhulu zokuhlanza amanzi.
                                                        I-Reverse Osmosis iphoqelela amanzi ngolwelwesi olungangeneka kalula futhi isuse ukungcola.
                                                        I-TDS Controller and Mineraliser Technology, njengaleyo etholakala ku-A. O. Smith RO UV Water Purifier,
                                                        ukusiza ukugcina imisoco edingekayo ngenkathi ususa ukungcola okuyingozi.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 4: I-Chlorination Yamanzi</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Kuyindlela endala esetshenziswa ngokujwayelekile ngesikhathi sezimo eziphuthumayo, lapho i-bleach ethambile ene-chlorine elinganiselwa ku-5% yengezwa emanzini.
                                                        Le ngxube isebenza njenge-oxidant futhi ibulala ngokushesha ama-microorganisms, okwenza amanzi aphephe ukusetshenziswa.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 5: I-distillation</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>I-distillation iyinqubo yokuhlanza amanzi ehlanganisa ukuqoqa amanzi ajiyile ngemva kokuhwamuka,
                                                        ukuqinisekisa ukuthi amanzi awanawo ukungcola. Nokho, lokhu akuphumelelanga njengesihlungi se-RO ngoba kudla isikhathi futhi kuqeda amaminerali.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 6: Ukwengeza Iodine</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Iodine ikhemikhali ebomvu etholakala kalula njengethebhulethi noma uketshezi. Inamandla ngokwedlulele njengoba ibulala amagciwane namagciwane.
                                                        Nokho, yengeza ukunambitheka okungajabulisi futhi kungaba yingozi uma ithathwa ngemithamo ephezulu.
                                                        Ngakho-ke, kufanele isetshenziswe kuphela uma ungakwazi ukufinyelela indlela engcono yokuhlanza njengesihlanzi samanzi sikagesi.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 7: Ukuhlanzwa kwelanga</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>I-RO Purifier ifakazela ukuthi ingenye yezindlela ezingcono kakhulu zokuhlanza amanzi.
                                                        I-Reverse Osmosis iphoqelela amanzi ngolwelwesi olungangeneka kalula futhi isuse ukungcola.
                                                        I-TDS Controller and Mineraliser Technology, njengaleyo etholakala ku-A. O. Smith RO UV Water Purifier,
                                                        ukusiza ukugcina imisoco edingekayo ngenkathi ususa ukungcola okuyingozi.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 8: Ukuhlunga Izitsha Zobumba</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Ngaphambi kokuba abantu bathole i-RO noma i-UV Purifier, babesebenzisa izimbiza zobumba ezazihlanza amanzi anodaka,
                                                        ngokuvimbela udaka nokuvumela amanzi ahlanzekile, aphuzwayo ukuba adlule. Le ndlela isasetshenziswa kwezinye izifunda zasemakhaya.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 9: Imisebe ye-UV</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <li>Amanzi avezwa kuMbane we-UV obulala amagciwane, ngaleyo ndlela avimbele ukuthi aqhubeke nokuzala.
                                                        Kodwa uma ingahlanganiswa nesihlungi se-RO, i-UV Radiation iyodwa ayikwazi ukususa ukungcola nezinsimbi ezisindayo.</li>

                                                </td>
                                            </tr>
                                            <tr>
                                                <th>INDLELA 10: Ukukhipha usawoti emanzini</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <li>Le ndlela isetshenziswa lapho amanzi anezinga elithile losawoti edinga ukuhlungwa. Le nqubo iyasiza.</li>


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

export default Zulu








