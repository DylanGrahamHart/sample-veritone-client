import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { ApiService } from "../../service/ApiService";

export function ItemModal({ isModalOpen, toggleModal, isEditMode = false, editItem }) {
    const { formValues, setFormValues } = useFormValues({ isEditMode, editItem });

    const handleFormUpdate = (formKey) => {
        return (event) => {
            const newFormValues = { ...formValues };
            newFormValues[formKey].value = event.target.value;

            if (newFormValues[formKey].value !== '') {
                newFormValues[formKey].hasError = false;
                newFormValues[formKey].helperText = '';
            }

            setFormValues(newFormValues);
        }
    };

    const addItemSubmit = () => {
        // Add validation
        let formHasError = false;

        if (formValues.name.value === '') {
            formValues.name.hasError = true;
            formValues.name.helperText = 'Please enter a name';
            formHasError = true;
        }

        if (formValues.description.value === '') {
            formValues.description.hasError = true;
            formValues.description.helperText = 'Please enter a description';
            formHasError = true;
        }

        if (formHasError) {
            setFormValues({ ...formValues });
            return;
        }

        if (!isEditMode) {
            ApiService.postShoppingList(formValues).then(response => {
                window.location.reload();
            });
        } else {
            const data = {
                id: editItem.id,
                name: formValues.name.value,
                description: formValues.description.value,
                qty: formValues.qty.value,
            };

            ApiService.updateShoppingListItem(data).then(response => {
                window.location.reload();
            });
        }
    };

    return (
        <Modal open={isModalOpen}>
            <div className="shopping-item-modal">
                <Card>
                    <CardHeader title="Shopping List" />
                    <CardContent>
                        <p><strong>Add your new item below</strong></p>

                        <div className="modal-input-row">
                            <TextField
                                error={formValues.name.hasError}
                                helperText={formValues.name.helperText || ''}
                                fullWidth
                                label="Name"
                                value={formValues.name.value}
                                onChange={handleFormUpdate('name')}
                            />
                        </div>

                        <div className="modal-input-row">
                            <TextField
                                error={formValues.description.hasError}
                                helperText={formValues.description.helperText || ''}
                                fullWidth
                                label="Description"
                                value={formValues.description.value}
                                onChange={handleFormUpdate('description')}
                            />
                        </div>

                        <div className="modal-input-row">
                            <FormControl fullWidth>
                                <InputLabel id="add-item-qty-label">Quantity</InputLabel>
                                <Select
                                    label="Quantity"
                                    id="add-item-qty"
                                    labelId="add-item-qty-label"
                                    value={formValues.qty.value}
                                    onChange={handleFormUpdate('qty')}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="bottom-buttons">
                            <Button variant="outlined" size="small" onClick={() => toggleModal(false)}>Cancel</Button>

                            <Button variant="contained" size="small" onClick={addItemSubmit}>
                                {!isEditMode && <>Add Item</>}
                                {isEditMode && <>Edit Item</>}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Modal>
    )
}

function useFormValues({ isEditMode, editItem }) {
    let formItem = {
        name: { value: '', hasError: false },
        description: { value: '', hasError: false },
        qty: { value: 1, hasError: false },
    };

    if (isEditMode) {
        formItem = {
            name: { value: editItem.name, hasError: false },
            description: { value: editItem.description, hasError: false },
            qty: { value: editItem.qty, hasError: false },
        };
    }

    const [formValues, setFormValues] = useState(formItem);
    return { formValues, setFormValues };
}
