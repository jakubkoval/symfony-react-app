import React, {useState, useContext} from 'react';
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
import SnackBarContext from "./Snackbars/SnackBarContext";
import * as validationConstants from "../config/userFormValidationMessages";

export default function AddUserForm({open, countries, handleOpenEditForm, dataToEdit}) {
    const snackBarContext = useContext(SnackBarContext);

    const [isNameFilled, setIsNameFilled] = useState(false);
    const [isLastNameFilled, setIsLastNameFilled] = useState(false);
    const [dateOfBirthError, setDateOfBirthError] = useState('');

    const handleNameChange = (e) => {
        if (e.target.validity.valid) {
            setIsNameFilled(false);
        } else {
            setIsNameFilled(true);
        }
    };

    const handleLastNameChange = (e) => {
        if (e.target.validity.valid) {
            setIsLastNameFilled(false);
        } else {
            setIsLastNameFilled(true);
        }
    };

    const dateOfBirthErrorMessage = React.useMemo(() => {
        switch (dateOfBirthError) {
            case 'maxDate':
            case 'minDate':
            case 'invalidDate': {
                return validationConstants.INVALID_DATE_OF_BIRTH_VALIDATION_MESSAGE;
            }

            default: {
                return '';
            }
        }
    }, [dateOfBirthError]);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        axios.post("/user/edit/" + formJson.id, formJson)
            .then(function (response) {
                handleOpenEditForm();
                snackBarContext.setSnackData('User has been changed.');
                window.dispatchEvent(new Event('userListChanged'));
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
                            onChange={handleNameChange}
                            error={isNameFilled}
                            helperText={isNameFilled ? validationConstants.NAME_VALIDATION_MESSAGE : ""}
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
                            onChange={handleLastNameChange}
                            error={isLastNameFilled}
                            helperText={isLastNameFilled ? validationConstants.LAST_NAME_VALIDATION_MESSAGE : ""}
                            fullWidth
                            defaultValue={dataToEdit.last_name}
                        />
                    </FormControl>
                    <FormControl fullWidth required>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <DatePicker
                                label="Date of Birth"
                                name="date_of_birth"
                                disableFuture={true}
                                onError={(error) => {setDateOfBirthError(error)}}
                                slotProps={
                                    {
                                        textField: {
                                            fullWidth: true,
                                            required: true,
                                            margin: 'dense',
                                            helperText: dateOfBirthErrorMessage
                                        }
                                    }
                                }
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
                            label="Country"
                            margin="dense"
                            defaultValue={dataToEdit.country_id}
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
