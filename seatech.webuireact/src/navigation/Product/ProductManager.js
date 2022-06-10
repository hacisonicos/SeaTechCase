import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader, Center } from '@mantine/core';
import ProductBody from '../Product/ProductBody';



const api = axios.create({
    baseURL: 'https://localhost:7121/api/category'
})

export default function ProductManager() {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function fetchData() {
            try {
                api.get('/').then(response => { setCategories(response.data); setIsLoading(false); });
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();

    }, []);

    return (
        <div>
            {(isLoading === false) ? <ProductBody categories={categories} /> : <Center><Loader size="xl" /></Center>}
        </div>
    );

}
