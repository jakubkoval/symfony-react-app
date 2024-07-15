import React, {useEffect, useState} from 'react';
import {Fab, Grid} from "@mui/material";
import 'dayjs/locale/de';
import PieChart from "../components/PieChart";
import Sidebar from "../components/Sidebar";
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import UserList from "../components/UserList";
import AddIcon from "@mui/icons-material/Add";
import AddUserForm from "../components/AddUserForm";
import axios from "axios";
import DefaultDatepicker from "../components/DatePicker/DefaultDatepicker";

export default function Chart() {
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [users, setUsers] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [countries, setCountries] = useState([]);
    const [countOfChangedUsers, setCountOfChangedUsers] = useState(0);

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

    function handleOpenAddForm() {
        setOpenAddForm(!openAddForm);
    }

    function changeDateFrom(value) {
        setDateFrom(value);
    }

    function changeDateTo(value) {
        setDateTo(value);
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
                            <DefaultDatepicker label="Date from" handleDate={changeDateFrom} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <DefaultDatepicker label="Date To" handleDate={changeDateTo} />
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