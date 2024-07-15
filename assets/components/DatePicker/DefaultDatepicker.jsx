import React, {useState} from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

export default function DefaultDatepicker({label, handleDate}) {
    const DATE_FORMAT = 'YYYY-MM-DD';

    const [dateError, setDateError] = useState('');
    const [cleared, setCleared] = React.useState(false);

    const dateErrorMessage = React.useMemo(() => {
        switch (dateError) {
            case 'maxDate':
            case 'minDate':
            case 'invalidDate': {
                return 'Invalid date format';
            }

            default: {
                return '';
            }
        }
    }, [dateError]);

    React.useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [cleared]);

    function changeDateFrom(value) {
        if (value !== null && value.isValid()) {
            handleDate(value.format(DATE_FORMAT));
        } else {
            handleDate(null);
        }
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <DatePicker
                    label={label}
                    onChange={(value) => changeDateFrom(value)}
                    closeOnSelect={true}
                    onError={(error) => {setDateError(error)}}
                    slotProps={
                        {
                            textField: {
                                helperText: dateErrorMessage,
                            },
                            field: { clearable: true, onClear: () => setCleared(true) }
                        }
                    }
                />
            </LocalizationProvider>
        </>
    );
}
