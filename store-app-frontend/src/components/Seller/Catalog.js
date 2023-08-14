import { useEffect, useState } from "react";
import ProductList from "../Product/ProductList";
import sellerService from "../../services/SellerService";

const Catalog =()=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        sellerService.getProducts().then(
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