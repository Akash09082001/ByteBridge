import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, Header, PostCard } from '../components'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((response) => {
            if (response && response.documents) {
                setPosts(response.documents);
            } else {
                setError("Invalid response");
            }
            setLoading(false);
        }).catch((error) => {
            setError(error.message || "An error occurred while fetching posts");
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className={`flex flex-col  w-full h-screen ${authStatus ? ("pt-0") : ("pt-20")}`}>
                {authStatus ? (<Header className='sticky top-0 left-0' />) : null}
                <div className="w-full h-full flex max-w-7xl mx-auto">
                    <Container className='h-full w-full'>
                        <div className="flex flex-wrap w-full">
                            <div className="flex w-full h-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500 text-white">
                                    Loading...
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }

    if (error || posts.length === 0) {
        return (
            <div className={`flex flex-col  w-full h-screen ${authStatus ? ("pt-0") : ("pt-20")}`}>
                {authStatus ? (<Header className='sticky top-0 left-0' />) : null}
                <div className="w-full h-full flex max-w-7xl mx-auto">
                    <Container className='h-full w-full'>
                        <div className="flex flex-wrap w-full">
                            <div className="flex w-full h-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500 text-white">
                                    {error ? "Error loading posts" : "No posts available"}
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full h-full flex max-w-7xl mx-auto'>
            <Container className='h-screen'>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;
