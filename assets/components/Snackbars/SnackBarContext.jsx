import React, {createContext, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";

const defaultValue = {
    message: '',
    open: false,
    setSnackData: () => {}
}

const SnackBarContext = createContext(defaultValue);

export const SnackBarContextProvider = ({children}) => {
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false);

    function handleClose() {
        setOpen(!open);
    }

    const contextValue = {
        message: message,
        open: open,
        setSnackData: (message) => {
            setMessage(message);
            setOpen(true);
        }
    }

    return (
        <>
            <SnackBarContext.Provider value={contextValue}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
                {children}
            </SnackBarContext.Provider>
        </>
    );
}

export default SnackBarContext;