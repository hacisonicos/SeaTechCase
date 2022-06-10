import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { MdCheckCircle } from 'react-icons/md';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7121/api'
})


export default function Update(props) {


    const updateCategory = async () => {
        try {
            if (props.title != null) {
                let formData = new FormData();
                formData.append('title', props.title);
                formData.append('parentCategoryId', props.clickedCategory.parentCategoryId);


                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                await api.put('/category/' + props.clickedCategory.categoryId, formData, config)
                    .then(function (response) {
                        console.log(response.data);
                    });
                showNotification({
                    id: 'put-data',
                    autoClose: 5000,
                    color: 'teal',
                    title: "Kategori düzenlendi!",
                    message: props.title + " kategorisi başarıyla düzenlendi.",
                    icon: <MdCheckCircle />,
                })

            }
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <div>

            {(props.clickedCategory.categoryId != null) ?
                <div>

                    <Button
                        color="cyan"
                        position="right"
                        onClick={updateCategory}
                    >{props.clickedCategory.title} Kategorisini Düzenle</Button>
                </div>
                :
                null
            }
        </div>
    );
}