import React, {useEffect, useState} from 'react';
import {Fab, Grid} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/de';
import PieChart from "../components/PieChart";
import Sidebar from "../components/SidebarNew";
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import UserList from "../components/UserList";
import AddIcon from "@mui/icons-material/Add";
import AddUserForm from "../components/AddUserForm";
import axios from "axios";
import EditUserForm from "../components/EditUserForm";

export default function Chart() {
    const DATE_FORMAT = 'YYYY-MM-DD';

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [chartData, setChartData] = useState([]);
    const [users, setUsers] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [countries, setCountries] = useState([]);
    const [userDataToEdit, setUserDataToEdit] = useState({})

    let urlParams = new URLSearchParams({});
    if (dateFrom !== '' && dateTo !== '') {
        urlParams = new URLSearchParams({
            dateFrom: dateFrom,
            dateTo: dateTo,
        });
    }

    useEffect(() => {
        fetch('/get-chart-data?' + urlParams.toString(), {method: 'GET'})
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setChartData(data.counts);
                setUsers(data.users);
            })
    }, [dateFrom, dateTo]);

    useEffect(() => {
        axios.get('/countries')
            .then((response) => {
                setCountries(response.data);
            })
    }, []);

    function changeDateFrom(value) {
        setDateFrom(value)
    }

    function changeDateTo(value) {
        setDateTo(value);
    }

    function handleOpenAddForm() {
        setOpenAddForm(!openAddForm);
    }

    function handleOpenEditForm(id) {

        axios.get(`/user-data/${id}`)
            .then((response) => {
                console.log(response.data);
                setUserDataToEdit(response.data);

                setOpenEditForm(!openEditForm);
            })
            .catch(() => {
                //show alert or something
            })
    }

    return (
        <>
            <CssBaseline/>
            <Box sx={{display: 'flex'}}>
                <Sidebar/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <h2>Chart</h2>
                    <Grid container spacing={1} rowSpacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <DatePicker label="Date from"
                                            onChange={(value) => changeDateFrom(value.format(DATE_FORMAT))}/>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <DatePicker label="Date to"
                                            onChange={(value) => changeDateTo(value.format(DATE_FORMAT))}/>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <PieChart chartData={chartData}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <UserList users={users} handleOpenEditForm={handleOpenEditForm}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Fab className="fab" size="medium" color="secondary" aria-label="add"
                                 sx={{position: 'fixed'}}
                                 onClick={handleOpenAddForm}
                            >
                                <AddIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                    <AddUserForm
                        open={openAddForm}
                        countries={countries}
                        handleOpenAddForm={handleOpenAddForm}
                    />
                    <EditUserForm
                        open={openEditForm}
                        countries={countries}
                        handleOpenEditForm={handleOpenEditForm}
                        dataToEdit={userDataToEdit}
                    />
                </Box>
            </Box>
        </>
    )
}