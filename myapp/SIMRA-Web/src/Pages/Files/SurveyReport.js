import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaVideo, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';
import './report.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Survey from '../Survey/Survey';


function SurveyReport() {

    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [qmraData, setQmraData] = useState([]);
    const navigate = useNavigate();
       
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

    useEffect(() => {
        const userId = localStorage.getItem('userId');

    
        if (userId) {
          axios
            .get('http://localhost:3001/api/fileSurvey', {
              params: {
                userId: userId,
              },
            })
            .then(response => {
                if (Array.isArray(response.data.results)) {
                  // Check if the response data is an array
                  setTableData(response.data.results);

                  

                } else {
                  console.error('H2S data is not in the expected format:', response.data);
                }
              })
            .catch(error => {
              console.error('Error while fetching H2S data:', error);
            });
        }
      }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const generatePDF = () => {

        if (!startDate || !endDate || !tableData) {
            setErrorMessage('Please provide both start and end dates.');
            return;
        }

        const filteredData = tableData.filter((row) => {
            const rowDate = new Date(row.sampling_date_created);
            console.log('Row Date:', rowDate);
            console.log('Start Date:', new Date(startDate));
            console.log('End Date:', new Date(endDate));
            return rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
        });

        const doc = new jsPDF();

        // Define the columns and data for the PDF table
        const columns = [
            { title: 'Municipality', key: 'muni_name' },
            { title: 'NameOfWaterTreat', key: 'waterSourceType' },
            { title: 'Latitude', key: 'latitude' },
            { title: 'Longitude', key: 'longitude' },
            { title: 'SampleID', key: 'samplingId' },
            { title: 'SamplingDate', key: 'sampling_date_created' },
            { title: 'Prasence/Absence', key: 'pitLatrine' },
            { title: 'Risk/noRisk', key: 'risk_type' },

        ];


        // Adjust the filter as needed
        const data = filteredData.map((row) => ({
            muni_name: row.muni_name,
            waterSourceType: row.waterSourceType,
            latitude: row.latitude,
            longitude: row.longitude,
            samplingId: row.samplingId,
            sampling_date_created: formatDate(row.sampling_date_created),
            pitLatrine: row.status,
            risk_type: row.risk_type,
        }));

        // Set the table location, columns, and data
        doc.autoTable({
            head: [columns.map((col) => col.title)],
            body: data.map((row) => columns.map((col) => row[col.key])),
            startY: 20, // Adjust the Y position as needed
        });

        // Save the PDF
        doc.save('H2S.pdf');
    };


    const exportToExcel = () => {

        if (!startDate || !endDate || !tableData) {
            setErrorMessage('Please provide both start and end dates.');
            return;
        }

        const filteredData = tableData.filter((row) => {
            const rowDate = new Date(row.sampling_date_created);
            return rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
        });

        const dataForExcel = filteredData.map((row) => ({
            Municipality: row.muni_name,
            NameOfWaterTreat: row.waterSourceType,
            Latitude: row.latitude,
            Longitude: row.longitude,
            SampleID: row.samplingId,
            SamplingDate: formatDate(row.sampling_date_created),
            'Prasence/Absence': row.status,
            'Risk/noRisk': row.risk_type,
        }));

        const ws = XLSX.utils.json_to_sheet(dataForExcel, {
            header: [
                'Municipality',
                'NameOfWaterTreat',
                'Latitude',
                'Longitude',
                'SampleID',
                'SamplingDate',
                'Prasence/Absence',
                'Risk/noRisk',

            ],
        });


        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'AllSeasonData');

        const dataURL = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

        const blob = new Blob([s2ab(atob(dataURL))], { type: 'application/octet-stream' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'H2S.xlsx';
        a.click();
    };


    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        // Clear the error message when the user changes the start date
        setErrorMessage('');
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        // Clear the error message when the user changes the end date
        setErrorMessage('');
    };

    const handleHomeNavigate = () => {
        const userId = localStorage.getItem('userId');
          
                    if (userId) {
                        // Make an HTTP request to fetch data based on the user ID if needed
                        axios.get('http://localhost:3001/api/QMRA',{
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


    const hasDataToDisplay = tableData && tableData.length > 0;
    const hasWetSeasonData = tableData && tableData.some((row) => row.weatherCondition === 'Wet');
    const hasDrySeasonData = tableData && tableData.some((row) => row.weatherCondition !== 'Wet');
    const filteredData = tableData
       .filter((row) => row.samplingId !== null && row.samplingId !== undefined && row.samplingId !== '' && row.muni_name !== null && row.risk_type !== null && row.risk_type !== undefined && row.risk_type !== '');


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
                        <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }}>
                          
                                <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                                <Card.Body ><Link to="/Survey"><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaQuestionCircle /> Survey</Button></Link></Card.Body>
                                <Card.Body><Link to="/H2S"><Button variant="secondary" size="lg" style={{ width: '100%' }} ><IoWaterOutline /> H2S</Button></Link></Card.Body>
                                <Card.Body><Link to="/Video"><Button variant="secondary" size="lg" style={{ width: '100%' }} ><FaVideo /> Video</Button></Link></Card.Body>

                                <Card.Body><Link to="/"> <Button size="lg" style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
                            </Card>
                    </Container>
                </Col>

                <Col xs={30} sm={8} md={6} lg={10}>
                    <Row>
                        <Container fluid style={{ width: '100%', height: '100%' }}>

                            {hasDataToDisplay ? (
                                <div>
                                    <Card style={{ background: 'rgba(255, 255, 255)'}}>
                                        <Card.Body><h1>Survey Report</h1></Card.Body>
                                        <Card.Body>Dry Season</Card.Body>
                                        {hasDrySeasonData ? (
                                          filteredData.filter((row) => row.weatherCondition !== 'Wet').length > 0 ? (
                                            <Card.Body>
                                                <div class="scroll">
                                                    <table class="table table-striped table-sticky">
                                                        <thead>
                                                            <tr>
                                                                <th colspan="5"></th>
                                                                <th colspan="3">Cycle 1</th>

                                                            </tr>
                                                            <tr>
                                                                <th>Municipality</th>
                                                                <th>NameOfWaterTreat</th>
                                                                <th>Latitude</th>
                                                                <th>Longitude</th>
                                                                <th>SampleID</th>
                                                                <th>SamplingDate</th>
                                                                <th>Prasence/Absence</th>
                                                                <th>Risk/noRisk</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredData
                                                                .filter((row) => row.weatherCondition !== 'Wet')
                                                                .map((row, index) => (
                                                                    <tr key={index}>
                                                                        <td>{row.muni_name}</td>
                                                                        <td>{row.waterSourceType}</td>
                                                                        <td>{row.latitude}</td>
                                                                        <td>{row.longitude}</td>
                                                                        <td>{row.samplingId}</td>
                                                                        <td>{formatDate(row.sampling_date_created)}</td>
                                                                        <td>{row.total_avarage}</td>
                                                                        <td>{row.risk_type}</td>
                                                                    </tr>
                                                                ))}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </Card.Body>
                                            ) : (
                                              <p className="nodata-text">No Report for Dry Season</p> // Display this when there is no data
                                            )
                                        ) : (
                                            <p className="nodata-text">No Report for Dry Season</p> // Display this when there is no data
                                        )}

                                        <Card.Body>Wet Season</Card.Body>
                                        {hasWetSeasonData ? (
                                          filteredData.filter((row) => row.weatherCondition === 'Wet').length > 0 ? (
                                            <Card.Body>
                                                <div class="scroll">
                                                    <table class="table table-striped table-sticky">
                                                        <thead>
                                                            <tr>
                                                                <th colspan="5"></th>
                                                                <th colspan="3">Cycle 1</th>

                                                            </tr>
                                                            <tr>
                                                                <th>Municipality</th>
                                                                <th>NameOfWaterTreat</th>
                                                                <th>Latitude</th>
                                                                <th>Longitude</th>
                                                                <th>SampleID</th>
                                                                <th>SamplingDate</th>
                                                                <th>Prasence/Absence</th>
                                                                <th>Risk/noRisk</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredData
                                                                .filter((row) => row.weatherCondition === 'Wet')
                                                                .map((row, index) => (
                                                                    <tr key={index}>
                                                                        <td>{row.muni_name}</td>
                                                                        <td>{row.waterSourceType}</td>
                                                                        <td>{row.latitude}</td>
                                                                        <td>{row.longitude}</td>
                                                                        <td>{row.samplingId}</td>
                                                                        <td>{formatDate(row.sampling_date_created)}</td>
                                                                        <td>{row.total_avarage}</td>
                                                                        <td>{row.risk_type}</td>
                                                                         
                                                                    </tr>
                                                                ))}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </Card.Body>
                                            ) : (
                                              <p className="nodata-text">No Report for Wet Season</p> // Display this when there is no data
                                            )
                                        ) : (
                                            <p className="nodata-text">No Report for Wet Season</p> // Display this when there is no data
                                        )}

                                        <Card.Body>

                                            <Form.Group>
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={startDate}
                                                    onChange={handleStartDateChange}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>End Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={endDate}
                                                    onChange={handleEndDateChange}
                                                />
                                            </Form.Group>
                                            <Card.Body> {errorMessage && <p className="text-danger">{errorMessage}</p>}</Card.Body>



                                            <Card.Body>
                                                <Button onClick={exportToExcel}>Download Excel</Button>
                                            </Card.Body>
                                            <Card.Body>
                                                <Button onClick={generatePDF}>Download PDF</Button>
                                            </Card.Body>

                                        </Card.Body>

                                    </Card>
                                </div>
                                
                              
                                
                            ) : (
                                <p className="nodata-text">No Survey Reports Are Avaliable For Download</p>
                            )
                        }

                        </Container>
                    </Row>
                </Col>
            </Row>



        </div>
    );

}

export default SurveyReport;
