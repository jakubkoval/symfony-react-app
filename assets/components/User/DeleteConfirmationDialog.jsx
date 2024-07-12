import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import axios from "axios";

export default function DeleteConfirmationDialog({open, handleOpenConfirmationDialog, userIdToDelete}) {
    function handleClose() {
        handleOpenConfirmationDialog();
    }

    function handleAgree() {
        axios.delete(`/user/delete/${userIdToDelete}`)
            .then((response) => {
                handleOpenConfirmationDialog();
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
