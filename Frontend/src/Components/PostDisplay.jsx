import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchByClick } from '../server/fetchPosts';

const PostDisplay = () =>{
    const {id} = useParams();
    const [post, setPost] = useState({});

    useEffect(()=>{
        const getPost = async () =>{
            const data = await fetchByClick(id);
            setPost(data);
        }
        getPost();
    },[id])

    const sanitizedHTML = DOMPurify.sanitize(post.body);
    return(
        <>
            {post && (
                <div id="post-display" className="flex flex-col gap-1 text-left">
                    <span className="flex flex-row gap-10 items-center">
                        <img src={post.banner} className="w-1/3 h-auto rounded-md shadow-black/45 shadow-md mb-10"/>
                        <span> 
                            <h1 className="text-5xl text-slate-900 font-bold self-center mb-10">{post.title}</h1>
                            <br />
                            <h2 className="text-3xl font-bold mb-10 self-center">{post.subject}</h2>
                        </span>

                    </span>
                    
                    
                    <div dangerouslySetInnerHTML={{__html : sanitizedHTML}}></div>
                    <br />
                    <div>
                        <h2>Author : </h2>
                        <h2 className='text-sm font-bold'><em>{post?.regards?.name}</em></h2>
                        <h2 className='text-sm font-bold'><em>{post?.regards?.email}</em></h2>
                    </div>
                </div>
            )}
        </>
    )
}

export default PostDisplay;