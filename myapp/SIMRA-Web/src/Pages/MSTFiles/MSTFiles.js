import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button , Container , Card , Form , Row , Col , Image , Stack , Navbar , Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { FaQuestionCircle , FaVideo, FaSignOutAlt,FaHome } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 

import './MSTFiles.css'

function MSTFile(){

    const [qmraData, setQmraData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
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
              if (Array.isArray(response.data.results)) {
                // Check if the response data is an array
                setQmraData(response.data.results);

                const user = response.data.results[0]; // Assuming there's only one user
                  const userFirstName = user.firstname;
                  const lastName = user.lastname;
                  setUserName(userFirstName);
                  setLastName(lastName);

              } else {
                console.error('User data is not in the expected format:', response.data);
              }
            })
          .catch(error => {
            console.error('Error while fetching USER data:', error);
          });
      }
    }, []);

    
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log('ID',userId)
    
        if (userId) {
          axios
            .get('http://localhost:3001/api/MST', {
              params: {
                userId: userId,
              },
            })
            .then(response => {
                if (Array.isArray(response.data.results)) {
                  // Check if the response data is an array
                  setQmraData(response.data.results);

                  

                } else {
                  console.error('MST data is not in the expected format:', response.data);
                }
              })
            .catch(error => {
              console.error('Error while fetching MST data:', error);
            });
        }
      }, []);

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

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


      
      const generatePDF = () => {
        if (!startDate || !endDate) {
          setErrorMessage('Please provide both start and end dates.');
          return;
        }
        if (qmraData.length === 0) {
          setErrorMessage('No data to export.');
          return;
        }
    
        const doc = new jsPDF();
    
        const columns = [
          { title: 'Municipality', dataKey: 'muni_name' },
          { title: 'Catchment', dataKey: 'type' },
          { title: 'Longitude', dataKey: 'longitude' },
          { title: 'Latitude', dataKey: 'latitude' },
          { title: 'Sample ID', dataKey: 'samplingId' },
          { title: 'Sampling Date', dataKey: 'sampling_date_created' },
          { title: 'CFU/100 ml', dataKey: 'cfu' },
        ];
    
        const filteredData = qmraData.filter((row) => {
          const rowDate = new Date(row.sampling_date_created);
          return rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
        });
    
        const data = filteredData.map((row) => ({
          muni_name: row.muni_name,
          type: row.type,
          longitude: row.longitude,
          latitude: row.latitude,
          samplingId: row.samplingId,
          sampling_date_created: formatDate(row.sampling_date_created),
          cfu: row.count_mst,
        }));
    
        doc.autoTable({
          head: [columns.map((col) => col.title)],
          body: data.map((row) => columns.map((col) => row[col.dataKey])),
        });
    
        doc.save('QMRAReport.pdf');
      };

      const exportToExcel = () => {

        if (!startDate || !endDate) {
          setErrorMessage('Please provide both start and end dates.');
          return;
        }
        if (qmraData.length === 0) {
          setErrorMessage('No data to export.');
          return;
        }
      
        // Create a new workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.querySelector('table'));
      
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'QMRAData');
      
        // Generate a unique filename for the Excel file
        const excelFileName = 'QMRAData.xlsx';
      
        // Save the workbook as an Excel file
        XLSX.writeFile(wb, excelFileName);
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

      const renderTable = () => {
        if (qmraData.length === 0) {
          return (
            
              <p className="nodata-text">No data for this table.</p>
        
          );
        }
        return (
          <div className="scroll">
            <table className="table table-striped table-sticky">
              <thead>
                <tr>
                  <th colspan="4"></th>
                  <th colspan="3">Cycle 1</th>
                </tr>
                <tr>
                  
                  <th>Municipality</th>
                  <th>Catchment</th>
                  <th>Latitude</th>
                  <th>longitude</th>
                  <th>Sample ID</th>
                  <th>Sampling Date</th>
                  <th>CFU/100 ml</th>
                </tr>
              </thead>
              <tbody>
                {qmraData.map((file, index) => (
                  <tr key={index}>
                    <td>{file.muni_name}</td>
                    <td>{file.type}</td>
                    <td>{file.latitude}</td>
                    <td>{file.longitude}</td>
                    <td>{file.samplingId}</td>
                    <td>{formatDate(file.sampling_date_created)}</td>
                    <td>{file.count_mst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      };

    return (
        <div className='App'>
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
              <Card className='mt-2' style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)', height: '500px' }}> 
          
              <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
                            <Card.Body><Link to="/"> <Button style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
                      </Card>
                  </Container>
              </Col>

              <Col xs={30} sm={8} md={6} lg={10}>
                <Row>
                <Container fluid style={{ width: '100%' , height: '100%'}}>
                  <Card>
                  <Card.Body><h1>Microbial Source Tracking Report</h1></Card.Body>
                  <Card.Body>
                  {renderTable()}
                  </Card.Body>

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
                        <Button onClick={generatePDF}>Download PDF</Button>
                  </Card.Body>
                  <Card.Body>
                        <Button onClick={exportToExcel}>Download Excel</Button>
                  </Card.Body>
                  </Card>
                

                </Container>
                </Row>
              </Col>

    </Row>

            
      
        </div>
    );

}

export default MSTFile;
