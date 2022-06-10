import { useRoutes } from "react-router-dom";
import CategoryManager from '../navigation/Category/CategoryManager';
import ProductManager from '../navigation/Product/ProductManager';
export default function Router() {
    let element = useRoutes([
        { path: '/categorymanager', element: < CategoryManager /> },
        { path: '/productmanager', element: < ProductManager /> },
    ]);
    return element;
}