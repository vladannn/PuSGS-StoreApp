import { useEffect, useState } from "react";
import ProductList from "../Product/ProductList";
import buyerService from "../../services/BuyerService";

const Catalog =()=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        buyerService.getProducts().then(
            (res)=>{
                setProducts(res);
        }
        )
    }, [])

    return (
        <>
        <ProductList products={products}></ProductList>
        </>
    )
}

export default Catalog;