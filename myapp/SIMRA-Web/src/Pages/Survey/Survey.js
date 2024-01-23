import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Stack, Navbar, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaFile, FaSignOutAlt, FaVideo, FaHome } from 'react-icons/fa';
import { IoWaterOutline } from 'react-icons/io5';
import './Survey.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';




function Survey() {

  const [showButton, setShowButton] = useState(false);

  const tempData = useLocation();
  const SamplingData = tempData.state ? tempData.state.temp : null;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // State to control the display of the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [maxId, setMaxId] = useState(null);


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

  // Function to fetch the max ID
  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/maxId');
        console.log('API response id:', response.data);
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

  const addRow = () => {
    setRowCount(rowCount + 1);
  };



  const toggleButton = () => {
    setShowButton(!showButton);
  };

  // Function to handle opening the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to handle closing the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [completedProcessSanitarySurvey, setcompletedProcessSanitarySurvey] = useState('Completed 0/8');
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [showRiskLevel, setShowRiskLevel] = useState(false);
  const [yesAnswers, setYesAnswers] = useState([]);
  const [cleaningMethods, setCleaningMethods] = useState({});
  const [cleaningMethodsZulu, setCleaningMethodsZulu] = useState({});
  const [cleaningMethodsAfrikaans, setCleaningMethodsAfrikaans] = useState({});
  const [identifers, setIdentifer] = useState({});
  const [myImage, setImage] = useState({});
  const [question1Answer, setQuestion1Answer] = useState('');
  const [question2Answer, setQuestion2Answer] = useState('');
  const [question3Answer, setQuestion3Answer] = useState('');
  const [question4Answer, setQuestion4Answer] = useState('');
  const [question5Answer, setQuestion5Answer] = useState('');
  const [question6Answer, setQuestion6Answer] = useState('');
  const [question7Answer, setQuestion7Answer] = useState('');
  const [question8Answer, setQuestion8Answer] = useState('');

  const Methods = {
    1: 'Encourage the use of improved sanitation facilities like flush toilets or well-maintained pit latrines. Pit latrines should be 50 m away from water source. Ensure proper pit latrine construction, regular maintenance, and after drained ensure safe disposal of waste.',
    2: 'Implement proper waste management for animal husbandry to prevent manure runoff into water sources. Establish buffer zones between livestock areas and water bodies to reduce contamination risks.',
    3: 'Raise awareness for women to stop dumping children’s faeces in the stream. Encourage the responsible disposal of diapers in designated waste bins. Promote the use of cloth diapers as eco-friendly alternatives.',
    4: 'Ensure households are connected to sewage systems and ensure effective wastewater treatment to reduce pollution.',
    5: 'Educate communities about the health and environmental risks of open defecation. Build and maintain public and household toilets to discourage open defecation.',
    6: 'Establish and protect water sources to prevent contamination from surface runoff or human activities. Fencing the area remove faecal matter deposited by livestock, and sweep wellhead area. Encourage communities to use protected and treated water sources.',
    7: 'Encourage the use of erosion control measures like planting cover crops and creating vegetative buffer zones along water bodies.',
    8: 'Advocate for responsible detergent use and proper disposal of laundry wastewater. Implement filtration systems to treat laundry water before discharge.',
  };

  const MethodsZulu = {
    1: 'Khuthaza ukusetshenziswa kwezindawo zokuthuthwa kwendle ezithuthukisiwe njengezindlu zangasese ezishaywayo noma izindlu zangasese zomgodi ezinakekelwa kahle. Izindlu zangasese zomgodi kufanele zibe ngamamitha angama-50 ukusuka emthonjeni wamanzi. Ukuqinisekisa ukwakhiwa kwezindlu zangasese ezifanele, ukulungiswa njalo, futhi ngemva kokuchithwa kuqinisekisa ukulahlwa kwemfucuza ngokuphephile.',
    2: 'Ukusebenzisa ukuphathwa kwemfucuza ngendlela efanele ekufuyweni ukuze kuvinjwe ukugeleza komquba emithonjeni yamanzi. Sungula izindawo eziyisivikelo phakathi kwezindawo ezifuywayo kanye nezindawo zamanzi ukuze unciphise ubungozi bokungcola.',
    3: 'Ukuqwashisa abantu besifazane ukuthi bayeke ukulahla indle yezingane emfudlaneni. Khuthaza ukulahlwa okufanele kwamanabukeni emigqonyeni yemfucuza eqokiwe. Khuthaza ukusetshenziswa kwamanabukeni endwangu njengezinye izindlela ezilungele imvelo.',
    4: 'Ukuqinisekisa ukuthi amakhaya axhumene nezinhlelo zokukhuculula indle futhi uqinisekise ukucocwa kahle kwamanzi angcolile ukuze kuncishiswe ukungcoliswa.',
    5: 'Ukufundisa imiphakathi ngezingozi zezempilo nezemvelo zokuzikhulula obala. Yakha futhi inakekele izindlu zangasese zomphakathi nezasekhaya ukuze kunqandwe ukuzikhulula okuvulekile.',
    6: 'Qalisa futhi uvikele imithombo yamanzi ukuze uvimbele ukungcoliswa kwamanzi noma imisebenzi yabantu. Ukubiyela indawo kususa indle efakwe imfuyo, bese kushanela indawo yomthombo. Khuthaza imiphakathi ukuthi isebenzise imithombo yamanzi evikelekile futhi ehlanziwe.',
    7: 'Khuthaza ukusetshenziswa kwezinyathelo zokulawula ukuguguleka komhlabathi njengokutshala izitshalo zokumboza nokudala izindawo ezinqanda izitshalo ezindaweni ezinamanzi.',
    8: 'Gweba ukusetshenziswa kahle kwezihlanzi kanye nokulahlwa ngendlela efanele kwamanzi angcolile elondolo. Sebenzisa izinhlelo zokuhlunga ukuze uhlanze amanzi elondolo ngaphambi kokuwakhipha.',
  }

  const MethodsAfrikaans = {
    1: 'Moedig die gebruik van verbeterde sanitasiefasiliteite soos spoeltoilette of goed onderhoude putlatrines aan. Putlatrines moet 50 m van die waterbron af wees. Verseker behoorlike put latrine konstruksie, gereelde instandhouding, en verseker na gedreineer veilige wegdoening van afval.',
    2: 'Implementeer behoorlike afvalbestuur vir veeteelt om misafloop na waterbronne te voorkom. Vestig buffersones tussen veegebiede en waterliggame om kontaminasierisikoâs te verminder.',
    3: 'Kryp bewusmaking vir vroue om op te hou om kinders se ontlasting in die stroom te stort. Moedig die verantwoordelike wegdoening van doeke in aangewese asblikke aan. Bevorder die gebruik van lapdoeke as eko-vriendelike alternatiewe.',
    4: 'Verseker dat huishoudings aan rioolstelsels gekoppel is en verseker doeltreffende afvalwaterbehandeling om besoedeling te verminder.',
    5: 'Leer gemeenskappe op oor die gesondheids- en omgewingsrisikoâs van oop ontlasting. Bou en onderhou openbare en huishoudelike toilette om oop ontlasting te ontmoedig.',
    6: 'Stel en beskerm waterbronne om besoedeling van oppervlakafloop of menslike aktiwiteite te voorkom. Om die area te omhein, verwyder fekale materiaal wat deur vee gedeponeer is, en vee puthoofgebied uit. Moedig gemeenskappe aan om beskermde en behandelde waterbronne te gebruik.',
    7: 'Moedig die gebruik van erosiebeheermaatreÃ«ls aan soos die aanplant van dekgewasse en die skep van vegetatiewe buffersones langs waterliggame.',
    8: 'Pleit vir verantwoordelike skoonmaakmiddelgebruik en behoorlike wegdoening van wasgoedafvalwater. Implementeer filtrasiestelsels om waswater te behandel voor uitlaat.',
  }

  const identifer = {
    1: 'Pit Latrine',
    2: 'Domestic Animals',
    3: 'Diapers Disposition',
    4: 'Release of Wastewater',
    5: 'Open Defecation',
    6: 'Unprotected Water Sources',
    7: 'Agricultural Activities',
    8: 'Laundry Activities',
  };

  const myImages = {
    1: '/images/ppitlatrines.jpg',
    2: '/images/animal.jpg',
    3: '/images/diapers.png',
    4: '/images/wastewater.PNG',
    5: '/images/open-defecations.jpg',
    6: '/images/unprotected.png',
    7: '/images/agricultural.jpg',
    8: '/images/laundry.jpg',
  }
  // Add a new CSS class for larger images
  const largeImageStyle = {
    width: '200px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? null : menu);
  };

  const handleRadioChange = (event, questionNumber) => {
    const answer = event.target.value;

    switch (questionNumber) {
      case 1:
        setQuestion1Answer(answer);
        break;
      case 2:
        setQuestion2Answer(answer);
        break;
      case 3:
        setQuestion3Answer(answer);
        break;
      case 4:
        setQuestion4Answer(answer);
        break;
      case 5:
        setQuestion5Answer(answer);
        break;
      case 6:
        setQuestion6Answer(answer);
        break;
      case 7:
        setQuestion7Answer(answer);
        break;
      case 8:
        setQuestion8Answer(answer);
        break;

      default:
        break;
    }

    const totalYesOrNoCount = Object.values({
      question1Answer,
      question2Answer,
      question3Answer,
      question4Answer,
      question5Answer,
      question6Answer,
      question7Answer,
      question8Answer,
    }).filter((answer) => answer === 'Yes' || answer === 'No').length;

    // Update yesAnswers state for questions answered as 'Yes'
    if (answer === 'Yes') {
      setYesAnswers((prevAnswers) => [...prevAnswers, `Question ${questionNumber}`]);
      setCleaningMethods((prevMethods) => ({ ...prevMethods, [questionNumber]: Methods[questionNumber] }));
      setCleaningMethodsZulu((prevMethods) => ({ ...prevMethods, [questionNumber]: MethodsZulu[questionNumber] }));
      setCleaningMethodsAfrikaans((prevMethods) => ({ ...prevMethods, [questionNumber]: MethodsAfrikaans[questionNumber] }));
      setIdentifer((prevIdentifers) => ({ ...prevIdentifers, [questionNumber]: identifer[questionNumber] }));
      setImage((prevImage) => ({ ...prevImage, [questionNumber]: myImages[questionNumber] }));
    } else {
      // If the answer is 'No', remove the question from the cleaningMethods state
      setCleaningMethods((prevMethods) => {
        const updatedMethods = { ...prevMethods };
        delete updatedMethods[questionNumber];
        return updatedMethods;
      });
      setCleaningMethodsZulu((prevMethods) => {
        const updatedMethods = { ...prevMethods };
        delete updatedMethods[questionNumber];
        return updatedMethods;
      });
      setCleaningMethodsAfrikaans((prevMethods) => {
        const updatedMethods = { ...prevMethods };
        delete updatedMethods[questionNumber];
        return updatedMethods;
      });

      setIdentifer((prevIdentifers) => {
        const updatedIndentifers = { ...prevIdentifers };
        delete updatedIndentifers[questionNumber];
        return updatedIndentifers;
      });

      setImage((prevImage) => {
        const updatedImages = { ...prevImage };
        delete updatedImages[questionNumber];
        return updatedImages;
      });

    }

    setCompletedQuestions(totalYesOrNoCount);


  };

  const calculatePercentage = () => {
    const yesCount1 = question1Answer === 'Yes' ? 1 : 0;
    const yesCount2 = question2Answer === 'Yes' ? 1 : 0;
    const yesCount3 = question3Answer === 'Yes' ? 1 : 0;
    const yesCount4 = question4Answer === 'Yes' ? 1 : 0;
    const yesCount5 = question5Answer === 'Yes' ? 1 : 0;
    const yesCount6 = question6Answer === 'Yes' ? 1 : 0;
    const yesCount7 = question7Answer === 'Yes' ? 1 : 0;
    const yesCount8 = question8Answer === 'Yes' ? 1 : 0;

    const totalYesCount = yesCount1 + yesCount2 + yesCount3 + yesCount4 + yesCount5 + yesCount6 + yesCount7 + yesCount8;
    const totalQuestions = 8;
    const percentage = (totalYesCount / totalQuestions) * 100;

    return percentage.toFixed(2);
  };

  const percentage = calculatePercentage(); // Calculate the risk percentage
  let riskLevelBlock = null; // Initialize the risk level block to null

  if (percentage <= 25) {
    riskLevelBlock = (
      <div style={{ backgroundColor: 'green', padding: '15px' }}>
        <span style={{ color: 'black' }}>Low Risk</span>
      </div>
    );
  } else if (percentage <= 50) {
    riskLevelBlock = (
      <div style={{ backgroundColor: 'yellow', padding: '5px' }}>
        <span style={{ color: 'black' }}>Medium Risk</span>
      </div>
    );
  } else if (percentage <= 75) {
    riskLevelBlock = (
      <div style={{ backgroundColor: 'orange', padding: '5px' }}>
        <span style={{ color: 'black' }}>High Risk</span>
      </div>
    );
  } else {
    riskLevelBlock = (
      <div style={{ backgroundColor: 'red', padding: '5px' }}>
        <span style={{ color: 'black' }}>Very High Risk</span>
      </div>
    );
  }


  function handleFormSubmit() {

    // const SamplingData = tempData.state.samplingId;

    /*axios.post("http://localhost:3000/api/sampling_data", SamplingData)
      .then((response) => {
        if (response.data.success) {
          const samplingId = response.data.insertedId;*/

    const surveyData = {
      pitLatrine: question1Answer === 'Yes',
      domesticAnimal: question2Answer === 'Yes',
      diaperDisposal: question3Answer === 'Yes',
      wasteWaterRelease: question4Answer === 'Yes',
      openDefaction: question5Answer === 'Yes',
      unprotectedWaterSource: question6Answer === 'Yes',
      agriculturalActivity: question7Answer === 'Yes',
      observerLaundryActivity: question8Answer === 'Yes',
      //samplingId: 'your_sampling_id', // Replace with the actual sampling ID
      risk_type: '',
      total_avarage: 0,
      samplingId: maxId,

    };



    axios.post("http://localhost:3001/api/sanitary_inspection_survey", surveyData)
      .then((response) => {

        setShowSuccessMessage(true);
        // Open the popup to display the result
        openPopup();


        if (response.data.success) {
          setShowRiskLevel(true);
        } else {
          console.error('Error while adding province:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error while making the API request:', error);
      });
  };
  const handleHomeNavigate = () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      // Make an HTTP request to fetch data based on the user ID if needed
      axios.get('http://localhost:3001/api/sampling_data', {
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
  console.log('Percentage:', percentage);
  console.log('Risk Level:', riskLevelBlock);
  console.log('Show Risk Level:', showRiskLevel);
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
        <Col xs={6} sm={0} md={0} lg={2} >
          <Container fluid className="side mt-5" >
            <Card style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }} >
              <Card.Body ><Link to="/Home"><Button variant="secondary" size="lg" style={{ width: '100%' }} onClick={handleHomeNavigate} ><FaHome /> Home</Button></Link></Card.Body>

              <Card.Body><Link to="/H2S"><Button variant="secondary" size="lg" style={{ width: '100%' }} ><IoWaterOutline /> H2S</Button></Link></Card.Body>
              <Card.Body><Link to="/Video"><Button variant="secondary" size="lg" style={{ width: '100%' }} ><FaVideo /> Video</Button></Link></Card.Body>
              <Card.Body ><Link to="/File"><Button variant="secondary" size="lg" style={{ width: '100%' }}><FaFile /> Reports </Button></Link></Card.Body>
              <Card.Body><Link to="/"> <Button size="lg" style={{ width: '85%', backgroundColor: 'black' }}><FaSignOutAlt /> Logout</Button></Link></Card.Body>
            </Card>
          </Container>
        </Col>
        <Col xs={30} sm={8} md={6} lg={10} style={{ backgroundImage: 'url("/images/back.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', filter: blur('25px')}}>
          <Row>
            <Container fluid className='mt-5'  >
              <Card className='mt-2 mb-5' style={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '30px' }} >
                <Card.Body >
                  <table class="table table-bordered mt-2" style={{ background: 'rgba(255, 255, 255, 0.5)' }} >
                    <thead class="thead-dark" >
                      <tr style={{ borderRadius: '30px' }} >
                        <th style={{ background: 'rgba(108, 117, 125, 0.5)' }}>Inspection form</th>
                        <th style={{ background: 'rgba(108, 117, 125, 0.5)' }}>Yes</th>
                        <th style={{ background: 'rgba(108, 117, 125, 0.5)' }}>No</th>
                      </tr>
                    </thead>
                    <tr style={{ background: 'rgba(108, 117, 125, 0.5)',fontWeight: 'bold' }}>
                      <td >1. Are there pit_atrined? </td>
                      <td >
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="Yes"
                            name="Question1"
                            onChange={(event) => handleRadioChange(event, 1)}
                            checked={question1Answer === 'Yes'} /></label>
                      </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="No"
                            name="Question1"
                            onChange={(event) => handleRadioChange(event, 1)}
                            checked={question1Answer === 'No'} /></label>
                      </td>
                    </tr>
                    <tr style={{ background: 'rgba(108, 117, 125, 0.5)',fontWeight: 'bold' }}>
                      <td>2. Are there any domestic animals observed? </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="Yes"
                            name="Question2"
                            onChange={(event) => handleRadioChange(event, 2)}
                            checked={question2Answer === 'Yes'} /></label>
                      </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="No"
                            name="Question2"
                            onChange={(event) => handleRadioChange(event, 2)}
                            checked={question2Answer === 'No'} /></label>
                      </td>
                    </tr>
                    <tr style={{ background: 'rgba(108, 117, 125, 0.5)',fontWeight: 'bold' }}>
                      <td>3. Diapers disposal? </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="Yes"
                            name="Question3"
                            onChange={(event) => handleRadioChange(event, 3)}
                            checked={question3Answer === 'Yes'} /></label>
                      </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }} >
                          <input
                            type="radio"
                            value="No"
                            name="Question3"
                            onChange={(event) => handleRadioChange(event, 3)}
                            checked={question3Answer === 'No'} /></label>
                      </td>
                    </tr>
                    <tr style={{ background: 'rgba(108, 117, 125, 0.5)',fontWeight: 'bold' }}>
                      <td>4. Release of waste watre? </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="Yes"
                            name="Question4"
                            onChange={(event) => handleRadioChange(event, 4)}
                            checked={question4Answer === 'Yes'} /></label>
                      </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="No"
                            name="Question4"
                            onChange={(event) => handleRadioChange(event, 4)}
                            checked={question4Answer === 'No'} /></label>
                      </td>
                    </tr>
                    <tr style={{ background: 'rgba(108, 117, 125, 0.5)',fontWeight: 'bold' }}>
                      <td>5. Open defaecation? </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="Yes"
                            name="Question5"
                            onChange={(event) => handleRadioChange(event, 5)}
                            checked={question5Answer === 'Yes'} /></label>
                      </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="No"
                            name="Question5"
                            onChange={(event) => handleRadioChange(event, 5)}
                            checked={question5Answer === 'No'} /></label>
                      </td>
                    </tr>
                    <tr style={{ background: 'rgba(108, 117, 125, 0.5)',fontWeight: 'bold' }}>
                      <td>6. Is the water source unprotected? </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="Yes"
                            name="Question6"
                            onChange={(event) => handleRadioChange(event, 6)}
                            checked={question6Answer === 'Yes'} /></label>
                      </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="No"
                            name="Question6"
                            onChange={(event) => handleRadioChange(event, 6)}
                            checked={question6Answer === 'No'} /></label>
                      </td>
                    </tr>
                    <tr style={{ background: 'rgba(108, 117, 125, 0.5)',fontWeight: 'bold' }}>
                      <td>7. Agricultural activities? </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="Yes"
                            name="Question7"
                            onChange={(event) => handleRadioChange(event, 7)}
                            checked={question7Answer === 'Yes'} /></label>
                      </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="No"
                            name="Question7"
                            onChange={(event) => handleRadioChange(event, 7)}
                            checked={question7Answer === 'No'} /></label>
                      </td>
                    </tr>
                    <tr style={{ background: 'rgba(108, 117, 125, 0.5)',fontWeight: 'bold' }}>
                      <td>8. Observed laundry activities? </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="Yes"
                            name="Question8"
                            onChange={(event) => handleRadioChange(event, 8)}
                            checked={question8Answer === 'Yes'} /></label>
                      </td>
                      <td>
                        <label style={{ background: 'rgba(108, 117, 125, 0.5)' }}>
                          <input
                            type="radio"
                            value="No"
                            name="Question8"
                            onChange={(event) => handleRadioChange(event, 8)}
                            checked={question8Answer === 'No'} />
                        </label>
                      </td>
                    </tr>
                  </table>

                </Card.Body>

                <button className='button' variant="outline-primary"
                  type="button" style={{
                    background: 'rgba(108, 117, 125)',
                    width: '200px',
                    display: 'block',
                    margin: '0 auto',
                  }}
                  onClick={handleFormSubmit}

                >
                  SUBMIT
                </button>
                <Popup open={isPopupOpen} closeOnDocumentClick onClose={closePopup}>
                  <div className="popup-content">
                    <h2>SURVEY</h2>
                    <p>SURVEY SUBMITTED SUCCESSFULLY</p>
                    <button style={{ color: 'black' }} onClick={closePopup}>Close</button>
                  </div>
                </Popup>

                <Card.Body>
                  <Popup
                    trigger={
                      <button className='show mt-5' variant="outline-primary"
                        type="button" style={{
                          background: 'rgba(108, 117, 125)',
                          width: '200px',
                          display: 'block',
                          margin: '0 auto',
                        }}
                        onClick={handleFormSubmit}

                      >
                        SHOW RISK LEVEL
                      </button>
                    }

                    modal
                    nested

                    overlayStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {(close) => (

                      <Card variant="outline-primary" className='text-center'>
                        <Card.Header>Risk Level:</Card.Header>
                        <Card.Text>{riskLevelBlock}</Card.Text>
                        <Card.Text className="text-center">
                          <h3> Select language to show your Measures</h3>
                        </Card.Text>
                        <Card.Text className="text-center mb-5">
                          <Popup className='popup'
                            trigger={
                              <button className='show' type="button" style={{ marginRight: '10px' }}>
                                ENGLISH
                              </button>
                            }
                            modal
                            nested
                            overlayStyle={{
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            {(close) => (
                              <div className='scroll' >
                                <h3 className='pop_header text-center'>Key Strategies For Fecal Pollution Control And Sanitary Measures : </h3>
                                <div className='pop_scroll text-center'>
                                  {yesAnswers.map((answer, index) => (
                                    <div key={index} className='maincontant'>
                                      {identifers[parseInt(answer.split(' ')[1])] && (
                                        <h4 className='myidentifer'>{identifers[parseInt(answer.split(' ')[1])]}</h4>
                                      )}

                                      {myImage[parseInt(answer.split(' ')[1])] && (
                                        <img className='measure_image' src={myImage[parseInt(answer.split(' ')[1])]} alt='' style={largeImageStyle} />
                                      )}

                                      {cleaningMethods[parseInt(answer.split(' ')[1])] && (
                                        <p className='measure'>{cleaningMethods[parseInt(answer.split(' ')[1])]}</p>
                                      )}

                                    </div>
                                  ))}
                                </div>
                                <button className='close' style={{ color: 'black' }} onClick={close}>Close</button>
                              </div>
                            )}
                          </Popup>
                          <Popup
                            trigger={
                              <button className='show' type="button" style={{ marginRight: '10px' }}>
                                ZULU
                              </button>
                            }
                            modal
                            nested
                            overlayStyle={{
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            {(close) => (
                              <div className='scroll' >
                                <h2 className='pop_header text-center'>Key Strategies For Fecal Pollution Control And Sanitary Measures</h2>
                                <div className='pop_scroll text-center' >
                                  {yesAnswers.map((answer, index) => (
                                    <div key={index} className='maincontant'>
                                      {identifers[parseInt(answer.split(' ')[1])] && (
                                        <h4 className='myidentifer'>{identifers[parseInt(answer.split(' ')[1])]}</h4>
                                      )}

                                      {myImage[parseInt(answer.split(' ')[1])] && (
                                        <img className='measure_image' src={myImage[parseInt(answer.split(' ')[1])]} alt='' style={largeImageStyle} />
                                      )}

                                      {cleaningMethodsZulu[parseInt(answer.split(' ')[1])] && (
                                        <p className='measure'>{cleaningMethodsZulu[parseInt(answer.split(' ')[1])]}</p>
                                      )}

                                    </div>
                                  ))}
                                </div>
                                <button className='close' style={{ color: 'black' }} onClick={close}>Close</button>
                              </div>
                            )}
                          </Popup>
                          <Popup
                            trigger={
                              <button className='show' type="button">
                                AFRIKAANS
                              </button>
                            }
                            modal
                            nested
                            overlayStyle={{
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            {(close) => (
                              <div className='scroll' >
                                <h2 className='pop_header text-center '>Key Strategies For Fecal Pollution Control And Sanitary Measures</h2>
                                <div className='pop_scroll text-center'>
                                  {yesAnswers.map((answer, index) => (
                                    <div key={index} className='maincontant'>
                                      {identifers[parseInt(answer.split(' ')[1])] && (
                                        <h4 className='myidentifer'>{identifers[parseInt(answer.split(' ')[1])]}</h4>
                                      )}

                                      {myImage[parseInt(answer.split(' ')[1])] && (
                                        <img className='measure_image' src={myImage[parseInt(answer.split(' ')[1])]} alt='' style={largeImageStyle} />
                                      )}

                                      {cleaningMethodsAfrikaans[parseInt(answer.split(' ')[1])] && (
                                        <p className='measure'>{cleaningMethodsAfrikaans[parseInt(answer.split(' ')[1])]}</p>
                                      )}

                                    </div>
                                  ))}
                                </div>
                                <button className='close' style={{ color: 'black' }} onClick={close}>Close</button>
                              </div>
                            )}
                          </Popup>


                        </Card.Text>
                      </Card>

                    )}
                  </Popup>
                </Card.Body>
              </Card>
            </Container>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default Survey








