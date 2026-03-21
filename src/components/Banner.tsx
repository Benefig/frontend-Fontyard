'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import styles from './banner.module.css'
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg']
    const titleColor = ['text-blue-600', 'text-yellow-200', 'text-white', 'text-gray-800'];
    const descColor = ['text-blue-900', 'text-yellow-400', 'text-gray-200', 'text-black'];
    const [index, setIndex] = useState(0);
    const router= useRouter();

    const {data:session} = useSession();
    console.log(session);

    return (
        <div className = {styles.banner} onClick={() => {setIndex(index+1)}}>
            <Image src = {covers[index%covers.length]}
            alt = 'cover'
            fill = {true}
            priority
            style={{ objectFit: "cover" }}/>
            <div className = {styles.bannerText}>
                <h1 className = {`${titleColor[index%titleColor.length]} text-6xl font-bold`}>where every man finds their hotel</h1>
                <h3 className = {`${descColor[index%descColor.length]} text-xl font-serif`}>Finding the greatest high hotel has never been this convenient. OwO <br />
                Whether it is for a wedding, fight-scene, or super-private resting, we connect hotels and people through our [chaos and harmony].</h3>
            </div>
            {
                session? <div className={`z-30 absolute top-5 right-10 font-semibold ${titleColor[index%titleColor.length]} text-2xl`}>Welcome {session.user?.name} </div>
                : null
            }
            <button className='bg-white text-cyan-600 border border-cyan-600 font-semibold 
            py-4 px-6 m-5 rounded z-30 absolute bottom-0 right-0 text-lg
            hover:text-white hover:bg-cyan-600 hover-border-transparent'
            onClick={(e) => {e.stopPropagation(); router.push('/hotel');}}>
                Select Hotel
            </button>
        </div>
    );
}