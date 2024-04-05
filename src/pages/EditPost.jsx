import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components';
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {

    const [post, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='w-full h-full max-h-screen backdrop-blur-sm bg-[rgba(246,244,244,0.09)]'>
            <Container className='px-0 w-full'>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost
