import React, { Fragment, useState, useEffect } from 'react'
import RowCards from './shared/RowCards'
import StatCards from './shared/StatCards'
import Campaigns from './shared/Campaigns'
import { Grid, Card } from '@mui/material'
import StatCards2 from './shared/StatCards2'
import DoughnutChart from './shared/Doughnut'
import UpgradeCard from './shared/UpgradeCard'
import { styled, useTheme } from '@mui/system'
import TopSellingTable from './shared/TopSellingTable'
import { Breadcrumb, SimpleCard } from 'app/components'
import ReactEcharts from 'echarts-for-react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    Button,
    Icon

    // Typography,
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { Small } from 'app/components/Typography'
import Box from '@mui/material/Box'
import { useOutletContext } from 'react-router-dom'
import PropTypes from 'prop-types'
import Icon_countries from '../../image/Seven-countries-cohorts-menu.svg'
import {
    yearopt,
    thousandsOf,
    getCommas,
    DataFormater,
    formatValueWithCurrency,
    getChartItemStyle,
} from '../../services/CommonObject'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Autocomplete } from '@mui/lab'
import {
    getNewsandSocialmedia,
    getRevenuequarter,
    getEbitdaquarter,
    getAllCompanyDetails,
    getallplmnt,
    getHeatMap,
    getEBITDAvalues,
    searchplmnt,
    companiesList,
    getonboardcmp,
    getRevenuePerQuarter,
    getEbitdaPerQuarter,
    getInvestmentOverview,
    getThisyearInvestment,
    shareholderRepoTable,
} from '../../services/api'
import { getDataFromApi } from '../../services/CommonService'
import {
    statusoptions,
    formatdecimals,
    formatNumbers,
} from '../../services/CommonObject'
import { useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
} from 'react-simple-maps'
import { quaterOpt } from '../../services/CommonObject'

import ReactTooltip from 'react-tooltip'
const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontWeight: '500',
    fontSize: '14px',
    color: theme.palette.primary.main,
}))

const TableRowStyle={
    color:"#fffff"
}

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}))
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    spacing: '0px',
    background: '#0E0E23',
}))
const CardHeader = styled('div')(() => ({
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
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

const subscribarList = [
    {
        id: '#12345',
        status: 'Complete',
        company: 'Google',
        stage: 'Sign agreement',
    },
    {
        id: '#13456',
        status: 'Screening',
        company: 'Microsoft',
        stage: 'Nda',
    },
    {
        id: '#25896',
        status: 'Review',
        company: 'Apple',
        stage: 'Origination',
    },
    {
        id: '#58961',
        status: 'Cancelled',
        company: 'Samsung',
        stage: 'Cancelled',
    },
    {
        id: '#75632',
        status: 'Screening',
        company: 'Amazon',
        stage: 'Nda',
    },
]

const newsarticleList = [
    {
        id: 1,
        name: 'Google unveils new 10-shade',
        content: 'The company said its new Monk SkinTone Scale replaces.',
    },
    {
        id: 2,
        name: 'Google unveils new 10-shade',
        content: 'The company said its new Monk SkinTone Scale replaces.',
    },
    {
        id: 3,
        name: 'Google unveils new 10-shade',
        content: 'The company said its new Monk SkinTone Scale replaces.',
    },
]
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const Analytics = () => {
    var currentyear = new Date().getFullYear()
    const { palette } = useTheme()
    const navigate = useNavigate()
    const user = useAuth()
    const theme = useTheme()
    const height = '350px'
    const [value, setValue] = React.useState(0)
    const [formdata, setFormData] = useState({
        ebitdYear: currentyear,
        yearCos: currentyear,
        year: currentyear,
        companyName: '',
        investmentYear: null,
        socialmediaCompany: '',
        revenueCompany: '',
        revenueOneCompany: '',
        heatMapCompany: '',
        ebitdaCompany: '',
        quarterShareHolderRepost: 'Q1',
    })
    const [companyopt, setcompanyopt] = useState([])
    const [newsAndSocialmedia, setnewsAndSocialmedia] = useState([])
    const [revenuequarter, setrevenuequarter] = useState([])
    const [allCompanyDetails, setallCompanyDetails] = useState([])
    const [allplmntDetails, setallplmntDetails] = useState([])
    const [revenueExpense, setrevenueExpense] = useState([])
    const [totalProfitLoss, setTotalProfitLoss] = useState([])
    const [revenueIncome, setrevenueIncome] = useState([])
    const [revenueDatayear, setrevenueDatayear] = useState([])
    const [revenueOneQuarter, setrevenueOneQuarter] = useState([])
    const [totalRevenue, settotalRevenue] = useState([])
    const [totalEbitda, setTotalEbitda] = useState([])
    const [ebitdaYear, setEbitdaYear] = useState([])
    const [onerevenueDatayear, setonerevenueDatayear] = useState([])
    const [heatMap, setheatMap] = useState([])
    const [TooltipContent, setTooltipContent] = useState('')
    const [EBITDAperQuarter, setEBITDAperQuarter] = useState([])
    const [ebitdaGraphopt, setebitdaGraphopt] = useState([])
    const [revenueGraphoption, setRevenueGraphOption] = useState([])
    const [ebitdaSeriesopt, setebitdaSeriesopt] = useState([])
    const [allActivecmp, setallActivecmp] = useState([])
    const [overviewActivedInvestment, setOverviewActivedInvestment] = useState(
        []
    )
    const [overviewValution, setOverviewValution] = useState([])
    const [thisyearInvestment, setThisyearInvestment] = useState([])
    const [thisyearValution, setThisyearValution] = useState([])
    const [is_edit_loaded, set_is_edit_loaded] = useState(false)
    const [currency] = useOutletContext()
    const [testing, setTesting] = useState(null)
    // var testing=null

    const [tabDataValue, setTabDataValue] = useState({
        revenueDatayear: 'revenueDatayear_0',
        onerevenueDatayear: 'onerevenueDatayear_0',
        ebitdaGraphopt: 'ebitdaGraphopt_0',
    })

    const handleChange = (event, newValue) => {
        setValue(newValue)
        setFormData({ ...formdata, investmentYear: new Date().getFullYear() })
    }

    const getRevenueExpense = (revenueExpense) => {
        const revenueExpenseData = revenueExpense?.map((value) => ({
            value,
            itemStyle: {
                color: value < 0 ? 'red' : 'green',
            },
        }))
        return revenueExpenseData
    }

    
    const getRevenueIncome = (revenueIncome) => {
        const revenueIncomeData = revenueIncome?.map((value) => ({
            value,
            itemStyle: {
                color: value < 0 ? 'red' : 'green',
            },
        }))
        return revenueIncomeData
    }
    const option = {
        grid: {
            top: '20px',
            bottom: '80px',
            left: '15%',
            right: '5%',
        },
        legend: {
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'roboto',
            },
            bottom: '0px',
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: revenueDatayear,
            axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#fff',
                fontSize: 14,
                fontFamily: 'roboto',
                rotate: 45,
            },
        },
        yAxis: {
            data: ['12K', '14K', '16K', '18K', '20K', '22K'],
            type: 'value',
            axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                // show: false
                lineStyle: {
                    color: '#fff',
                    opacity: 0.15,
                },
            },
            axisLabel: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'roboto',
                // formatter: '{value} ' + currency,
                // formatter: (value) => {
                //     return DataFormater(value) + ' ' + currency
                // },
                formatter: (value) => {
                    return formatValueWithCurrency(value, currency)
                },
                    // return  currency + ' '+DataFormater(value) 
                }
                // formatter: (value) => {
                //     return formatValueWithCurrency(value, currency);
                // },
            // },
        },
        series: [
            {
                data: getRevenueExpense(revenueExpense),
                type: 'line',
                stack: 'EXPENSES',
                name: 'EXPENSES',
                smooth: true,
                symbolSize: 4,
                lineStyle: {
                    width: 4,
                },
            },
            {
                data: getRevenueIncome(revenueIncome),
                type: 'line',
                stack: 'INCOME',
                name: 'INCOME',
                smooth: true,
                symbolSize: 4,
                lineStyle: {
                    width: 4,
                },
            },
            {
                data: getRevenueIncome(totalProfitLoss),
                type: 'line',
                stack: 'totalProfitLoss',
                name: 'TOTALPROFITLOSS',
                smooth: true,
                symbolSize: 4,
                lineStyle: {
                    width: 4,
                },
            },
        ],
    }

    function getCommasSeparated(totalRevenue) {
        return totalRevenue.map((num) => {
            num = num ? parseFloat(num) : 0
            return num.toLocaleString('en-US', {
                maximumFractionDigits: 2,
            })
        })
    }
    const formattedTotalRevenue = getCommasSeparated(totalRevenue)

    const revenue_option = {
        grid: {
            top: '20px',
            bottom: '40px',
            left: '22%',
            right: '5%',
            // align:"start"
        },
        legend: {
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {},

        xAxis: {
            type: 'category',
            data: onerevenueDatayear,
            axisLabel: {
                fontSize: 12,
                color: '#fff',
                rotate: 45,
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 14,
                color: '#fff',
                // formatter: '{value} ' + currency,
                // formatter: (value) => {
                //     return DataFormater(value) + ' ' + currency
                // },
                formatter: (value) => {
                    return formatValueWithCurrency(value, currency)
                },
            },
            splitLine: {
                show: false,
                /*lineStyle: {
                    color: '#fff',
                    opacity: 0.15,
                },*/
            },
        },
        series: [
            {
                // data: formatNumbers(totalRevenue),
                //  data: formatNumbers(totalRevenue).map((item) => ({
                //     value: item.value,
                //     ...getChartItemStyle(item.value)
                // })),
                data:
                    //  formatNumbers(totalRevenue).map((item) => ({
                    //     value: item,
                    //     itemStyle: {
                    //         color: parseFloat(item) < 0 ? 'red' : '#02A6CF'
                    //     }
                    // })),
                    totalRevenue?.map((value) => ({
                        value,
                        itemStyle: {
                            color: value < 0 ? 'red' : '#02A6CF',
                        },
                    })),
                type: 'bar',
                barWidth: '40%',
            },
        ],
    }
    function getCommasSeparated(totalEbitda) {
        return totalEbitda.map((num) => {
            num = num ? parseFloat(num) : 0
            return num.toLocaleString('en-US', {
                maximumFractionDigits: 2,
            })
        })
    }
    const formattedEbitda = getCommasSeparated(totalEbitda)
    const EBITDAoption = {
        grid: {
            top: '20px',
            bottom: '40px',
            left: '22%',
            right: '5%',
        },
        legend: {
            top: 0,
            itemGap: 20,
            itemWidth: 10,
            itemHeight: 10,
            icon: 'circle',
            textStyle: {
                color: '#fff',
                fontSize: '10',
            },
        },
        tooltip: {},
        dataset: {
            source: ebitdaGraphopt,
        },

        xAxis: {
            type: 'category',
            data: ebitdaYear,
            axisLabel: {
                fontSize: 12,
                color: '#fff',
                rotate: 45,
            },
        },

        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 14,
                color: '#fff',
                // formatter: '{value} ' + currency,
                formatter: (value) => {
                    return formatValueWithCurrency(value, currency)
                },
            },
            splitLine: {
                show: false,
                /*lineStyle: {
                    color: '#fff',
                    opacity: 0.15,
                },*/
            },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.

        series: [
            {
                // data: totalEbitda,
                data: totalEbitda?.map((item) => ({
                    value: item,
                    itemStyle: {
                        color: parseFloat(item) < 0 ? 'red' : '#8B3DA8',
                    },
                })),
                label: {},
                type: 'bar',
                barWidth: '40%',
            },
        ],
    }
    function changeDropdownValue(type, e, funName = '') {
        console.log(e)
        if (e) {
            var value = e.id
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))

        if (funName) {
            // funName(value);
        }
    }

    useEffect(() => {
        getAllDetails()
    }, [currency])
    const getAllDetails = async () => {
        await getallCompanyDetails()
        await getallActivecmp()
        await getallplmntDetails()
        // getheatMap();
        // getnewsAndSocialmedia();
        // getrevenuequarter();
    }

    useEffect(() => {
        if (companyopt.length > 0) {
            getheatMap()
        }
    }, [companyopt, currency, formdata.heatMapCompany])
    useEffect(() => {
        if (companyopt.length > 0) {
            getnewsAndSocialmedia()
        }
    }, [formdata.socialmediaCompany, currency, companyopt])
    useEffect(() => {
        if (companyopt.length > 0) {
            getrevenuequarter()
        }
    }, [formdata.revenueCompany, formdata.yearCos, currency, companyopt])
    useEffect(() => {
        if (companyopt.length > 0) {
            getrevenueOneQuarter()
        }
    }, [formdata.revenueOneCompany, formdata.year, currency, companyopt])
    useEffect(() => {
        if (companyopt.length > 0) {
            getEBITDAperQuarter()
        }
    }, [formdata.ebitdaCompany, formdata.ebitdYear, currency, companyopt])
    useEffect(() => {
        getAllOverviewinvestment()
    }, [currency])
    useEffect(() => {
        getAllThisYearInvestment()
    }, [formdata.investmentYear, currency, formdata.quarterShareHolderRepost])

    const getallActivecmp = async () => {
        const response = await getDataFromApi(
            getonboardcmp + `?userId=${user?.user?.id}`,
            1,
            1
        )
        if (response && response.status == 200 && response.data.length > 0) {
            setallActivecmp(response.data)
            var comOpt = []
            response.data.map((opt) => {
                var cp = []
                cp['id'] = opt.id
                cp['label'] = opt.companyName
                // comOpt.push(cp)
                if (
                    user.user.roles === 'Company Admin' ||
                    user.user.roles === 'Company User'
                ) {
                    let emails = opt?.companyVo?.dealTeams.split(',')
                    if (emails.includes(user.email)) {
                        comOpt.push(cp)
                    }
                } else {
                    comOpt.push(cp)
                }
            })
            setcompanyopt(comOpt)
            setTimeout(() => {
                set_is_edit_loaded(true)
            }, 100)
        } else {
            setTimeout(() => {
                set_is_edit_loaded(true)
            }, 100)
        }
    }

    const getnewsAndSocialmedia = async (socialmediaCompany = '') => {
        if (formdata.socialmediaCompany) {
            var companyId = formdata.socialmediaCompany
        } else if (companyopt && companyopt[0]) {
            var companyId = companyopt[0].id
        } else {
            var companyId = ''
        }
        var query = ''
        // var companyId ='f284b8e8-a0d8-44bd-ba31-631ab2520425'
        var offset = '0'
        var pageSize = '3'
        const response = await getDataFromApi(
            getNewsandSocialmedia +
                '?companyId=' +
                companyId +
                '&offset=' +
                offset +
                '&pageSize=' +
                pageSize,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setnewsAndSocialmedia(response?.data)
        }
    }

    const getAllOverviewinvestment = async () => {
        const response = await getDataFromApi(getInvestmentOverview, 1)
        if (
            response &&
            response?.status === 200 &&
            response?.data?.length !== 0
        ) {
            setOverviewActivedInvestment(response.data.totalInvestment)
            setOverviewValution(response.data.totalValuation)
        } else {
            setOverviewActivedInvestment('0')
            setOverviewValution('0')
        }
    }

    function changedropdownvalue(type, e) {
        if (e) {
            var value = e.id ? e.id : e
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))
        // if (value) {
        //     if (type == 'country') {
        //         getstateOpt(value)
        //     }
        // } else {
        //     if (type == 'country') {
        //         setstateOpt([])
        //     }
        // }
    }
    const getAllThisYearInvestment = async () => {
        if (formdata.investmentYear) {
            var thisYear = formdata.investmentYear
        } else {
            var thisYear = new Date().getFullYear()
        }
        const response = await getDataFromApi(shareholderRepoTable + '?year=' + thisYear +''+'&quarter='+formdata.quarterShareHolderRepost  + '&documentType='+'Fixed Documents'+'&category='+'Valuation Report', 1)
        if (response && response?.status == 200 && response?.data?.length !== 0) {
            // setThisyearInvestment(response?.data?.totalInvestment)
            // setThisyearValution(response?.data?.totalValuation)

            setTesting(response?.data)
            // testing=response?.data
            console.log('Sfsfg', testing)
        } else {
            setTesting(null)
        }
    }

    const getrevenuequarter = async (revenueCompany = '') => {
        if (formdata.revenueCompany) {
            var companyId = formdata.revenueCompany
        } else if (companyopt && companyopt[0]) {
            var companyId = companyopt[0].id
        } else {
            var companyId = ''
        }
        //
        if (formdata.yearCos) {
            var year = formdata.yearCos
        } else {
            var year = new Date().getFullYear()
        }
        var query = ''
        const response = await getDataFromApi(
            getRevenuequarter + '?companyId=' + companyId + '&year=' + year,
            1
        )
        const responseDefault = [
            {
                companyName: '',
                income: 0,
                quarter: 'Q1',
                totalExpenses: 0,
                totalProfitLoss: 0,
                year: formdata.yearCos,
            },
            {
                companyName: '',
                income: 0,
                quarter: 'Q2',
                totalExpenses: 0,
                totalProfitLoss: 0,
                year: formdata.yearCos,
            },
            {
                companyName: '',
                income: 0,
                quarter: 'Q3',
                totalExpenses: 0,
                totalProfitLoss: 0,
                year: formdata.yearCos,
            },
        ]

        var expenseopt = [];
        var incomeopt = [];
        var yearopt = [];
        var totalProfitLoss=[]
        if (response && response.status == 200 && response.data.length !== 0) {
            setrevenuequarter(response?.data)
            response.data.reverse().map((revenue, i) => {
                // if (revenue.companyName !== null) {
                expenseopt.push(revenue.totalExpenses)//totalProfitLoss
                incomeopt.push(revenue.income)
                yearopt.push(
                    revenue.quarter + 'FY' + revenue.year.substring(2, 5)
                )
                totalProfitLoss.push(revenue.totalProfitLoss)
                // }
                return null
            })
            setrevenueExpense(expenseopt);
            setrevenueIncome(incomeopt);
            setrevenueDatayear(yearopt);
            setTotalProfitLoss(totalProfitLoss);
        } else {
            setrevenuequarter(responseDefault)
           
            responseDefault.map((revenue, i) => {
                expenseopt.push(revenue.totalExpenses)
                incomeopt.push(revenue.income)
                yearopt.push(
                    revenue.quarter +
                        'FY' +
                        revenue.year.toString().substring(2, 5)
                )
                totalProfitLoss.push(revenue.totalProfitLoss)
            })
            setrevenueExpense(expenseopt);
            setrevenueIncome(incomeopt);
            setrevenueDatayear(yearopt);
            setTotalProfitLoss(totalProfitLoss);
        }
    }

    const getrevenueOneQuarter = async (revenueOneCompany = '') => {
        var query = ''
        if (formdata.year) {
            var year = formdata.year
        } else {
            var year = new Date().getFullYear()
        }
        if (formdata.revenueOneCompany) {
            var companyId = formdata.revenueOneCompany
        } else if (companyopt && companyopt[0]) {
            var companyId = companyopt[0].id
        } else {
            var companyId = ''
        }

        var query = ''
        const response = await getDataFromApi(
            getRevenuePerQuarter + '?companyId=' + companyId + '&year=' + year,
            1
        )
        if (response && response?.status == 200 && response?.data.length > 0) {
            // setrevenueOneQuarter(response.data);
            let revenueopt = []
            let yearopt = []
            response.data.reverse().map((revenue, i) => {
                // console.log('revenue.year', response.data.reverse())
                revenueopt.push(revenue?.TotalRevenueValue)
                yearopt.push(
                    revenue.Quarter + 'FY' + revenue.year.substring(2, 5)
                )
            })
            settotalRevenue(revenueopt)
            setonerevenueDatayear(yearopt)
        } else {
            settotalRevenue([0, 0, 0, 0])
            setonerevenueDatayear(['Q1FY22', 'Q2FY22', 'Q3FY22', 'Q4FY22'])
        }
    }
    const getEBITDAperQuarter = async (ebitdaCompany = '') => {
        var query = ''
        if (formdata.ebitdYear) {
            var year = formdata.ebitdYear
        } else {
            var year = new Date().getFullYear()
        }
        if (formdata.ebitdaCompany) {
            var companyId = formdata.ebitdaCompany
        } else if (companyopt && companyopt[0]) {
            var companyId = companyopt[0].id
        } else {
            var companyId = ''
        }

        var query = ''
        const response = await getDataFromApi(
            getEbitdaPerQuarter + '?companyId=' + companyId + '&year=' + year,
            1
        )
        if (response && response?.status == 200 && response?.data.length > 0) {
            // setrevenueOneQuarter(response.data);
            let revenueopt = []
            let yearopt = []
            response.data.reverse().map((revenue, i) => {
                revenueopt.push(revenue.TotalEBITDAValue)
                yearopt.push(
                    revenue.Quarter + 'FY' + revenue.year.substring(2, 5)
                )
            })
            setTotalEbitda(revenueopt)
            setEbitdaYear(yearopt)
        } else {
            setTotalEbitda([0, 0, 0, 0])
            setEbitdaYear(['Q1FY22', 'Q2FY22', 'Q3FY22', 'Q4FY22'])
        }
    }

    // const getEBITDAperQuarter = async (ebitdaCompany = '') => {
    //     if (ebitdaCompany) {
    //         var companyId = ebitdaCompany
    //     } else if (companyopt && companyopt[0]) {
    //         var companyId = companyopt[0].id;
    //     } else {
    //         var companyId = '';
    //     }
    //     var query = ""
    //     const response = await getDataFromApi(getEbitdaPerQuarter + '?companyId=' + companyId, 1);
    //     console.log('getEBITDAperQuarter', response)

    //     if (response && (response.status == 202 || response.status == 200) && response.data.length > 0) {
    //         setEBITDAperQuarter(response.data);

    //         var ebitdaprodnameopt = ['product']
    //         var mainebitdaopt = [ebitdaprodnameopt]
    //         var alreadyExistQuarter = ''
    //         var quarterindex = ''
    //         response.data.map((ebitda, i) => {
    //             console.log("response3456",ebitda)
    //             if (ebitdaprodnameopt.indexOf(ebitda.month) === -1) ebitdaprodnameopt.push(ebitda.month.slice(0, 3));

    //             mainebitdaopt.find((element) => {
    //                 if (element[0] === 'FY' + ebitda.year) {
    //                     alreadyExistQuarter = 1;
    //                     quarterindex = mainebitdaopt.findIndex(mainebitdaopt => mainebitdaopt[0] === 'FY' + ebitda.year)

    //                 } else {
    //                     alreadyExistQuarter = '';
    //                 }

    //             })
    //             if (!alreadyExistQuarter) {
    //                 var quarteryear = ['FY' + ebitda.year]
    //                 var prodindex = ebitdaprodnameopt.findIndex(ebitdaprodnameopt => ebitdaprodnameopt === ebitda.month.slice(0, 3))
    //                 if (prodindex) {
    //                     quarteryear[prodindex] = ebitda.EBITDAvalue
    //                 }
    //                 mainebitdaopt.push(quarteryear)
    //             } else {
    //                 var prodindex = ebitdaprodnameopt.findIndex(ebitdaprodnameopt => ebitdaprodnameopt === ebitda.month.slice(0, 3))
    //                 /* if(prodindex){
    //                 quarteryear[prodindex] = cos.EBITDAvalue
    //                 } */
    //                 mainebitdaopt[quarterindex][prodindex] = ebitda.EBITDAvalue
    //             }

    //         })
    //         if (mainebitdaopt) {
    //             var seriesdata = []
    //             var serieslength = mainebitdaopt[0].length - 1
    //             if (serieslength != null && serieslength != 0) {
    //                 for (var i = 1; i <= serieslength; i++) {
    //                     var seriessingle = { type: 'line' }
    //                     seriesdata.push(seriessingle)
    //                 }
    //                 setebitdaSeriesopt(seriesdata)
    //             }
    //         }
    //         console.log(ebitdaprodnameopt)
    //         console.log('mainebitdaopt', mainebitdaopt)
    //         setebitdaGraphopt(mainebitdaopt)

    //     } else {
    //         const defaultVal = [
    //             ['product'],
    //             ['Q1FY22', '0', '0'],
    //             ['Q2FY22', '0', '0'],
    //             ['Q3FY22', '0', '0'],
    //             ['Q4FY22', '0', '0']
    //         ]
    //         console.log("defaultVal", defaultVal)
    //         setebitdaGraphopt(defaultVal)
    //         setebitdaSeriesopt([
    //             { type: 'line' },
    //             { type: 'line' }
    //         ])

    //     }
    // }
    const getallCompanyDetails = async () => {
        var query = ''
        const response = await getDataFromApi(companiesList, 1)
        if (response && response.status == 200 && response.data != null) {
            setallCompanyDetails(response.data.slice(0, 4))
        } else {
            localStorage.clear()
        }
    }

    const getallplmntDetails = async () => {
        var query = ''
        const response = await getDataFromApi(searchplmnt, 1, 1)
        if (response && response.status == 200 && response.data != null) {
            var plmtdetails = []
            response.data.map((plmnt, i) => {
                var pl = {
                    id: plmnt.id,
                    companyName: plmnt.companyName,
                    stage: plmnt.stage,
                    status: plmnt.status,
                }
                if (plmnt.status == 'Active' && plmnt.stage != null) {
                    plmtdetails.push(pl)
                }
            })
            setallplmntDetails(plmtdetails.slice(0, 5))
        } else {
            localStorage.clear()
        }
        console.log(allplmntDetails)
    }

    const getheatMap = async (heatMapCompany = '') => {
        if (formdata.heatMapCompany) {
            var companyId = formdata.heatMapCompany
        } else if (companyopt && companyopt[0]) {
            var companyId = companyopt[0].id
        } else {
            var companyId = ''
        }
        var query = ''
        const response = await getDataFromApi(
            getHeatMap + '?companyId=' + companyId,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            // setheatMap(["INDIA", "india7", "INDIA7", "sadds22", "tuytu13", "tw12", "UK", "USA"])
            setheatMap(response.data)
        }
    }
    // const currSymbol = localStorage.getItem('currencyValue')
    // useEffect(()=>{
    // console.log("gggggg", currSymbol);
    // },[currSymbol])

    const toggleProfitLoss = (companyDetails) => {
        console.log(companyDetails, 'companyDetails111')
        navigate(
            '/companylists/companydashboard/3f5c3e03-b02a-4a89-9c88-023637b01fd5'
        )
    }
    const handleTabsChange = (event, newValue) => {
        setTabDataValue((formData) => ({
            ...formData,
            [newValue]: event,
        }))
    }

    const testingColorRed={
        color:"red"
    }
    const testingColorGreen={
        color:"green"
    }
    const testingTextColor={
        color:"white"
    }
    return is_edit_loaded ? (
        <Fragment>
            <ContentBox className="analytics">
                <div className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: 'Dashboard' }]} />
                    <div className="breadnavigation">Home / Dashboard</div>
                </div>
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {/*  <StatCards /> */}
                        <Grid container spacing={3} sx={{ mb: '24px' }}>
                            {allCompanyDetails.map((companyDetails, i) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={3}
                                    className="stat_cards"
                                >
                                    <StyledCard elevation={6}>
                                        <ContentBox className="contentBox">
                                            <Box>
                                                <Small>
                                                    {companyDetails.companyName}
                                                </Small>
                                                {/* <Heading>profit <span>+6.90%</span></Heading> */}
                                                {/* <Heading>Profit <span>{getCommas(companyDetails.totalProfitLoss)}</span></Heading> */}
                                                <Heading
                                                //  onClick={() => toggleProfitLoss(companyDetails)} style={{ cursor: "pointer" }}
                                                >
                                                    {companyDetails?.totalProfitLoss <
                                                    0
                                                        ? 'Loss'
                                                        : 'Profit'}
                                                    <span
                                                        style={{
                                                            color:
                                                                companyDetails?.totalProfitLoss <
                                                                0
                                                                    ? 'red'
                                                                    : '#2ab168',
                                                        }}
                                                    >
                                                        {getCommas(
                                                            companyDetails?.totalProfitLoss
                                                        )}
                                                    </span>
                                                </Heading>
                                            </Box>
                                            <div className="content">
                                                <Typography>
                                                    Total Revenue/Quarter
                                                </Typography>
                                                <h2>
                                                    {currency}
                                                    {getCommas(
                                                        companyDetails?.totalRevenue
                                                    )}
                                                </h2>
                                            </div>
                                        </ContentBox>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div>
                            <CardHeader className="cardheader">
                                <Title>Investment overview</Title>
                            </CardHeader>

                            <h6 className="greytext">Asset Under Management</h6>

                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                            >
                                {/* <Tab label="Overview" /> */}
                                <Tab label="Overview" />
                                {/* <Tab label="All Time" /> */}
                            </Tabs>
                            {/* <TabPanel value={value} index={0} className="tabpanel">
                                <div className="tabpanelInner">
                                    <Typography>Currently Actived Investment</Typography>
                                    <Grid container spacing={3}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <div className="invest_amt">
                                                <h4>{formatdecimals(overviewActivedInvestment)} <span>{currency === "$" ? "USD" : "RAND"}</span></h4>
                                                <Small>amount</Small>
                                            </div>
                                            <div className="invest_amt">
                                                <h4>{formatdecimals(overviewValution)} <span>{currency === "$" ? "USD" : "RAND"}</span></h4>
                                                <Small>Paid Profit</Small>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <div className="invest_amt">
                                                <h4>IRR <span className="up"><Icon fontSize="large">arrow_upward</Icon>1.93%</span></h4>
                                                <Small>Plans</Small>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="tabpanelInner">
                                    <Typography>Investment In this Month</Typography>
                                    <Grid container spacing={3}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <div className="invest_amt">
                                                <h4>0 <span>{currency === "$" ? "USD" : "RAND"}</span></h4>
                                                <Small>amount</Small>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <div className="invest_amt">
                                                <h4>IRR <span className="down"><Icon fontSize="large">arrow_downward</Icon>0%</span></h4>
                                                <Small>Plans</Small>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </TabPanel> */}

                            <TabPanel
                                value={value}
                                index={0}
                                className="tabpanel"
                            >
                                <ValidatorForm className="year-form flex-content">
                                    <div
                                        style={{
                                            marginBottom: '10px',
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                        }}
                                    >
                                        <div className="year-form-inner txtRight">
                                            <label>Year:</label>
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                options={yearopt}
                                                defaultValue={
                                                    yearopt ? yearopt[0] : null
                                                }
                                                getOptionLabel={(option) =>
                                                    option.label
                                                }
                                                onChange={(event, value) => {
                                                    changeDropdownValue(
                                                        'investmentYear',
                                                        value,
                                                        getAllThisYearInvestment
                                                    )
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        value={
                                                            formdata.investmentYear
                                                        }
                                                        name="investmentYear"
                                                        placeholder="Select"
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="year-form-inner txtRight">
                                            <label>Quarter:</label>
                                            {/* <AutoComplete
                            className="dropdown"
                            fullWidth
                            options={quaterOpt}
                            value={{'label':formdata.quarterShareHolderRepost} ||  quaterOpt[0] }
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => {
                                changedropdownvalue('quarterShareHolderRepost', value)
                            }
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Select"
                                    value={formdata.quarterShareHolderRepost}
                                    name="year"
                                    placeholder="Select"
                                />
                            )}
                        />  */}
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                options={quaterOpt}
                                                defaultValue={
                                                    quaterOpt
                                                        ? quaterOpt[0]
                                                        : null
                                                }
                                                getOptionLabel={(option) =>
                                                    option.label
                                                }
                                                onChange={(event, value) => {
                                                    changeDropdownValue(
                                                        'quarterShareHolderRepost',
                                                        value,
                                                        getAllThisYearInvestment
                                                    )
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        value={
                                                            formdata.quarterShareHolderRepost
                                                        }
                                                        name="investmentYear"
                                                        placeholder="Select"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </ValidatorForm>
                                <div className="tabpanelInner">
    <Grid container spacing={1} sx={{height:'310px',overflowY:'scroll'}}>
        <Grid item lg={12}>
            {/* <div className="invest_amt">
                <h4>Investments</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        <p style={{ textAlign: 'start' }}>
                            Total Invested :
                        </p>
                        <p style={{ color: 'white', padding: '0', marginLeft: '5px' }}>
                            {testing?.totalReportedValue.totalInvestedZARm.toFixed(0)}{''} M{currency === '$' ? '$' : "R"}
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <p style={{ textAlign: 'start' }}>Period Change: </p>
                        <p style={{ padding: '0', marginTop: '10px', color: 'white', marginLeft: '5px' }}>
                            {testing && (
                                <span className={testing?.totalReportedValue.periodChangeinTotalInvested < 0 ? 'down' : 'up'}>
                                    {testing?.totalReportedValue.periodChangeinTotalInvested < 0 ? (
                                        <Icon fontSize="large">arrow_downward</Icon>
                                    ) : (
                                        <Icon fontSize="large">arrow_upward</Icon>
                                    )}
                                    {testing?.totalReportedValue.periodChangeinTotalInvested.toFixed(0)}%
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <div className="invest_amt">
                <h4>Valuations</h4>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex' }}>
                            <p>Total Valuation: </p>
                            <p style={{ color: 'white', padding: '0', marginLeft: '5px' }}>
                                {testing?.totalReportedValue.reportedValue1ZARm.toFixed(0)}{" "} M{currency === '$' ? '$' : "R"}
                            </p>
                        </div>
                        <div style={{ display: 'flex', marginRight: '5%', justifyContent: 'flex-start' }}>
                            <p style={{}}>Period Change: </p>
                            <p style={{ padding: '0', marginTop: '10px', color: 'white', marginLeft: '5px' }}>
                                {testing && (
                                    <span className={testing?.totalReportedValue.periodchangeinValuation_per < 0 ? 'down' : 'up'}>
                                        {testing?.totalReportedValue.periodchangeinValuation_per < 0 ? (
                                            <Icon fontSize="large">arrow_downward</Icon>
                                        ) : (
                                            <Icon fontSize="large">arrow_upward</Icon>
                                        )}
                                        {testing?.totalReportedValue.periodchangeinValuation_per.toFixed(0)}%
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
            <div style={{ border: '1px solid white' }}>
            <Accordion >
      <AccordionSummary expandIcon={<ExpandMoreIcon  style={{color:"white"}}/>} style={{backgroundColor: '#0e0e23',color:"#ffffff",borderColor:"white",borderWidth:"1px"}}>
        <Typography variant="p">Total Portfolio Value</Typography>
      </AccordionSummary>
      <AccordionDetails style={{backgroundColor: '#0e0e23',color:"#ffffff"}}>
         
        <Table >
          <TableBody>
            <TableRow >
              <TableCell align="left" style={{color:"#ffffff"}}>Total Invested</TableCell>
              <TableCell align="left" className="lightweight" style={{color:"#ffffff"}}>
                {testing && <span>
                    {currency === '$' ? '$' : "R"}{' '} {testing?.totalReportedValue.totalInvestedZARm.toFixed(0)}{''} M
                    </span>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Period change in total invested</TableCell>
              <TableCell align="left" className="lightweight" style={testing?.totalReportedValue.periodChangeinTotalInvested < 0 ?testingColorRed:testingColorGreen} >
              {testing && (
                                <span className={testing?.totalReportedValue.periodChangeinTotalInvested < 0 ? 'down' : 'up'}>
                                    {testing?.totalReportedValue.periodChangeinTotalInvested < 0 ? (
                                        <Icon fontSize="large">arrow_downward</Icon>
                                    ) : (
                                        <Icon fontSize="large">arrow_upward</Icon>
                                    )}
                                    {testing?.totalReportedValue.periodChangeinTotalInvested.toFixed(0)}%
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Dividends received current quarter</TableCell>
              <TableCell align="left" className="lightweight" style={testing?.totalReportedValue?.periodChangeinReported < 0?testingColorRed:testingColorGreen}>
              {testing && (
                                <span className={testing?.totalReportedValue?.periodChangeinReported < 0 ? 'down' : 'up'}>
                                    {testing?.totalReportedValue?.periodChangeinReported < 0 ? (
                                        <Icon fontSize="large">arrow_downward</Icon>
                                    ) : (
                                        <Icon fontSize="large">arrow_upward</Icon>
                                    )}
                                    {testing?.totalReportedValue?.periodChangeinReported.toFixed(0)}%
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Reported value (Total Valuation)</TableCell>
              <TableCell align="left"  style={testingTextColor}>
               
                {testing && (
                                <span className={testing?.totalReportedValue.reportedValue1ZARm < 0 ? 'down' : 'up'}>
                                 
                                 {currency === '$' ? '$' : "R"} {testing?.totalReportedValue.reportedValue1ZARm.toFixed(0) } M
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Previous quarter valuation</TableCell>
              <TableCell align="left" style={testingTextColor}>
              {testing && (
                                <span className={testing?.totalReportedValue.reportedValue2ZARm < 0 ? 'down' : 'up'}>
                                
                                {currency === '$' ? '$' : "R"}  {testing?.totalReportedValue.reportedValue2ZARm.toFixed(0)} M
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}> Period change in valuation</TableCell>
              <TableCell align="left" className="lightweight" style={testingTextColor}>
              {testing && (
                                <span className={testing?.totalReportedValue.periodChangeinReported
                                    < 0 ? 'down' : 'up'}>
                                
                                    {testing?.totalReportedValue.periodChangeinReported.toFixed(0)}
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Period change in valuation (%)</TableCell>
              <TableCell align="left" className="lightweight" style={testing?.totalReportedValue?.periodchangeinValuation_per<0?testingColorRed:testingColorGreen }>
              {testing && (
                                <span className={typeof testing?.totalReportedValue.periodchangeinValuation_per ==='number' && testing?.totalReportedValue.periodchangeinValuation_per< 0 ? 'down' : 'up'}>
                                    {typeof testing?.totalReportedValue.periodchangeinValuation_per ==='number' && testing?.totalReportedValue.periodchangeinValuation_per< 0 ? (
                                        <Icon fontSize="large">arrow_downward</Icon>
                                    ) : (
                                        <Icon fontSize="large">arrow_upward</Icon>
                                    )}
                                    {typeof testing?.totalReportedValue.periodchangeinValuation_per ==='number' ? testing?.totalReportedValue.periodchangeinValuation_per.toFixed(0)+'%':'-'}
                                </span>
                            )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
    
      </AccordionDetails>
    </Accordion>
    </div>
          
   
            <div style={{ border: '1px solid white',marginTop:"5%" }}>   
    <Accordion style={{marginTop:"5px"}}>
    <AccordionSummary expandIcon={<ExpandMoreIcon  style={{color:"white"}}/>} style={{backgroundColor: '#0e0e23',color:"#ffffff",borderColor:"white",borderWidth:"1px"}}>
        <Typography variant="p">Total Equity Investment</Typography>
      </AccordionSummary>
      <AccordionDetails style={{backgroundColor: '#0e0e23',color:"#ffffff"}}>
      
        <Table >
          <TableBody>
            <TableRow >
              <TableCell align="left" style={{color:"#ffffff"}}>Total Invested</TableCell>
              <TableCell align="left" className="lightweight" style={{color:"#ffffff"}}>
                {testing && <span>
                    {currency === '$' ? '$' : "R"}{' '}{testing?.totalEquityInvestments?.totalInvestedZARm.toFixed(0)}{''} M

                    </span>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Period change in total invested</TableCell>
              <TableCell align="left" className="lightweight" style={testing?.totalEquityInvestments?.periodChangeinTotalInvested < 0 ?testingColorRed:testingColorGreen} >
              {testing && (
                                <span className={testing?.totalEquityInvestments?.periodChangeinTotalInvested < 0 ? 'down' : 'up'}>
                                    {testing?.totalEquityInvestments?.periodChangeinTotalInvested < 0 ? (
                                        <Icon fontSize="large">arrow_downward</Icon>
                                    ) : (
                                        <Icon fontSize="large">arrow_upward</Icon>
                                    )}
                                    {testing?.totalEquityInvestments?.periodChangeinTotalInvested.toFixed(0)}%
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Dividends received current quarter</TableCell>
              <TableCell align="left" className="lightweight" style={testing?.totalEquityInvestments
                                    ?.periodChangeinReported < 0?testingColorRed:testingColorGreen}>
              {testing && (
                                <span className={testing?.totalEquityInvestments
                                    ?.periodChangeinReported < 0 ? 'down' : 'up'}>
                                    {testing?.totalEquityInvestments
?.periodChangeinReported < 0 ? (
                                        <Icon fontSize="large">arrow_downward</Icon>
                                    ) : (
                                        <Icon fontSize="large">arrow_upward</Icon>
                                    )}
                                    {testing?.totalEquityInvestments
?.periodChangeinReported.toFixed(0)}%
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Reported value (Total Valuation)</TableCell>
              <TableCell align="left"  style={testingTextColor}>
               
                {testing && (
                                <span className={testing?.totalEquityInvestments?.reportedValue1ZARm < 0 ? 'down' : 'up'}>
                                 
                                 {currency === '$' ? '$' : "R"}  {testing?.totalEquityInvestments
?.reportedValue1ZARm.toFixed(0) } M
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Previous quarter valuation</TableCell>
              <TableCell align="left" style={testingTextColor}>
              {testing && (
                                <span className={testing?.totalEquityInvestments
                                    ?.reportedValue2ZARm < 0 ? 'down' : 'up'}>
                                
                                {currency === '$' ? '$' : "R"}  {testing?.totalEquityInvestments
?.reportedValue2ZARm.toFixed(0)} M
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}> Period change in valuation</TableCell>
              <TableCell align="left" className="lightweight" style={testing?.totalEquityInvestments
                                    ?.periodChangeinReported
                                    < 0?testingColorRed:testingColorGreen}>
              {testing && (
                                <span className={testing?.totalEquityInvestments
                                    ?.periodChangeinReported
                                    < 0 ? 'down' : 'up'}>
                                    {testing?.totalEquityInvestments
?.periodChangeinReported < 0 ? (
                                        <Icon fontSize="large">arrow_downward</Icon>
                                    ) : (
                                        <Icon fontSize="large">arrow_upward</Icon>
                                    )}
                                    {testing?.totalEquityInvestments
?.periodChangeinReported.toFixed(0)}
                                </span>
                            )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Period change in valuation (%)</TableCell>
              <TableCell align="left" className="lightweight" style={testing?.totalEquityInvestments
                                    ?.periodchangeinValuation_per< 0 ?testingColorRed:testingColorGreen}>
              {testing && (
                                <span className={testing?.totalEquityInvestments
                                    ?.periodchangeinValuation_per< 0 ? 'down' : 'up'}>
                                    {testing?.totalEquityInvestments
?.periodchangeinValuation_per< 0 ? (
                                        <Icon fontSize="large">arrow_downward</Icon>
                                    ) : (
                                        <Icon fontSize="large">arrow_upward</Icon>
                                    )}
                                    {typeof testing?.totalEquityInvestments.periodchangeinValuation_per ==='number' ?testing?.totalEquityInvestments
?.periodchangeinValuation_per.toFixed(0)+'%':'-'}
                                </span>
                            )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
    
      </AccordionDetails>
    </Accordion>
    </div>
    <div style={{ border: '1px solid white',marginTop:"5%" }}>  
    <Accordion style={{marginTop:"5px"}}>
    <AccordionSummary expandIcon={<ExpandMoreIcon  style={{color:"white"}}/>} style={{backgroundColor: '#0e0e23',color:"#ffffff",borderColor:"white",borderWidth:"1px"}}>
        <Typography variant="p">Cash and Recievables(Cash in CPI Account)</Typography>
      </AccordionSummary>
      <AccordionDetails style={{backgroundColor: '#0e0e23',color:"#ffffff"}}>
      
        <Table >
          <TableBody>
            <TableRow >
              <TableCell align="left" style={{color:"#ffffff"}}>Reported value</TableCell>
              <TableCell align="left" className="lightweight" style={{color:"#ffffff"}}>
                 {testing?.bCashAndReceivables[0]?.reportedValue1ZARm}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Previous quarter valuation</TableCell>
              <TableCell align="left" className="lightweight" style={testingTextColor}>
              {testing?.bCashAndReceivables[0]?.reportedValue2ZARm}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Period change in valuation</TableCell>
              <TableCell align="left" className="lightweight"  style={testing?.bCashAndReceivables[0]?.periodChangeinReportedValue<0?testingColorRed:testingColorGreen}>
                {testing&& <span>
                    {testing?.bCashAndReceivables[0]?.periodChangeinReportedValue}%
                    </span>}
              
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
    
      </AccordionDetails>
    </Accordion>
    </div>

    <div style={{ border: '1px solid white' ,marginTop:"5%"}}>  
    <Accordion style={{marginTop:"5px"}}>
    <AccordionSummary expandIcon={<ExpandMoreIcon  style={{color:"white"}}/>} style={{backgroundColor: '#0e0e23',color:"#ffffff",borderColor:"white",borderWidth:"1px"}}>
        <Typography variant="p">Cash and Recievables(CASH SURPLUS IN UNDERLYING STRUCTURES)</Typography>
      </AccordionSummary>
      <AccordionDetails style={{backgroundColor: '#0e0e23',color:"#ffffff"}}>
        <Table >
          <TableBody>
            <TableRow >
              <TableCell align="left" style={{color:"#ffffff"}}>Reported value</TableCell>
              <TableCell align="left" className="lightweight" style={{color:"#ffffff"}}>
                 {testing?.bCashAndReceivables[1]?.reportedValue1ZARm}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Previous quarter valuation</TableCell>
              <TableCell align="left" className="lightweight" style={testingTextColor}>
                {testing && <span>
                    {testing?.bCashAndReceivables[1]?.reportedValue2ZARm}
                    </span>}
   
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" style={testingTextColor}>Period change in valuation</TableCell>
              <TableCell align="left" className="lightweight" style={testing?.bCashAndReceivables[1]?.periodChangeinReportedValue<0?testingColorRed:testingColorGreen}>
                {testing &&
                <span>
                                 {testing?.bCashAndReceivables[1]?.periodChangeinReportedValue}%

                    </span>}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
    
      </AccordionDetails>
    </Accordion>
    </div>
                          
        </Grid>
    </Grid>
</div>

                                {/* <div className="tabpanelInner">
                                    <Typography>Investment In this Month</Typography>
                                    <Grid container spacing={3}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <div className="invest_amt">
                                                <h4>49,395.395 <span>{currency === "$" ? "USD" : "RAND"}</span></h4>
                                                <Small>amount</Small>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <div className="invest_amt">
                                                <h4>23 <span className="down"><Icon fontSize="large">arrow_downward</Icon>1.93%</span></h4>
                                                <Small>Plans</Small>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div> */}
                            </TabPanel>
                            <TabPanel
                                value={value}
                                index={2}
                                className="tabpanel"
                            >
                                <div className="tabpanelInner">
                                    <Typography>
                                        Currently Actived Investment
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <div className="invest_amt">
                                                <h4>
                                                    49,395.395{' '}
                                                    <span>
                                                        {currency === '$'
                                                            ? 'USD'
                                                            : 'RAND'}
                                                    </span>
                                                </h4>
                                                <Small>amount</Small>
                                            </div>
                                            <div className="invest_amt">
                                                <h4>
                                                    49,395.395{' '}
                                                    <span>
                                                        {currency === '$'
                                                            ? 'USD'
                                                            : 'RAND'}
                                                    </span>
                                                </h4>
                                                <Small>Paid Profit</Small>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <div className="invest_amt">
                                                <h4>
                                                    56{' '}
                                                    <span className="up">
                                                        <Icon fontSize="large">
                                                            arrow_upward
                                                        </Icon>
                                                        1.93%
                                                    </span>
                                                </h4>
                                                <Small>Plans</Small>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="tabpanelInner">
                                    <Typography>
                                        Investment In this Month
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <div className="invest_amt">
                                                <h4>
                                                    49,395.395{' '}
                                                    <span>
                                                        {currency === '$'
                                                            ? 'USD'
                                                            : 'RAND'}
                                                    </span>
                                                </h4>
                                                <Small>amount</Small>
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <div className="invest_amt">
                                                <h4>
                                                    23{' '}
                                                    <span className="down">
                                                        <Icon fontSize="large">
                                                            arrow_downward
                                                        </Icon>
                                                        1.93%
                                                    </span>
                                                </h4>
                                                <Small>Plans</Small>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </TabPanel>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <StyledCard elevation={6} className="chart">
                            <CardHeader className="cardheader">
                                <Title>Revenue per year ({currency})</Title>
                            </CardHeader>
                            <Tabs
                                value={tabDataValue.revenueDatayear}
                                onChange={(e, value) =>
                                    handleTabsChange(value, 'revenueDatayear')
                                }
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
                                <Tab
                                    label="Graph"
                                    value={'revenueDatayear_0'}
                                />
                                <Tab
                                    label="Table"
                                    value={'revenueDatayear_1'}
                                />
                            </Tabs>
                            <ValidatorForm className="year-form">
                                <div className="year-form-inner">
                                    <label>Year:</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        options={yearopt}
                                        defaultValue={
                                            yearopt ? yearopt[0] : null
                                        }
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(event, value) => {
                                            changeDropdownValue(
                                                'yearCos',
                                                value,
                                                getrevenuequarter
                                            )
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.yearCos}
                                                name="yearCos"
                                                placeholder="Select"
                                            />
                                        )}
                                    />

                                    <label>Company:</label>
                                    <AutoComplete
                                        className="dropdown"
                                        fullWidth
                                        defaultValue={
                                            companyopt && companyopt[0]
                                                ? companyopt[0]
                                                : null
                                        }
                                        options={companyopt}
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(event, value) =>
                                            changeDropdownValue(
                                                'revenueCompany',
                                                value,
                                                getrevenuequarter
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.revenueCompany}
                                                name="revenueCompany"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </div>
                            </ValidatorForm>
                            <SimpleCard>
                                <TabPanel
                                    value={tabDataValue.revenueDatayear}
                                    index={'revenueDatayear_0'}
                                    className="tabpanel nopadding notclear"
                                >
                                    <ReactEcharts
                                        style={{ height: height }}
                                        option={{
                                            ...option,
                                            color: ['#e7515a', '#2196f3','#008000'],
                                        }}
                                    />
                                </TabPanel>
                                <TabPanel
                                    value={tabDataValue.revenueDatayear}
                                    index={'revenueDatayear_1'}
                                    className="tabpanel nopadding notclear"
                                >
                                    <div className="table_scroll">
                                        <StyledTable className="customtable odd-even withborder">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        align="left"
                                                        className="imgCell"
                                                    >
                                                        <span>Quarter</span>
                                                    </TableCell>
                                                    {['EXPENSES', 'INCOME','TOTALPROFITLOSS'].map(
                                                        (singleQ) => (
                                                            <TableCell
                                                                align="left"
                                                                className="imgCell"
                                                            >
                                                                <span>
                                                                    {singleQ}
                                                                </span>
                                                            </TableCell>
                                                        )
                                                    )}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {revenueDatayear.map(
                                                    (singleQ, i) => (
                                                        <TableRow>
                                                            <TableCell
                                                                align="left"
                                                                className="imgCell"
                                                            >
                                                                <span>
                                                                    {singleQ}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell
                                                                align="left"
                                                                className="imgCell"
                                                            >
                                                                <span>
                                                                    {getCommas(
                                                                        revenueExpense[
                                                                            i
                                                                        ]
                                                                    )}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell
                                                                align="left"
                                                                className="imgCell"
                                                            >
                                                                <span>
                                                                    {getCommas(
                                                                        revenueIncome[
                                                                            i
                                                                        ]
                                                                    )}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell
                                                                align="left"
                                                                className="imgCell"
                                                            >
                                                                <span>
                                                                    {getCommas(
                                                                        totalProfitLoss[
                                                                            i
                                                                        ]
                                                                    )}
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </StyledTable>
                                    </div>
                                </TabPanel>
                            </SimpleCard>
                        </StyledCard>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={8}
                        sm={12}
                        xs={12}
                        className="tablegrid"
                    >
                        <StyledCard elevation={6}>
                            <CardHeader className="cardheader">
                                <Title>Investment pipeline</Title>
                                <Button
                                    onClick={() =>
                                        navigate(
                                            '/investmentpipeline/pipelinemanagementprogress'
                                        )
                                    }
                                >
                                    View All
                                </Button>
                            </CardHeader>
                            <div className="table_scroll">
                                <StyledTable className="customtable">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Company Name</TableCell>
                                            <TableCell>Stage</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allplmntDetails.map(
                                            (allplmntDetails, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left">
                                                        {
                                                            allplmntDetails.companyName
                                                        }
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        className="lightweight"
                                                    >
                                                        {allplmntDetails.stage}
                                                    </TableCell>
                                                    <TableCell className="lightweight">
                                                        {allplmntDetails.status}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </StyledTable>
                            </div>
                        </StyledCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <StyledCard elevation={6}>
                            <CardHeader className="cardheader">
                                <Title>Countries({heatMap.length})</Title>
                            </CardHeader>
                            <ValidatorForm className="year-form companydrop">
                                <div className="year-form-inner">
                                    <label>Company:</label>
                                    <AutoComplete
                                        className="dropdown"
                                        defaultValue={
                                            companyopt && companyopt[0]
                                                ? companyopt[0]
                                                : null
                                        }
                                        fullWidth
                                        options={companyopt}
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(event, value) =>
                                            changeDropdownValue(
                                                'heatMapCompany',
                                                value,
                                                getheatMap
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.heatMapCompany}
                                                name="year"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </div>
                            </ValidatorForm>
                            <ComposableMap data-tip="">
                                <Geographies geography="/features.json">
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            var d = ''
                                            heatMap.map((opt) => {
                                                // d=geo.id
                                                if (opt == geo.id) {
                                                    d = geo.id
                                                }
                                            })

                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    onMouseEnter={() => {
                                                        setTooltipContent(
                                                            `${geo.properties.name}`
                                                        )
                                                    }}
                                                    onMouseLeave={() => {
                                                        setTooltipContent('')
                                                    }}
                                                    style={{
                                                        default: {
                                                            fill:
                                                                heatMap.length !=
                                                                    0 && d
                                                                    ? '#2F8CD8'
                                                                    : '#D6D6DA',
                                                            outline: 'none',
                                                        },
                                                        hover: {
                                                            fill: '#F53',
                                                            outline: 'none',
                                                        },
                                                        pressed: {
                                                            fill: '#E42',
                                                            outline: 'none',
                                                        },
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </Geographies>
                            </ComposableMap>
                            <ReactTooltip>{TooltipContent}</ReactTooltip>
                        </StyledCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div>
                            <StyledCard elevation={6}>
                                <CardHeader className="cardheader">
                                    <Title>
                                        News Articles
                                        {/* ({thousandsOf(currency)}) */}(
                                        {currency})
                                    </Title>
                                </CardHeader>
                                <ValidatorForm className="year-form companydrop">
                                    <div className="year-form-inner">
                                        <label>Company:</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={
                                                companyopt && companyopt[0]
                                                    ? companyopt[0]
                                                    : null
                                            }
                                            options={companyopt}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changeDropdownValue(
                                                    'socialmediaCompany',
                                                    value,
                                                    getnewsAndSocialmedia
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={
                                                        formdata.socialmediaCompany
                                                    }
                                                    name="socialmediaCompany"
                                                    placeholder="Select"
                                                />
                                            )}
                                        />
                                    </div>
                                </ValidatorForm>
                                {newsAndSocialmedia &&
                                    newsAndSocialmedia.map(
                                        (newsarticle, index) => (
                                            <Grid
                                                container
                                                spacing={3}
                                                className="newsArticle"
                                            >
                                                <Grid
                                                    item
                                                    lg={3}
                                                    md={3}
                                                    sm={3}
                                                    xs={3}
                                                >
                                                    <div className="articleimg"></div>
                                                </Grid>
                                                <Grid
                                                    item
                                                    lg={9}
                                                    md={9}
                                                    sm={9}
                                                    xs={9}
                                                >
                                                    <Title>
                                                        {newsarticle.headLines}
                                                    </Title>
                                                    <Typography>
                                                        {
                                                            newsarticle.newsArticles
                                                        }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )
                                    )}
                            </StyledCard>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div>
                            <StyledCard elevation={6} className="echarts">
                                <CardHeader className="cardheader">
                                    <Title>Revenue per year ({currency})</Title>
                                </CardHeader>
                                <Tabs
                                    value={tabDataValue.onerevenueDatayear}
                                    onChange={(e, value) =>
                                        handleTabsChange(
                                            value,
                                            'onerevenueDatayear'
                                        )
                                    }
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
                                    <Tab
                                        label="Graph"
                                        value={'onerevenueDatayear_0'}
                                    />
                                    <Tab
                                        label="Table"
                                        value={'onerevenueDatayear_1'}
                                    />
                                </Tabs>
                                <ValidatorForm className="year-form flex-content">
                                    <div className="year-form-inner txtRight">
                                        <label>Year:</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            options={yearopt}
                                            defaultValue={
                                                yearopt ? yearopt[0] : null
                                            }
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) => {
                                                changeDropdownValue(
                                                    'year',
                                                    value,
                                                    getrevenueOneQuarter
                                                )
                                            }}
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
                                    <div className="year-form-inner txtRight">
                                        <label>Company:</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={
                                                companyopt && companyopt[0]
                                                    ? companyopt[0]
                                                    : null
                                            }
                                            options={companyopt}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changeDropdownValue(
                                                    'revenueOneCompany',
                                                    value,
                                                    getrevenueOneQuarter
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={
                                                        formdata.revenueOneCompany
                                                    }
                                                    name="revenueOneCompany"
                                                    placeholder="Select"
                                                />
                                            )}
                                        />
                                    </div>
                                </ValidatorForm>
                                <SimpleCard>
                                    <TabPanel
                                        value={tabDataValue.onerevenueDatayear}
                                        index={'onerevenueDatayear_0'}
                                        className="tabpanel nopadding notclear"
                                    >
                                        <ReactEcharts
                                            style={{ height: '200px' }}
                                            option={{
                                                ...revenue_option,
                                                color: [
                                                    '#2f8cd8',
                                                    '#02A6CF',
                                                    '#D7BB4F',
                                                    '#49C9BD',
                                                ],
                                            }}
                                        />
                                    </TabPanel>
                                    <TabPanel style={{overflow:'auto'}}
                                        value={tabDataValue.onerevenueDatayear}
                                        index={'onerevenueDatayear_1'}
                                        className="tabpanel nopadding notclear table_scroll"
                                    >
                                        <div className="table_scroll" style={{width:'200%'}}>
                                            <StyledTable className="customtable odd-even withborder">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            align="left"
                                                            className="imgCell"
                                                        >
                                                            <span>Quarter</span>
                                                        </TableCell>
                                                        {onerevenueDatayear.map(
                                                            (singleQ, i) => (
                                                                <TableCell
                                                                    align="left"
                                                                    className="imgCell"
                                                                >
                                                                    <span>
                                                                        {
                                                                            singleQ
                                                                        }
                                                                    </span>
                                                                </TableCell>
                                                            )
                                                        )}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell
                                                            align="left"
                                                            className="imgCell"
                                                        >
                                                            <span>Revenue</span>
                                                        </TableCell>
                                                        {onerevenueDatayear.map(
                                                            (singleQ, i) => (
                                                                <TableCell
                                                                    align="left"
                                                                    className="imgCell"
                                                                >
                                                                    <span>
                                                                        {
                                                                            formattedTotalRevenue[
                                                                                i
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </TableCell>
                                                            )
                                                        )}
                                                    </TableRow>
                                                </TableBody>
                                            </StyledTable>
                                        </div>
                                    </TabPanel>
                                </SimpleCard>
                            </StyledCard>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div>
                            <StyledCard elevation={6} className="echarts">
                                <CardHeader className="cardheader">
                                    <Title>EBITDA per year ({currency})</Title>
                                </CardHeader>
                                <Tabs
                                    value={tabDataValue.ebitdaGraphopt}
                                    onChange={(e, value) =>
                                        handleTabsChange(
                                            value,
                                            'ebitdaGraphopt'
                                        )
                                    }
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
                                    <Tab
                                        label="Graph"
                                        value={'ebitdaGraphopt_0'}
                                    />
                                    <Tab
                                        label="Table"
                                        value={'ebitdaGraphopt_1'}
                                    />
                                </Tabs>
                                <ValidatorForm className="year-form flex-content">
                                    <div className="year-form-inner txtRight">
                                        <label className="">Year:</label>
                                        <AutoComplete
                                            className=""
                                            fullWidth
                                            options={yearopt}
                                            defaultValue={
                                                yearopt ? yearopt[0] : null
                                            }
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) => {
                                                changeDropdownValue(
                                                    'ebitdYear',
                                                    value,
                                                    getEBITDAperQuarter
                                                )
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.ebitdYear}
                                                    name="ebitdYear"
                                                    placeholder="Select"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="year-form-inner txtRight">
                                        <label className="">Company:</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={
                                                companyopt && companyopt[0]
                                                    ? companyopt[0]
                                                    : null
                                            }
                                            options={companyopt}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            onChange={(event, value) =>
                                                changeDropdownValue(
                                                    'ebitdaCompany',
                                                    value,
                                                    getEBITDAperQuarter
                                                )
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={
                                                        formdata.ebitdaCompany
                                                    }
                                                    name="ebitdaCompany"
                                                    placeholder="Select"
                                                />
                                            )}
                                        />
                                    </div>
                                    {/* </ValidatorForm> */}
                                    {/* <ValidatorForm className="year-form"> */}
                                </ValidatorForm>
                                <SimpleCard>
                                    <TabPanel
                                        value={tabDataValue.ebitdaGraphopt}
                                        index={'ebitdaGraphopt_0'}
                                        className="tabpanel nopadding notclear"
                                    >
                                        <ReactEcharts
                                            style={{ height: '200px' }}
                                            option={{
                                                ...EBITDAoption,
                                                color: [
                                                    '#8B3DA8',
                                                    '#02A6CF',
                                                    '#D7BB4F',
                                                    '#49C9BD',
                                                ],
                                            }}
                                        />
                                    </TabPanel>
                                    <TabPanel
                                        value={tabDataValue.ebitdaGraphopt}
                                        index={'ebitdaGraphopt_1'}
                                        className="tabpanel nopadding notclear table_scroll"
                                    >
                                        <div className="table_scroll" style={{width:'200%'}}>
                                            <StyledTable className="customtable odd-even withborder">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            align="left"
                                                            className="imgCell"
                                                        >
                                                            <span>Quarter</span>
                                                        </TableCell>
                                                        {ebitdaYear.map(
                                                            (singleQ, i) => (
                                                                <TableCell
                                                                    align="left"
                                                                    className="imgCell"
                                                                >
                                                                    <span>
                                                                        {
                                                                            singleQ
                                                                        }
                                                                    </span>
                                                                </TableCell>
                                                            )
                                                        )}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell
                                                            align="left"
                                                            className="imgCell"
                                                        >
                                                            <span>EBITDA</span>
                                                        </TableCell>
                                                        {ebitdaYear.map(
                                                            (singleQ, i) => (
                                                                <TableCell
                                                                    align="left"
                                                                    className="imgCell"
                                                                >
                                                                    <span>
                                                                        {
                                                                            formattedEbitda[
                                                                                i
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </TableCell>
                                                            )
                                                        )}
                                                    </TableRow>
                                                </TableBody>
                                            </StyledTable>
                                        </div>
                                    </TabPanel>
                                </SimpleCard>
                            </StyledCard>
                        </div>
                    </Grid>
                    {/*<Grid item lg={8} md={8} sm={12} xs={12}>
                    
                        <StatCards />
                        <TopSellingTable />
                        <StatCards2 />
                        <H4>Ongoing Projects</H4>
                        <RowCards />
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card sx={{ px: 3, py: 2, mb: 3 }}>
                            <Title>Traffic Sources</Title>
                            <SubTitle>Last 30 days</SubTitle>
                            <DoughnutChart
                                height="300px"
                                color={[
                                    palette.primary.dark,
                                    palette.primary.main,
                                    palette.primary.light,
                                ]}
                            />
                        </Card>
                        <UpgradeCard />
                        <Campaigns />
                    </Grid>*/}
                </Grid>
            </ContentBox>
        </Fragment>
    ) : (
        ''
    )
}

export default Analytics
