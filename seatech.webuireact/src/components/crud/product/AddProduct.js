import React, { useState } from 'react';
import { Select, Grid, Modal, Button, TextInput, Textarea, NumberInput, useMantineTheme, Space, Group } from '@mantine/core';
import { MdCheckCircle } from 'react-icons/md';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7121/api'
})


export default function UpdateProduct(props) {

    const [title, setTitle] = useState(null);
    const [description, setDescripton] = useState(null);
    const [price, setPrice] = useState(null);
    const [createModalOpened, setCreateModal] = useState(false);

    const theme = useMantineTheme();

    const postData = async () => {
        try {
            if (title != null && props.categoryId != null) {
                let formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                formData.append('categoryId', props.categoryId);
                formData.append('price', price);

                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                await api.post('/product', formData, config)
                    .then(function (response) {
                        console.log(response.data);
                    });
                showNotification({
                    id: 'post-data',
                    autoClose: 5000,
                    color: 'teal',
                    title: "Ürün eklendi!",
                    message: title + " ürünü başarıyla eklendi.",
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
                <Button onClick={() => setCreateModal(true)}>Ürün Ekle</Button>
            </Group>
            <Modal
                opened={createModalOpened}
                onClose={() => setCreateModal(false)}
                centered
                size="lg"
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
                title="Ürün Oluştur">

                <TextInput
                    label="Ürün Başlığı"
                    required
                    value={title}
                    onChange={event => setTitle(event.currentTarget.value)}
                />



                <Textarea
                    label="Ürün Açıklaması"
                    value={description}
                    onChange={event => setDescripton(event.currentTarget.value)}
                />

                <NumberInput
                    label="Ürün fiyatı"
                    value={price}
                    onChange={event => setPrice(event)}
                />

                <Space h="lg" />
                <Button
                    color="cyan"
                    onClick={() => {
                        postData();
                    }}
                >Oluştur</Button>
            </Modal>

        </div>
    );
}