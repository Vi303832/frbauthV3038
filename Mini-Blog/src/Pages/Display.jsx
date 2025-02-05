import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from "@fortawesome/free-regular-svg-icons"


function Display() {

    let navigate = useNavigate();
    let { useruid } = useSelector(s => s.auth);



    useEffect(() => {
        if (!useruid) {

            navigate("/Login")

        }


    }, [])





    return (
        <div className='h-screen bg-amber-200'>
            <div className='h-screen'>

                <div className=' h-[15%] flex justify-between items-end pb-3 mb-1   '>

                    <div className='text-5xl ml-5'>Recent posts</div>

                    <div>
                        <div className='text-2xl mr-5 flex gap-1 items-center'><FontAwesomeIcon className="text-3xl" icon={faNewspaper} />Add Blog</div>
                    </div>



                </div>
                <hr className='w-[95%] mx-auto min-md:w-[98%]'></hr>
                <hr className='w-[95%] mx-auto min-md:w-[98%]'></hr>


                <div className=' h-[75%]'>
                    <div>
                        <div></div>



                    </div>



                </div>

            </div>
        </div>
    )
}

export default Display