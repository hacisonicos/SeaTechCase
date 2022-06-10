import { createStyles, Group, Navbar, Title } from '@mantine/core';
import React from 'react';
import { IoApertureOutline } from "react-icons/io5";



const useStyles = createStyles((theme, _params, getRef) => {

    const icon = getRef('icon');
    return {
        navbar: {
            backgroundColor: theme.colors[theme.primaryColor][6],
        },
        version: {
            backgroundColor: theme.colors[theme.primaryColor][7],
            color: theme.white,
            fontWeight: 700,
        },
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.colors[theme.primaryColor][7]}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colors[theme.primaryColor][5],
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.colors[theme.primaryColor][7],
                [`& .${icon}`]: {
                    opacity: 0.9,
                },
            },
        },
    };
});

function NavbarSection(props) {

    const { classes, cx } = useStyles();
    const path = window.location.pathname;

    const navElements = props.navElements.map((item) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: path === "/" + item.link })}
            href={item.link}
            key={item.label}

        >
            <item.icon className={classes.linkIcon} />
            <span>{item.label}</span>
        </a>
    ));
    return (

        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <IoApertureOutline style={{ color: "white" }} size={250} />
                    <Title style={{ color: "white" }}>SeaTech Case</Title>
                </Group>
                {navElements}
            </Navbar.Section>
        </Navbar>
    );
}

export default NavbarSection;