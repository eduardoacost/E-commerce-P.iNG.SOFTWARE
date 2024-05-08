import React, { useContext } from "react";
import "./Preview.scss";
import { itemContext } from "../../Context/itemsContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../../Components/Breadcrums/Breadcrum";

const PreviwProd = () => {
    const { products } = useContext(itemContext);
    const { Productid } = useParams();
    const product = products.find((e) => e._id === Productid);

    return (
        <div className="preview">
            <Breadcrum selectedProductId={Productid} />
        </div>
    );
};

export default PreviwProd;
