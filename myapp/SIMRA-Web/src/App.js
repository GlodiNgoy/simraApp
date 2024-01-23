import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/level1/Home'
import Video from './Pages/video/Video'
import Survey from './Pages/Survey/Survey'
import HTest from './Pages/HTest/H2S'
import Methods from './Pages/methods/Cleaning'
import Login from './Pages/Login/Login';
import Register from './Pages/Regsitration/RegisterForm';
import File from './Pages/Files/File';
import Zulu from './Pages/methods/Zulu';
import Afrikaans from './Pages/methods/Afrikaans';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Level from './Pages/level2/Level';
import FIB from './Pages/FIB/FIB';
import QMRAFile from './Pages/QMRA/QMRAFile';
import H2SReport from './Pages/Files/H2SReport';
import SurveyReport from './Pages/Files/SurveyReport';
import Results from './Pages/Results/Results';
import QMRA from './Pages/QMRAParameters/QMRA';
import QMRA2 from './Pages/QMRAParameters/QMRA2';
import QMRArun from './Pages/QMRA/QMRArun';
import CleaningEnglish from './Pages/methods/CleaningEnglish';
import LikelihoodOfInfection from './Pages/QMRALikehood/LikelihoodOfInfection ';
import Afrikaans2  from './Pages/methods/Afrikaans2';
import Zulu2 from './Pages/methods/Zulu2';
import Graph from './Pages/Graph/Graph';
import Level3 from './Pages/Level3/Level3';
import MST from './Pages/MST/MST';
import Pathogen from './Pages/Pathogen/Pathogen'
import CleaningEnglish1 from './Pages/methods/CleaningEnglish1';
import CleaningEnglish2 from './Pages/methods/CleaningEnglish2';
import QMRASelect from './Pages/QMRA/QMRASelect';
import Pathogenlikelyhood from './Pages/QMRALikehood/Pathogenlikelyhood';
import MSTlikelyhood from './Pages/QMRALikehood/MSTlikelyhood';
import File3 from './Pages/Files/File3';
import MSTFiles from './Pages/MSTFiles/MSTFiles';
import PathogenFiles from './Pages/PathogenFiles/PathogenFiles';
import Landing from './Pages/Home/Landing';
import Forgot from './Pages/Login/forgot';
import AdminHome from './Pages/Admin/AdminHome';
import About from './Pages/Home/About';
import Users from './Pages/Admin/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/Register' element={<Register />} />
        <Route exact path='/File' element={<File />} />
        <Route exact path='/Home' element={<Home />} />
        <Route exact path='/Video' element={<Video />} />
        <Route exact path='/Survey' element={<Survey />} />
        <Route exact path='/H2S' element={<HTest />} />
        <Route exact path='/Cleaning' element={<Methods />} />
        <Route exact path='/Zulu' element={<Zulu/>} />
        <Route exact path='/Afrikaans' element={<Afrikaans/>} />
        <Route exact path='/Level' element={<Level/>} />
        <Route exact path='/FIB' element={<FIB/>} />
        <Route exact path='/QMRAFile' element={<QMRAFile/>} />
        <Route exact path='/H2SReport' element={<H2SReport/>} />
        <Route exact path='/SurveyReport' element={<SurveyReport/>} />
        <Route exact path='/Results' element={<Results/>} />
        <Route exact path='/QMRA' element={<QMRA/>} />
        <Route exact path='/QMRA2' element={<QMRA2/>} />
        <Route exact path='/QMRArun' element={<QMRArun/>} />
        <Route exact path='/CleaningEnglish' element={<CleaningEnglish/>} />
        <Route exact path='/Afrikaans2' element={<Afrikaans2/>} />
        <Route exact path='/Zulu2' element={<Zulu2/>} />
        <Route exact path='/LikelihoodOfInfection' element={<LikelihoodOfInfection/>} />
        <Route exact path='/Graph' element={<Graph/>} />
        <Route exact path='/Level3' element={<Level3/>} />
        <Route exact path='/MST' element={<MST/>} />
        <Route exact path='/Pathogen' element={<Pathogen/>} />
        <Route exact path='/CleaningEnglish1' element={<CleaningEnglish1/>} />
        <Route exact path='/CleaningEnglish2' element={<CleaningEnglish2/>} />
        <Route exact path='/QMRASelect' element={<QMRASelect/>} />
        <Route exact path='/Pathogenlikelyhood' element={<Pathogenlikelyhood/>} />
        <Route exact path='/MSTlikelyhood' element={<MSTlikelyhood/>} />
        <Route exact path='/File3' element={<File3/>} />
        <Route exact path='/MSTFiles' element={<MSTFiles/>} />
        <Route exact path='/PathogenFiles' element={<PathogenFiles/>} />
        <Route exact path='/forgot' element={<Forgot/>} />
        <Route exact path='/AdminHome' element={<AdminHome/>} />
        <Route exact path='/' element={<Landing/>} />
        <Route exact path='/About' element={<About/>} />
        <Route exact path='/users' element={<Users/>} />
       
      </Routes>
    </Router>
  );
}
export default App;