import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import { useOutletContext } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
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
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import { DatePicker } from '@mui/lab'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import demologoUpload from '../../image/demologoUpload.svg'
import { Small } from 'app/components/Typography'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
/*import MUIRichTextEditor from "mui-rte";*/
import {
    createCompany,
    updateCompany,
    getSingleCompany,
    getOrgDetails,
    getAllUserDetails,
} from '../../services/api'
import {
    postDataFromApi,
    putDataFromApi,
    getDataFromApi,
} from '../../services/CommonService'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import AlertMessage from '../commoncomponent/AlertMessage'
import { managedByoptions } from '../../services/CommonObject'

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

const statusopt = [
    { id: 1, label: 'Active' },
    { id: 2, label: 'Inactive' },
]
const yearOptions = [
    { id: 'Normal Year', label: 'Normal Year' },
    { id: 'Financial Year', label: 'Financial Year' },
]
const monthsOptions =[
    { id: "JANUARY", label: "JANUARY" },
    { id: "FEBRUARY", label: "FEBRUARY" },
    { id: "MARCH", label: "MARCH" },
    { id: "APRIL", label: "APRIL" },
    { id: "MAY", label: "MAY" },
    { id: "JUNE", label: "JUNE" },
    { id: "JULY", label: "JULY" },
    { id: "AUGUST", label: "AUGUST" },
    { id: "SEPTEMBER", label: "SEPTEMBER" },
    { id: "OCTOBER", label: "OCTOBER" },
    { id: "NOVEMBER", label: "NOVEMBER" },
    { id: "DECEMBER", label: "DECEMBER" }
];
const monthsOptionsEndMonth = [
    { id: "JANUARY", label: "JANUARY" },
    { id: "FEBRUARY", label: "FEBRUARY" },
    { id: "MARCH", label: "MARCH" },
    { id: "APRIL", label: "APRIL" },
    { id: "MAY", label: "MAY" },
    { id: "JUNE", label: "JUNE" },
    { id: "JULY", label: "JULY" },
    { id: "AUGUST", label: "AUGUST" },
    { id: "SEPTEMBER", label: "SEPTEMBER" },
    { id: "OCTOBER", label: "OCTOBER" },
    { id: "NOVEMBER", label: "NOVEMBER" },
    { id: "DECEMBER", label: "DECEMBER" }
];;




const Leadadd = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    let { id } = useParams()
    let newid = id ? id : ''

    const [formdata, setFormData] = useState({
        id: '',
        organizationId: '',
        emailId: '',
        phoneNumber: '',
        country: '',
        city: '',
        address: '',
        managed_By: '',
        registerDate: null,
        websiteUrl: '',
        dealTeams: [],
        name: '',
        category: '',
        currentValue: '',
        proposedShareholding: '',
        investmentValue: '',
        status: 'Active',
        title: '',
        content: '',
        logoUrl: '',
        prospetive: '',
        investmentType: '',
        presignedurl: '',
        stage: 'Origination',
        startDate: '',
        fileId: '',
        yearType:'',
        startMonth: '', 
        endMonth: ''   
    })
    const [dateopen, setdateOpen] = useState(false)
    const [currency] = useOutletContext()
    const [is_edit_loaded, set_is_edit_loaded] = useState(false)
    const [companyDeatils, setcompanyDeatils] = useState([])
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [organisationId, setOrganisationId] = useState('')
    const [userDetails, setuserDetails] = useState([])
    const [useroptions, setuseroptions] = useState([])
    const [previewImg, setpreviewImg] = useState('')
    const [mguseroptions, setmguseroptions] = useState([])

    const user = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
        var response = ''
        var dealTeams = ''
        if (formdata.dealTeams) {
            dealTeams = formdata.dealTeams.toString()
        }
        console.log(dealTeams)

        var formData = new FormData()
        // if (formdata.organizationId) {
        //     formData.append(
        //         'organizationId',
        //         formdata.organizationId
        //             ? formdata.organizationId
        //             : organisationId
        //     )
        // }
        formData.append(
            'organizationId',
            formdata.organizationId ? formdata.organizationId : organisationId
        )
        formData.append('name', formdata.name)
        formData.append('websiteUrl', formdata.websiteUrl)
        formData.append('status', formdata.status)
        formData.append('managed_By', formdata.managed_By)
        formData.append('yearType', formdata.yearType)
        formData.append('category', formdata.category)
        formData.append('registerDate', formdata.registerDate || '1996-05-21')
        formData.append('dealTeams', dealTeams)
        formData.append('proposedShareholding', formdata.proposedShareholding)
        formData.append('currentValue', formdata.currentValue)
        formData.append('investmentValue', formdata.investmentValue)
        formData.append('title', formdata.title)
        formData.append('content', formdata.content)
        formData.append('startMonth',formdata.startMonth)
        formData.append('endMonth',formdata.endMonth)
     
        
        if (formdata.logoUrl) {
            formData.append(
                'uploadDoc',
                formdata.logoUrl ? formdata.logoUrl : null
            )
        }
        if (formdata.fileId) {
            formData.append('fileId', formdata.fileId)
        }
        formData.append('stage', formdata.stage || 'Origination')
        if (id) {
            formData.append('id', formdata.id)
            formData.append('presignedurl', formdata.presignedurl)
        } else {
            // if (formdata.stage) {
            //     formData.append('stage', formdata.stage || 'Origination')
            // }
            formData.append(
                'startDate',
                moment().format('YYYY-MM-DD') || '1996-05-21'
            )
        }

        /*var newformdata = {
            organizationId: organisationId,
            name: formdata.name,
            emailId: formdata.emailId,
            phoneNumber: formdata.phoneNumber,
            country: formdata.country,
            city: formdata.city,
            address: formdata.address,
            websiteUrl: formdata.websiteUrl,
            logoUrl: formdata.logoUrl,
            status: formdata.status,
            prospetive: formdata.prospetive,
            managed_By: formdata.managed_By,
            category: formdata.category,
            registerDate: formdata.registerDate,
            dealTeams: formdata.dealTeams,
            currentValue: formdata.currentValue,
            investmentValue: formdata.investmentValue,
            title: formdata.title,
            content: formdata.content,
            investmentType: formdata.investmentType

        }

        var editformdata = {
            organizationId: organisationId,
            id: id,
            name: formdata.name,
            emailId: formdata.emailId,
            phoneNumber: formdata.phoneNumber,
            country: formdata.country,
            city: formdata.city,
            address: formdata.address,
            websiteUrl: formdata.websiteUrl,
            logoUrl: formdata.logoUrl,
            status:  formdata.status,
            prospetive: formdata.prospetive,
            managed_By: formdata.managed_By,
            category: formdata.category,
            registerDate: formdata.registerDate,
            dealTeams: formdata.dealTeams,
            currentValue: formdata.currentValue,
            investmentValue: formdata.investmentValue,
            title: formdata.title,
            content: formdata.content,
            investmentType: formdata.investmentType,

        }*/
      

        if (id) {
            response = await putDataFromApi(updateCompany, formData, 1, '', 1)
            console.log('edit')
        } else {
            response = await postDataFromApi(createCompany, formData, 1, '', 1)
            console.log('add')
        }

        if (response && response.status == 200) {
            if (id) {
                setalertMessage('Lead Updated Successfully')
            } else {
                setalertMessage('Lead Added Successfully')
            }
            setalert(true)
            setalertType('success')
            setpreviewImg('')
        } else {
            setalertMessage('error...')
            setalert(true)
            setalertType('error')
            setpreviewImg('')
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
            if (type == 'dealTeams') {
                var values = []
                e.map((prop, i) => {
                    var data = prop.id
                    values.push(data)
                })
                var value = values
            } else {
                var value = e.id
            }
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
    }

    function confirm() {
        setalert(false)
        localStorage.setItem('reloadLead', 1)
        navigate('/investmentpipeline/lead')
    }

    function getSelectedItem(
        id,
        data = [],
        multiple = '',
        label = '',
        is_inputvalue = ''
    ) {
        console.log('mainoptiondata', data)
        if (multiple) {
            var items = []
            id.map((sid, i) => {
                const item = data.find((opt) => {
                    if (label) {
                        if (opt.label == sid) return opt
                    } else {
                        if (opt.id == sid) return opt
                    }
                })
                if (item) {
                    items.push(item)
                }
            })
            console.log('getSelectedItem', items)
            return items
        } else {
            const item = data.find((opt) => {
                if (label) {
                    if (opt.label == id) return opt
                } else {
                    if (opt.id == id) return opt
                }
            })
            return item || null
        }
    }
    /*function getSelectedItem(id, data = [], multiple = '', label = '') {
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
    }*/

    useEffect(() => {
        getOrganisationDetailos()
        if (id) {
            getcompanyDeatils()
        } else {
            set_is_edit_loaded(true)
        }
        getuserDetails()
    }, [])
    const getOrganisationDetailos = async () => {
        var query = ''

        const response = await getDataFromApi(getOrgDetails, 1)
        if (response && response.status == 200 && response.data != null) {
            setOrganisationId(response.data[0].id)
            console.log('qwe')
            console.log(response.data[0].id)
            console.log('qwe')
        }
    }
    const getcompanyDeatils = async () => {
        var query = ''

        const response = await getDataFromApi(getSingleCompany + id, 1)
        if (response && response.status == 200 && response.data != null) {
            setcompanyDeatils(response.data)
            console.log('companyDeatils', response.data)
            if (id) {
                var companyDeatils = response.data
                var dealTeamArray = []
                var dealArray = []
                // This will return an array with strings "1", "2", etc.
                dealArray = companyDeatils.dealTeams
                    ? companyDeatils.dealTeams.split(',')
                    : []
                console.log(dealArray)
                /*dealArray && dealArray.map((opt)=>{
                     var op = []
                     op['id'] = opt
                     dealTeamArray.push(op)
                })*/
                setFormData((formData) => ({
                    ...formData,
                    ['id']: companyDeatils.id,
                    ['name']: companyDeatils.name,
                    ['emailId']: companyDeatils.emailId,
                    ['phoneNumber']: companyDeatils.phoneNumber,
                    [' country']: companyDeatils.country,
                    ['city']: companyDeatils.city,
                    ['address']: companyDeatils.address,
                    ['websiteUrl']: companyDeatils.websiteUrl,
                    ['logoUrl']: companyDeatils.logoUrl,
                    ['status']: companyDeatils.status,
                    ['prospetive']: companyDeatils.prospetive,
                    ['managed_By']: companyDeatils.managed_By,
                    ['yearType']: companyDeatils.yearType,
                    ['category']: companyDeatils.category,
                    ['registerDate']:
                        companyDeatils.registerDate || '1996-05-21',
                    ['dealTeams']: dealArray,
                    ['currentValue']: companyDeatils.currentValue,
                    ['proposedShareholding']:
                        companyDeatils.proposedShareholding,
                    ['investmentValue']: companyDeatils.investmentValue,
                    ['title']: companyDeatils.title,
                    ['content']: companyDeatils.content,
                    ['investmentType']: companyDeatils.investmentType,
                    ['organizationId']: companyDeatils.organizationId,
                    ['presignedurl']: companyDeatils.presignedurl,
                    ['stage']: companyDeatils.stage,
                    ['fileId']: companyDeatils.fileId,
                    ['startMonth']:companyDeatils.startMonth,
                    ['endMonth']:companyDeatils.endMonth
                }))
                console.log("sfsf",formdata)
                setTimeout(() => {
                    set_is_edit_loaded(true)
                }, 500)
            }
        }
        //if (response && response.data.code && response.data.data != null) {

        //}
    }

    const getuserDetails = async () => {
        var query = ''
        const response = await getDataFromApi(
            getAllUserDetails + `?userId=${user?.user?.id}`,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setuserDetails(response.data)
            console.log('userDetails', response.data)
            var useropts = []
            var mguseropts = []
            response.data.map((user, i) => {
                var ur = []
                ur['id'] = user.email
                ur['label'] = user.email
                useropts.push(ur)

                var mg = []
                mg['id'] = user.email
                mg['label'] = user.username + '(' + user.email + ')'
                mguseropts.push(mg)
            })
            setuseroptions(useropts)
            setmguseroptions(mguseropts)
            console.log('user data', response)
        }
    }

    function onFileChange(event) {
        console.log('event', event.target.name)
        var file = event.target.files[0]
        console.log('file', file)
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: file,
        }))
        setpreviewImg(file ? URL.createObjectURL(file) : '')
        console.log('formdata--->', formdata)
        console.log('previewImg--->', previewImg)
    }

    return is_edit_loaded ? (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Investment pipeline' }]} />
                <div className="breadnavigation">
                    Home / Investment Pipeline/{' '}
                    {id
                        ? 'Update a company to pipeline'
                        : 'Add a company to pipeline'}
                </div>
            </div>
            {console.log("monthsOptions",monthsOptions)}
            <div className="rightalign_btn">
                <Button
                    variant="contained"
                    color="primary"
                    className="whitebg"
                    onClick={() => navigate('/investmentpipeline/lead')}
                >
                    Lead List
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
                                        {/* <label>Company Id</label>
                                    <TextField
                                        type="text"
                                        name="id"
                                        id="id"
                                        value={formdata.id || ''}
                                        onChange={(e)=>formdatavaluechange(e)}
                                        label="Enter company Id"
                                        placeholder="Enter company Id"
                                        validators={[
                                            'required',
                                        ]}
                                        errorMessages={[
                                            'this field is required',
                                        ]}
                                    /> */}
                                        <label>Company Name</label>
                                        <TextField
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formdata.name || ''}
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                            label="Enter Company Name"
                                            placeholder="Enter Company Name"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                        <label>Register date</label>
                                        <div className="datediv">
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DatePicker
                                                    inputFormat="dd-MM-yyyy"
                                                    value={
                                                        formdata.registerDate
                                                    }
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
                                                            'registerDate'
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
                                        <label>Website</label>
                                        <TextField
                                            type="text"
                                            name="websiteUrl"
                                            id="websiteUrl"
                                            value={formdata.websiteUrl || ''}
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                            label="Enter Website Link"
                                            placeholder="Enter Website Link"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                        <label>Deal Teams</label>
                                        <AutoComplete
                                            defaultValue={getSelectedItem(
                                                formdata.dealTeams,
                                                useroptions,
                                                'multiple'
                                            )}
                                            className="dropdown multiple"
                                            fullWidth
                                            options={useroptions}
                                            multiple
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'dealTeams',
                                                    value,
                                                    'multiple'
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.dealTeams}
                                                    name="dealTeams"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                        <label>Year Type</label>
                                        <AutoComplete
                                            defaultValue={getSelectedItem(
                                                formdata.yearType,
                                                yearOptions
                                            )}
                                            className="dropdown"
                                            fullWidth
                                            options={yearOptions}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'yearType',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.yearType}
                                                    name="yearType"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                        {formdata.yearType==="Financial Year" ?
                                        (<div>
                                            {console.log("ddd",formdata.startMonth)}
                                               <label>Start Months</label>
                                               <AutoComplete
                                            defaultValue={getSelectedItem(
                                                formdata.startMonth,
                                                monthsOptions
                                            )}
                                            className="dropdown"
                                            fullWidth
                                            options={monthsOptions}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'startMonth',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.startMonth}
                                                    name="startMonth"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />

                                        </div>):null

                                        }
                                      
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <label>Managed by</label>
                                        <AutoComplete
                                            defaultValue={getSelectedItem(
                                                formdata.managed_By,
                                                mguseroptions
                                            )}
                                            className="dropdown"
                                            fullWidth
                                            options={mguseroptions}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'managed_By',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.managed_By}
                                                    name="managed_By"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />

                                        <label>Category</label>
                                        <TextField
                                            type="text"
                                            name="category"
                                            id="category"
                                            value={formdata.category || ''}
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                            label="Enter Category"
                                            placeholder="Enter Category"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                        <label>Current Valuation</label>
                                        <TextField
                                            type="text"
                                            name="currentValue"
                                            id="currentValue"
                                            value={formdata.currentValue || ''}
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                            label={
                                                currency === '$'
                                                    ? 'Enter USD Value '
                                                    : 'Enter RAND Value'
                                            }
                                            placeholder={
                                                currency === '$'
                                                    ? 'Enter USD Value'
                                                    : 'Enter RAND Value'
                                            }
                                            validators={[
                                                'required',
                                                'isNumber',
                                            ]}
                                            errorMessages={[
                                                'this field is required',
                                                'only numbers allowed',
                                            ]}
                                        />
                                        <label>Proposed Shareholding</label>
                                        <TextField
                                            type="text"
                                            name="proposedShareholding"
                                            id="proposedShareholding"
                                            value={
                                                formdata.proposedShareholding ||
                                                ''
                                            }
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                            label="Enter 0 to 100%"
                                            placeholder="Enter 0 to 100%"
                                            validators={[
                                                'minNumber:0',
                                                'maxNumber:100',
                                            ]}
                                            errorMessages={[
                                                'only numbers between 0 to 100 are allowed',
                                                'only numbers between 0 to 100 are allowed',
                                            ]}
                                        />
                                        <label>Investment Value</label>
                                        <TextField
                                            type="text"
                                            name="investmentValue"
                                            id="investmentValue"
                                            value={
                                                formdata.investmentValue || ''
                                            }
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                            label={
                                                currency === '$'
                                                    ? 'Enter USD Investment Value '
                                                    : 'Enter RAND  Investment Value'
                                            }
                                            placeholder={
                                                currency === '$'
                                                    ? 'Enter USD  Investment Value'
                                                    : 'Enter RAND  Investment Value'
                                            }
                                            validators={[
                                                'required',
                                                'isNumber',
                                            ]}
                                            errorMessages={[
                                                'this field is required',
                                                'only numbers allowed',
                                            ]}
                                        />
                                          {formdata.yearType==="Financial Year" ?
                                        (<div>
                                               <label>End Month</label>
                                        <AutoComplete
                                            defaultValue={getSelectedItem(
                                                formdata.endMonth,
                                                monthsOptionsEndMonth
                                            )}
                                            className="dropdown"
                                            fullWidth
                                            options={monthsOptionsEndMonth}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changedropdownvalue(
                                                    'endMonth',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.endMonth}
                                                    name="endMonth"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />

                                        </div>):null

                                        }
                                    </Grid>
                                </Grid>
                            </StyledCard>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={4}
                            sm={12}
                            xs={12}
                            className="bottomMargin"
                        >
                            <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Status</Title>
                                </CardHeader>
                                <Grid
                                    container
                                    spacing={3}
                                    className="formGrid"
                                >
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <RadioGroup
                                            aria-label="Gender"
                                            name="status"
                                            className="group"
                                            value={formdata.status || ''}
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                        >
                                            <FormControlLabel
                                                value="Active"
                                                control={<Radio />}
                                                label="Active"
                                            />
                                            <FormControlLabel
                                                value="Inactive"
                                                control={<Radio />}
                                                label="Inactive"
                                            />
                                        </RadioGroup>
                                    </Grid>
                                </Grid>
                            </StyledCard>
                            <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Logo Upload</Title>
                                </CardHeader>
                                <Grid
                                    container
                                    spacing={3}
                                    className="formGrid"
                                >
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <div className="uploadImg withTextfield">
                                            {/*<TextField
                                            type="file"
                                            name="logoUrl"
                                            id="logoUrl"
                                             onChange={(e)=>onFileChange(e)}
                                            
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />*/}
                                            <input
                                                type="file"
                                                name="logoUrl"
                                                onChange={(e) =>
                                                    onFileChange(e)
                                                }
                                            />
                                            <div className="logo">
                                                {previewImg ? (
                                                    <img src={previewImg} />
                                                ) : formdata.presignedurl ? (
                                                    <img
                                                        src={
                                                            formdata.presignedurl
                                                        }
                                                    />
                                                ) : (
                                                    'Logo'
                                                )}
                                            </div>
                                            <Typography>
                                                Upload Image
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </StyledCard>
                            <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Lead Overview</Title>
                                </CardHeader>
                                <Grid
                                    container
                                    spacing={3}
                                    className="formGrid"
                                >
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <label>Title</label>
                                        <TextField
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={formdata.title || ''}
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                            label="Enter Your Title"
                                            placeholder="Enter Your Title"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                        <label>Content</label>
                                        {/*<MUIRichTextEditor
                                          label="Enter yor contents...."
                                          onChange={(e)=>formdatavaluechange(e)}
                                          inlineToolbar={true}
                                          value={formdata.content || ''}
                                          name="content"
                                    />*/}
                                        <TextField
                                            type="text"
                                            name="content"
                                            id="content"
                                            value={formdata.content || ''}
                                            onChange={(e) =>
                                                formdatavaluechange(e)
                                            }
                                            label="Enter Your Contents...."
                                            placeholder="Enter Your Contents...."
                                            multiline
                                            rows={5}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
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
                            {id ? 'Update' : 'Save'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="whitebg"
                            onClick={() => navigate('/investmentpipeline/lead')}
                        >
                            CANCEL
                        </Button>
                    </div>
                </ValidatorForm>
            </Box>
        </Container>
    ) : (
        ''
    )
}

export default Leadadd
