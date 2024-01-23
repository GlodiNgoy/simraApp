import React, { useState } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';


const About = () => {

  return (
    <div>

      <div className="header" >
        <div className="top">
          <div className="logo">
            <img src="images/SimraLogo.png" alt="" />
            <h1 className="logoname">SIMRA</h1>
          </div>
          <nav>
            <ul>
              <li><Link to="/" className="link">HOME</Link></li>
              <li><Link to="/Login" className="link">SIGN IN</Link></li>
              <li><Link to="/Register" className="link2">SIGN UP</Link></li>
            </ul>
          </nav>
        </div>

      </div>
      <div style={{ backgroundColor: 'rgba(255, 255, 255)' }}>
        <div className='About_Container' >
          <h3>What is H2S (Hydrogen Sulphide) testing?</h3>
          <p>
            Hydrogen Sulfide (H2S) test is a critical process for assessing water quality and safety. It detects the presence of this potentially harmful gas, helping to identify faecal contamination in water sources. If water is faecally contaminated, the paper strip will change to a brown-black colour, indicating that water is not safe for drinking purposes.
          </p>

          <div className="list-style">
            <img src="images/H2S.jpg" className="img_responsive" alt="" />

            <div className="aboutText">
              <h3>How can I do H2S test?</h3>
              <ul>
                <li>Collect 100 mL of water sample to be tested. (e.g., water from tap, stage container, spring, borehole, dam)</li>
                <li>Insert H2S paper strip into the tube and secure it with cotton wool so that it remains at the top center of the tube.</li>
                <li>Place it in a container covered with cloth and leave it in a warm place for 24-36 hours.</li>
                <li>Check the color change of the paper strip. If the color changes to black, it means water is fecal contaminated.</li>
              </ul>
              <h3>What actions to take based on survey and H2S test results?</h3>
              <ul>
                <li>Stop using the contaminated water source.</li>
                <li>Take corrective actions (using household water treatment methods) or provide an alternate safe water source.</li>
                <li>Alert other community members to treat water from similar sources.</li>
                <li>Investigate the source of contamination and prevent future pollution.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='About_Container'>
          <h3>What is sanitary inspection?</h3>
          <p>
            Sanitary inspection serves as a vital tool in water quality monitoring, assessing the cleanliness, safety, and overall hygiene of water resources and environments. Its primary role is to identify potential routes of microbial contamination in diverse water sources.
          </p>

          <div className="list-style">
            <img src="images/monitor.jpg" className="img_responsive" alt="" />

            <div className="aboutText">
              <h3>How do we monitor water quality at home?</h3>
              <ul>
                <li>Utilize a sanitary inspection survey form to pinpoint potential pathways for faecal contamination in both your main and alternative water sources.</li>
                <li>Additionally, employ the Hydrogen Sulphide test to determine the presence or absence of faecal contamination in the water.</li>
              </ul>
              <h3>Is your water safe for drinking purposes?</h3>
              <p>
                While water may appear clear, it may not necessarily be safe for drinking. Such water can potentially lead to diarrheal and other waterborne diseases. Hence, it is essential for you to regularly monitor the quality of your water.
              </p>
            </div>
          </div>
        </div>

        <div className='About_Container'>
          <h3>What are the households water treatment methods?</h3>
          <div className="list-style">
            <img src="images/boiling.jpg" className="img_responsive" alt="" />

            <div className="aboutText">
              <h3>1. Boiling</h3>
              <p>Boiling: Bring the water to a rolling boil and maintain it for at least one minute. Allow the water to cool before use.</p>
            </div>
          </div>
          <div className="list-style">
            <img src="images/pic2.jpg" className="img_responsive" alt="" />

            <div className="aboutText">
              <h3>2. SODIS</h3>
              <p>SODIS (Solar Water Disinfection): Fill clear, plastic bottles with water and leave them in direct sunlight for at least six hours (or longer if cloudy). Disinfect the water.</p>
            </div>
          </div>
          <div className="list-style">
            <img src="images/chm.jpeg" className="img_responsive" alt="" />

            <div className="aboutText">
              <h3>3. Chemical Disinfection</h3>
              <p>Chemical Disinfection: Add a cap full of bleach in 25L of water. Allow the treated water to sit for a specific contact time before consuming.</p>
            </div>
          </div>
          <div className="list-style">
            <img src="images/filtering.jpg" className="img_responsive" alt="" />

            <div className="aboutText">
              <h3>4. Filtration</h3>
              <p>Filtration: Choose a water filter certified for the removal of specific contaminants (e.g., use a cloth folded 8 times/clay pots/ceramic filters).</p>
            </div>
          </div>

        </div>
        <div className="footer">
          <img src="images/SimraLogo.png" alt="" />
          <p className="logoname">Copyright © 2023 SIMRA</p>
        </div>

      </div>


    </div>
  );
};

export default About;