import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { ApiService } from "../../service/ApiService";
import { Page } from "../../component/Page";
import { Header } from "../../component/Header";
import { ShoppingListTable } from "./ShoppingListTable";
import { ItemModal } from "./ItemModal";

export function Home() {
    const { isLoading, hasItems, shoppingListItems } = useShoppingListItems();
    const { isAddModalOpen, toggleAddModal } = useAddItemModal();

    return (
        <>
            <Header />

            <Page>
                {isLoading && (
                    <div id="loading-spinner-overlay"><CircularProgress size="60px" /></div>
                )}

                {!isLoading && (
                    <div id="shopping-list">
                        <div className="inner-wrapper">
                            <ItemModal
                                isModalOpen={isAddModalOpen}
                                toggleModal={toggleAddModal}
                            />

                            {!hasItems && (
                                <div className="shopping-list-empty">
                                    <p>Your shopping list is empty</p>
                                    <Button variant="contained" onClick={toggleAddModal}>Add Your First Item</Button>
                                </div>
                            )}
                            {hasItems && (
                                <ShoppingListTable
                                    isAddModalOpen={isAddModalOpen}
                                    toggleAddModal={toggleAddModal}
                                    shoppingListItems={shoppingListItems}
                                />
                            )}
                        </div>
                    </div>
                )}
            </Page>
        </>
    );
}

export function useAddItemModal() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const toggleAddModal = (isAddModalOpenLocal = false) => {
        setIsAddModalOpen(!isAddModalOpen || isAddModalOpenLocal);
    };

    return { isAddModalOpen, toggleAddModal };
}

function useShoppingListItems() {
    const [isLoading, setIsLoading] = useState(true);
    const [shoppingListItems, setShoppingListItems] = useState();
    const hasItems = shoppingListItems && shoppingListItems.length > 0;

    useEffect(() => {
        ApiService.getShoppingList().then(response => {
            setTimeout(() => {
                setShoppingListItems(response.data);
                setIsLoading(false);
            }, 400);
        });
    }, []);

    return { isLoading, hasItems, shoppingListItems };
}



