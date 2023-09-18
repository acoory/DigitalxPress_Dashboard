import {fetchCreateCard} from "./AddProcutInputt";
import CardInfoPart from "./CardInfoPart";
import CategoryPart from "./CategoryPart";
import ProductPart from "./ProductPart";
import React from "react";

export const handleCreateAllCardInfo = async (cardInfo: { cardName: string; cardDescription: string; }, categoryList: any, categoryListProduct: any) => {
    try {
        const response = await fetchCreateCard(cardInfo.cardName, cardInfo.cardDescription);
        if (response.status === 200) {
            console.log(response);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
};

export const getStepContent = (step: number) => {
    switch (step) {
        case 0:
            return <CardInfoPart />;
        case 1:
            return <CategoryPart />;
        case 2:
            return <ProductPart />;
        default:
            throw new Error('Unknown step');
    }
}

export const handleCardInfoChange = (event: { target: { name: any; value: any; }; }, cardInfo: any, setCardInfo: (arg0: any) => void) => {
    if (event.target && event.target.name) {
        setCardInfo({
            ...cardInfo,
            [event.target.name]: event.target.value
        });
    }
};

