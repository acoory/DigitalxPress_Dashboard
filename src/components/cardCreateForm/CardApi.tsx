export const fetchAllProducts = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/product');
    const data = await response.json();
    return data;
};

export const fetchCreateCardProduct = async (cardId: any, productId: any, categoryId?: any) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/card-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cardId: cardId,
            categoryId: categoryId ? categoryId : null,
            productId: productId
        })
    });
    const data = await response.json();
    return data;
};
