import React, { useState } from 'react';
import { Modal, Button, TextInput, Textarea, NumberInput, useMantineTheme, Space, Group } from '@mantine/core';
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
    const [updateModalOpened, setUpdateModal] = useState({ "index": null, "isOpened": false });
    const [productId, setProductId] = useState(null);

    const theme = useMantineTheme();

    const updateData = async () => {
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

                await api.put('/product/' + productId, formData, config)
                    .then(function (response) {
                        console.log(response.data);
                    });
                showNotification({
                    id: 'put-data',
                    autoClose: 5000,
                    color: 'teal',
                    title: "Ürün düzenlendi!",
                    message: title + " ürünü başarıyla düzenlendi.",
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
            <Modal
                opened={JSON.stringify(updateModalOpened) === JSON.stringify({ "index": productId, "isOpened": true })}
                onClose={() => setUpdateModal({ "index": productId, "isOpened": false })}
                centered
                size="md"
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
                title={title + " ürününü düzenle"}
            >
                <TextInput
                    label="Ürün Başlığı"
                    required
                    defaultValue={title}
                    padding={theme.spacing.lg}
                    onChange={event => setTitle(event.currentTarget.value)}
                />

                <Textarea
                    label="Ürün Açıklaması"
                    defaultValue={description}
                    minRows={4}
                    //value={description}
                    onChange={event => setDescripton(event.currentTarget.value)}
                />

                <NumberInput
                    label="Ürün fiyatı"
                    defaultValue={price}
                    //value={price}
                    onChange={event => setPrice(event)}
                />

                <Space h="lg" />
                <Group position='right'>
                    <Button
                        color="cyan"
                        position="right"
                        onClick={updateData}
                    >Düzenle</Button>

                </Group>
            </Modal>
            <Button
                color="blue"
                variant="light"
                onClick={() => {
                    setUpdateModal({ "index": props.id, "isOpened": true });
                    setProductId(props.id);
                    setTitle(props.title);
                    setDescripton(props.description);
                    setPrice(props.price);
                }}
            >Düzenle</Button>

        </div>
    );

}