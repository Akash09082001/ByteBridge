import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Footer, Header } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    // const imageSrc = appwriteService.getFilePreview(post.featuredImage).href + '&mode=admin';
                    // setImageSrc(imageSrc);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="h-full overflow-x-hidden w-screen bg-neutral-950 flex gap-10 flex-col">
            <Header className="sticky top-0 left-0 right-0 z-10 " />
            <section className="flex w-full h-full">
                <div className="h-full w-full flex">

                    <Container className="flex flex-col text-white gap-5 h-full px-0 max-w-3xl mx-auto w-full">
                        <div className="flex relative flex-col gap-1 w-full items-center ">
                            <h1 className="flex text-purple-600 w-full text-3xl font-bold">{post.title}</h1>
                            <div className="flex text-gray-300 gap-5 w-full">
                                <span className="flex w-fit ">Posted By : </span>
                                <span className="flex w-fit ">Date : </span>
                            </div>
                            {isAuthor && (
                                <div className="absolute flex w-fit gap-5 right-0 top-0">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button className="backdrop-blur-lg px-3 py-3 bg-[rgba(246,244,244,0.09)]">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>

                                        </Button>
                                    </Link>
                                    <Button bgColor="backdrop-blur-lg px-3 py-3 bg-[rgba(246,244,244,0.09)]" onClick={deletePost}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="flex w-full max-h-96 rounded-md">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl w-full h-full object-contain"
                            />
                        </div>

                        <div className="flex flex-col gap-5 text-justify w-full rounded-md">
                            {parse(post.content)}
                        </div>

                    </Container>
                </div>
            </section>
            <Footer />
        </div>
    ) : null;
}
