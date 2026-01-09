import { useState, useEffect } from "react";
import {
    Card, CardHeader, CardContent, Modal, Button, Table,
    TableBody, TableCell, TableContainer, Checkbox, TableRow, Paper
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { ApiService } from "../../service/ApiService";
import { ItemModal } from "./ItemModal";

export function ShoppingListTable({ toggleAddModal, shoppingListItems }) {
    const [items, setItems] = useState([]);
    const [deleteRowTarget, setDeleteRowTarget] = useState();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState();
    const [editRowTarget, setEditRowTarget] = useState();
    const [isEditModalOpen, setIsEditModalOpen] = useState();

    const editItem = items.find(element => element.id === editRowTarget);

    useEffect(() => {
        const stateItems = [...shoppingListItems.map(item => {
            return { checked: false, ...item };
        })];

        setItems(stateItems);
    }, []);

    const toggleRowChecked = (rowIndex) => {
        return () => {
            const newItems = [...shoppingListItems];
            newItems[rowIndex].checked = !newItems[rowIndex].checked;
            setItems(newItems);
        };
    };

    const toggleDeleteModal = (itemId = -1) => {
        return () => {
            setDeleteRowTarget(itemId);
            setIsDeleteModalOpen(!isDeleteModalOpen);
        };
    };

    const toggleEditModal = (itemId = -1) => {
        return () => {
            setEditRowTarget(itemId);
            setIsEditModalOpen(!isEditModalOpen);
        };
    };

    const deleteItemSubmit = () => {
        const uniqueItemIds = new Set([]);
        if (deleteRowTarget !== -1) {
            uniqueItemIds.add(deleteRowTarget);
        }

        items.forEach(element => {
            if (element.checked) {
                uniqueItemIds.add(element.id);
            }
        });
        const itemIds = [...uniqueItemIds];

        Promise.all([...itemIds.map(id => ApiService.deleteShoppingListItem(id))]).then(response => {
            window.location.reload();
        });
    };

    return (
        <>
            <div className="not-empty-header">
                <h2>Your Items</h2>
                <Button variant="contained" size="small" onClick={toggleAddModal}>Add Item</Button>
            </div>

            <Modal open={isDeleteModalOpen}>
                <div className="shopping-item-modal">
                    <Card>
                        <CardHeader title="Delete Item?" />
                        <CardContent>
                            <p>Are you sure you want to delete all selected items? This action cannot be undone</p>

                            <div className="bottom-buttons">
                                <Button variant="outlined" size="small" onClick={toggleDeleteModal()}>Cancel</Button>
                                <Button variant="contained" size="small" onClick={deleteItemSubmit}>Delete</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Modal>

            {isEditModalOpen && (
                <ItemModal
                    isModalOpen={isEditModalOpen}
                    toggleModal={toggleEditModal(editItem.id)}
                    isEditMode={true}
                    editItem={editItem}
                />
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {shoppingListItems.map((item, rowIndex) => (
                            <TableRow key={item.name}>
                                <TableCell align="center">
                                    <Checkbox checked={item.checked} onClick={toggleRowChecked(rowIndex)} />
                                </TableCell>
                                <TableCell align="left">
                                    <div className={item.checked ? 'strike-row' : ''}>
                                        <strong>{item.name} ({item.qty})</strong>
                                        <p>{item.description}</p>
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={toggleEditModal(item.id)}>
                                        <EditIcon />
                                    </Button>
                                    <Button onClick={toggleDeleteModal(item.id)}>
                                        <DeleteOutlineIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}


