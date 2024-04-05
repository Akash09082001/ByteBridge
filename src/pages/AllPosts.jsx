import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import Dashboard from '../components/Dashboard'

function AllPosts() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (

        <Dashboard heading="All Blog" >
            <div className='h-full flex w-full'>
                <Container className='h-full w-full px-0 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {posts.map((post) => (
                        <div key={post.$id} className='flex w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </Container>
            </div>
        </Dashboard>
    )
}

export default AllPosts
