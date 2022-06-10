import React, { useState, useEffect } from 'react';
import { Group, Text, Container } from '@mantine/core';
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import ProductTable from '../Product/ProductTable';

export default function ProductBody(props) {

    const [treeifiedCategories, setTreeifiedCategories] = useState([])
    const [clickedCategory, setClickedCategory] = useState({ "categoryId": null, "title": null });

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

    const handleClick = (parentCategoryId, title) => {
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

        //console.log(categoryDataUpdated.find(x => x.icon === MdExpandMore))
        if (typeof categoryDataUpdated.find(x => x.icon === MdExpandMore) === "undefined") {
            setClickedCategory({ "categoryId": null, "title": null })
        }
        else {
            setClickedCategory({ "categoryId": parentCategoryId, "title": title })
        }



    }

    return (
        <div>


            <Group>
                <div style={{ width: 250, top: 0, bottom: 0 }}>
                    {treeifiedCategories.filter(category => category.isOpened === true).sort((a, b) => a.orderNo > b.orderNo ? 1 : -1).map((category) => (
                        <Group>
                            <Text key={"cat-" + category.id}
                                onClick={() => handleClick(category.id, category.title)}
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


                <ProductTable clickedCategory={clickedCategory} />
            </Group>

        </div >
    );

}