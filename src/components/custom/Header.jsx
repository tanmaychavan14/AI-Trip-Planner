import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-2 shadow-md flex justify-between items-center px-5'>
      <img src='/logo.svg' width={150} />

      <div>
        <Button className='bg-[#6b493c] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'>Sign In</Button>
      </div>
    </div>
  )
}

export default Header