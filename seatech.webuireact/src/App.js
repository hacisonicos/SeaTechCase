import React from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import { MdOutlineDns, MdApps } from "react-icons/md";
import Navbar from './components/Navbar';
import Route from './components/Router';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function App() {
    const navElements = [
        { link: 'categorymanager', label: 'Kategori Yönetimi', icon: MdOutlineDns },
        { link: 'productmanager', label: 'Ürün Yönetimi', icon: MdApps },
    ];
    const theme = useMantineTheme();
    return (

        <AppShell
            padding="md"
            navbar={<Navbar navElements={navElements} />}
            style={{ color: theme.colors[theme.primaryColor][5] }}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <Router>
                <Route />
            </Router>
        </AppShell>

    );
}
