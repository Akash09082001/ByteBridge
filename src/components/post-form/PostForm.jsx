import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthHeading } from "../../elements";
import Dashboard from "../Dashboard";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleHeading = post ? "Edit Post" : "Add Post";

    return (
        <Dashboard heading={handleHeading}>
            <div className="flex w-full h-full">
                <div className="flex h-full w-full py-4">
                    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 md:divide-x md:divide-neutral-800 gap-5 h-full w-full">
                        <div className="flex h-full flex-col w-full md:col-span-2 lg:col-span-2">
                            <div className="flex flex-col w-full gap-5 h-full ">
                                <div className="flex w-full">
                                    <AuthHeading text='Add Details' className=" w-full text-lg items-center justify-start flex text-white" />
                                </div>
                                <div className="flex w-full flex-col gap-2 md:gap-5 h-full md:overflow-y-scroll">
                                    <div className="flex flex-col w-full gap-3 h-fit">
                                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 w-full">
                                            <Input
                                                label="Title :"
                                                placeholder="Title"
                                                {...register("title", { required: true })}
                                            />
                                            <Input
                                                label="Slug :"
                                                placeholder="Slug"
                                                {...register("slug", { required: true })}
                                                onInput={(e) => {
                                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                                }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 w-full">
                                            <Select
                                                options={["active", "inactive"]}
                                                label="Status"
                                                {...register("status", { required: true })}
                                            />
                                            <Input
                                                label="Featured Image :"
                                                type="file"
                                                accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                                                {...register("image", { required: !post })}
                                            />
                                        </div>
                                        <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col h-full gap-5 md:pl-5 w-full">
                            <div className="flex w-full">
                                <AuthHeading text='Preview' className="w-full text-lg items-center justify-start flex text-white" />
                            </div>
                            <Card imageUrl={post ? appwriteService.getFilePreview(post.featuredImage) : undefined} title={getValues("title")} />
                            <Button type="submit" className="w-full items-center justify-center py-2 bg-purple-600">
                                {post ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Dashboard>
    );
}
