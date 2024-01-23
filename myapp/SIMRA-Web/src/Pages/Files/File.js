import React, { useState, useEffect  } from 'react';
import { Button , Container , Card , Form , Row , Col , Image , Stack , Navbar , Carousel} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { FaQuestionCircle , FaVideo, FaSignOutAlt,FaHome } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';
import './report.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import Survey from '../Survey/Survey';
import './File.css';



function File() {


  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [qmraData, setQmraData] = useState([]);
  const [UserId, setUserId] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);

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
          console.error('Error while fetching QMRA data:', error);
        });
    }
  }, []);

 
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
  
  const handleH2SNavigate = () => {
    axios.get('http://localhost:3001/api/fileH2S',{
      params :{
          userId : UserId,
      }

  })
  .then(response =>{
      console.log(response.data);
      navigate('/H2SReport', {state: {userId : UserId}});
  })
  .catch(error =>{
      console.log(error);
  })

  }
  


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
      </Container>
    </Navbar>

    <Row>
          <Col xs={6} sm={0} md={0} lg={2} >
              <Container fluid className="side mt-5" >
              <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)', height: '500px' }}>
              <Card.Body ><Button variant="secondary" size="lg" style={{ width: '100%' }}  onClick={handleHomeNavigate}><FaHome /> Home</Button></Card.Body>
              
                            <Card.Body><Link to="/Video"><Button variant="secondary" size="lg" style={{ width: '100%' }} ><FaVideo /> Video</Button></Link></Card.Body>
                            
                            <Card.Body><Link to="/"> <Button style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
                      </Card>
                  </Container>
              </Col>
              
              <Col xs={30} sm={8} md={6} lg={10} style={{ backgroundImage: 'url("/images/back.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', filter: blur('25px')}}>
                  <Row>
                    <Container fluid className='mt-2'>
                    <Card className='mt-2 mb-2' style={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '30px' }} >
                      <div className="page"  >
                        <div class="card1" style={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '30px' }} >  
                          <h3>REPORTS</h3>
                            <p>CHOOSE REPORT TO VIEW AND DOWNLOAD </p>
                            <button type="button" class="btn btn-secondary"><Link to="/H2SReport" className="link"><IoWaterOutline />.H2S REPORTS</Link></button>
                            
                            <button type="button" class="btn btn-secondary"><Link to="/SurveyReport" className="link"><FaQuestionCircle />.SURVEY REPORTS</Link></button>
                        
                        </div>
                      </div>
                      </Card>
                    </Container>
                  </Row>               
              </Col>
            </Row>
    
    </div>    
  );

}

export default File;