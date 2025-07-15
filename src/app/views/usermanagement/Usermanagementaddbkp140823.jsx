import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
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
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import demologoUpload from '../../image/demologoUpload.svg'
import { Small } from 'app/components/Typography'
import Checkbox from '@mui/material/Checkbox'
/*import MUIRichTextEditor from "mui-rte";*/
import {
    postDataFromApi,
    getDataFromApi,
    putDataFromApi,
} from '../../services/CommonService'
import { useParams } from 'react-router-dom'
import {
    updateUser,
    addUser,
    getsingleUserDetails,
    getAllCompanyDetails,
    getonboardcmp,
} from '../../services/api'
import AlertMessage from '../commoncomponent/AlertMessage'
import {
    departmentopt,
    rolesopt,
    leadPermission,
    modulePermission,
} from '../../services/CommonObject'
/*var md5 = require("md5");*/

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

const Usermanagementadd = () => {
    let { userid } = useParams()
    let newuserid = userid ? userid : ''
    const theme = useTheme()
    const navigate = useNavigate()
    const [formdata, setFormData] = useState({
        id: '',
        username: '',
        password: '',
        department: '',
        email: '',
        roles: '',
        companyName: null,
        designation: '',
        mobilePhone: '',
        status: 'Active',
        title: '',
        content: '',
        presignedurl: '',
    })
    const [dateOpen, setdateOpen] = useState(false)
    const [state, setState] = useState({
        checkedA: true,
    })
    const [singleUser, setsingleUser] = useState([])
    const [isCompanyLoaded, setIsCompanyLoaded] = useState(true)
    const [is_edit_loaded, set_is_edit_loaded] = useState(false)
    const userRole = localStorage.getItem('userRole')
    const [alert, setalert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [alertType, setalertType] = useState('')
    const [nameDetails, setnameDetails] = useState([])
    const [companyoptions, setcompanyoptions] = useState([])
    const [previewImg, setpreviewImg] = useState('')
    const user = useAuth()
    let validators = []
    let errorMessages = []
    if (userRole === 'Company Admin' || userRole === 'Company User') {
        validators = ['required']
        errorMessages = ['this field is required']
    }
    const handleChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.checked })
    }

    function confirm() {
        setalert(false)
        navigate('/usermanagement')
    }

    const filteredOptions = rolesopt.filter(option => {
        if (userRole === 'Super Admin') {
            return true
        } else if (userRole === 'Admin') {
            return option.id === 'Company Admin' || option.id === 'Company User'
        } else if (userRole === 'Company Admin') {
            return option.id === 'Company Admin' || option.id === 'Company User'
        }
        else if (userRole === 'Company User')
            return option.id === 'Company User' || option.id === 'Company Admin'
        return false
    })
console.log(formdata.roles,"formdata.roles")
    const handleSubmit = async (e) => {
        e.preventDefault()
        var response = ''
        var existingpassword = localStorage.getItem('Authtoken')
        var formData = new FormData()
        formData.append('username', formdata.username)
        formData.append('department', formdata.department)
        formData.append('mobilePhone', formdata.mobilePhone)
        formData.append('email', formdata.email)
        formData.append('roles', formdata.roles)
        if (formdata.roles !== 'Super Admin' && formdata.roles !== 'Admin') {
            formData.append('companyId', formdata.companyName)
        }
        formData.append('status', formdata.status)
        formData.append('designation', formdata.designation)
        if (formdata.logouploadimg) {
            formData.append(
                'uploadDoc',
                formdata.logouploadimg ? formdata.logouploadimg : ''
            )
        }

        if (userid) {
            // formData.append('password', 'Admin@1234')
            formData.append('id', userid)
            // formData.append('presignedurl', formdata.presignedurl)
            if (formdata.fileId) {
                formData.append('fileId', formdata.fileId)
            }
            formData.append('permissionId', formdata.permissionId)
        }

        /*var newformdata = {
            username: formdata.username,
            department: formdata.department,
            mobilePhone: formdata.mobilePhone,
            email: formdata.email,
            roles: formdata.roles,
            companyName: formdata.companyName,
            status: formdata.status,
            designation: formdata.designation,
            uploadDoc : formdata.logouploadimg,
        }
        
        var editformdata = {
            id : userid,
            username: formdata.username,
            department: formdata.department,
            mobilePhone: formdata.mobilePhone,
            email: formdata.email,
            roles: formdata.roles,
            companyName: formdata.companyName,
            status: formdata.status,
            designation: formdata.designation,
            password: existingpassword ? md5(existingpassword) : '',
            uploadDoc : formdata.logouploadimg,
        }*/


        if (userid) {
            response = await putDataFromApi(updateUser, formData, 1, '')
        } else {
            response = await postDataFromApi(addUser, formData, 1, '')
        }
        // console.log('edit response', response.data)

        if (response && response.status == 200) {
            if (userid) {
                setalertMessage('User Updated Successfully')
            } else {
                setalertMessage('User Added Successfully')
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
    }
   const cmpnyOpt = companyoptions .filter(item => item.label == formdata.companyName )
//    console.log(cmpnyOpt[1].label,"cmpnyOpt")
    const handleDateChange = (date) => {
        setFormData((formData) => ({
            ...formData,
            date,
        }))
    }

    function formdataValueChange(e) {
        var value = e.target.value.trimStart()
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }))
    }

    function changeDropdownValue(type, e) {
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

    useEffect(() => {
        if (userid) {
            getsingleUser()
        } else {
            set_is_edit_loaded(true)
        }
        getnameDetails()
    }, [])

    const getnameDetails = async () => {
        const response = await getDataFromApi(getonboardcmp + `?userId=${user?.user?.id}`, 1, 1)
        if (response && response.status == 200 && response.data != null) {
            setnameDetails(response.data)
            console.log("adctitrve", response.data)
            var comOpt = []
            response.data.map((opt) => {
                var cp = []
                cp['id'] = opt.id
                cp['label'] = opt.companyName
                if (user.roles === 'Company Admin') {
                    let emails = opt?.companyVo?.dealTeams.split(",")
                    if (emails.includes(user.email)) {
                        comOpt.push(cp)
                    }
                }
                else {
                    comOpt.push(cp)
                }
            })
            setcompanyoptions(comOpt)
        }
        setIsCompanyLoaded(false)
        setTimeout(() => {
            setIsCompanyLoaded(true)
        }, 1)
    }

    const getsingleUser = async () => {
        var query = ''

        const response = await getDataFromApi(getsingleUserDetails + userid, 1)
        if (response && response.status == 200 && response.data != null) {
            setsingleUser(response.data)
            console.log('singleUser', response.data)
            if (userid) {
                var userdata = response.data
                setFormData((formData) => ({
                    ...formData,
                    ['id']: userdata.id,
                    ['username']: userdata.username,
                    ['department']: userdata.department,
                    ['mobilePhone']: userdata.mobilePhone,
                    ['email']: userdata.email,
                    ['roles']: userdata.roles,
                    ['companyName']: userdata.companyId,
                    ['status']: userdata.status,
                    ['designation']: userdata.designation,
                    ['password']: userdata.password,
                    ['presignedurl']: userdata.presignedurl,
                    ['fileId']: userdata.fileId,
                    ['permissionId']: userdata.permissionId,
                }))

                setTimeout(() => {
                    set_is_edit_loaded(true)
                }, 500)
            }
        }

        /*if (response && response.data.code && response.data.data != null) {
           if (userid) {
               setFormData((formData) => ({
                    ...formData,
                    ['id']: cus.id,
                    ['username']: cus.username,
                    ['department']: cus.department,
                    ['mobilePhone']: cus.mobilePhone,
                    ['email']: cus.email,
                    ['roles']: cus.roles,
                    ['companyName']: cus.companyName,
                    ['status']: cus.status,
                    ['designation']: cus.designation,

                }))
            }
        }*/
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
    }

    return is_edit_loaded ? (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'User Management' }]} />
                <div className="breadnavigation">
                    Home / User Management / {userid ? 'Update User' : 'Add User'}
                </div>
            </div>
            <div className="rightalign_btn">
                <Button
                    variant="contained"
                    color="primary"
                    className="whitebg"
                    onClick={() => navigate('/usermanagement')}
                >
                    User List
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
                        <Grid
                            item
                            lg={8}
                            md={8}
                            sm={12}
                            xs={12}
                            className="bottomMargin"
                        >
                            <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Basic Information </Title>
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
                                        onChange={(e)=>formdataValueChange(e)}
                                        label="Enter Id"
                                        placeholder="Enter Id"
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    /> */}
                                        <label>Name</label>
                                        <TextField
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={formdata.username || ''}
                                            onChange={(e) =>
                                                formdataValueChange(e)
                                            }
                                            label="Enter Firstname"
                                            placeholder="Enter Firstname"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                        <label>Department</label>
                                        <AutoComplete
                                            defaultValue={getSelectedItem(
                                                formdata.department,
                                                departmentopt
                                            )}
                                            className="dropdown"
                                            fullWidth
                                            options={departmentopt}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changeDropdownValue(
                                                    'department',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.department}
                                                    name="department"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                        <label>Email Id</label>
                                        <TextField
                                            autoComplete="new-password"
                                            className="required"
                                            label="Enter Email Id"
                                            placeholder="Enter Email Id"
                                            value={formdata.email || ''}
                                            onChange={(e) =>
                                                formdataValueChange(e)
                                            }
                                            type="email"
                                            name="email"
                                            id="email"
                                            fullWidth
                                            validators={['required', 'isEmail']}
                                            errorMessages={[
                                                'this field is required',
                                                'Invalid email',
                                            ]}
                                        />
                                        <label>Phone Number</label>
                                        <TextField
                                            fullWidth
                                            label="Enter Phone Number"
                                            ceholder="Enter Phone Number"
                                            type="text"
                                            name="mobilePhone"
                                            value={formdata.mobilePhone || ''}
                                            onChange={(e) =>
                                                formdataValueChange(e)
                                            }
                                            validators={[
                                                'required',
                                                'isNumber',
                                                'matchRegexp:^[0-9]{10}$',
                                            ]}
                                            errorMessages={[
                                                'this field is required',
                                                'Only Numbers allowed',
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <label>Role</label>
                                        <AutoComplete

                                            defaultValue={getSelectedItem(
                                                formdata.roles,
                                                filteredOptions
                                            )}
                                            className="dropdown"
                                            fullWidth
                                            options={filteredOptions}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changeDropdownValue(
                                                    'roles',
                                                    value
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.roles}
                                                    name="roles"
                                                    placeholder="Select"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'this field is required',
                                                    ]}
                                                />
                                            )}
                                        />
                                        {
                                            isCompanyLoaded && (
                                                <>
                                                    {(formdata.roles === 'Company Admin' || formdata.roles === 'Company User' ||formdata.roles === 'Shareholder') ||
                                                        (userRole === 'Company Admin' || userRole === 'Company User') ? (
                                                        <>
                                                            <label>Company Name</label>
                                                            <AutoComplete
                                                                disabled={(userRole === 'Company Admin' || userRole === 'Company User')}
                                                                className="dropdown"
                                                                fullWidth
                                                                options={companyoptions}
                                                                defaultValue={(userid ? getSelectedItem(
                                                                    formdata.companyName,
                                                                    companyoptions
                                                                ) : userRole === 'Company User' || userRole === 'Company Admin') ? companyoptions[0] : null}
                                                                getOptionLabel={(option) => option.label}
                                                                onChange={(event, value) => changedropdownvalue('companyName', value)}
                                                                // {...(userid) && { value: formdata.companyName }}
                                                                renderInput={(params) => (
                                                                    <>
                                                                        {
                                                                            userid ? (
                                                                                <TextField
                                                                                    {...params}
                                                                                    className="required"
                                                                                    label="Select"
                                                                                    name="companyName"
                                                                                    placeholder="Select"
                                                                                />
                                                                            ) : (
                                                                                <TextField
                                                                                    {...params}
                                                                                    className="required"
                                                                                    label="Select"
                                                                                    name="companyName"
                                                                                    placeholder="Select"
                                                                                    value={formdata.companyName}
                                                                                    validators={['required']}
                                                                                    errorMessages={['This field is required']}
                                                                                />

                                                                            )}
                                                                    </>
                                                                )}
                                                            />
                                                        </>
                                                    ) : null}
                                                </>
                                            )}
                                        <label>Designation</label>
                                        <TextField
                                            type="text"
                                            name="designation"
                                            id="designation"
                                            value={formdata.designation || ''}
                                            onChange={(e) =>
                                                formdataValueChange(e)
                                            }
                                            label="Enter Designation"
                                            placeholder="Enter Designation"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        className="bottomMargin"
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={state.checkedA}
                                                    onChange={handleChange(
                                                        'checkedA'
                                                    )}
                                                    value="checkedA"
                                                />
                                            }
                                            label="Send them an credential by email so they can log in immediately and reset password."
                                        />
                                    </Grid>
                                </Grid>
                            </StyledCard>
                            {/* <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Module permissions</Title>
                                </CardHeader>
                                <StyledTable className="customtable noborder textcenter">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Dashboard</TableCell>
                                            <TableCell>
                                                User management
                                            </TableCell>
                                            <TableCell>Documents</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {modulePermission.map(
                                            (modulePermission, index) => (
                                                <TableRow key={index}>
                                                    <TableCell
                                                        align="left"
                                                        className="imgCell"
                                                    >
                                                        {modulePermission.role}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        modulePermission.dashboard
                                                                    }
                                                                />
                                                            }
                                                            label=""
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        modulePermission.user
                                                                    }
                                                                />
                                                            }
                                                            label=""
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        modulePermission.documents
                                                                    }
                                                                />
                                                            }
                                                            label=""
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </StyledTable>
                            </StyledCard> */}
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
                                                formdataValueChange(e)
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
                                    <Title>Profile Upload</Title>
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
                                            name="logouploadimg"
                                            id="logouploadimg"
                                            onChange={(e)=>onFileChange(e)}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />*/}
                                            <input
                                                type="file"
                                                name="logouploadimg"
                                                onChange={(e) =>
                                                    onFileChange(e)
                                                }
                                            />
                                            <div className="logo">
                                                {console.log(
                                                    'formdata807',
                                                    formdata
                                                )}
                                                {previewImg ? (
                                                    <img src={previewImg} />
                                                ) : formdata.presignedurl ? (
                                                    <img
                                                        src={
                                                            formdata.presignedurl
                                                        }
                                                    />
                                                ) : (
                                                    'Profile'
                                                )}
                                            </div>
                                            <Typography>
                                                Upload Image
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </StyledCard>
                            {/* <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Lead permissions</Title>
                                </CardHeader>
                                <StyledTable className="customtable noborder textcenter">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Create Lead</TableCell>
                                            <TableCell>Progress</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leadPermission.map(
                                            (leadPermission, index) => (
                                                <TableRow key={index}>
                                                    <TableCell
                                                        align="left"
                                                        className="imgCell"
                                                    >
                                                        {leadPermission.role}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        leadPermission.createlead
                                                                    }
                                                                />
                                                            }
                                                            label=""
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        leadPermission.progress
                                                                    }
                                                                />
                                                            }
                                                            label=""
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </StyledTable>
                            </StyledCard> */}
                        </Grid>
                    </Grid>
                    <div className="formbuttons">
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            className="whitebg"
                        >
                            {userid ? 'Update' : 'Save'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="whitebg"
                            onClick={() => navigate('/usermanagement')}
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
export default Usermanagementadd
