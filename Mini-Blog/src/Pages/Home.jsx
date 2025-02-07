import React from 'react'
import { Link } from "react-router";


function Home() {




    return (
        <div className="h-screen bg-[url('https://png.pngtree.com/background/20230411/original/pngtree-building-silhouette-corporate-website-background-picture-image_2390149.jpg')] bg-inherit flex justify-center items-center w-screen max-md:bg-center flex-col gap-14 static bg-no-repeat bg-cover ">

            <div className='drop-shadow-lg text-2xl font-bold '>Welcome to my Mİ-Nİ-BLOG</div>

            <div className='text-center'>
                <Link to="/Blog">
                    <button className='border-2 rounded-4xl px-4 py-2 hover:bg-red-500 cursor-pointer shadow-xl'>Go To Blogs</button>
                </Link>

            </div>

        </div >
    )
}

export default Home