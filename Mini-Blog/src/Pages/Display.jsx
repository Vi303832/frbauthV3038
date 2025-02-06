import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from "@fortawesome/free-regular-svg-icons"
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';


function Display() {

    let navigate = useNavigate();
    let { useruid } = useSelector(s => s.auth);
    let [blogss, setblogposts] = useState([]);
    useEffect(() => {

        if (!useruid) {

            navigate("/Login")
            return;
        }


        const fetchposts = async () => {
            const querySnapshot = await getDocs(collection(db, "Blogs"));
            const Bloglist = querySnapshot.docs.map((doc) =>
            ({
                id: doc.id,
                ...doc.data()
            }))
            setblogposts(Bloglist)
        }
        fetchposts();
        console.log("blogssun sonucu")
        console.log(blogss)
    }, [useruid, navigate])

    let handleadjust = () => {


        navigate("/AddBlog")



    }

    const formatDate = (timestamp) => {
        if (!timestamp) return "No date available";
        const date = timestamp.toDate(); // Firestore timestamp'i Date nesnesine dönüştür
        return date.toLocaleString(); // Kullanıcı dostu bir tarih formatına çevir
    };




    return (
        <div className='h-screen bg-amber-200'>
            <div className='h-screen'>

                <div className=' h-[15%] flex justify-between items-end pb-3 mb-1   '>

                    <div className='text-5xl ml-5'>Recent posts</div>

                    <div className='cursor-pointer' onClick={() => handleadjust()}>
                        <div className='text-2xl mr-5 flex gap-1 items-center'><FontAwesomeIcon className="text-3xl" icon={faNewspaper} />Add Blog</div>
                    </div>



                </div>
                <hr className='w-[95%] mx-auto min-md:w-[98%]'></hr>
                <hr className='w-[95%] mx-auto min-md:w-[98%]'></hr>


                <div className=' h-[75%]'>

                    {blogss.length > 0 ? (
                        blogss.map((blog) => (
                            <div key={blog.id} className="bg-white p-4 mb-3 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">{blog.title}</h2>
                                <p className="text-sm text-gray-600">By {blog.author}</p>
                                <p className="mt-2">{blog.content}</p>
                                <p className="text-xs text-gray-500 mt-1">{formatDate(blog.date)}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700">No posts available</p>
                    )}






                </div>

            </div>
        </div>
    )
}

export default Display