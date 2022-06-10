import React, { useState, useEffect, useRef } from 'react';
import { Group, Text, useMantineTheme, Paper, TextInput, Space } from '@mantine/core';
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import AddCategory from '../../components/crud/category/AddCategory';
import UpdateCategory from '../../components/crud/category/UpdateCategory';
import DeleteCategory from '../../components/crud/category/DeleteCategory';

export default function CategoryBody(props) {

    const [treeifiedCategories, setTreeifiedCategories] = useState([])
    const [title, setTitle] = useState(null);
    const clickedCategory = useRef({ "categoryId": null, "title": null, "parentCategoryId": null });

    const theme = useMantineTheme();

    useEffect(() => {
        let categoryData = [];
        props.categories.map(category => {
            if (category.parentCategoryId === 0) {
                categoryData.push({ "id": category.id, "title": category.title, "parentCategoryId": category.parentCategoryId, "orderNo": parseFloat(category.id), "isOpened": true, "icon": MdChevronRight, "isClicked": false, "indent": 0 });
            }
            else {
                const prevIndent = (categoryData.find(x => category.parentCategoryId === x.id) != null) ? categoryData.find(x => category.parentCategoryId === x.id)["indent"] : 0;
                categoryData.push({ "id": category.id, "title": category.title, "parentCategoryId": category.parentCategoryId, "orderNo": parseFloat(category.parentCategoryId + "." + category.id), "isOpened": false, "icon": MdChevronRight, "isClicked": false, "indent": prevIndent + 1 })
            }
        }
        )
        setTreeifiedCategories(categoryData)
    }, []);

    const handleClick = (parentCategoryId, title, update) => {
        let categoryDataUpdated = [];
        treeifiedCategories.map(category => {
            const isPrevOpened = (categoryDataUpdated.find(x => category.parentCategoryId === x.id) != null) ? categoryDataUpdated.find(x => category.parentCategoryId === x.id)["isOpened"] : true;
            if (category.parentCategoryId === parentCategoryId) {
                categoryDataUpdated.push({ "id": category.id, "title": category.title, "parentCategoryId": category.parentCategoryId, "orderNo": category.orderNo, "isOpened": !category.isOpened, "icon": MdChevronRight, "isClicked": false, "indent": category.indent });
            }
            else if (category.id === parentCategoryId) {
                categoryDataUpdated.push({ "id": category.id, "title": category.title, "parentCategoryId": category.parentCategoryId, "orderNo": category.orderNo, "isOpened": category.isOpened, "icon": (category.icon === MdChevronRight) ? MdExpandMore : MdChevronRight, "paddingLeft": category.paddingLeft, "isClicked": !category.isClicked, "indent": category.indent });
            }
            else if (isPrevOpened === false) {
                categoryDataUpdated.push({ "id": category.id, "title": category.title, "parentCategoryId": category.parentCategoryId, "orderNo": category.orderNo, "isOpened": false, "icon": category.icon, "isClicked": false, "indent": category.indent })
            }
            else {
                categoryDataUpdated.push({ "id": category.id, "title": category.title, "parentCategoryId": category.parentCategoryId, "orderNo": category.orderNo, "isOpened": category.isOpened, "icon": category.icon, "isClicked": false, "indent": category.indent })
            }
        })
        setTreeifiedCategories(categoryDataUpdated)
        clickedCategory.current = { "categoryId": parentCategoryId, "title": title, "parentCategoryId": update }
    }

    return (
        <div>
            <Group >


                <div style={{ width: 250, top: 0, bottom: 0 }}>
                    {treeifiedCategories.filter(category => category.isOpened === true).sort((a, b) => a.orderNo > b.orderNo ? 1 : -1).map((category) => (
                        <Group>
                            <Text key={"cat-" + category.id}
                                onClick={() => handleClick(category.id, category.title, category.parentCategoryId)}
                                sx={() => ({
                                    textAlign: 'left',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    paddingLeft: category.indent * 10
                                })}
                            >
                                <category.icon />
                                {category.title}

                            </Text>
                        </Group>

                    ))
                    }
                </div>

                <Paper p={40}>
                    <TextInput
                        label="Kategori Başlığı"
                        required
                        defaultValue={clickedCategory.current.title}
                        //value={title}
                        padding={theme.spacing.lg}
                        onChange={event => setTitle(event.currentTarget.value)}
                    />
                    <Space h="lg" />

                    <Group position='right'>
                        <AddCategory clickedCategory={clickedCategory.current} title={title} />
                        <UpdateCategory title={title} clickedCategory={clickedCategory.current} />
                        <DeleteCategory clickedCategory={clickedCategory.current} categories={props.categories} />
                    </Group>

                </Paper>

            </Group>
        </div >
    );

}