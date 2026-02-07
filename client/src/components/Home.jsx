import { Link } from 'react-router-dom';
import kitty from '../assets/kitty.png';
import MyLogo from '../assets/JeniX_removebg.png';


function Home() {
     return (
          <>
            <section className="home">
               <h1>Hi! I am <span id="name">Yushan Wang/Jennifer</span></h1>
               <h3>Welcome to My Portfolio</h3>
               <p>A passionate web developer and designer.</p>
               <p id="mission">"to transform ideas into meaningful digital experiences by combining thoughtful design, clean code, and creativity.
                    I aim to build websites that are both visually appealing and easy to use."</p>
               <Link to="/about"><button id="learn">Learn More About Me</button></Link>
            </section>
               <img src={kitty} alt="kitty" id="kitty" />
               <img src={MyLogo} alt="Logo" id="watermark" height="100px" width="120px" />
          </>

     )
}

export default Home;