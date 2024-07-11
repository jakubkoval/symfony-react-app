import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Input, InputLabel, MenuItem,
    Select,
    TextField
} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";

export default function AddUserForm({open, countries, handleOpenEditForm, dataToEdit}) {
    const [countryId, setCountryId] = useState('');

    function handleChangeSelect(event) {
        setCountryId(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
// console.log(formJson);return;
        axios.post("/user/edit/" + formJson.id, formJson)
            .then(function (response) {
                console.log(response);
                handleOpenEditForm();
                window.dispatchEvent(new Event('userEdited'));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleOpenEditForm}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        handleSubmit(event);
                    }
                }}
            >
                <DialogTitle>Edit User Form</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <TextField
                            required
                            margin="dense"
                            id="firstName"
                            name="first_name"
                            label="First Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={dataToEdit.first_name}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            required
                            margin="dense"
                            id="lastName"
                            name="last_name"
                            label="Last Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={dataToEdit.last_name}
                        />
                    </FormControl>
                    <FormControl fullWidth required>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <DatePicker
                                label="Date of Birth"
                                name="date_of_birth"
                                slotProps={{textField: {fullWidth: true, required: true, margin: 'dense'}}}
                                defaultValue={dayjs(dataToEdit.date_of_birth)}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" margin="dense" required>
                        <InputLabel id="country-id-label">Country</InputLabel>
                        <Select
                            labelId="country-id-label"
                            id="country-select"
                            name="country_id"
                            // value={countryId}
                            label="Country"
                            margin="dense"
                            defaultValue={dataToEdit.country_id}
                            onChange={handleChangeSelect}
                        >
                            {countries.map((data) => {
                                return <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Input
                        id="id"
                        name="id"
                        type="hidden"
                        defaultValue={dataToEdit.id}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpenEditForm}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
