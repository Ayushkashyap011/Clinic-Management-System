import './Video.css';
import homePage from "../assets/homePage.mp4";
const Video = () => {
    return (

        <video className='video' src={homePage} alt="background" autoPlay muted loop/>
    );
  };
export default Video;