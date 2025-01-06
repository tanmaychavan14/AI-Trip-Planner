import { Button } from '../ui/button'
import {Link} from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-50 gap-9'>
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