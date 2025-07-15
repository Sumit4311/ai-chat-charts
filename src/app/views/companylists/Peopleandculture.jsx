import React, { useState, useEffect } from 'react'
import { Grid, Card, Fab, Tabs, Tab } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import UserImage from '../../image/peoplelistimg.png'
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
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import Typography from '@mui/material/Typography'
import Revenue from '../../image/revenue.svg'
import ReactEcharts from 'echarts-for-react'
import Icon_countries from '../../image/Seven-countries-cohorts-menu.svg'
import people from '../../image/people.svg'
import {
    getPeopleDetails,
    getPeopleByGender,
    getPeopleByDepart,
    getPeopleByAge,
    getAverageRenuemeration,
    getAllEmployeeDetails,
    getpeopledetailsinfo

} from '../../services/api'
import { getDataFromApi, MainUrl } from '../../services/CommonService'
import { yearopt, thousandsOf, DataFormater, formatValueWithCurrency, getCommas } from '../../services/CommonObject'
import { Autocomplete } from '@mui/lab'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}
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

const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wra,p',
    alignItems: 'center',
}))

const FabIcon = styled(Fab)(() => ({
    width: '44px !important',
    height: '44px !important',
    boxShadow: 'none !important',
}))

const H3 = styled('h3')(({ textcolor }) => ({
    margin: 0,
    fontWeight: '500',
    marginLeft: '12px',
    color: textcolor,
}))

const H1 = styled('h1')(({ theme }) => ({
    margin: 0,
    flexGrow: 1,
    color: theme.palette.text.secondary,
}))

const IconBox = styled('div')(({ theme }) => ({
    width: 16,
    height: 16,
    overflow: 'hidden',
    borderRadius: '300px ',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    '& .icon': { fontSize: '14px' },
}))

const Span = styled('span')(({ textcolor }) => ({
    fontSize: '13px',
    color: textcolor,
    marginLeft: '4px',
}))

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px !important',
    background: '#0E0E23',
    [theme.breakpoints.down('sm')]: {
        padding: '0px !important',
    },
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

const StyledTable = styled(Table)(({ theme }) => ({
    color: '#FFF',
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: '15px',
                color: '#fff',
                textTransform: 'capitalize',
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

const Commercialbusiness = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    let { companyId } = useParams()
    const height = '350px'
    const [peopleDetails, setpeopleDetails] = useState([])
    const [peopleByGender, setpeopleByGender] = useState([])
    const [peopleByDepart, setpeopleByDepart] = useState([])
    const [peopleByAge, setpeopleByAge] = useState([])
    const [averageRenuemeration, setaverageRenuemeration] = useState([])
    const [genderoptions, setgenderoptions] = useState([])
    const [departoptions, setdepartoptions] = useState([])
    const [renuemeration, setrenuemeration] = useState([])
    const [renuemerationyear, setrenuemerationyear] = useState([])
    const [peopleAgeopt, setpeopleAgeopt] = useState([])

    const currYear = new Date().getFullYear()
    const [formdata, setFormData] = useState({ year: currYear, yearGender: currYear, yearDepartment: currYear, yearAge: currYear, })
    const [currency] = useOutletContext();
    const [tabDataValue, setTabDataValue] = useState({
        genderoptions: "genderoptions_0",
        departoptions: "departoptions_0",
        peopleAgeopt: "peopleAgeopt_0",
        averageRenumaration: "averageRenumaration_0",
    })
    var companyLabel = ''
    var companyopt = JSON.parse(localStorage.getItem('companyDet'))

    companyopt &&
        companyopt.map((opt) => {
            if (opt.id == companyId) {
                companyLabel = opt.name
            }
        })

    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.label
        } else {
            var value = ''
        }

        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
    }

    const optionbyGender = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: 'bottom',
            textStyle: {
                color: 'rgba(255,255,255,0.5)',
            },
            itemGap: 10,
            icon: 'circle',
        },
        series: [
            {
                name: 'Demographics by gender',
                type: 'pie',
                radius: ['30%', '80%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },

                labelLine: {
                    show: false,
                },
                data: genderoptions,
            },
        ],
    }

    const optionbyDepartment = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            bottom: '0%',
            textStyle: {
                color: 'rgba(255,255,255,0.5)',
            },
            itemGap: 10,
            icon: 'circle',
        },
        series: [
            {
                name: 'Demographics by department',
                type: 'pie',
                radius: ['30%', '60%'],
                center: ['50%', '30%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },

                labelLine: {
                    show: false,
                },
                data: departoptions,
            },
        ],
    }

    const optionbyAge = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: 'bottom',
            textStyle: {
                color: 'rgba(255,255,255,0.5)',
            },
            itemGap: 10,
            icon: 'circle',
        },
        series: [
            {
                name: 'Demographics by age',
                type: 'pie',
                radius: ['30%', '80%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },

                labelLine: {
                    show: false,
                },
                data: peopleAgeopt,
            },
        ],
    }

    const averageRenumaration = {
        tooltip: {
            trigger: 'item',
        },
        grid: {
            top: '5%',
            bottom: '10%',
            left: '5%',
            right: '5%',
        },
        xAxis: {
            type: 'category',
            data: renuemerationyear,
            axisLabel: {
                color: '#fff',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff',
                // formatter: '{value} ' + currency
                // formatter :(value)=>{
                //     return DataFormater (value) + ' '+ currency
                // },
                formatter: (value) => {
                    return formatValueWithCurrency(value, currency);
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 0.2,
                },
            },
        },
        series: [
            {
                data: renuemeration,
                type: 'line',
                lineStyle: {
                    width: 5,
                },
            },
        ],
    }

    const peopleList = [
        {
            id: 1,
            name: 'John Doe',
            role: 'Managing director',
        },
        {
            id: 2,
            name: 'Lorem Ipsum',
            role: 'Director',
        },
        {
            id: 3,
            name: 'Ranchi Mac',
            role: 'Marketing Officer',
        },
        {
            id: 4,
            name: 'Waget Rec',
            role: 'Assistant director',
        },
        {
            id: 5,
            name: 'Tom Steven',
            role: 'Accountant',
        },
        {
            id: 6,
            name: 'Rita Roy',
            role: 'Managing director',
        },
        {
            id: 7,
            name: 'Tipsy Singh',
            role: 'Director',
        },
        {
            id: 8,
            name: 'French Mac',
            role: 'Marketing Officer',
        },
        {
            id: 9,
            name: 'Ronit Singh',
            role: 'Assistant director',
        },
        {
            id: 10,
            name: 'Tom Cruise',
            role: '',
        },
    ]

    useEffect(() => {
        getpeopleDetails()
        // getpeopleByGender()
        // getpeopleByDepart()
        // getpeopleByAge()
        getaverageRenuemeration()
    }, [currency, companyId])
    useEffect(() => {
        getpeopleByGender()
    }, [formdata.yearGender, companyId, currency])



    useEffect(() => {
        getpeopleByAge()
    }, [formdata.yearAge, companyId, currency])



    useEffect(() => {
        getpeopleByDepart()
    }, [formdata.yearDepartment, companyId, currency])



    const getpeopleDetails = async () => {
        const response = await getDataFromApi(
            getpeopledetailsinfo + '?companyId=' + companyId,
            1,

        )
        if (response && response.status == 200 && response.data.length > 0) {
            setpeopleDetails(response.data)
        } else {
            setpeopleDetails([
                {
                    presignedUrl: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                },
                {
                    presignedUrl: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                },
                {
                    presignedUrl: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                },
                {
                    presignedUrl: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                },
                {
                    presignedUrl: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                },

            ])
        }
    }
    const getpeopleByGender = async () => {
        var query = ''
        const response = await getDataFromApi(
            getPeopleByGender + '?companyId=' + companyId + '&year=' + formdata.yearGender,
            1,
            1

        )

        if (response && response.status == 200 && response.data.femalemalepercentage) {
            setpeopleByGender(response.data)
            var genderopts = [
                {
                    value: (
                        Math.round(response.data.malepercentage * 100) / 100
                    ).toFixed(2),
                    name: 'Male',
                },
                {
                    value: (
                        Math.round(response.data.femalemalepercentage * 100) / 100
                    ).toFixed(2),
                    name: 'Female',
                },
            ]
            console.log()
            setgenderoptions(genderopts)
        } else {
            var genderopts = [
                { value: 0, name: 'Male' },
                { value: 0, name: 'Female' },
            ]
            setgenderoptions(genderopts)
        }
    }
    const getpeopleByDepart = async () => {
        var query = ''
        const response = await getDataFromApi(
            getPeopleByDepart + '?companyId=' + companyId + '&year=' + formdata.yearDepartment,
            1,
            1

        )
        if (response && response.status == 200 && response.data.length > 0) {
            setpeopleByDepart(response.data)
            var departopts = []
            Object.entries(response.data[0]).map(([key, value]) => {
                var st = { value: value, name: key }
                //st['value']=value
                //st['name']=key
                departopts.push(st)
            })

            setdepartoptions(departopts)
        } else {
            setdepartoptions([{ value: 0, name: 'Demographics By Department' }])
        }
    }
    const getpeopleByAge = async () => {
        var query = ''
        const response = await getDataFromApi(
            getPeopleByAge + '?companyId=' + companyId + '&year=' + formdata.yearAge,
            1,
            1

        )
        if (response && response.status == 200 && response.data.length > 0) {
            setpeopleByAge(response.data.data)
            var departopts = []
            Object.entries(response.data[0]).map(([key, value]) => {
                var st = { value: value, name: key }
                //st['value']=value
                //st['name']=key
                departopts.push(st)
            })
            setpeopleAgeopt(departopts)
        } else {
            var peopleage = [
                { value: 0, name: 'Age 25-35' }, //ages
                { value: 0, name: 'Age 35-45' }, //as
                { value: 0, name: 'Age 45-55' }, //unl
            ]
            setpeopleAgeopt(peopleage)
        }
    }
    const getaverageRenuemeration = async () => {
        var query = ''
        const response = await getDataFromApi(
            getAverageRenuemeration + '?companyId=' + companyId,
            1,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setaverageRenuemeration(response.data)
            const updated = response.data.sort((a, b) => a.year - b.year);

            var renuemerationopts = []
            response.data.map((renuemeration, i) => {
                renuemerationopts.push(renuemeration.averagerenuemeration)
            })
            setrenuemeration(renuemerationopts)


            var renuemerationyearopts = []
            response.data.map((renuemeration, i) => {
                renuemerationyearopts.push(renuemeration.year)
            })
            setrenuemerationyear(renuemerationyearopts)
        } else {
            var renuemerationopts = []
            setrenuemeration(renuemerationopts)
            var renuemerationyearopts = [new Date().getFullYear()]
            setrenuemerationyear(renuemerationyearopts)
        }
    }
    const handleTabsChange = (event, newValue) => {
        setTabDataValue((formData) => ({
            ...formData,
            [newValue]: event,
        }))
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'People & Culture' }]} />
                <div className="breadnavigation">
                    Home / Company lists
                    {companyLabel ? ' / ' + companyLabel : ''} / Dashboard
                    /People & Culture{' '}
                </div>
            </div>
            <div className="peopleList">
                {peopleDetails &&
                    peopleDetails.map((employee, index) => {
                        return (
                            <div className="snglepeopleList" key={employee.id}>
                                <img src={employee?.presignedUrl} alt="" />

                                <div className="pname">
                                    {employee?.employeename}
                                </div>
                                <div className="desig">
                                    {employee?.designation}
                                </div>
                            </div>

                        )
                    })}
                {/* {peopleDetails.map((peopleDetails, index) => (
                    <div className="snglepeopleList" key={index}>
                        {console.log(
                            'peopleDetails123',
                            peopleDetails.imagefield
                        )}
                        <img
                            src={
                                peopleDetails.imagefield
                                    ? MainUrl + '/' + peopleDetails.imagefield
                                    : people
                            }
                        />
                        // <div className="pname">{peopleDetails.name}</div>
                        // <div className="desig">{peopleDetails.role}</div>
                    </div>
                ))} */}
            </div>
            <Grid container spacing={3}>
                <Grid item lg={4} md={4} sm={12} xs={12} className="noPadding">
                    <StyledCard elevation={6} className="echarts paddingbottom">
                        <CardHeader className="cardheader">
                            <Title>Demographics by gender</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.genderoptions}
                            onChange={(e, value) => handleTabsChange(value, 'genderoptions')}
                            aria-label="basic tabs example"
                            className="whitebg"
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                '& .MuiTabScrollButton-root': {
                                    color: 'white',
                                },
                            }}
                        >
                            <Tab label="Graph" value={'genderoptions_0'} />
                            <Tab label="Table" value={'genderoptions_1'} />
                        </Tabs>
                        <ValidatorForm className="year-form">
                            <div className="year-form-inner">
                                <label>Year:</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={yearopt}
                                    defaultValue={yearopt ? yearopt[0] : null}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('yearGender', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.year}
                                            name="year"
                                            placeholder="Select"
                                        />
                                    )}
                                />
                            </div>
                        </ValidatorForm>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.genderoptions}
                                index={'genderoptions_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...optionbyGender,
                                        color: ['#0774F8', '#D43F8D'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.genderoptions}
                                index={'genderoptions_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll">
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    genderoptions.map((singleData) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData.name}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                {
                                                    genderoptions.map((singleData) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData.value}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </StyledTable>
                                </div>
                            </TabPanel>
                        </SimpleCard>
                    </StyledCard>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="noPadding">
                    <StyledCard elevation={6} className="echarts paddingbottom">
                        <CardHeader className="cardheader">
                            <Title>Demographics by department</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.departoptions}
                            onChange={(e, value) => handleTabsChange(value, 'departoptions')}
                            aria-label="basic tabs example"
                            className="whitebg"
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                '& .MuiTabScrollButton-root': {
                                    color: 'white',
                                },
                            }}
                        >
                            <Tab label="Graph" value={'departoptions_0'} />
                            <Tab label="Table" value={'departoptions_1'} />
                        </Tabs>
                        <ValidatorForm className="year-form">
                            <div className="year-form-inner">
                                <label>Year:</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={yearopt}
                                    defaultValue={yearopt ? yearopt[0] : null}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('yearDepartment', value)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.year}
                                            name="year"
                                            placeholder="Select"
                                        />
                                    )}
                                />
                            </div>
                        </ValidatorForm>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.departoptions}
                                index={'departoptions_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...optionbyDepartment,
                                        color: [
                                            '#43215a',
                                            '#52e5d4',
                                            '#B39D47',
                                            '#D43F8D',
                                            '#FFC0CB',
                                            '#FF6347',
                                            '#0000FF',
                                            '#FFA500',
                                            '#008000',
                                            '#32CD32',



                                        ],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel style={{overflow:'auto'}}
                                value={tabDataValue.departoptions}
                                index={'departoptions_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll" style={{width:'300%'}}>
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    departoptions.map((singleData) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData.name}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                {
                                                    departoptions.map((singleData) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData.value}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </StyledTable>
                                </div>
                            </TabPanel>
                        </SimpleCard>
                    </StyledCard>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="noPadding">
                    <StyledCard elevation={6} className="echarts paddingbottom">
                        <CardHeader className="cardheader">
                            <Title>Demographics by age</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.peopleAgeopt}
                            onChange={(e, value) => handleTabsChange(value, 'peopleAgeopt')}
                            aria-label="basic tabs example"
                            className="whitebg"
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                '& .MuiTabScrollButton-root': {
                                    color: 'white',
                                },
                            }}
                        >
                            <Tab label="Graph" value={'peopleAgeopt_0'} />
                            <Tab label="Table" value={'peopleAgeopt_1'} />
                        </Tabs>
                        <ValidatorForm className="year-form">
                            <div className="year-form-inner">
                                <label>Year:</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={yearopt}
                                    defaultValue={yearopt ? yearopt[0] : null}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('yearAge', value)


                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.year}
                                            name="year"
                                            placeholder="Select"
                                        />
                                    )}
                                />
                            </div>
                        </ValidatorForm>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.peopleAgeopt}
                                index={'peopleAgeopt_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...optionbyAge,
                                        color: ['#0774F8', '#D43F8D', '#43215A', '#008000',],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel style={{overflow:'auto'}}
                                value={tabDataValue.peopleAgeopt}
                                index={'peopleAgeopt_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll" style={{width:'200%'}}>
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    peopleAgeopt.map((singleData) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData.name}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                {
                                                    peopleAgeopt.map((singleData) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData.value}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </StyledTable>
                                </div>
                            </TabPanel>
                        </SimpleCard>
                    </StyledCard>
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="noPadding"
                >
                    <StyledCard elevation={6} className="echarts paddingbottom">
                        <CardHeader className="cardheader">
                            <Title>Average renuemeration ({currency})</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.averageRenumaration}
                            onChange={(e, value) => handleTabsChange(value, 'averageRenumaration')}
                            aria-label="basic tabs example"
                            className="whitebg"
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                '& .MuiTabScrollButton-root': {
                                    color: 'white',
                                },
                            }}
                        >
                            <Tab label="Graph" value={'averageRenumaration_0'} />
                            <Tab label="Table" value={'averageRenumaration_1'} />
                        </Tabs>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.averageRenumaration}
                                index={'averageRenumaration_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...averageRenumaration,
                                        color: ['#0773f7'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel style={{overflow:'auto'}}
                                value={tabDataValue.averageRenumaration}
                                index={'averageRenumaration_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll" style={{width:'200%'}}>
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                            <TableCell align="left" className="imgCell">
                                                    <span>
                                                        Year
                                                    </span>
                                                </TableCell>
                                                {
                                                    renuemerationyear.map((singleData) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                            <TableCell align="left" className="imgCell">
                                                    <span>
                                                        Average Renuemeration
                                                    </span>
                                                </TableCell>
                                                {
                                                    renuemerationyear.map((singleData,i) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {getCommas (renuemeration[i])}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </StyledTable>
                                </div>
                            </TabPanel>
                        </SimpleCard>
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Commercialbusiness
