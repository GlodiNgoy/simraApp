import React, { useState } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSurvey, FaFile, FaSignOutAlt, FaHome } from 'react-icons/fa';

function Afrikaans() {
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
                                    <p className="text-danger">VOLG ASSEBLIEF HIERDIE METODES OM WATER TE SUIVER</p>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>METODE 1: Kookwater</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Die eenvoudigste metode om water te suiwer is om dit vir 'n goeie tyd te kook.
                                                        Hoë temperature veroorsaak dat bakterieë en virusse verdwyn, wat alle onsuiwerhede uit die water verwyder.
                                                        Sodoende hou chemiese byvoegings op om in die water te bestaan. Die dooie mikro-organismes en onsuiwerhede vestig egter op die bodem van die water,
                                                        en kook help nie om al die onsuiwerhede uit te skakel nie.
                                                        Jy moet die water deur 'n mikroporeuse sif syg om die onsuiwerhede heeltemal te verwyder.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 2: Watersuiweraar</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>’n Elektriese watersuiweraar is die mees betroubare vorm van watersuiwering wat vandag in die meeste huise voorkom.
                                                        'n Watersuiweraar gebruik 'n multi-stadium proses wat UV- en UF-filtrasie, koolstofblok,
                                                        en moderne waterfiltrasietegnologie wat die meeste van die chemikalieë en onsuiwerhede uitskakel, wat dit die suiwerste drinkwater maak.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 3: Omgekeerde osmose</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>’n RO-suiweraar blyk een van die beste metodes te wees om water te suiwer.
                                                        Omgekeerde osmose dwing water deur 'n semipermeabele membraan en verwyder kontaminante.
                                                        Die TDS-beheerder en mineraliseerder-tegnologie, soos die een wat in 'n A. O. Smith RO UV-watersuiweraar gevind word,
                                                        help om die nodige voedingstowwe te behou terwyl skadelike onsuiwerhede weggedoen word.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 4: Waterchlorinering</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Dit is 'n ouer tegniek wat gewoonlik tydens 'n noodgeval gebruik word, waarin 'n ligte bleikmiddel met ongeveer 5% chloor by die water gevoeg word.
                                                        Hierdie mengsel werk as 'n oksidant en maak vinnig mikro-organismes dood, wat water veilig maak vir verbruik.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 5: Distillasie</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Distillasie is 'n watersuiweringsproses wat die opvang van die kondenswater na verdamping behels,
                                                        verseker dat water vry is van kontaminante. Dit is egter nie so effektief soos 'n RO-filter nie, want dit is tydrowend en elimineer minerale.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 6: Jodiumbyvoeging</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Jodium is 'n rooi chemikalie wat maklik beskikbaar is as 'n tablet of 'n vloeistof. Dit is uiters kragtig aangesien dit bakterieë en virusse doodmaak.
                                                        Dit voeg egter 'n onaangename smaak by en kan dodelik wees as dit in hoë dosisse geneem word.
                                                        Daarom moet dit net gebruik word as jy nie toegang het tot 'n beter metode van suiwering soos 'n elektriese watersuiweraar nie.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 7: Sonsuiwering</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>’n RO-suiweraar blyk een van die beste metodes te wees om water te suiwer.
                                                        Omgekeerde osmose dwing water deur 'n semipermeabele membraan en verwyder kontaminante.
                                                        Die TDS-beheerder en mineraliseerder-tegnologie, soos die een wat in 'n A. O. Smith RO UV-watersuiweraar gevind word,
                                                        help om die nodige voedingstowwe te behou terwyl skadelike onsuiwerhede weggedoen word.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 8: Kleivatfiltrering</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Veel voordat mense toegang tot 'n RO- of UV-suiweraar gehad het, het hulle kleipotte gebruik wat modderige water gesuiwer het,
                                                        deur die modder uit te sluit en suiwer, drinkbare water deur te laat. Hierdie metode word steeds in sommige landelike streke gebruik.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 9: UV-straling</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <li>Water word aan 'n UV-lig blootgestel wat mikroörganismes doodmaak en sodoende verhoed dat dit verder broei.
                                                        Maar as dit nie met 'n RO-filter gekoppel word nie, kan UV-straling alleen nie onsuiwerhede en swaar metale verwyder nie.</li>

                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METODE 10: Ontsouting</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <li>Hierdie metode word gebruik wanneer water met 'n sekere vlak van soutgehalte gefiltreer moet word. Hierdie proses is nuttig.</li>


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

export default Afrikaans








