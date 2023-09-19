import {fetchCreateCard, fetchCreateCategory} from "./AddProcutInputt";
import CardInfoPart from "./CardInfoPart";
import CategoryPart from "./CategoryPart";
import ProductPart from "./ProductPart";
import React from "react";

export const handleCreateAllCardInfo = async (cardInfo: { cardName: string; cardDescription: string; }, categoryList: any, categoryListProduct: any) => {
    try {
        const createdCardResponse = await fetchCreateCard(cardInfo.cardName, cardInfo.cardDescription);
        if (createdCardResponse.status === 200) {
            console.log(createdCardResponse);

            categoryList.map(async (categoryName: any) => {
                await fetchCreateCategory(categoryName).then((response: any) => {
                    if (response.status === 201) {
                        categoryListProduct.map(async (product: any) => {
                            console.log(product)
                        });
                    }
                })

                    .catch((error: any) => {
                        console.error(error);
                    });

            });
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

// CategoryService.js
export const handleAddCategory = (categoryName: any, categoryList: any, setCategoryList: (arg0: any[]) => void, setCategoryName: (arg0: string) => void) => {
    setCategoryList([...categoryList, categoryName]);
    setCategoryName('');
};

export const handleDeleteCategory = (index: any, categoryList: any, setCategoryList: (arg0: any[]) => void) => {
    const newList = [...categoryList];
    newList.splice(index, 1);
    setCategoryList(newList);
};

export const handleCategoryNameChange = (event: { target: { value: any; }; }, setCategoryName: (arg0: any) => void) => {
    setCategoryName(event.target.value);
};


