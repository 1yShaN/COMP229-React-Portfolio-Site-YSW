import React from 'react';
import photo01 from '../assets/project01.png'
import photo02 from '../assets/project02.png'
import photo03 from '../assets/project03.png'
import RowComponent from './rowComponent';
import { href, Link } from 'react-router-dom';

const data = [
     {
          imagePath: photo01,
          title: <a href='http://studentweb.cencol.ca/ywang675/Final_Project/HomePage.html'>Crystal Village Resort Spa</a>,
          text: 'I independently designed and developed the Crystal Village Resort Spa service website, overseeing the complete process from layout planning and visual design to implementation and content organization. The project focused on creating a clean, user-friendly interface with clear navigation and consistent styling. I received a 19/20 evaluation from my professor, with feedback highlighting the site’s strong structure, visual consistency, and overall professionalism. This project strengthened my skills in front-end development and user-focused web design.'
     },
     {
          imagePath: photo02,
          title: 'BMR Calculator',
          text: 'I designed and developed a BMR (Basal Metabolic Rate) Calculator web application that allows users to input gender, age, height, weight, unit preference, and activity level to calculate daily calorie requirements. The application emphasizes accurate formula implementation, clear input constraints, and a simple, user-friendly interface. The project received a full mark from my professor, recognizing both the correctness of the calculations and the clarity of the design. This work strengthened my skills in front-end logic, form handling, and building practical health-focused web tools.'
     },
     {
          imagePath: photo03,
          title: 'Interactive Slideshow',
          text: 'I developed an interactive image slideshow that allows users to navigate through images using forward and backward controls, as well as an automatic play and pause feature. The application supports user interaction by enabling full-screen viewing when an image is selected. The project focused on smooth transitions, intuitive controls, and clear user guidance to enhance usability. This work strengthened my skills in JavaScript event handling, DOM manipulation, and building interactive user interfaces.'
     },
];

export default function Project() {
     return (
          <>
               <h2>My Projects</h2>
               <div className='projectsBox'>
                    {data.map((itemObj, index) => (
                         <RowComponent key={index} item={itemObj} />
                    ))}
               </div>
          </>
     );
}
