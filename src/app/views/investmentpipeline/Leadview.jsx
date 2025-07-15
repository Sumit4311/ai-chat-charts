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
import locationcity from "../../image/locationcity.svg"
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
import { getSingleCompany, getAllUserDetails } from "../../services/api";
import { getDataFromApi } from '../../services/CommonService';
import { useParams } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import { getProfile } from 'app/services/CommonObject'

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

const Leadview = () => {

    const theme = useTheme()
    const navigate = useNavigate()
    let { id } = useParams()
    let newid = id ? id : ''
    const [companyDeatils, setcompanyDeatils] = useState([])
    const [formdata, setFormData] = useState({ id: "", emailId: "", phoneNumber: "", country: "", city: "", address: "", managed_By: "", registerDate: "", websiteUrl: "", dealTeams: "", name: "", category: "", currentValue: "", proposedshare: "", investmentValue: "", status: "true", title: "", content: "", logoUrl: "", prospetive: "", investmentType: "", presignedurl: "" })
    const [userDetails, setuserDetails] = useState([])
    const [mguseroptions, setmguseroptions] = useState([])
    const user = useAuth()
    const getcompanyDeatils = async () => {
        var query = ""

        const response = await getDataFromApi(
            getSingleCompany + id,
            1
        )
        console.log(response)
        setcompanyDeatils(response.data)
        if (response && response.status == 200 && response.data != null) {
            if (id) {
                var companyDeatils = response.data

                setFormData((formData) => ({
                    ...formData,
                    ['id']: companyDeatils.id,
                    ['name']: companyDeatils.name,
                    ['department']: companyDeatils.department,
                    ['mobilePhone']: companyDeatils.mobilePhone,
                    ['email']: companyDeatils.email,
                    ['roles']: companyDeatils.roles,
                    ['companyName']: companyDeatils.companyName,
                    ['status']: companyDeatils.status,
                    ['designation']: companyDeatils.designation,
                    ['category']: companyDeatils.category,
                    ['registerDate']: companyDeatils.registerDate,
                    ['city']: companyDeatils.city,
                    ['state']: companyDeatils.state,
                    ['country']: companyDeatils.country,
                    ['zipcode']: companyDeatils.zipcode,
                    ['address']: companyDeatils.address,
                    ['content']: companyDeatils.content,
                    ['managed_By']: companyDeatils.managed_By,
                    ['websiteUrl']: companyDeatils.websiteUrl,
                    ['currentValue']: companyDeatils.currentValue,
                    ['dealTeams']: companyDeatils.dealTeams,
                    ['investmentValue']: companyDeatils.investmentValue,
                    ['presignedurl']: companyDeatils.presignedurl,
                }))
            }
        }
    }


    useEffect(() => {
        getuserDetails()
        if (id) {
            getcompanyDeatils();
        } else {

        }

    }, [])

    const getuserDetails = async () => {

        var query = ""
        const response = await getDataFromApi(getAllUserDetails + `?userId=${user?.user?.id}`, 1);
        if (response && response.status == 200 && response.data != null) {
            setuserDetails(response.data);
            console.log('userDetails', response.data);

            var mguseropts = [];
            response.data.map((user, i) => {
                var mg = []
                mg['id'] = user.email
                mg['label'] = user.username + '(' + user.email + ')'
                mguseropts.push(mg)
            })

            setmguseroptions(mguseropts)
            console.log('user data', response);
        }


    }

    return (
        <Container>
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[

                        { name: 'Lead Detail' },
                    ]}
                />
                <div className="breadnavigation">Investment Pipeline/ Company Detail</div>
            </div>
            <div className="rightalign_btn">
                <Button variant="contained" color="primary" className="whitebg" onClick={() => navigate('/investmentpipeline/lead')}>
                    Lead List
                </Button>
            </div>
            <Box width="100%" className="box">
                <Grid container spacing={3} >
                    <Grid item lg={8} md={8} sm={12} xs={12} className="leftGrid">
                        <div className="singleStyledCard">
                            <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>Overview</Title>
                                </CardHeader>
                                <div className="divInner">
                                    <SubTitle>About Company</SubTitle>
                                    <div className="contentDetail">
                                        <Typography> {formdata.content}</Typography>
                                    </div>
                                </div>
                            </StyledCard>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className="bottomMargin">
                        <StyledCard elevation={6}>
                            <CardHeader className="cardheader">
                                <Title>Basic Details</Title>
                            </CardHeader>
                            <div className="divInner">
                                <div className="profdetails userprofile userview custom-input">
                                    {formdata?.presignedurl ?
                                        <img src={formdata.presignedurl}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = locationcity;
                                            }}
                                        />
                                        : 
                                            <span className="profileInitial">
                                                {getProfile(formdata?.name)?.toUpperCase()}</span>
                                            }
                                    <div className="profName">{formdata?.name}</div>
                                    <Small>{formdata.name}</Small>
                                </div>
                                <div className="basicdetailListing">
                                    <div className="detailListinginner">
                                        <span>Category</span><span>: {formdata.category}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Registered Date</span><span>: {formdata.registerDate}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Status</span><span>: {formdata.status}</span>
                                    </div>
                                </div>
                            </div>
                        </StyledCard>
                        <StyledCard elevation={6}>
                            <CardHeader className="cardheader">
                                <Title>Basic Details</Title>
                            </CardHeader>
                            <div className="divInner">
                                <div className="basicdetailListing">
                                    <div className="detailListinginner">
                                        <span>Company Name</span><span>: {formdata.name}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Managed By</span><span>: <div className="viewprofiledetails">{formdata.managed_By}</div></span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Website</span><span>: <div className="viewprofiledetails">{formdata.websiteUrl}</div></span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Current Valuation</span><span>: {formdata.currentValue}</span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Deal Teams</span><span>: <div className="viewprofiledetails">{formdata.dealTeams}</div></span>
                                    </div>
                                    <div className="detailListinginner">
                                        <span>Investment Value</span><span>: {formdata.investmentValue}</span>
                                    </div>
                                </div>
                            </div>
                        </StyledCard>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    )
}

export default Leadview