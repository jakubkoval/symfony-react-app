import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import axios from "axios";
import SnackBarContext from "../Snackbars/SnackBarContext";

export default function DeleteConfirmationDialog({open, handleOpenConfirmationDialog, userIdToDelete}) {

    const snackBarContext = useContext(SnackBarContext);

    function handleClose() {
        handleOpenConfirmationDialog();
    }

    function handleAgree() {
        axios.delete(`/user/delete/${userIdToDelete}`)
            .then((response) => {
                handleOpenConfirmationDialog();
                snackBarContext.setSnackData('User has been deleted.');
                window.dispatchEvent(new Event('userListChanged'));
            })
            .catch(() => {
                //show alert or something
            })
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete user?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
