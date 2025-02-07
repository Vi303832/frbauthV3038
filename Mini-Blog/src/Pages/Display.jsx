import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from "@fortawesome/free-regular-svg-icons"
import { db } from '../Firebase';
import { collection, getDocs, where, query, doc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';


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

        console.log(useruid)

    }, [useruid, navigate])

    let handleadjust = () => {


        navigate("/AddBlog")



    }

    const formatDate = (timestamp) => {
        if (!timestamp) return "No date available";
        const date = timestamp.toDate(); // Firestore timestamp'i Date nesnesine dönüştür
        return date.toLocaleString(); // Kullanıcı dostu bir tarih formatına çevir
    };


    const handleremove = async (blogId) => {
        try {
            console.log("Başlangıç - blogId: ", blogId);

            // Firestore sorgusunu başlatma
            const q = query(
                collection(db, "Blogs"),  // 'Blogs' koleksiyonuna sorgu
                where("blogId", "==", blogId)  // blogId'yi sorguluyoruz
            );
            console.log(q)
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log('Belirtilen blog bulunamadı');
            } else {
                querySnapshot.forEach(async (docSnapshot) => {
                    // Dökümanı silmek için doğru şekilde referansı kullanıyoruz
                    const docRef = doc(db, "Blogs", docSnapshot.id); // 'Blogs' koleksiyonundaki dökümanın referansını alıyoruz
                    await deleteDoc(docRef); // Silme işlemi
                    console.log('Döküman ID: ', docSnapshot.id);  // Silinen dokümanın ID'sini logluyoruz

                    const querySnapshot = await getDocs(collection(db, "Blogs"));
                    const Bloglist = querySnapshot.docs.map((doc) =>
                    ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setblogposts(Bloglist)

                });
            }
        } catch (error) {
            console.error('Hata oluştu: ', error);
        }
    };
    return (
        <div className='min-h-screen bg-amber-200 p-1' >

            <div className='h-[100%]    '>

                <div className=' h-[15%] flex justify-between items-end pb-3 mb-1   '>

                    <div className='text-5xl ml-5'>Recent posts</div>

                    <div className='cursor-pointer' onClick={() => handleadjust()}>
                        <div className='text-2xl mr-5 flex gap-1 items-center'><FontAwesomeIcon className="text-3xl" icon={faNewspaper} />Add Blog</div>
                    </div>



                </div>
                <hr className='w-[95%] mx-auto min-md:w-[98%]'></hr>
                <hr className='w-[95%] mx-auto min-md:w-[98%]'></hr>


                <div className=' h-[75%] pt-5'>

                    {blogss.length > 0 ? (
                        blogss.map((blog) => (
                            <div key={blog.blogId} className="bg-white p-4 mb-3 rounded-lg shadow-lg mx-9 ">

                                <h2 className="text-xl font-bold">{blog.title}</h2>
                                <p className="text-sm text-gray-600">By {blog.author}</p>
                                <p className="mt-2 overflow-wrap break-words px-2">{blog.content}</p>
                                <span className='flex justify-between items-center'>
                                    <span className="text-xs text-gray-500 mt-1">{formatDate(blog.date)}</span>
                                    <span >

                                        <button onClick={() => handleremove(blog.blogId)} className='border-2 rounded-4xl px-2 py-1 bg-red-500 cursor-pointer shadow-xl'>Delete</button>
                                        <button onClick={() => handleremove(blog.blogId)} className='border-2 rounded-4xl px-2 py-1 bg-yellow-500 cursor-pointer shadow-xl ml-2 mr-5'>Adjust</button

                                        ></span>


                                </span>

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