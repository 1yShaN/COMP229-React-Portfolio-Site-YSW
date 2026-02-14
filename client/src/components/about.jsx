import Self from '../assets/profile.jpeg';
import MyLogo from '../assets/JeniX_removebg.png';
import resume from '../assets/Resume.pdf';


const About = () => {
     return (
          <>
               <div className='AboutPage'>
                    <main className="page">
                         <h1 id="about-header">About Me</h1>
                         <img src={Self} alt="Yushan Wang" id="profile" />
                         <p id="description">
                              My name is Yushan Wang, you can also call me Jennifer! I am a web development student with a strong interest in building responsive, accessible, and visually appealing websites.
                              I enjoy turning ideas into functional digital experiences through clean design and well-structured code.
                         </p>
                         <a href={resume} target="_blank" rel="noopener noreferrer">View My Resume (PDF)</a>
                    </main>
                    <img src={MyLogo} alt="Logo" id="watermark" height="100px" width="120px"></img>
               </div>
          </>
     );  
}

export default About;
