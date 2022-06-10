import React, { useState } from 'react';
import { Select, Grid, Modal, Button, TextInput, Textarea, NumberInput, useMantineTheme, Space, Group } from '@mantine/core';
import { MdCheckCircle } from 'react-icons/md';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7121/api'
})


export default function AddCategory(props) {


    const postSubCategory = async () => {
        try {
            if (props.title != null) {
                let formData = new FormData();
                formData.append('title', props.title);
                formData.append('parentCategoryId', props.clickedCategory.categoryId);

                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                await api.post('/category', formData, config)
                    .then(function (response) {
                        console.log(response.data);
                    });
                showNotification({
                    id: 'post-data',
                    autoClose: 5000,
                    color: 'teal',
                    title: "Kategori eklendi!",
                    message: props.title + " kategorisi başarıyla eklendi.",
                    icon: <MdCheckCircle />,
                })

            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const postMainCategory = async () => {
        try {
            if (props.title != null) {
                let formData = new FormData();
                formData.append('title', props.title);
                formData.append('parentCategoryId', null);

                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                await api.post('/category', formData, config)
                    .then(function (response) {
                        console.log(response.data);
                    });
                showNotification({
                    id: 'post-data',
                    autoClose: 5000,
                    color: 'teal',
                    title: "Kategori eklendi!",
                    message: props.title + " kategorisi başarıyla eklendi.",
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
            <Group>

                <Button
                    color="blue"
                    position="right"
                    onClick={postMainCategory}
                >Ana Kategori Ekle</Button>
                {(props.clickedCategory.categoryId != null) ?
                    <div>


                        <Button
                            color="blue"
                            position="right"
                            onClick={postSubCategory}
                        >{props.clickedCategory.title} Kategorisine ekle</Button>
                    </div>
                    :
                    null
                }
            </Group>
        </div>
    );
}