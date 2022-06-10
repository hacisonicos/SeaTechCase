import { React, useState } from 'react';
import { Button, Modal, Group, useMantineTheme } from '@mantine/core';
import { MdCheckCircle } from 'react-icons/md';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';


const api = axios.create({
    baseURL: 'https://localhost:7121/api'
})


export default function DeleteProduct(props) {

    const [isOpened, setIsOpened] = useState(false);

    const theme = useMantineTheme();

    const deleteData = async (id, title) => {
        try {
            await api.delete('/product/' + id)
                .then(function (response) {
                    console.log(response.data);

                });
            showNotification({
                id: 'delete-data',
                autoClose: 5000,
                color: 'teal',
                title: "Ürün silindi!",
                message: title + " ürünü başarıyla silindi.",
                icon: <MdCheckCircle />,
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Modal
                opened={isOpened}
                onClose={() => setIsOpened(false)}
                centered
                size="md"
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
                title={props.title + " ürününü silmek istediğinize emin misiniz?"}
            >
                <Group position='right'>
                    <Button
                        color="blue"
                        onClick={() => setIsOpened(false)}
                    >İptal</Button>
                    <Button
                        color="red"
                        onClick={() => {
                            deleteData(props.id, props.title);
                        }}
                    >Sil</Button>
                </Group>
            </Modal>
            <Button
                color="red"
                variant='light'
                onClick={() => {
                    setIsOpened(true)
                }}
            >Sil</Button>
        </div>
    );
}