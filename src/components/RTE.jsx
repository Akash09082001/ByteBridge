import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full bg-white rounded-lg'>
            <fieldset className='flex flex-col rounded-lg w-full border '>
                <legend className='ml-2 w-fit flex'>
                    {label && <label className='text-black text-sm'>{label}</label>}
                </legend>
                <Controller
                    name={name || "content"}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field: { onChange, value } }) => (
                        <Editor
                            apiKey='wbxihnt4y4gs4nq92o17lmrrym3wpmhl73u3hjddhelrxmy9'
                            init={{
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                            }}
                            value={value}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </fieldset>
        </div>
    );
}

