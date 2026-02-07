import React from 'react';
import service01 from '../assets/service01.jpg';
import service02 from '../assets/service02.jpg';
import service03 from '../assets/service03.jpg';
import RowComponent from './rowComponent';

const data = [
     { imagePath: service01, 
       title: "UI/UX Design",
       text: 'Creating visually appealing and intuitive interfaces that prioritize the user experience. My designs focus on clear navigation, consistency, and accessibility across devices. Each project is crafted to enhance engagement and deliver a seamless digital experience.'
     },
     { imagePath: service02, 
       title: "Web Development",
       text: 'Developing responsive, high-performing websites that are tailored to meet client objectives. My approach ensures clean code, scalability, and compatibility across platforms. I integrate modern technologies to deliver functional, reliable, and user-friendly web solutions.' },
     { imagePath: service03, 
       title: "Software Development",
       text: 'Writing clean, maintainable code for a variety of applications, from automation scripts to full-scale software projects. My work emphasizes efficiency, readability, and problem-solving. I leverage best practices to build robust and adaptable solutions that meet diverse project requirements.' },
];

export default function Services() {
     return (
          <>
               <h2>My Services</h2>
               <div className='servicesBox'>
                    {data.map((itemObj, index) => (
                         <RowComponent key={index} item={itemObj} />
                    ))}
               </div>

          </>
     );
}
