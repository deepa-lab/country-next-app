import Country from '../components/Country';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <Country/>
    </>
  )
}
