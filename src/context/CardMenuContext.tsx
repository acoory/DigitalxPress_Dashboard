import React, {createContext, PropsWithChildren, useState} from "react";

export const CardMenuContext = createContext<any>(null);

export const CardMenuConsumer = ({ children }: PropsWithChildren) => {

    const [categoryList, setCategoryList] = useState([]);
    const [product, setProduct] = useState([]);
    const [cardInfo, setCardInfo] = React.useState({
        cardName: '',
        cardDescription: ''
    });

    return (
        <CardMenuContext.Provider value={{ categoryList, setCategoryList, product, setProduct, cardInfo, setCardInfo }}>
            {children}
        </CardMenuContext.Provider>
    );
}
