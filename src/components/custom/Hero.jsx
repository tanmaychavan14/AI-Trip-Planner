import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import './Hero.css';


function Hero() {

  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(false);
  
  const imageList = [
    '/assets/background/image1.jpg',
    '/assets/background/image2.jpg',
    '/assets/background/image3.jpg',
    '/assets/background/image4.jpg',
    '/assets/background/image5.jpg',
    '/assets/background/image6.jpg',
    '/assets/background/image7.jpg',
    '/assets/background/image8.jpg',
    '/assets/background/image9.jpg',
    '/assets/background/image10.jpg',
    '/assets/background/image11.jpg',
    '/assets/background/image12.jpg',
    '/assets/background/image13.jpg',
    '/assets/background/image14.jpg',
    '/assets/background/image15.jpg',
    '/assets/background/image16.jpg',
    '/assets/background/image17.jpg',
    '/assets/background/image18.jpg',
    '/assets/background/image19.jpg',
    '/assets/background/image20.jpg',
    '/assets/background/image21.jpg',
    '/assets/background/image22.jpg',
    '/assets/background/image23.jpg',
    '/assets/background/image24.jpg',
    '/assets/background/image25.jpg',
    '/assets/background/image26.jpg',
    '/assets/background/image27.jpg',
    '/assets/background/image28.jpg',
    '/assets/background/image29.jpg',
    '/assets/background/image30.jpg',
    '/assets/background/image31.jpg',
    '/assets/background/image32.jpg',
    '/assets/background/image33.jpg',
    '/assets/background/image34.jpg',
    '/assets/background/image35.jpg',
  ];

  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((currentImage) => (currentImage + 1) % imageList.length);
        setFade(false);
      }, 1000); // Wait for the fade-out effect to complete
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

      <h1
        className="font-extrabold text-[50px] font-family-[Inter] text-[#6b493c] text-center mt-20"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <span className="text-[#864228]">Explore Smarter & Plan Less with AI-Curated Itineraries:</span><br /><span className="text-[30px]">Custom travel plans that bring your adventures to life, stress-free and with ease</span>
      </h1>
      <p className='text-xl text-brown-300 text-center'>Your personalized travel planner, crafting custom itineraries that perfectly match your interests and budget.</p>

      <Link to={'/create-trip'}>
        <Button className='bg-[#6b493c] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'>Begin Your Adventure Now!</Button>
      </Link>
    </div>
  )
}

export default Hero