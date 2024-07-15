import React, {useEffect, useState} from 'react';
import {Fab, Grid} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/de';
import PieChart from "../components/PieChart";
import Sidebar from "../components/Sidebar";
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import UserList from "../components/UserList";
import AddIcon from "@mui/icons-material/Add";
import AddUserForm from "../components/AddUserForm";
import axios from "axios";
import dayjs from "dayjs";

export default function Chart() {
    const DATE_FORMAT = 'YYYY-MM-DD';

    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [users, setUsers] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [countries, setCountries] = useState([]);
    const [countOfChangedUsers, setCountOfChangedUsers] = useState(0);
    const [dateToErrorText, setDateToErrorText] = useState('');
    const [dateFromErrorText, setDateFromErrorText] = useState('');

    useEffect(() => {
        let urlSearchParams = new URLSearchParams({});

        if (dateFrom !== null) {
            urlSearchParams.append('dateFrom', dateFrom);
        }

        if (dateTo !== null) {
            urlSearchParams.append('dateTo', dateTo);
        }

        axios.get('/get-chart-data?' + urlSearchParams.toString())
            .then((response) => {
                setChartData(response.data?.counts || []);
                setUsers(response.data?.users || []);
            })
    }, [dateFrom, dateTo, countOfChangedUsers]);

    useEffect(() => {
        axios.get('/countries')
            .then((response) => {
                setCountries(response.data);
            })
    }, []);

    useEffect(() => {
        const listener = () => {setCountOfChangedUsers(countOfChangedUsers + 1)};

        addEventListener('userListChanged', listener);

        return () => {
            removeEventListener('userListChanged', listener);
        }
    });

    function changeDateFrom(value) {
        if (value.isValid()) {
            setDateFrom(value.format(DATE_FORMAT));
            setDateFromErrorText('');
        } else {
            setDateFrom(null);
            setDateFromErrorText('Invalid Date from value');
        }
    }

    function changeDateTo(value) {
        if (value.isValid()) {
            setDateTo(value.format(DATE_FORMAT));
            setDateToErrorText('');
        } else {
            setDateTo(null);
            setDateToErrorText('Invalid Date to value')
        }
    }

    function handleOpenAddForm() {
        setOpenAddForm(!openAddForm);
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
                                <DatePicker
                                    label="Date from"
                                    onChange={(value) => changeDateFrom(value)}
                                    closeOnSelect={true}
                                    slotProps={
                                        {
                                            textField: {
                                                helperText: dateFromErrorText,
                                            }
                                        }
                                    }
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <DatePicker
                                    label="Date to"
                                    onChange={(value) => changeDateTo(value)}
                                    minDate={dateFrom != null ? dayjs(dateFrom) : null}
                                    closeOnSelect={true}
                                    slotProps={
                                        {
                                            textField: {
                                                helperText: dateToErrorText,
                                            }
                                        }
                                    }
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <PieChart chartData={chartData}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <UserList users={users} countries={countries} />
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
                </Box>
            </Box>
        </>
    )
}