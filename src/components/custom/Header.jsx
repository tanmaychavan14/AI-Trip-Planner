import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

function Header() {

const user=JSON.parse(localStorage.getItem('user'));

useEffect(()=>{
  console.log(user);
})

  return (
    <div className='p-2 shadow-md flex justify-between items-center px-5'>
      <img src='/assets/logo.svg' width={150} />

      <div>
        <Button className='bg-[#6b493c] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'>Sign In</Button>
      </div>
    </div>
  )
}

export default Header