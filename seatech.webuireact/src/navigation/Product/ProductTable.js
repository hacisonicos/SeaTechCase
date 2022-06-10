import React, { useEffect, useState } from 'react';
import { Table, Grid, Title, Paper, Group, Pagination, TextInput, SegmentedControl } from '@mantine/core';
import { NotificationsProvider, showNotification } from '@mantine/notifications';
import { MdCheckCircle } from 'react-icons/md';
import axios from 'axios';
import UpdateProduct from '../../components/crud/product/UpdateProduct';
import DeleteProduct from '../../components/crud/product/DeleteProduct';
import AddProduct from '../../components/crud/product/AddProduct';

const api = axios.create({
    baseURL: 'https://localhost:7121/api'
})


export default function ProductTable(props) {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('/product?CategoryId=' + props.clickedCategory.categoryId + '&pageNumber=1&pageSize=10&searchString=');
    const [pageNumber, setPageNumber] = useState(1);
    const [searchString, setSearchString] = useState("");

    //detect category click
    useEffect(() => {
        setQuery(('/product?CategoryId=' + props.clickedCategory.categoryId + '&pageNumber=' + pageNumber + '&pageSize=10&searchString=' + searchString));
    }, [props.clickedCategory.categoryId]);

    //mount and detect queries
    useEffect(() => {
        if (query !== JSON.stringify('/product?CategoryId=' + props.clickedCategory.categoryId + '&pageNumber=' + pageNumber + '&pageSize=10&searchString=' + searchString)) {
            setQuery('/product?CategoryId=' + props.clickedCategory.categoryId + '&pageNumber=' + pageNumber + '&pageSize=10&searchString=' + searchString);
        }
        async function fetchData() {
            try {
                await api.get(query)
                    .then(response => setProducts(response.data));
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
        console.log(query)
    }, [query]);

    const updateActivity = async (product, event) => {
        try {
            let formData = new FormData();
            formData.append('activity', event);
            formData.append('title', product.title);
            formData.append('description', product.description);
            formData.append('categoryId', product.categoryId);
            formData.append('price', product.price);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            await api.put('/product/' + product.id, formData, config)
                .then(function (response) {
                    console.log(response.data);
                });
            showNotification({
                id: 'put-data',
                autoClose: 5000,
                color: 'teal',
                title: "Ürün düzenlendi!",
                message: product.title + " ürünü başarıyla düzenlendi.",
                icon: <MdCheckCircle />,
            })

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <NotificationsProvider>
                <Paper p={40}>
                    <Grid>
                        <Group style={{ marginBottom: 50 }}>
                            {(props.clickedCategory.title != null) ?
                                <Title
                                    style={{ marginTop: 10, marginBottom: 20 }}
                                    id="tabelLabel" >{props.clickedCategory.title}</Title>
                                :
                                <Title
                                    style={{ marginTop: 10, marginBottom: 20 }}
                                    id="tabelLabel" >Ürünler</Title>

                            }
                            <TextInput
                                placeholder="Ara..."
                                defaultValue={null}
                                onChange={(event) => { setQuery('/product?CategoryId=' + props.clickedCategory.categoryId + '&pageNumber=' + pageNumber + '&pageSize=10&searchString=' + event.currentTarget.value); setSearchString(event.currentTarget.value); }}></TextInput>

                            {(props.clickedCategory.categoryId == null) ?
                                null
                                :
                                <AddProduct categoryId={props.clickedCategory.categoryId} />}

                        </Group>

                    </Grid>

                    <Table highlightOnHover>
                        <thead>
                            <tr>
                                <th>Ürün İsmi</th>
                                <th>Ürün Açıklaması</th>
                                <th>Ürün Fiyatı</th>
                                <th>Aktiflik</th>
                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) =>
                                <tr key={product.id}>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <SegmentedControl
                                            defaultValue={product.activity}
                                            data={[
                                                { label: "Aktif", value: 0 },
                                                { label: "Pasif", value: 1 }
                                            ]}
                                            onChange={(event) => { updateActivity(product, event); console.log(event) }}
                                        />
                                    </td>
                                    <td>
                                        <UpdateProduct id={product.id} title={product.title}
                                            description={product.description} price={product.price}
                                            category={product.categoryId} categoryId={props.clickedCategory.categoryId} />
                                    </td>
                                    <td>
                                        <DeleteProduct id={product.id} title={product.title} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination total={10} onChange={(event) => { setQuery('/product?CategoryId=' + props.clickedCategory.categoryId + '&pageNumber=' + event + '&pageSize=10&searchString=' + searchString); setPageNumber(event) }} />
                </Paper>
            </NotificationsProvider>
        </div >
    );
}
