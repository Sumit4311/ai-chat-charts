import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
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

import { Breadcrumb, SimpleCard } from 'app/components'
import { H3 } from 'app/components/Typography'
import { Card } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Autocomplete } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import demologoUpload from '../../image/demologoUpload.svg'
import { Small } from 'app/components/Typography'
/*import MUIRichTextEditor from "mui-rte";*/
import {
    createplmnt,
    updateplmnt,
    getSingleplmnt,
    getAllCompanyDetails,
} from '../../services/api'
import {
    postDataFromApi,
    putDataFromApi,
    getDataFromApi,
} from '../../services/CommonService'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import AlertMessage from '../commoncomponent/AlertMessage'
import { statusoptions } from '../../services/CommonObject'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
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

const AnalyticsRoot = styled(Card)(({ theme }) => ({
    padding: '28px 32px 32px 32px',
    marginBottom: '24px',
    background: theme.palette.primary.main,
}))

const Header = styled(H3)(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: 'rgba(255, 255, 255, 0.87)',
}))

const StyledTable = styled(Table)(({ theme }) => ({
    color: '#FFF',
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: '15px',
                color: '#fff',
                textTransform: 'uppercase',
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: '15px',
                textTransform: 'capitalize',
                color: '#fff',
            },
        },
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',

    background: '#0E0E23',
}))

const CardHeader = styled('div')(() => ({
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const PipelineManagementadd = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    let { id } = useParams()
    console.log(id,"hggggg")
    let newid = id ? id : ''
    const [formdata, setFormData] = useState({
        id: '',
        companyName: '',
        startDate: '',
        endDate: '',
        status: '',
        stage: '',
    })
    const [dateopen, setdateOpen] = useState(false)
    const [enddateopen, setenddateOpen] = useState(false)
    const [is_edit_loaded, set_is_edit_loaded] = useState(false)
    const [plmntDeatils, setplmntDeatils] = useState([])
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [nameDetails, setnameDetails] = useState([])
    const [companyoptions, setcompanyoptions] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        var response = ''
        var newformdata = {
            companyName: formdata.companyName,
            startDate: formdata.startDate,
            endDate: formdata.endDate,
            status: formdata.status,
            stage: formdata.stage,
        }
        var editformdata = {
            id: id,
            companyName: formdata.companyName,
            startDate: formdata.startDate,
            endDate: formdata.endDate,
            status: formdata.status,
            stage: formdata.stage,
        }

        console.log('newformdata', newformdata)

        if (id) {
            response = await putDataFromApi(updateplmnt, editformdata, 1, 1)
            console.log('edit')
        } else {
            response = await postDataFromApi(createplmnt, newformdata, 1, 1)
            console.log('add')
        }

        if (response && response.status == 200) {
            if (id) {
                setalertMessage('Pipeline Updated Successfully')
            } else {
                setalertMessage('Pipeline Added Successfully')
            }
            setalert(true)
            setalertType('success')
        } else {
            setalertMessage('error...')
            setalert(true)
            setalertType('error')
        }

        console.log('response', response)
    }

    const handleDateChange = (date, name) => {
        const momentdate = moment(date)
        var newdate = momentdate.format('Y-MM-DD')

        setFormData((formData) => ({
            ...formData,
            [name]: newdate,
        }))
    }

    function formdatavaluechange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }

    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.id
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
    }

    function getSelectedItem(id, data = [], multiple = '', label = '') {
        console.log('mainoptiondata', data)
        const item = data.find((opt) => {
            if (label) {
                if (opt.label == id) return opt
            } else {
                if (opt.id == id) return opt
            }
        })
        console.log('item', item)
        if (multiple) {
            return item || []
        } else {
            return item || null
        }
    }

    function confirm() {
        setalert(false)
        navigate('/investmentpipeline/pipelinemanagement')
    }

    useEffect(() => {
        if (id) {
            getplmntDeatils()
        } else {
            set_is_edit_loaded(true)
        }
        getnameDetails()
    }, [])

    const getnameDetails = async () => {
        var query = ''
        const response = await getDataFromApi(getAllCompanyDetails, 1)
        if (response && response.status == 200 && response.data != null) {
            setnameDetails(response.data)
            console.log('nameDetails', response.data)
            var companyopts = []
            response.data.map((company, i) => {
                var cp = []
                cp['id'] = company.id
                cp['label'] = company.name
                companyopts.push(cp)
            })
            setcompanyoptions(companyopts)
        }
    }

    const getplmntDeatils = async () => {
        var query = ''

        const response = await getDataFromApi(getSingleplmnt + id, 1, 1)

        if (response && response.status == 200 && response.data != null) {
            setplmntDeatils(response.data)
            console.log('companyDeatils', response.data)

            if (id) {
                var plmnt = response.data
                setFormData((formData) => ({
                    ...formData,
                    ['id']: plmnt.id,
                    ['companyName']: plmnt.companyName,
                    ['startDate']: plmnt.startDate,
                    ['endDate']: plmnt.endDate,
                    ['status']: plmnt.status,
                    ['stage']: plmnt.stage,
                }))
                setTimeout(() => {
                    set_is_edit_loaded(true)
                }, 500)
            }
        }
    }

    return is_edit_loaded ? (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Investment pipeline' }]} />
                <div className="breadnavigation">
                    Home / Investment Pipeline/ Add a company to pipeline
                </div>
            </div>
            <div className="rightalign_btn">
                <Button
                    variant="contained"
                    color="primary"
                    className="whitebg"
                    onClick={() =>
                        navigate('/investmentpipeline/pipelinemanagement')
                    }
                >
                    Pipeline Management
                </Button>
            </div>
            <AlertMessage
                alert={alert}
                alertMessage={alertMessage}
                confirm={confirm}
                alertType={alertType}
            />
            <Box width="100%" className="box">
                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={() => null}
                    className="customform"
                >
                    <Grid container spacing={3}>
                        <Grid item lg={8} md={8} sm={12} xs={12}>
                            <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Basic Information</Title>
                                </CardHeader>
                                <Grid
                                    container
                                    spacing={3}
                                    className="formGrid"
                                >
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        {/* <label>Id</label>
                                    <TextField
                                        type="text"
                                        name="id"
                                        id="id"
                                        value={formdata.id || ''}
                                        onChange={(e)=>formdatavaluechange(e)}
                                        label="Enter Id"
                                        placeholder="Enter Id"
                                        validators={[
                                            'required',
                                        ]}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    /> */}
                                        <label>Company Name</label>
                                        <AutoComplete
                                            defaultValue={getSelectedItem(
                                                formdata.companyName,
                                                companyoptions
                                            )}
                                            className="dropdown"
                                            fullWidth
                                            options={companyoptions}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'companyName',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.companyName}
                                                    name="companyName"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                        {/*  <TextField
                                        type="text"
                                        name="companyName"
                                        id="companyName"
                                        value={formdata.companyName || ''}
                                        onChange={(e)=>formdatavaluechange(e)}
                                        label="Enter company name"
                                        placeholder="Enter company name"
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    /> */}
                                        <label>Start date</label>
                                        <div className="datediv">
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DatePicker
                                                    inputFormat="dd-MM-yyyy"
                                                    value={formdata.startDate}
                                                    open={dateopen}
                                                    onOpen={() =>
                                                        setdateOpen(true)
                                                    }
                                                    onClose={() =>
                                                        setdateOpen(false)
                                                    }
                                                    onChange={(e, name) =>
                                                        handleDateChange(
                                                            e,
                                                            'startDate'
                                                        )
                                                    }
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            // variant="Outlined"
                                                            className="required"
                                                            id="mui-pickers-date"
                                                            label="DD-MM-YYYY"
                                                            sx={{
                                                                mb: 2,
                                                                width: '100%',
                                                            }}
                                                            onClick={(e) =>
                                                                setdateOpen(
                                                                    true
                                                                )
                                                            }
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <label>Status</label>
                                        <AutoComplete
                                            defaultValue={getSelectedItem(
                                                formdata.status,
                                                statusoptions
                                            )}
                                            className="dropdown"
                                            fullWidth
                                            options={statusoptions}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'status',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.status}
                                                    name="status"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <label>Stage</label>
                                        <TextField
                                            type="text"
                                            name="stage"
                                            id="stage"
                                            value={formdata.stage || ''}
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                            label="Enter value"
                                            placeholder="Enter value"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                        <label>End date</label>
                                        <div className="datediv">
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DatePicker
                                                    inputFormat="dd-MM-yyyy"
                                                    value={formdata.endDate}
                                                    open={enddateopen}
                                                    onOpen={() =>
                                                        setenddateOpen(true)
                                                    }
                                                    onClose={() =>
                                                        setenddateOpen(false)
                                                    }
                                                    onChange={(e, name) =>
                                                        handleDateChange(
                                                            e,
                                                            'endDate'
                                                        )
                                                    }
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            // variant="Outlined"
                                                            className="required"
                                                            id="mui-pickers-date"
                                                            label="DD-MM-YYYY"
                                                            sx={{
                                                                mb: 2,
                                                                width: '100%',
                                                            }}
                                                            onClick={(e) =>
                                                                setenddateOpen(
                                                                    true
                                                                )
                                                            }
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </Grid>
                                </Grid>
                            </StyledCard>
                        </Grid>
                    </Grid>
                    <div className="formbuttons">
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            className="whitebg"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="whitebg"
                        >
                            Cancel
                        </Button>
                    </div>
                </ValidatorForm>
            </Box>
        </Container>
    ) : (
        ''
    )
}

export default PipelineManagementadd
