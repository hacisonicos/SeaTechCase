import { React, useState } from 'react';
import { Blockquote, Button, Group, Modal, useMantineTheme } from '@mantine/core';
import { MdCheckCircle } from 'react-icons/md';
import { BsFillExclamationSquareFill } from "react-icons/bs";
import { showNotification } from '@mantine/notifications';
import axios from 'axios';


const api = axios.create({
    baseURL: 'https://localhost:7121/api'
})


export default function DeleteCategory(props) {

    const [isOpened, setIsOpened] = useState(false);

    const theme = useMantineTheme();


    const deleteData = async (id, title) => {
        try {
            await api.delete('/category/' + id);
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
                title={props.clickedCategory.title + " kategorisini silmek istediğinize emin misiniz?"}
            >
                <Blockquote
                    icon={<BsFillExclamationSquareFill size={24} color="red" />}
                >
                    Bu kategoriyi silmeniz halinde, kategoriye ait ürünleri, alt kategorileri ve alt kategorilerin ürünlerini silmiş olacaksınız.
                </Blockquote>
                <Group position='right'>
                    <Button
                        color="blue"
                        onClick={() => setIsOpened(false)}
                    >İptal</Button>
                    <Button
                        color="red"
                        onClick={() => {
                            deleteData(props.clickedCategory.categoryId, props.clickedCategory.title, props.categories);
                        }}
                    >Sil</Button>
                </Group>
            </Modal>

            {(props.clickedCategory.categoryId != null) ?
                <Button
                    color="red"
                    onClick={() => setIsOpened(true)}
                >Sil</Button>
                :
                null
            }

        </div>

    );
}