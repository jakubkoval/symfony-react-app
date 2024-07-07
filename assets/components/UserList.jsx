import React from 'react';
import Paper from "@mui/material/Paper";
import {Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserForm from "./EditUserForm";

export default function UserList({users, handleOpenEditForm}) {
    const handleEditClick = (event, id) => {
        handleOpenEditForm(id);
        console.log(event.currentTarget);
        event.stopPropagation();
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
                                        <Button><EditIcon onClick={(event) => handleEditClick(event, row.id)}/></Button>
                                        <Button><DeleteIcon/></Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
