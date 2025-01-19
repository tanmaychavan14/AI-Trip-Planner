import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import './Hero.css';


function Hero() {

  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(false);

  const imageList = [
    '/assets/background/image1.png',
    '/assets/background/image2.png',
    '/assets/background/image3.png',
    '/assets/background/image4.png',
    '/assets/background/image5.png',
    '/assets/background/image6.png',
    '/assets/background/image7.png',
    '/assets/background/image8.png',
    '/assets/background/image9.png',
    '/assets/background/image10.png',
    '/assets/background/image11.png',
    '/assets/background/image12.png',
    '/assets/background/image13.png',
    '/assets/background/image14.png',
    '/assets/background/image15.png',
    '/assets/background/image16.png',
    '/assets/background/image17.png',
    '/assets/background/image18.png',
    '/assets/background/image19.png',
    '/assets/background/image20.png',
    '/assets/background/image21.png',
    '/assets/background/image22.png',
    '/assets/background/image23.png',
    '/assets/background/image24.png',
    '/assets/background/image25.png',
    '/assets/background/image26.png',
    '/assets/background/image27.png',
    '/assets/background/image28.png',
    '/assets/background/image29.png',
    '/assets/background/image30.png',
    '/assets/background/image31.png',
    '/assets/background/image32.png',
    '/assets/background/image33.png',
    '/assets/background/image34.png',
    '/assets/background/image35.png',
  ];

  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((currentImage) => (currentImage + 1) % imageList.length);
        setFade(false);
      }, 1500); // Wait for the fade-out effect to complete
    }, 3500); // Change image every 5 seconds, including 1-second transition

    return () => clearInterval(timeoutRef.current);
  }, []);


  return (
    <div className='flex flex-col items-center mx-50 gap-9'

      style={{
        width: '100vw',
        height: '92vh',
        backgroundImage: `url(${imageList[currentImage]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'all 1s ease-in-out',
      }} >

      <div
        style={{
          backdropFilter: 'blur(3px)', // Creates the blur effect
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
          borderRadius: '15px', // Rounded corners
          padding: '30px', // Padding around the text
          margin: 'auto', // Centers the container
          maxWidth: '100%', // Maximum width of the container
          boxShadow: '2px 4px 5px rgba(0, 0, 0, 0.3)', // Subtle shadow for a lifted effect
          marginTop: '200px'
        }}
      >
        <h1
          className="font-extrabold text-[50px] text-center"
          style={{ fontFamily: 'Times New Roman, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
        >
          <span className="text-[#462F26]">Navigate Your Next Journey<br /><i style={{ fontFamily: 'Monotype Corsiva, cursive' }}>With The Power of AI</i></span><br />
        </h1>
        <p className='text-xl text-brown-300 text-center text-[#462F26] mt-5' style={{ fontFamily: 'Times New Roman, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Seamlessly crafted itineraries that bring your travel aspirations to life</p>
     
        </div>
      <Link to={'/create-trip'}>
        <Button className='bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'>Begin Your Adventure Now!</Button>
      </Link>
    
    </div>
  )
}

export default Hero