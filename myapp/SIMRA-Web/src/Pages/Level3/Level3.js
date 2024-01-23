
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Image, Stack, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';;

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaFile, FaSignOutAlt, FaChartBar, FaTachometerAlt, FaCheckCircle, FaUser } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';
import axios from 'axios';
import Survey from '../Survey/Survey';
import H2S from '../HTest/H2S';
import Popup from 'reactjs-popup';

function Home() {
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isButtonHovered1, setIsButtonHovered1] = useState(false);
    const navigate = useNavigate();
    const tempData = useLocation();
    const [UserId] = useState(tempData.state.userId);
    const [User] = useState(tempData.state.users);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editedPassword, setEditedPassword] = useState('');
    console.log('userid', UserId)
    console.log('username', User)

    localStorage.setItem('userId', UserId);

    // Function to handle opening the popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    // Function to handle closing the popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [qmraData, setQmraData] = useState([]);
    const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
    const [editedFirstName, setEditedFirstName] = useState(userName);
    const [editedLastName, setEditedLastName] = useState(lastName);
    
    const [originalLastName, setOriginalLastName] = useState(lastName);
    const [originalFirstName, setOriginalFirstName] = useState(userName);

    console.log(originalFirstName)

    const [editedProfile, setEditedProfile] = useState({
        firstName: '',
        lastName: '',
    });

    const handleFirstNameChange = (e) => {
        setEditedProfile({ ...editedProfile, firstName: e.target.value });
    };

    const handleLastNameChange = (e) => {
        setEditedProfile({ ...editedProfile, lastName: e.target.value });
    };

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
                    if (Array.isArray(response.data.results)) {
                        // Check if the response data is an array
                        setQmraData(response.data.results);

                        const user = response.data.results[0]; // Assuming there's only one user
                        const userFirstName = user.firstname;
                        const lastName = user.lastname;
                        const level = user.level;
                        setUserName(userFirstName);
                        setLastName(lastName);
                        setLevel(level);
                        setEditedFirstName(userFirstName);
                        setEditedLastName(lastName);
                        setOriginalLastName(lastName);
                        setOriginalFirstName(userFirstName);

                        console.log('lastname', lastName)
                        console.log('lastnamelevel', level)

                    } else {
                        console.error('QMRA data is not in the expected format:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error while fetching QMRA data:', error);
                });
        }
    }, []);
    // province
    const provinces = [
        'Free State',
        'Gauteng',
        'Kwazulu-Natal',
        'Limpopo',
        'Mpumalanga',
        'North west',
        'Western cape',
        'Eastern cape',
        'Northern Cape',
    ];

    // municipalities

    const municipalitiesByProvince = {
        'Free State': ['Mafube Local', 'Metsimaholo Local', 'Moqhaka Local', 'Ngwathe Local', 'Masilonyana Local', 'Matjhabeng Local', 'Nala Local', 'Tokologo Local'],
        'Gauteng': ['City of Ekurhuleni Metropolitan', 'City of Johannesburg Metropolitan', 'City of Tshwane Metropolitan', 'Emfuleni Local', 'Lesedi Local', 'Midvaal Local', 'Merafong City Local', 'Mogale City Local'],
        'Kwazulu-Natal': ['eThekwini Metropolitan', 'Dannhauser Local', 'eMadlangeni Local', 'Newcastle Local', 'Dr Nkosazana Dlamini Zuma Local', 'Greater Kokstad Local', 'Ubuhlebezwe Local', 'Umzimkhulu Local'],
        'Limpopo': ['Blouberg Local', 'Lepelle-Nkumpi Local', 'Molemole Local', 'Polokwane Local', 'Ba-Phalaborwa Local', 'Greater Giyani Local', 'Greater Letaba Local', 'Greater Tzaneen Local'],
        'Mpumalanga': ['City of Mbombela Local', 'Nkomazi Local', 'Bushbuckridge Local', 'Thaba Chweu Local', 'Chief Albert Luthuli Local', 'Dipaleseng Local', 'Dr Pixley Ka Isaka Seme Local', 'Govan Mbeki Local'],
        'North west': ['Kgetlengrivier Local', 'Madibeng Local', 'Moretele Local', 'City of Matlosana Local', 'Moses Kotane Local', 'Rustenburg Local', 'JB Marks Local', 'Maquassi Hills Local'],
        'Western cape': ['City of Cape Town Metropolitan', 'Breede Valley Local', 'Drakenstein Local', 'Langeberg Local', 'Stellenbosch Local', 'Witzenberg Local', 'Beaufort West Local', 'Laingsburg Local'],
        'Eastern cape': ['Buffalo City Metropolitan', 'Nelson Mandela Bay Metropolitan', 'Matatiele Local', 'Ntabankulu Local', 'Umzimvubu Local', 'Winnie Madikizela-Mandela Local', 'Amahlathi Local', 'Great Kei Local'],
        'Northern Cape': ['Dikgatlong Local', 'Magareng Local', 'Phokwane Local', 'Sol Plaatje Local', 'Ga-Segonyana Local', 'Gamagara Local', 'Joe Morolong Local', 'Hantam Local'],
    };
    const [Province, setProvince] = useState('');
    const [Municipality, setMunicipality] = useState('');
    const [WaterAccessibility, setWaterAccessibility] = useState('');
    const [WeatherCondition, setWeatherCondition] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [showButton2, setShowButton2] = useState(false);
    const [WaterSource, setWaterSource] = useState('');
    const handleProvinceChange = (event) => {
        const selectedProvince = event.target.value;
        setProvince(selectedProvince);
        setMunicipality('');
    };
    const [Longitude, setLongitude] = useState('')
    const [Latitude, setLatitude] = useState('')
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLongitude(longitude)
            setLatitude(latitude)
        })
    })
    function submit_sampling_data() {
        if (WaterSource === "") {
            console.error('Water Source is required.');
            return
        }
        if (WaterAccessibility === "") {
            console.error('Water Accessibility  is required.');
            return
        }
        if (WeatherCondition === "") {
            console.error('Weather Condition is required.');
            return
        }
        if (Municipality === "") {
            console.error('Municipility is reuqired')
            return;
        }



        const dataProvince = {
            province_name: Province,
        };

        const dataMunicipality = {
            municipality: Municipality,
            province: Province
        };



        axios.post('http://localhost:3001/api/municipality', dataMunicipality)
            .then((muniResponse) => {
                if (muniResponse.data.success) {
                    // Handle success, e.g., show a success message or perform other actions
                    console.log('Municipality data submitted successfully');

                    const muni_id = muniResponse.data.insertedId;

                    // Now, you can include muni_id in your data object for sampling data
                    const data = {
                        userId: UserId,
                        weatherCondition: WeatherCondition,
                        muni_id: muni_id, // Include the muni_id
                    };


                    axios.post('http://localhost:3001/api/sampling_data', data)
                        .then((response) => {
                            if (response.data.success) {
                                const samplingId = response.data.insertedId; // Get the samplingId from the response
                                var coordinates = {
                                    latitude: Latitude,
                                    longitude: Longitude,
                                    samplingId: response.data.insertedId
                                };
                                axios.post("http://localhost:3001/api/coordinates", coordinates).then((result) => {
                                    console.log(result)
                                }, err => {
                                    console.log(err)
                                })
                                // Open the popup to display the result
                                openPopup();

                                // Now, use the retrieved samplingId when inserting data into watersource
                                const waterSourceData = {
                                    type: WaterSource,
                                    waterAccessability: WaterAccessibility,
                                    samplingId: samplingId, // Use the retrieved samplingId
                                };
                                axios.post('http://localhost:3001/api/watersource', waterSourceData)
                                    .then((response) => {
                                        if (response.data.message === "added watersource") {
                                            // Show success message or perform any other actions
                                        } else {
                                            console.error('Error while adding watersource:', response.data.message);
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error while making the API request:', error);
                                    });

                                // api province

                                axios.post('http://localhost:3001/api/province', dataProvince)
                                    .then((response) => {

                                        if (response.data.success) {
                                            const province_id = response.data.insertedId;
                                            // Open the popup to display the result
                                            openPopup();

                                        } else {
                                            console.error('Error while adding province:', response.data.message);
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error while making the API request:', error);
                                    });

                            } else {
                                console.error(response.data.message);
                            }
                        })
                        .catch((error) => {
                            console.error('Error while making the API request:', error);
                        });

                } else {
                    console.error('Error while adding municipality:', muniResponse.data.message);
                }
            })
            .catch((muniError) => {
                console.error('Error while making the API request for municipality:', muniError);
            });




    }
    const toggleButton = () => {
        setShowButton(!showButton);
    };
    const toggleButton2 = () => {
        setShowButton2(!showButton2);
    };

    function isDataCompleted() {
        let isComplete = true;
        if (WaterSource === "") {
            console.error('Water Source is required.');
            isComplete = false;
        }
        if (WaterAccessibility === "") {
            console.error('Water Accessibility  is required.');
            isComplete = false;
        }
        if (WeatherCondition === "") {
            console.error('Weather Condition is required.');
            isComplete = false;
        }
        if (Municipality === "") {
            console.error('Municipility is reuqired')
            isComplete = false;
        }
        return isComplete;
    }

    const handleSurveyClick = () => {
        if (isDataCompleted()) {
            navigate('/Survey');
        } else {
            // Show the alert
            setShowAlert(true);
        }
    };
    const handleLevel2Click = () => {
        // Redirect to the home page of Level 1
        navigate('/Level', { state: { userId: UserId } });
    }
    const handleLevel1Click = () => {
        // Redirect to the home page of Level 1
        navigate('/Home', { state: { userId: UserId } });
    }

    const handleH2SClick = () => {
        if (isDataCompleted()) {
            navigate('/MST');
        } else {
            // Show the alert
            setShowAlert(true);
        }
    };

    const handlePathogenClick = () => {
        if (isDataCompleted()) {
            navigate('/Pathogen');
        } else {
            // Show the alert
            setShowAlert(true);
        }
    };
    const handleQMRAClick = () => {

        navigate('/QMRA2');

    };

    const handleQMRA = () => {
        if (isDataCompleted()) {
            navigate('/QMRASelect');
        } else {
            // Show the alert
            setShowAlert(true);
        }
    };


    const [showAlert, setShowAlert] = useState(false);

    const closeAlert = () => {
        setShowAlert(false);
    };
    const handleLevel = () => {
        navigate('/Home');
    }

    const submitProfileEdit = () => {
        // Construct the updated profile data
        const updatedProfileData = {
            userId: UserId,
            firstname: editedFirstName,
            lastname: editedLastName,
            password: editedPassword,
        };

        // Make a PUT request to update the profile
        axios.put('http://localhost:3001/api/updateProfile', updatedProfileData)
            .then((response) => {
                if (response.data.success) {
                    // Handle success, e.g., show a success message
                    console.log('Profile updated successfully');
                    return alert('PROFILE UPDATED SUCCESSFULLY');
                } else {
                    console.error('Failed to update profile:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error while updating profile:', error);
            });

        // Close the popup after updating the profile
        setIsProfileEditOpen(false);
    };
    return (

        <div className="App" >

            <Navbar className="bg-body-tertiary">

                <Container>

                    <Navbar.Toggle />

                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand >
                                <div className="d-flex align-items-center">
                                    <Image
                                        alt=""
                                        src="images/SimraLogo.png"
                                        width="60"
                                        height="40"
                                        className="d-inline-block align-left"
                                    />{' '}
                                    <div style={{ fontWeight: 'bold', fontSize: '18px', marginLeft: '10px' }}>
                                        SIMRA
                                    </div>
                                </div>


                            </Navbar.Brand>
                        </Container>
                    </Navbar>

                </Container>
                <Container>

                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link onClick={() => setIsProfileEditOpen(true)} className="ml-2" >
                            <div className="profile-icon">
                                <FaUser />
                            </div>
                            <div className="profile-text">
                                Profile
                            </div>
                        </Nav.Link>
                        <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '18px', marginLeft: '80px'  }}>
                            SIGNED IN AS : {userName} {lastName}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Row>
                <Col xs={6} sm={0} md={0} lg={2}  >
                    <Container fluid className="side mt-2" >
                        <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }} >
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaTachometerAlt /> Dashboard </Button></Card.Body>
                            <Card.Body>
                                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleH2SClick}>
                                    <FaChartBar /> MST DATA
                                </Button>
                            </Card.Body>
                            <Card.Body>
                                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handlePathogenClick}>
                                    <FaChartBar /> PATHOGEN DATA
                                </Button>
                            </Card.Body>
                            <Card.Body>
                                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleQMRA}>
                                    <FaChartBar /> RUN QMRA
                                </Button>
                            </Card.Body>
                            <Card.Body>
                                <Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleQMRAClick}>
                                    <FaChartBar /> QMRA Parameters
                                </Button>
                            </Card.Body>

                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }}
                                onClick={() => {
                                    axios.get('http://localhost:3001/api/QMRA', {
                                        params: {
                                            userId: UserId,
                                        }

                                    })
                                        .then(response => {
                                            console.log(response.data);
                                            navigate('/File3', { state: { userId: UserId } });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        })
                                }

                                }
                            ><FaFile /> Reports </Button></Card.Body>
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleLevel1Click}><FaArrowLeft /> LEVEL 1 </Button></Card.Body>
                            <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleLevel2Click}><FaArrowLeft /> LEVEL 2 </Button></Card.Body>
                            <Card.Body><Link to="/"> <Button size="lg" style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
                        </Card>
                    </Container>
                </Col>

                <Col xs={30} sm={8} md={6} lg={10} style={{ backgroundImage: 'url("/images/back.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', filter: blur('25px') }}>
                    <br></br>

                    <Routes>
                        <Route
                            path="/Fib"
                            element={
                                isDataCompleted() ? (

                                    <Survey />
                                ) : (
                                    <Button variant="secondary" onClick={() => navigate('/Home')}>
                                        Back to Home
                                    </Button>
                                )
                            }
                        />
                        <Route
                            path="/H2S"
                            element={
                                isDataCompleted() ? (
                                    <H2S />
                                ) : (
                                    <Button variant="secondary" onClick={() => navigate('/Home')}>
                                        Back to Home
                                    </Button>
                                )
                            }
                        />
                    </Routes>
                    <Row>
                        <Container className='form mt-5 mb-5' style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                            <Card className='mt-5 text-center ' style={{ background: 'rgba(255, 255, 255, 0.5)' }} >
                                <Stack className='mt-5 mb-5 text-center' >
                                    <h5 className='mt-2' > ADVANCED </h5>
                                    <Card.Body><Button variant="outline-primary" style={{
                                        width: '90%', borderColor: 'black', color: isButtonHovered ? 'black' : 'blue', fontWeight: 'bold'
                                        , backgroundColor: isButtonHovered ? 'rgb(75, 73, 73)' : 'transparent', color: 'black'
                                    }} onClick={toggleButton}
                                        onMouseEnter={() => setIsButtonHovered(true)}
                                        onMouseLeave={() => setIsButtonHovered(false)}
                                        onMouseOver={(e) => (e.target.style.color = 'white')}
                                        onMouseOut={(e) => (e.target.style.color = 'black')}>WATER SOURCE</Button>
                                        {showButton && (
                                            <div className='display'>
                                                <div className='form-group'>
                                                    <label> TYPE</label>
                                                    <select className='select-sampling_data text-center' onChange={(event) => setWaterSource(event.target.value)}>
                                                        <option value='' className="control-form">---Select---</option>
                                                        <option value='River' className="control-form">River</option>
                                                        <option value='Dam' className="control-form">Dam</option>
                                                        <option value='Spring' className="control-form">Spring</option>
                                                        <option value='Borehole' className="control-form">Borehole</option>
                                                        <option value='Dug Well' className="control-form">Dug Well</option>
                                                        <option value='Household Tap Water' className="control-form">Household Tap Water</option>
                                                        <option value='Housewater Stored Water' className="control-form">Housewater Stored Water</option>
                                                        <option value='Wastewater Treatment Plant' className="control-form">Wastewater Treatment Plant</option>
                                                        <option value='water Treatment Plant' className="control-form">water Treatment Plant</option>
                                                    </select>
                                                </div><div className='form-group'>
                                                    <label> WATER ACCESSIBILITY </label>
                                                    <select className='select-sampling_data text-center' onChange={(event) => setWaterAccessibility(event.target.value)}>
                                                        <option value='' className="control-form">---Select---</option>
                                                        <option value='Hard' className="control-form">Hard</option>
                                                        <option value='Easy' className="control-form">Easy</option>
                                                    </select>
                                                </div>

                                            </div>
                                        )}
                                    </Card.Body>
                                    <Card.Body ><Button variant="outline-primary" style={{
                                        width: '90%', borderColor: 'black', color: isButtonHovered1 ? 'black' : 'blue', fontWeight: 'bold'
                                        , backgroundColor: isButtonHovered1 ? 'rgb(75, 73, 73)' : 'transparent', color: 'black'
                                    }} onClick={toggleButton2}
                                        onMouseEnter={() => setIsButtonHovered1(true)}
                                        onMouseLeave={() => setIsButtonHovered1(false)}
                                        onMouseOver={(e) => (e.target.style.color = 'white')}
                                        onMouseOut={(e) => (e.target.style.color = 'black')}>SAMPLING DATA</Button>

                                        {showButton2 && (
                                            <div className='display'>
                                                <div class="form-group">
                                                    <label> PROVINCE </label>
                                                    <select class="select-sampling_data text-center" onChange={handleProvinceChange} value={Province}>
                                                        <option value="" className="control-form">---Select---</option>
                                                        {provinces.map((province) => (
                                                            <option key={province} value={province} className="control-form">
                                                                {province}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='form-group'>
                                                    <label> MUNICIPALITY </label>
                                                    <select className='select-sampling_data text-center' value={Municipality} onChange={(event) => setMunicipality(event.target.value)}>
                                                        <option value='' className="control-form">---Select---</option>
                                                        {municipalitiesByProvince[Province]?.map((municipality) => (
                                                            <option key={municipality} value={municipality} className="control-form">
                                                                {municipality}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='form-group'>
                                                    <label> WEATHER CONDITION </label>
                                                    <select className='select-sampling_data text-center' onChange={(event) => setWeatherCondition(event.target.value)}>
                                                        <option value='' className="control-form">---Select---</option>
                                                        <option value='Dry' className="control-form">Dry</option>
                                                        <option value='wet' className="control-form">Wet</option>
                                                    </select>
                                                </div>

                                            </div>
                                        )}


                                    </Card.Body>



                                </Stack>

                            </Card>
                            <button className='btn btn-success text-center mt-5 mb-5' onClick={submit_sampling_data} style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                backgroundColor: 'rgb(75, 73, 73)',
                                color: 'white',
                                border: '2px solid white',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                width: '500px'
                            }}>SUBMIT

                            </button>
                            <Popup open={isPopupOpen} closeOnDocumentClick onClose={closePopup}>
                                <div className="popup-content text-center">
                                    <h2>FEEDBACK</h2>
                                    <p >SUBMITTED SUCCESSFULLY</p>
                                    <button style={{ color: 'black' }} onClick={closePopup}>Close</button>
                                </div>
                            </Popup>
                            <Popup
                                open={isProfileEditOpen}
                                closeOnDocumentClick
                                onClose={() => setIsProfileEditOpen(false)}
                            >
                                <div className="popup-content mb-4 mt-5" style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }}>
                                    <h3 className=' text-center'>Edit Profile</h3>
                                    <div className='mb-4 '>
                                        <label htmlFor='firstname' className='lables'>firstname</label> <br />

                                        <input
                                            type="text"
                                            placeholder={originalFirstName}
                                            value={editedFirstName}
                                            onChange={(e) => setEditedFirstName(e.target.value)}
                                            className='form-control mt-2'
                                        />

                                    </div>
                                    <div className='mb-4 '>
                                        <label htmlFor='laststname' className='lables'>laststname</label> <br />
                                        <input
                                            type="text"
                                            placeholder={originalLastName}
                                            value={editedLastName}
                                            onChange={(e) => setEditedLastName(e.target.value)}
                                            className='form-control mt-2'
                                        />

                                    </div>
                                    <div className='mb-4 '>
                                        <label htmlFor='password' className='lables'>Change password</label> <br />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={editedPassword}
                                            onChange={(e) => setEditedPassword(e.target.value)}
                                            className='form-control mt-2'
                                        />
                                    </div>
                                    <button onClick={submitProfileEdit} style={{ color: 'black' }}>Save Changes</button>
                                </div>
                            </Popup>
                        </Container>
                    </Row>
                    {showAlert && (
                        <div className="alert">
                            Please complete Water Source and Sampling Data
                            before accessing MST DATA. Run QMRA or Pathogen Data !!!!!
                            <button type="button" className="close" onClick={closeAlert} style={{ color: 'black' }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default Home;
