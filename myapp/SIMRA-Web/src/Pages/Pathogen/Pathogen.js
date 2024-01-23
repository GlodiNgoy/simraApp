
import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import { FaFile, FaSignOutAlt, FaChartBar, FaHome } from 'react-icons/fa';
import { Table, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function H2S() {
    const [rowCount, setRowCount] = useState(1);
    const [Pathogen, setPathogen] = useState('');
    const [Model, setModel] = useState('');
    const [countValues, setCountValues] = useState(['']);

    const [pathogenResult, setPathogenResult] = useState(null);
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
    // State to control the display of the popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupResultsOpen, setIsisPopupResultsOpen] = useState(false);
    // Define a new state variable to hold the count estimate from the database
    const [countEstimate, setCountEstimate] = useState(null);
    // Function to handle opening the popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };
    // Function to handle closing the popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };
    // Function to handle opening the popup
    const openResultPopup = () => {
        setIsisPopupResultsOpen(true);
    };
    // Function to handle closing the popup
    const closeResultPopup = () => {
        setIsisPopupResultsOpen(false);
    };

    // Mapping of indicators to ratios
    const pathogenModel = {
        EcoliO157H7: 'Beta-Poisson',
        Cryptosporidiumparvum: 'Exponential',
        ExponCampylobacterjejuniential: 'Beta-Poisson',
        Salmonellatyphi: 'Beta-Poisson',
        SFlexneri: 'Beta-Poisson',
        Vibriocholera: 'Beta-Poisson',
        Entamoebacoli: 'Beta-Poisson',
        Campylobacterjejuni: 'Beta-Poisson',
        Giardialambia: 'Exponential',
    }
    const addRow = () => {
        setRowCount(rowCount + 1);
        setCount('');
        setCountValues([...countValues, '']);
    };

    // Function to handle indicator change and set the corresponding ratio
    const handlePathogenChange = (event) => {
        const selectedPathogen = event.target.value;
        setPathogen(selectedPathogen);
        // Set the corresponding ratio based on the selected indicator
        setModel(pathogenModel[selectedPathogen] || '');
    };
    // Function to handle closing the popup and navigate to another page
    const closePopupAndRedirect = () => {
        setIsPopupOpen(false);
        setIsisPopupResultsOpen(false);

        // Use the navigate function to redirect to another page
        navigate('/QMRARun');
    };
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
                    <Card.Text className="text-center mb-5 ">

                        <Link to="/CleaningEnglish1"><button variant="outline-primary" className='show' >SHOW METHODS</button></Link>
                    </Card.Text>
                </div></>
        );
    }
    // Function to calculate the estimated count
    const calculateEstimatedCount = () => {

        // Check if a valid pathogen is selected
        if (!Pathogen || !Model) {
            console.error('Please select pathogen');
            return;
        }
        // Check if all counts are provided
        if (countValues.some(count => count === '')) {
           
            console.error('Please enter counts for all rows.');
            return;
        }

        openPopup();
        openResultPopup();
        const pathogenData = {
            pathogene_Name: Pathogen,
            userCount: countValues,
            pathogen_res: pathogenResult,
            model: Pathogen,
            samplingId: maxId,
        };
        axios.post('http://localhost:3001/api/mstPathogen', pathogenData)
            .then((response) => {
                if (response.data.message === "Pathogen added successfully") {
                    // Handle success, if needed
                    console.log('Pathogen added successfully:', response.data.results);

                    // Set the pathogen result in state
                    // Check if the 'results' property exists in the response
                    if (response.data.results && response.data.results.pathogenResult !== undefined) {
                        // Set the pathogen result in state
                        setPathogenResult(response.data.results.pathogenResult);
                    }

                    openPopup();
                    openResultPopup();
                } else {
                    console.error('Error adding pathogen:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error while making the API request:', error);
            });
    };
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
                    navigate('/Level3', { state: { userId: userId } });
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
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [qmraData, setQmraData] = useState([]);
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios
                .get('http://localhost:3001/api/theuser', {
                    params: {
                        userId: userId,
                    },
                })
                .then(response => {
                    if (response.data && Array.isArray(response.data.results)) {
                        // Check if the response data is an array
                        if (response.data.results.length > 0) {
                            const user = response.data.results[0]; // Assuming there's only one user
                            const userFirstName = user.firstname;
                            const userLastName = user.lastname;
                            setUserName(userFirstName);
                            setLastName(userLastName);
                            console.log('lastname', userLastName);
                        } else {
                            console.error('No user data found for the given user ID.');
                        }
                    } else {
                        console.error('API response is not in the expected format:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error while fetching QMRA data:', error);
                });
        }
    }, []);
    const handleQMRA = () => {
        navigate('/MST');
    };
    const handleQMRAClick = () => {
        navigate('/QMRASelect');

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
                        <Card className='mt-2' style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)', height: '500px', marginTop: '400px' }}>
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                            <Card.Body>
                                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleQMRA}>
                                    <FaChartBar /> MST DATA
                                </Button>
                            </Card.Body>
                            <Card.Body>
                                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleQMRAClick}>
                                    <FaChartBar /> QMRA
                                </Button>
                            </Card.Body>

                            <Card.Body><Link to="/"> <Button style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>

                        </Card>
                    </Container>
                </Col>
                <Col xs={30} sm={8} md={6} lg={10}>
                    <Container className="mt-5 mx-auto mb-5 " style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '30px' }} >
                        <h3 className="mt-5 mb-5" > PATHOGEN DATA</h3>
                        <Table striped bordered >
                            <thead className="table-primary">
                                <tr>
                                    <th>Count</th>
                                    <th>Reference Pathogen</th>
                                    <th>Model</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: rowCount }).map((_, index) => (
                                    <tr key={index + 1}>
                                        <td>
                                            <Form.Control type="text" name={`count_${index + 1}`} value={countValues[index]}
                                                onChange={(event) => {
                                                    const updatedCountValues = [...countValues];
                                                    updatedCountValues[index] = event.target.value;
                                                    setCountValues(updatedCountValues);
                                                }} />
                                        </td>
                                        <td>
                                            <Form.Control as="select" name={`pathogen_${index + 1}`} onChange={handlePathogenChange} value={Pathogen}>
                                                <option value="">--Select--</option>
                                                <option value="Cryptosporidiumparvum">Cryptosporidium parvum</option>
                                                <option value="EcoliO157H7">E. coli O157:H7</option>
                                                <option value="Campylobacterjejuni">Campylobacter jejuni</option>
                                                <option value="Salmonellatyphi">Salmonella typhi</option>
                                                <option value="SFlexneri">S. Flexneri</option>
                                                <option value="Vibriocholera">Vibrio cholera</option>
                                                <option value="Giardialambia">Giardia lambia</option>
                                                <option value="Entamoebacoli">Entamoeba coli</option>
                                            </Form.Control>
                                            <FormControl
                                                type="text"
                                                name={`other_pathogen_${index + 1}`}
                                                style={{ display: 'none' }}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control as="select" name={`model_${index + 1}`} value={Model}>
                                                <option value="">--Select--</option>
                                                <option value="Beta-Poisson">Beta-Poisson</option>
                                                <option value="Exponential">Exponential</option>
                                            </Form.Control>
                                            <FormControl
                                                type="text"
                                                name={`other_model_${index + 1}`}
                                                style={{ display: 'none' }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <button className="btn mt-5 mb-5" id="calculateEstimatedCount" style={{
                            background: 'rgba(108, 117, 125)',
                            width: '250px',

                            margin: '0 auto',
                            color: 'white',

                        }} onClick={calculateEstimatedCount}>
                            CALCULATE PI
                        </button>
                        <Popup open={isPopupOpen} closeOnDocumentClick onClose={closePopup}>
                            {(close) => (
                                <Card variant="outline-primary">
                                    <Card.Text>
                                        <div className="popup-content text-center">

                                            <h2>PI</h2>
                                            <p>Results added successfully!!!</p>
                                            {pathogenResult !== null && (
                                                <div>
                                                    <p>PATHOGEN PROBABALITY OF INFECTION : {pathogenResult}</p>
                                                </div>
                                            )}
                                        </div>
                                    </Card.Text>
                                    <Card.Text>{riskLevelBlock}</Card.Text>
                                </Card>
                            )}
                        </Popup>
                    </Container>
                </Col>
            </Row>
        </div>
    );
}
export default H2S;
