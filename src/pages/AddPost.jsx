import React from 'react'
import { Container, PostForm } from '../components'

const AddPost = () => {
    return (
        <div className='h-full flex w-full'>
            <Container className='h-full w-full px-0'>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost
