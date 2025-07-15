import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useOutletContext } from "react-router-dom";
import { useTheme, Box, styled } from '@mui/system'
import Pagination from '@material-ui/lab/Pagination';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
    Button,
    Tooltip,
} from '@mui/material'
import { yearopt } from 'app/services/CommonObject';
import { Breadcrumb, SimpleCard } from 'app/components'
import { H3 } from 'app/components/Typography'
import { Card } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
// import XlsxFileFormat from "../../image/xlsx-file-format-extension.svg"
// import pdf from "../../image/pdf.svg"
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import zip from "../../image/zip.svg"
import xlsxgreen from "../../image/xlsxgreen.svg"
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import { DatePicker } from '@mui/lab'
import IconCloudSvg from '../../image/cloudcomputing.svg';
import { Menu, MenuItem } from '@mui/material'
import Slide from '@mui/material/Slide'
import sheet from "../../image/sheets.svg"
import useAuth from 'app/hooks/useAuth'
/*import DialogTitle from '@mui/material/DialogTitle'*/
import { getDataFromApi, postDataFromApi } from '../../services/CommonService';
import { getAllCompanyDetails, uploadFileCommercialProduct, uploadFileFinance, uploadFileTechnology, uploadFilepeople, uploadFileSocialmedia, searchplmnt, reportsSearch, getonboardcmp, createValuation } from '../../services/api';
/* import preval from "babel-plugin-preval";
import fs from 'fs-react'; */
import AlertMessage from '../commoncomponent/AlertMessage'
import $ from 'jquery'
import testFile from '../../image/Format reference.xlsx';
import { useParams } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { valuation } from '../../services/api';


const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))
const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))
const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))
const CardHeader = styled('div')(() => ({
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
}))
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',

    background: '#0E0E23',

}))
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const Valuation = () => {
    var companyLabel = ''
    let { companyId } = useParams();
    const [formdata, setFormData] = useState({
        companyId: '',
        year: new Date(),
        quarter: null,
        investment: '',
        dilution: '',
        currentValuation: '',
        receivedDividend: '',
        ownership: '',
    })
    const navigate = useNavigate()
    const [dateopen, setdateOpen] = useState(false);
    const [quarterValidate, setQuarterValidate] = useState(false)
    const [alert, setalert] = useState(false)
    const [currency] = useOutletContext();
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const quarteropt = [
        { id: 1, label: "Q1" },
        { id: 2, label: "Q2" },
        { id: 3, label: "Q3" },
        { id: 4, label: "Q4" },
    ]
    const handleDateChange = (date) => {
        const year = new Date(date)
        setFormData((formData) => ({
            ...formData,
            year: year
        }));
    }
    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));
    }
    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.label
        } else {
            var value = ""
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }));
    }
    function getSelectedItem(id, data = [], multiple = '', label = '') {
        const item = data.find((opt) => {
            if (label) {
                if (opt.label == id) return opt
            } else {
                if (opt.id == id) return opt
            }
        })

        if (multiple) {
            return item || []
        } else {
            return item || null
        }
    }
    const handleSubmit = async (e) => {
        // var formData = new FormData();
        // formData.append("companyId", companyId);
        // formData.append("year", formdata.year);
        // formData.append("quarter", formdata.quarter);
        // formData.append("investment", formdata.investment);
        // formData.append("divestment", formdata.dilution);
        // formData.append("currentValuation", formdata.currentValuation);
        // formData.append("receivedDividend", formdata.receivedValuation);
        // formData.append("ownerShip", formdata.ownership);

        var formData = {
            companyId: companyId,
            year: formdata.year,
            quarter: formdata.quarter,
            investment: formdata.investment,
            divestment: formdata.dilution,
            currentValuation: formdata.currentValuation,
            receivedDividend: formdata.receivedValuation,
            ownerShip: formdata.ownership,
        }
        var response = ''
        response = await postDataFromApi(valuation, formData, 1)
        if (response && response.status == 200) {
            setalertMessage('Successfully')
            setalert(true)
            setalertType('success')

        } else {
            setalertMessage('error...')
            setalert(true)
            setalertType('error')

        }
    }

    function confirm() {
        setalert(false)
        setFormData((formData) => ({
            ...formData, quarter: null
        }))
        setFormData({})
    }
    const handlePercentageChange = (e) => {
        const { name, value } = e.target;
        const regex = /^(\d{0,2}(\.\d{0,2})?|100(\.00?)?)$/;
        // allow up to two digits before and after the decimal point or 100.00%

        if (regex.test(value)) {
            formdatavaluechange(e);
        }
    };
    const handleValutionSubmit = async () => {
        if (formdata.quarter === null) {
            setQuarterValidate(true)
            return
        }
        let payload = {
            companyId: companyId,
            year: formdata.year instanceof Date ? formdata.year.getFullYear() : null,
            quarter: formdata.quarter,
            investment: formdata.investment,
            divestment: formdata.dilution,
            currentValuation: formdata.currentValuation,
            receivedDividend: formdata.receivedValuation,
            ownerShip: formdata.ownership,
        };
        const emptyFields = Object.values(payload).some(value => value === '' || value === null || typeof value === 'undefined');
        if (emptyFields) {
            return
        }
            const response = await postDataFromApi(createValuation, payload, 1, 1);
        if (response && response.status === 200) {
            setalertMessage('Successfully');
            setalert(true);
            setalertType('success');
            setFormData((formData) => ({
                ...formData, quarter: null
            })

            )
        } else {
            setalertMessage('Error...');
            setalert(true);
            setalertType('error');
        }
    };

    useEffect(() => {
        if (formdata.quarter !== '') {
            setQuarterValidate(false)
        }
    }, [formdata.quarter])
    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[

                        { name: 'Valuation' },
                    ]}
                />
                <div className="breadnavigation">
                    Home / Company lists{' '}
                    {companyLabel ? ' / ' + companyLabel : ''} / Dashboard /
                    Others / Valuation{' '}
                </div>
            </div>
            <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
            <div className="rightalign_btn">
            </div>
            <Box width="100%" className="box">
                <StyledCard elevation={6} className="searchdiv">
                    <CardHeader className="cardheader">
                        <Title>Valuation Information</Title>
                    </CardHeader>
                    <ValidatorForm
                        // onSubmit={handleSubmit}
                        onError={() => null}
                        className="leadsearch customform">
                        <Grid container spacing={2}>
                            {/* <Grid item lg={6} md={6} sm={6} xs={6}>
                                <label>Company Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    id="name"
                                    // value={formdata.name || ''}
                                    // onChange={(e)=>formdatavaluechange(e)}
                                    label="Google"
                                    placeholder="Google"
                                />
                                {/* <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    // defaultValue= {{ id: "Fixed Documents", label: "Fixed Documents" }}
                                    // options={doctypeopt}
                                    getOptionLabel={(option) => option.label}
                                    // onChange={(event, value) => changedropdownvalue('searchdocumenttype', value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            // value={formdata.searchdocumenttype}
                                            name="searchdocumenttype"
                                            placeholder="Select"
                                        />
                                    )}
                                /> 
                            </Grid> */}
                            <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Year</label>
                                <div className="datediv">
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DatePicker
                                            openTo="year"
                                            views={["year"]}
                                            value={formdata.year}
                                            open={dateopen}
                                            onOpen={() => setdateOpen(true)}
                                            onClose={() => setdateOpen(false)}
                                            onChange={(e) => handleDateChange(e)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    // variant="Outlined"
                                                    className="required"
                                                    id="mui-pickers-date"
                                                    label="YYYY"
                                                    sx={{ mb: 2, width: '100%' }}
                                                    onClick={(e) => setdateOpen(true)}
                                                // validators={['required']}
                                                // errorMessages={[
                                                //     'this field is required',
                                                // ]}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>
                                {/* <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={yearopt}
                                    defaultValue={yearopt ? yearopt[0] : null}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('year', value )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.year || ''}
                                            name="year"
                                            placeholder="Select"
                                            validators={['required']}
                                    errorMessages={[
                                        'this field is required',
                                    ]}
                                        />
                                    )}
                                /> */}
                                {/* <TextField
                                    type="number"
                                    name="year"
                                    id="year"
                                    value={formdata.year || ''}
                                    onChange={(e) => formdatavaluechange(e)}
                                    label="YYYY"
                                    placeholder="YYYY"
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required',
                                    ]}
                                /> */}
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <label>Quarter</label>
                                <AutoComplete
                                    // disabled={edit || view}
                                    className="dropdown"
                                    fullWidth
                                    defaultValue={getSelectedItem(
                                        formdata.quarter,
                                        quarteropt
                                    )}
                                    options={quarteropt}
                                    // getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('quarter', value)}
                                    value={formdata.quarter}

                                    renderInput={(params) => (
                                        <>
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                name="quarter"
                                                placeholder="Select"
                                                // validators={['required']}
                                                // errorMessages={['this field is required*']}
                                                error={quarterValidate}

                                            />
                                            {quarterValidate && <span className='quater-validation'>this field is required*</span>}
                                        </>
                                    )}
                                />
                            </Grid>
                            {/* <Grid item lg={6} md={6} sm={6} xs={6}>
                                <label>Investment</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    // defaultValue= {{ id: "Fixed Documents", label: "Fixed Documents" }}
                                    // options={doctypeopt}
                                    getOptionLabel={(option) => option.label}
                                    // onChange={(event, value) => changedropdownvalue('searchdocumenttype', value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            // value={formdata.searchdocumenttype}
                                            name="searchdocumenttype"
                                            placeholder="RANDS"
                                        />
                                    )}
                                /> 
                          </Grid> */}
                            <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Investment</label>
                                <TextField
                                    type="number"
                                    name="investment"
                                    id="investment"
                                    value={formdata.investment || ''}
                                    onChange={(e) => formdatavaluechange(e)}
                                    label={currency === "$" ? "Enter USD Value" : "Enter RAND Value"}
                                    placeholder={currency === "$" ? "Enter USD Value" : "Enter RAND Value"}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required*',
                                    ]}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Dilution</label>
                                <TextField
                                    type="number"
                                    name="dilution"
                                    id="dilution"
                                    value={formdata.dilution || ''}
                                    onChange={(e) => formdatavaluechange(e)}
                                    label={currency === "$" ? "Enter USD Value" : "Enter RAND Value"}
                                    placeholder={currency === "$" ? "Enter USD Value" : "Enter RAND Value"}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required*',
                                    ]}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Dividend Received Current Quarter</label>
                                <TextField
                                    type="number"
                                    name="receivedValuation"
                                    id="receivedValuation"
                                    value={formdata.receivedValuation || ''}
                                    onChange={(e) => formdatavaluechange(e)}
                                    label={currency === "$" ? "Enter USD Value" : "Enter RAND Value"}
                                    placeholder={currency === "$" ? "Enter USD Value" : "Enter RAND Value"}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required*',
                                    ]}
                                />
                            </Grid>
                            {/* <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Initial Investment Date </label>
                                <TextField
                                    type="text"
                                    name="name"
                                    id="name"
                                    // value={formdata.name || ''}
                                    // onChange={(e)=>formdatavaluechange(e)}
                                    label="DD-MM-YYYY"
                                    placeholder="DD-MM-YYYY"
                                />
                            </Grid> */}
                            <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Valuation Till This Quarter</label>
                                <TextField
                                    type="number"
                                    name="currentValuation"
                                    id="currentValuation"
                                    value={formdata.currentValuation || ''}
                                    onChange={(e) => formdatavaluechange(e)}
                                    label={currency === "$" ? "Enter USD Value" : "Enter RAND Value"}
                                    placeholder={currency === "$" ? "Enter USD Value" : "Enter RAND Value"}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required*',
                                    ]}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Ownership</label>
                                <TextField
                                    type="number"
                                    name="ownership"
                                    id="ownership"
                                    value={formdata.ownership || ''}
                                    onChange={handlePercentageChange}
                                    label={currency === "$" ? "Enter USD Value In %" : "Enter RAND Value In %"}
                                    placeholder={currency === "$" ? "Enter USD Value In %" : "Enter RAND Value In %"}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required*',
                                    ]}


                                />
                            </Grid>
                            {/* <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Reported Value</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    id="name"
                                    // value={formdata.name || ''}
                                    // onChange={(e)=>formdatavaluechange(e)}
                                    label="Enter Value"
                                    placeholder="Enter Value"
                                />
                            </Grid> */}
                            {/* <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Multiple of Capital</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    id="name"
                                    // value={formdata.name || ''}
                                    // onChange={(e)=>formdatavaluechange(e)}
                                    label="Enter Value"
                                    placeholder="Enter Value"
                                />
                            </Grid> */}
                            {/* <Grid item lg={6} md={6} sm={6} xs={6} >
                                <label>Gross IRR</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    id="name"
                                    // value={formdata.name || ''}
                                    // onChange={(e)=>formdatavaluechange(e)}
                                    label="Enter Value"
                                    placeholder="Enter Value"
                                />
                            </Grid> */}



                            {/* <DialogActions style={{marginLeft:"10px"}}> */}

                            <Grid item lg={8} md={8} sm={8} xs={12} className="savebtn-grid" >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="custom-btn"
                                    onClick={() => {
                                        handleValutionSubmit();
                                        setQuarterValidate(formdata.quarter === null)
                                    }}
                                >
                                    Save
                                </Button>
                                {/* </Grid> */}
                                {/* <Grid item lg={3} md={3} sm={3} xs={6} > */}
                                <Button
                                style={{textTransform:"uppercase"}}
                                    className="whitebg"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => navigate('/companylists/companydashboard/' + companyId)}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                        {/* </DialogActions> */}
                    </ValidatorForm>
                </StyledCard>

            </Box>


        </Container>
    )
}

export default Valuation