import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel, MenuItem,
    Select,
    TextField
} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";

export default function AddUserForm({open, countries, handleOpenAddForm}) {
    const [countryId, setCountryId] = useState('');

    function handleChangeSelect(event) {
        setCountryId(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        axios.post('/user/add', formJson)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleOpenAddForm}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        handleSubmit(event);
                    }
                }}
            >
                <DialogTitle>Add User Form</DialogTitle>
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
                        />
                    </FormControl>
                    <FormControl fullWidth required>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <DatePicker
                                label="Date of Birth"
                                name="date_of_birth"
                                slotProps={{textField: {fullWidth: true, required: true, margin: 'dense'}}}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" margin="dense" required>
                        <InputLabel id="country-id-label">Country</InputLabel>
                        <Select
                            labelId="country-id-label"
                            id="country-select"
                            name="country_id"
                            value={countryId}
                            label="Country"
                            margin="dense"
                            onChange={handleChangeSelect}
                        >
                            {countries.map((data) => {
                                return <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpenAddForm}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
