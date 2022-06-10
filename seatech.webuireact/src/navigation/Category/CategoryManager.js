import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Center, Loader } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import CategoryBody from './CategoryBody';

const api = axios.create({
    baseURL: 'https://localhost:7121/api/category'
})

export default function CategoryManager() {

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
            <NotificationsProvider>
                {(isLoading === false) ? <CategoryBody categories={categories} /> : <Center><Loader size="xl" /></Center>}
            </NotificationsProvider>
        </div>
    );

}
