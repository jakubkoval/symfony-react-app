import React, {useState} from 'react';
import Paper from "@mui/material/Paper";
import {Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserForm from "./EditUserForm";
import axios from "axios";
import DeleteConfirmationDialog from "./User/DeleteConfirmationDialog";

export default function UserList({users, countries}) {

    const [openEditForm, setOpenEditForm] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [userDataToEdit, setUserDataToEdit] = useState({});
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const hasUsers = users.length > 0;

    const handleEditClick = (event, id) => {
        axios.get(`/user-data/${id}`)
            .then((response) => {
                setUserDataToEdit(response.data);

                setOpenEditForm(!openEditForm);
            })
            .catch(() => {
                //show alert or something
            })
        event.stopPropagation();
    }

    function handleRemoveClick(event, id) {
        setOpenConfirmationDialog(!openConfirmationDialog);
        setUserIdToDelete(id);
        event.stopPropagation();
    }

    function handleOpenConfirmationDialog() {
        setOpenConfirmationDialog(!open);
    }

    function handleOpenEditForm() {
        setOpenEditForm(!openEditForm);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell align="right"><b>Name</b></TableCell>
                            <TableCell align="right"><b>Date of birth</b></TableCell>
                            <TableCell align="right"><b>Country</b></TableCell>
                            <TableCell align="right"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        hasUsers
                            ?
                            <TableBody>
                                {users.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        onClick={() => {
                                            alert(row.id)
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.date_of_birth}</TableCell>
                                        <TableCell align="right">{row.country}</TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup variant="text" aria-label="Basic button group">
                                                <Button onClick={(event) => handleEditClick(event, row.id)}><EditIcon/></Button>
                                                <Button onClick={(event) => handleRemoveClick(event, row.id)}><DeleteIcon/></Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            :
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={5} align='center'>
                                        No Users Found
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                    }
                </Table>
            </TableContainer>
            <EditUserForm
                open={openEditForm}
                countries={countries}
                dataToEdit={userDataToEdit}
                handleOpenEditForm={handleOpenEditForm}
            />
            <DeleteConfirmationDialog
                open={openConfirmationDialog}
                handleOpenConfirmationDialog={handleOpenConfirmationDialog}
                userIdToDelete={userIdToDelete}
            />
        </>
    );
}
