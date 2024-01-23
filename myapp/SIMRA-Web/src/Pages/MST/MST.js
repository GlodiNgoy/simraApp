
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Table, Button, Form, Row, Col, Image, Navbar } from 'react-bootstrap';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FaFile, FaSignOutAlt, FaChartBar, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import './MST.css'
import backgroundImage from './back.jpg';

function App() {
    const [rowCount, setRowCount] = useState(1);
    const [Count, setCount] = useState('');
    const [Indicator, setIndicator] = useState({});
    const [Pathogen, setPathogen] = useState('');
    const [Model, setModel] = useState('');
    const [Ratio, setRatio] = useState('');
    const [maxId, setMaxId] = useState(null);
    const [countValues, setCountValues] = useState(['']);
    const [selectedRatio, setSelectedRatio] = useState(1);
    const [average, setAverage] = useState(0);
    const [pathogenResult, setPathogenResult] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [infectionResult, setInfectionResult] = useState('');
    const [selectedExposure, setSelectedExposure] = useState('');
    const [pathogenName, setPathogenName] = useState(null);

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
    const indicatorRatios = {
        Cow: '0.66',
        Human: '1',
        Dog: '0.01',
        Pig: '0.8',
        Chicken: '0.01',
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
        Giardialamblia: 'Exponential',
    }
    const addRow = () => {
        setRowCount(rowCount + 1);
        setCount('');
        setCountValues([...countValues, '']);
    };
    // Function to handle indicator change and set the corresponding ratio
    const handleIndicatorChange = (event) => {
        const selectedIndicator = event.target.value;
        setIndicator(selectedIndicator);
        // Set the corresponding ratio based on the selected indicator

        setRatio(indicatorRatios[selectedIndicator] || '');
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
    // Function to calculate the estimated count
    const calculateEstimatedCount = () => {
      // Check if the required fields are selected
      if (!Indicator || !Ratio || !Pathogen || !Model) {
        // Display an error message or handle it as needed
        console.error('Please select all required fields');
        return;
      }
      // Check if all counts are provided
      if (countValues.some(count => count === '')) {
           
        console.error('Please enter counts for all rows.');
        return;
    }
        // Calculate the ratio based on the selected indicator
        let calculatedRatio = 1;
        if (Indicator === 'Cow') {
            calculatedRatio = 0.66;
        } else if (Indicator === 'Human') {
            calculatedRatio = 1;
        } else if (Indicator === 'Dog') {
            calculatedRatio = 0.01;
        } else if (Indicator === 'Pig') {
            calculatedRatio = 0.8;
        }
        else if (Indicator === 'Chicken') {
            calculatedRatio = 0.01;
        }
        const estimatedCount = average * calculatedRatio;
        setCountEstimate(estimatedCount);
        // If no rows are added, use the first count as the value
        if (rowCount === 1 && !isNaN(parseFloat(countValues[0]))) {
            const firstRowValue = parseFloat(countValues[0]);
            const estimatedCount = firstRowValue * calculatedRatio;
            setCountEstimate(estimatedCount);
            // Open the popup to display the result
            openPopup();
            openResultPopup();
        } else {
            // Calculate the average based on the values in countValues array
            const firstRowValue = parseFloat(countValues[0]);
            const secondRowValue = parseFloat(countValues[1]);

            if (!isNaN(firstRowValue) && !isNaN(secondRowValue)) {
                const average = (firstRowValue + secondRowValue) / 2;
                // Set the countEstimate state using the calculated average and selected ratio
                setCountEstimate(average * calculatedRatio);
                // Open the popup to display the result
                openPopup();
                openResultPopup();
            }
        }
        const selectedRatio = indicatorRatios[Indicator];
        //
        const selectedModel = pathogenModel[Pathogen];
        //
        const GetModel = (pathogen) => {
            if (pathogen === "Cryptosporidiumparvum") {
                return 'exponential';
            } else if (pathogen === "EcoliO157H7") {
                return 'beta-poisson';
            } else if (pathogen === "Campylobacterjejuni") {
                return 'beta-poisson';
            } else if (pathogen === "Salmonellatyphi") {
                return 'beta-poisson';
            } else if (pathogen === "SFlexneri") {
                return 'beta-poisson';
            } else if (pathogen === "Vibrioholera") {
                return 'beta-poisson';
            } else if (pathogen === "Giardialamblia") {
                return 'exponential';
            } else if (pathogen === "Entamoebacoli") {
                return 'beta-poisson';
            } else {
                return '';
            }
        };
        const calculateRatio = (indicator) => {
            if (indicator === "Cow") {
                return 0.66;
            } else if (indicator === "Human") {
                return 1;
            } else if (indicator === "Dog") {
                return 0.01;
            } else if (indicator === "Pig") {
                return 0.8;
            } else if (indicator === "Chicken") {
                return 0.01;
            } else {
                return 1;
            }
        };

        const data = {
            mstdata_names: Indicator,
            count_mst: average,
            ratio_mst: selectedRatio,
            count_estimate: 0,
            samplingId: maxId,
        }
        axios.post('http://localhost:3001/api/mstEstimate', data)
            .then((response) => {
                if (response.data.message === "added MST") {
                    // Update the countEstimate state with the value from the API response
                    setCountEstimate(response.data.countAverage);
                    // Open the popup to display the result
                    openPopup();

                } else {
                    console.error('MST : ', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error while making the API request:', error);
            });
        const pathogenData = {
            pathogenName: Pathogen,
            model: Model,
        }
        openResultPopup();
        // Calculate the ratio based on the selected indicator
        data.ratio = calculateRatio(Indicator);
        data.model = GetModel(Pathogen);

        axios.post('http://localhost:3001/api/mstreference', pathogenData)
            .then((response) => {
                if (response.data.message === "added mstreference") {
                } else {
                    console.error('mstreference:', response.data.message);
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

    // Function to calculate the average of all count values
    const calculateAverage = () => {

        const total = countValues.reduce((acc, value) => {
            const parsedValue = parseFloat(value);
            return isNaN(parsedValue) ? acc : acc + parsedValue;
        }, 0);
        return countValues.length > 0 ? total / countValues.length : 0;
    };


    useEffect(() => {
        setAverage(calculateAverage());
    }, [countValues]);

    const handlePathogenClick = () => {
        navigate('/Pathogen');
    };

    useEffect(() => {
        axios.get('http://localhost:3001/api/mstreference')
            .then((response) => {
                console.log('API Response:', response.data);
                const pathogenName = response.data.pathogenName;
                setPathogenName(pathogenName);
            })
            .catch((error) => {
                console.error('Error fetching mstreference:', error);
            });

    }, []);

    const sendData = () => {
        const data = {
            pathogenName: Pathogen,
            pathogenRes: 0,
        }


        // Make a POST request to calculate pathogenResult using the fetched pathogenName
        axios.post('http://localhost:3001/api/QRMAlevel3', data)
            .then((response) => {
                const pathogenResult = response.data.results.pathogenResult;
                setPathogenResult(pathogenResult);
                openResultPopup();


                //displayPathogenResult(pathogenResult);
                console.error('parameters added successfully:', response);


                setShowPopup(true);
            })
            .catch((error) => {
                console.error('Error calculating pathogenResult:', error);
            });

    }

    const closePop = () => {
        setShowPopup(false);
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
                    <Card.Text className="text-center ">

                        <Link to="/CleaningEnglish2"><button variant="outline-primary" className='show' >SHOW METHODS</button></Link>
                    </Card.Text>
                </div></>
        );
    }
    const handleQMRAClick = () => {
        navigate('/QMRASelect');

    };




    return (
        <div className=''  >


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
                    <Col xs={6} sm={0} md={0} lg={2} >
                        <Container fluid className="side mt-5" >
                            <Card className='mt-2' style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)', height: '500px', marginTop: '400px' }}>
                                <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                                <Card.Body>
                                    <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handlePathogenClick}>
                                        <FaChartBar /> PATHOGEN DATA
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
                    <Col xs={30} sm={8} md={6} lg={10} style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', filter: blur('25px') }}>
                        <Container className="mt-2 mb-5" style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '30px' }} >
                            <h4 className="mt-5 mb-5" >MICROBIAL SOURCE TRACKING DATA</h4>
                            <Table striped bordered >
                                <thead className="table-primary">
                                    <tr>
                                        <th>Count</th>
                                        <th>Makers</th>
                                        <th>Ratio</th>
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
                                                <Form.Control as="select" name={`indicator_${index + 1}`} onChange={handleIndicatorChange} value={Indicator} >
                                                    <option value="">--Select--</option>
                                                    <option value="Cow">Cow</option>
                                                    <option value="Human">Human</option>
                                                    <option value="Dog">Dog</option>
                                                    <option value="Pig">Pig</option>
                                                    <option value="Chicken">Chicken</option>

                                                </Form.Control>
                                                <FormControl
                                                    type="text"
                                                    name={`other_indicator_${index + 1}`}
                                                    style={{ display: 'none' }}
                                                />
                                            </td>
                                            <td>
                                                <Form.Control as="select" name={`ratio_${index + 1}`} value={Ratio}>
                                                    <option value="">--Select--</option>
                                                    <option value="0.66">1:0.66</option>
                                                    <option value="1">1:1</option>
                                                    <option value="0.01">1:0.01</option>
                                                    <option value="0.8">1:0.8</option>
                                                    <option value="0.01">1:0.01</option>
                                                </Form.Control>
                                                <FormControl
                                                    type="text"
                                                    name={`other_ratio_${index + 1}`}
                                                    style={{ display: 'none' }}
                                                />
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
                                                    <option value="Giardialamblia">Giardia lambia</option>
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
                            <button class="btn  mt-5" variant="primary" id="add-row-btn" style={{
                                background: 'rgba(108, 117, 125)',
                                width: '250px',
                                display: 'block',
                                margin: '0 auto',
                                color: 'white',
                            }} onClick={addRow}>
                                Add Row
                            </button>
                            <div className='mt-5'>
                                <p>Average of Count : {calculateAverage()}</p>
                            </div>
                            <div className='mb-5'>
                                <button className="btn mt-5 mb-5" id="calculateEstimatedCount" style={{
                                    background: 'rgba(108, 117, 125)',
                                    width: '250px',

                                    margin: '0 auto',
                                    color: 'white',

                                }} onClick={calculateEstimatedCount} >
                                    ESTIMATED COUNT
                                </button>
                                <Popup open={isPopupOpen} closeOnDocumentClick onClose={closePopup}>
                                    <div className="popup-content text-center">
                                        <h2>Count Estimate</h2>
                                        {countEstimate !== null && (
                                            <p>ESTIMATED COUNT : {countEstimate}</p>
                                        )}
                                        <p>Results addedd successfully!!!!!</p>
                                        <button style={{ color: 'black' }} onClick={sendData}>RUN QMRA</button>
                                    </div>


                                    {showPopup && (
                                        <Card variant="outline-primary" className='scroll'>
                                            <Card.Text>
                                                <div className="custom-popup text-center">
                                                    <div className="popup-content text-center">

                                                        <div>
                                                            <p>THE SELECTED PATHOGEN NAME : {Pathogen} </p>
                                                            <p>MST PROBABALITY OF INFECTION : {pathogenResult} </p>
                                                        </div>

                                                        <button onClick={closePop} className="close-button" style={{ color: 'black' }}>
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>

                                            </Card.Text>
                                            <Card.Text>{riskLevelBlock}</Card.Text>




                                        </Card>

                                    )}
                                </Popup>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </div>
        </div>

    );
}
export default App;

