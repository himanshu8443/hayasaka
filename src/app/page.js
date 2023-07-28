import Homepage from '@/components/Home'
import { GiMusicalNotes } from 'react-icons/gi'

export default function Home() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let salutation = '';
  if (currentHour >= 5 && currentHour < 12) {
    salutation = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    salutation = 'Good afternoon';
  } else {
    salutation = 'Good evening';
  }

  return (
    <div>
      <div className=' mx-auto relative flex flex-col w-11/12 text-white '>
      <h1 className='text-4xl font-bold mx-2 m-7 text-white flex gap-2'>"{salutation}  <GiMusicalNotes/>"</h1>

      <Homepage/>
      
      </div>
    </div>
  )
}
