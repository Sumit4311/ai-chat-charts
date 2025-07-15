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
import adminUser from "../../image/adminUser.svg"
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
import Typography from '@mui/material/Typography';
import { Small } from 'app/components/Typography'
import profImg from "../../image/profImg.svg"
import { postDataFromApi, getDataFromApi, putDataFromApi } from '../../services/CommonService';
import { getsingleUserDetails, getAllCompanyDetails, updateUser, getonboardcmp } from '../../services/api';
import { useParams } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import { departmentopt, rolesopt, modulePermission, leadPermission, getProfile } from '../../services/CommonObject';

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
    color: "#FFF",
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

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '1rem',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '15px',
    display: 'block',
}))

const Usermanagementview = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    let { userid } = useParams()
    let { myprofile } = useParams()
    let newuserid = userid ? userid : ''
    const [singleUser, setsingleUser] = useState([])
    const [formdata, setFormData] = useState({ id: "", presignedurl: "", username: "", department: "", email: "", roles: "", companyName: "", designation: "", mobilePhone: "", status: "active" })
    const [companyoptions, setcompanyoptions] = useState([])
    const [nameDetails, setnameDetails] = useState([])
    const [fileUrl, setFileUrl] = useState('')
    const [previewImg, setpreviewImg] = useState('')

    const getsingleUser = async () => {
        var query = ""
        const response = await getDataFromApi(
            getsingleUserDetails + userid,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setsingleUser(response.data);
            if (userid) {
                var user = response.data
                setFormData((formData) => ({
                    ...formData,
                    ['id']: user.id,
                    ['username']: user.username,
                    ['department']: user.department,
                    ['mobilePhone']: user.mobilePhone,
                    ['email']: user.email,
                    ['roles']: user.roles,
                    ['companyName']: user.companyName,
                    ['status']: user.status,
                    ['designation']: user.designation,
                    ['presignedurl']: user.presignedurl
                }))
            }
        }
    }

    const getnameDetails = async () => {
        var query = ""
        const response = await getDataFromApi(getAllCompanyDetails, 1);
        if (response && response.status == 200 && response.data != null) {
            setnameDetails(response.data);
            var companyopts = [];
            response.data.map((company, i) => {
                var cp = [];
                cp['id'] = company.id
                cp['label'] = company.name
                companyopts.push(cp)
            })
            setcompanyoptions(companyopts)
        }
    }

    useEffect(() => {
        if (userid) {
            getsingleUser();
        } else {
        }
        getnameDetails();
    }, [])

    const onFileChange = (event) => {
        var file = event.target.files[0]
        setFileUrl(file)
        handleSubmit(file)
        setpreviewImg(file ? URL.createObjectURL(file) : '')
    }

    const handleSubmit = async (e) => {
        // e.preventDefault()
        var existingpassword = localStorage.getItem('Authtoken')
        var formData = new FormData()
        formData.append('username', formdata.username)
        formData.append('department', formdata.department)
        formData.append('mobilePhone', formdata.mobilePhone)
        formData.append('email', formdata.email)
        formData.append('roles', formdata.roles)
        formData.append('companyName', formdata.companyName)
        formData.append('status', formdata.status)
        formData.append('designation', formdata.designation)
        formData.append('id', userid)
        if (e) {
            formData.append(
                'uploadDoc',
                e
            )
        }
        console.log('edit response', formData)
        const response = await putDataFromApi(updateUser, formData, 1, '', 1)
        console.log('edit response', response.data)
        // if (response && response.status == 200) {
        //     if (userid) {
        //         setalertMessage('User Updated Successfully')
        //     } else {
        //         setalertMessage('User Added Successfully')
        //     }
        //     setalert(true)
        //     setalertType('success')
        //     setpreviewImg('')
        // } else {
        //     setalertMessage('error...')
        //     setalert(true)
        //     setalertType('error')
        //     setpreviewImg('')
        // }
    }

    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: myprofile ? 'My Profile' : 'User Detail' },
                    ]}
                />
                <div className="breadnavigation">Home {myprofile ? '/ My Profile' : "/ User Management / User Detail"} </div>
            </div>
            <div className="rightalign_btn">
                {myprofile ? '' : <Button variant="contained" color="primary" className="whitebg" onClick={() => navigate('/usermanagement')}>
                    User List
                </Button>}
            </div>
            <Box width="100%" className="box">
                <Grid container spacing={3} >
                    <Grid item lg={myprofile ? 12 : 5} md={myprofile ? 12 : 5} sm={12} xs={12} className={myprofile ? "fullwidthcol bottomMargin" : "bottomMargin"}>
                        <StyledCard elevation={6}>
                            <CardHeader className="cardheader">
                                <Title>{myprofile ? 'My Profile' : 'User Details'}</Title>
                            </CardHeader>
                            <div className="divInner">
                                <div className="profdetails userprofile userview custom-input">
                                    {!window?.location?.hash?.includes("usermanagement/view") && <input
                                        type="file"
                                        //  className='main-profile-img'
                                        name="logouploadimg"
                                        onChange={(e) =>
                                            onFileChange(e)
                                        }
                                    />
                                    }
                                    {previewImg ? (
                                        <img src={previewImg} />
                                    ) : <>
                                        {formdata?.presignedurl ?
                                            <img src={formdata.presignedurl} 
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = adminUser;
                                            }}
                                            />
                                            :
                                            // : formdata.username ?
                                                <span className="profileInitial">
                                                    {getProfile(formdata?.username)?.toUpperCase()}</span>
                                                // : <img src={profImg} />
                                                }
                                    </>}
                                    <div className="profName">{formdata?.username}</div>
                                    <Small>{formdata.designation}</Small>
                                </div>
                                <CardHeader className="cardheader">
                                    <Title>Basic Details</Title>
                                </CardHeader>

                                <div className="divInner">
                                    <div className="basicdetailListing">
                                        {window?.location?.hash?.includes("user/profile") ?
                                            <Grid container spacing={3}>
                                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                                    <div className="detailListinginner">
                                                        <span>Company Name</span><span>: {formdata.companyName}</span>
                                                    </div>
                                                    <div className="detailListinginner">
                                                        <span>Name</span><span>: {formdata.username}</span>
                                                    </div>
                                                    <div className="detailListinginner">
                                                        <span>Email</span><span>: {formdata.email}</span>
                                                    </div>
                                                    <div className="detailListinginner">
                                                        <span>Phone Number</span><span>: {formdata.mobilePhone}</span>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                                    <div className="detailListinginner">
                                                        <span>Status</span><span>: {formdata.status}</span>
                                                    </div>
                                                    <div className="detailListinginner">
                                                        <span>Roles</span><span>: {formdata.roles}</span>
                                                    </div>
                                                    <div className="detailListinginner">
                                                        <span>Department</span><span>: {formdata.department}</span>
                                                    </div>
                                                    <div className="detailListinginner">
                                                        <span>Designation</span><span>: {formdata.designation}</span>
                                                    </div>
                                                </Grid>
                                            </Grid> :
                                            <><div className="detailListinginner">
                                                <span>Company Name</span><span>: {formdata.companyName}</span>
                                            </div>
                                                <div className="detailListinginner">
                                                    <span>Name</span><span>: {formdata.username}</span>
                                                </div>
                                                <div className="detailListinginner">
                                                    <span>Email</span><span>: <div className="viewprofiledetails">{formdata.email}</div></span>
                                                </div>
                                                <div className="detailListinginner">
                                                    <span>Phone Number</span><span>: {formdata.mobilePhone}</span>
                                                </div>
                                                <div className="detailListinginner">
                                                    <span>Status</span><span>: {formdata.status}</span>
                                                </div>
                                                <div className="detailListinginner">
                                                    <span>Roles</span><span>: {formdata.roles}</span>
                                                </div>
                                                <div className="detailListinginner">
                                                    <span>Department</span><span>: {formdata.department}</span>
                                                </div>
                                                <div className="detailListinginner">
                                                    <span>Designation</span><span>: {formdata.designation}</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>

                        </StyledCard>
                        {/* {!window?.location?.hash?.includes("user/profile") &&
                            <Grid item lg={2} md={2} sm={6} xs={6}>
                                <Button variant="contained" color="primary" className="whitebg" type="button" onClick={() => navigate('/usermanagement/update/' + userid)}>
                                    Edit
                                </Button>
                            </Grid>
                        } */}

                    </Grid>
                    {myprofile ? '' :
                        <Grid item lg={7} md={7} sm={12} xs={12} className="leftGrid leadmodulepermission">
                            {/* <StyledCard elevation={6}>
                            <div className="divInner">
                                        <div className="profdetails userprofile">
                                            <div className="profName">{formdata.username}</div>
                                            <Small>{formdata.designation}</Small>
                                        </div>
                            </div>
                        </StyledCard> */}
                            {/* <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Module permissions</Title>
                                </CardHeader>
                                <StyledTable className="customtable noborder textcenter">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Dashboard</TableCell>
                                            <TableCell>User management</TableCell>
                                            <TableCell>Documents</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {modulePermission.map((modulePermission, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left" className="imgCell">
                                                    {modulePermission.role}
                                                </TableCell>
                                                <TableCell align="left" >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={modulePermission.dashboard}

                                                            />
                                                        }
                                                        label=""
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={modulePermission.user}

                                                            />
                                                        }
                                                        label=""
                                                    />
                                                </TableCell>
                                                <TableCell align="left" >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={modulePermission.documents}

                                                            />
                                                        }
                                                        label=""
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </StyledTable>
                            </StyledCard> */}
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
                                        {leadPermission.map((leadPermission, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left" className="imgCell">
                                                    {leadPermission.role}
                                                </TableCell>
                                                <TableCell align="left" >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={leadPermission.createlead}

                                                            />
                                                        }
                                                        label=""
                                                    />
                                                </TableCell>
                                                <TableCell align="left" >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={leadPermission.progress}

                                                            />
                                                        }
                                                        label=""
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </StyledTable>
                            </StyledCard> */}
                        </Grid>}
                </Grid>
            </Box>
        </Container>
    )
}
export default Usermanagementview


