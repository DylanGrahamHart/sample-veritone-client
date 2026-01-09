import axios from "axios";

const ENDPOINTS = {
    DEV_DASHBOARD: '/api/dev-dashboard',
    SHOPPING_LIST: '/api/shopping-list',
    SHOPPING_LIST_ITEM_DELETE: '/api/shopping-list/delete/__ITEM_ID__',
    SHOPPING_LIST_ITEM_UPDATE: '/api/shopping-list/update',
};

function getDevInfo() {
    return axios.get(ENDPOINTS.DEV_DASHBOARD);
}

function getShoppingList() {
    return axios.get(ENDPOINTS.SHOPPING_LIST);
}

function postShoppingList(item) {
    return axios.post(ENDPOINTS.SHOPPING_LIST, item);
}

function deleteShoppingListItem(itemId) {
    const url = ENDPOINTS.SHOPPING_LIST_ITEM_DELETE.replace('__ITEM_ID__', itemId);
    return axios.get(url);
}

function updateShoppingListItem(newItem) {
    return axios.post(ENDPOINTS.SHOPPING_LIST_ITEM_UPDATE, newItem);
}

export const ApiService = {
    getDevInfo,
    getShoppingList,
    postShoppingList,
    deleteShoppingListItem,
    updateShoppingListItem
};


