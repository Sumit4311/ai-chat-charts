import React, { useState, useEffect } from 'react'
import { Grid, Card, Fab } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import { useOutletContext } from "react-router-dom";
import { CircularProgress } from '@mui/material'
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
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import Typography from '@mui/material/Typography';
import Revenue from "../../image/revenue.svg"
import ReactEcharts from 'echarts-for-react'
import Icon_countries from "../../image/Seven-countries-cohorts-menu.svg"
import prof from "../../image/prof.svg"
import { createFinance, getAllFinanceDetails, updateFinance, deleteFinance, getFinanceYQM, getFinanceByCompanyId, getCashYTDGraph, getEbidtaYTDGraph, getBalancesheetById, getCreditDebitValues, getebitdaMargin } from "../../services/api"
import { postDataFromApi, putDataFromApi, getDataFromApi } from '../../services/CommonService';
import { getSortMonths, yearopt, thousandsOf,formatdecimals, DataFormater ,formatValueWithCurrency} from '../../services/CommonObject';
import { Autocomplete } from '@mui/lab'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useParams } from 'react-router-dom';
import { getCommas } from 'app/services/CommonObject'

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
    color: "#FFF",
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
    var currentyear = new Date().getFullYear()
    const theme = useTheme()
    const navigate = useNavigate()
    const [currency] = useOutletContext();
    const [isLoading, setIsLoading] = useState(true)
    const height = '350px'
    const [financeDetails, setfinanceDetails] = useState([])
    const [financeByCompanyId, setfinanceByCompanyId] = useState([])
    const [cashYTDGraph, setcashYTDGraph] = useState([])
    const [ebidtaYTDGraph, setebidtaYTDGraph] = useState([])
    const [ebidtaYTD, setebidtaYTD] = useState([])
    const [ebidtaYTDyear, setebidtaYTDyear] = useState([])
    let { companyId } = useParams();
    const [formdata, setFormData] = useState({ year: currentyear, cashYTDYear: currentyear, ebitdayear: currentyear, balancesheetyear: currentyear, creditdebityear: currentyear })
    const [cashytdopt, setcashytdopt] = useState([])
    const [balancesheetById, setbalancesheetById] = useState([])
    const [creditdebitValues, setcreditdebitValues] = useState([])
    const [ebitdamargin, setebitdamargin] = useState([])
    const [ebitdamarginOpt, setebitdamarginOpt] = useState([])
    const [last4Years, setlast4Years] = useState([])
    const [displayVal, setDisplayVal] = useState(false)

    const [cashDisplay, setCashDisplay] = useState(false)
    var companyLabel = ""
    var companyopt = JSON.parse(localStorage.getItem('companyDet'))

    companyopt && companyopt.map((opt) => {
        if (opt.id == companyId) {
            companyLabel = opt.name
        }
    })

    const option = {

        grid: {
            top: '0%',
            bottom: '15%',
            left: '0%',
            right: '5%',
        },
        tooltip: {
            trigger: 'item'
        },

        series: [
            {
                name: 'EBITDA MARGIN',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}'
                },

                labelLine: {
                    show: false
                },
                data: ebitdamarginOpt,
            }
        ]
    };
    const seriesList = () => {
        let series = []
        if (displayVal === true) {
            series = [
                { type: 'bar', barWidth: '20%', barGap: 0 }, { type: 'bar', barWidth: '20%', barGap: 0 },
                {
                    type: 'line', data: [25, 40, 55, 75, 10, 70, 55, 50, 15, 50, 65, 70], smooth: true,
                    lineStyle: { width: 4 },
                }
            ]
        } else {
            series = []
        }
        return series
    }
    console.log(cashytdopt,"cashytdopt")
    const revenueQuarter = {
        grid: {
            top: '5%',
            bottom: '25%',
            left: '10%',
            right: '5%',
        },
        legend: {
            textStyle: {
                color: '#fff',

            },
            top: 'bottom',
            itemGap: 15,
            icon: 'circle',

        },
        tooltip: {

        },

        dataset: {
            source: cashytdopt,
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                color: '#fff',

            },

        },
        yAxis: {
            axisLabel: {
                color: '#fff',
                // formatter: '{value} '+currency,
                // formatter: (value) => {
                //     return DataFormater(value) + ' ' + currency
                // },
                formatter: (value) => {
                    return formatValueWithCurrency(value, currency);
                  },
            },


            splitLine: {
                show: false,
            },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            { type: 'bar', barWidth: '20%', barGap: 0 }, { type: 'bar', barWidth: '20%', barGap: 0 }
            // {
            //     type: 'line', data: [25, 40, 55, 75, 10, 70, 55, 50, 15, 50, 65, 70], smooth: true,
            //     lineStyle: { width: 4 },
            // }
        ]
    };

    const cosgraphoption = {
        grid: {
            top: '5%',
            bottom: '10%',
            left: '12%',
            right: '5%',
        },
        xAxis: {
            type: 'category',
            data: ebidtaYTDyear,
            axisLabel: {
                color: '#fff',
            },
        },
        tooltip: {
            show: true,
            trigger: 'axis',

            axisPointer: {
                type: 'cross',
                lineStyle: {
                    opacity: 0,
                },
            },
            crossStyle: {
                color: '#000',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff',
                // formatter: '{value} '+currency,
                formatter: (value) => {
                    return DataFormater(value) + ' ' + currency;
                },
            },

            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 0.1,

                },
            },
        },
        series: [
            {
                data: ebidtaYTD,
                type: 'line'
            }
        ]
    };

    const EBITDAoption = {
        legend: {
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',

            },
        },
        tooltip: {},
        dataset: {
            source: [
                ['product', 'Kos', 'lldsjel', 'Freyr', 'Lege'],
                ['Jan', 80, 65, 90, 55, 20, 35],
                ['Mar', 78, 100, 65, 40, 20, 45],
                ['May', 30, 55, 30, 70, 100, 50],
                ['Jul', 10, 55, 45, 67, 20, 30],
                ['Sep', 70, 55, 34, 70, 45, 65],
                ['Nov', 70, 55, 34, 70, 10, 20],
            ]
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                color: '#fff',


            },

        },
        yAxis: {
            axisLabel: {
                color: '#fff',
                formatter: '{value} ' + currency

            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 0.2,
                },
            },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }, { type: 'line' }]
    };

    const subscribarList = [
        {
            id: '12345',
            username: 'Adam Taylor',
            role: 'Admin',
            department: 'Account',
            email: 'test@demo.com',
            phone: '+91 9876543210',
            status: 'Active',
        },
        {
            id: '12345',
            username: 'Google',
            role: 'Super admin',
            department: 'Marketing',
            email: 'test@demo.com',
            phone: '+91 9876543210',
            status: 'Inactive',
        },
        {
            id: '12345',
            username: 'John Dolor',
            role: 'Shareholder',
            department: 'Sales',
            email: 'test@demo.com',
            phone: '+91 9876543210',
            status: 'Inactive',
        },
        {
            id: '12345',
            username: 'Sit Ipsum',
            role: 'Company admin',
            department: 'Designing',
            email: 'test@demo.com',
            phone: '+91 9876543210',
            status: 'Active', getlast4Years
        },
        {
            id: '12345',
            username: 'French Marc',
            role: 'Shareholder',
            department: 'Testing',
            email: 'test@demo.com',
            phone: '+91 9876543210',
            status: 'Active',
        },
        {
            id: '12345',
            username: 'Asley Huda',
            role: 'Super admin',
            department: 'Developer',
            email: 'test@demo.com',
            phone: '+91 9876543210',
            status: 'Inactive',
        },

    ]

    function changeDropdownValue(type, e, funName = '') {
        console.log(e)
        if (e) {
            var value = e.label
        } else {
            var value = ""
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }));

        if (funName) {
            // funName(value);
        }
    }

    useEffect(() => {
        getfinanceByCompanyId();
        getfinanceDetails();
        // getcashYTDGraph();
        getebidtaYTDGraph();
        // getebitdamargin();
        getlast4Years()
    }, [companyId, currency])
    useEffect(() => {
        getbalancesheetById();
        getcreditdebitValues();
    }, [formdata.balancesheetyear, companyId, currency])
    useEffect(() => {
        getebitdamargin();
    }, [formdata.ebitdayear, companyId, currency])
    useEffect(() => {
        getcashYTDGraph();
    }, [formdata.cashYTDYear, companyId, currency])

    const getlast4Years = async () => {
        var yeararray = [];
        let thisYear = (new Date()).getFullYear();
        let minOffset = 0, maxOffset = 3;
        for (let x = 0; x <= maxOffset; x++) {
            var year = { id: x + 1, label: "" + thisYear - x + "" }
            yeararray.push(year)
        }
        yeararray.sort((a, b) => b.id - a.id);
        setlast4Years(yeararray)
    }

    const getbalancesheetById = async () => {
        var query = ''
        const response = await getDataFromApi(
            getBalancesheetById + '?companyId=' + companyId + '&year=' + formdata.balancesheetyear, 1
        )
        if (response && response.status == 200 && response.data != null) {
            setbalancesheetById(response?.data);
        }
        else {
            setbalancesheetById('0');
        }
    }

    const getcreditdebitValues = async () => {
        var query = ''
        const response = await getDataFromApi(
            getCreditDebitValues + '?companyId=' + companyId + '&year=' + formdata.balancesheetyear, 1
        )
        if (response && response.status == 200 && response.data != null) {
            setcreditdebitValues(response?.data);
        } else {
            setcreditdebitValues('0');
        }
    }

    const getebitdamargin = async (year = '') => {
        var query = ''
        var response = ''
        if (formdata.ebitdayear) {
            response = await getDataFromApi(
                getebitdaMargin + '?companyId=' + companyId + '&year=' + formdata.ebitdayear, 1
            )
        } else {
            response = await getDataFromApi(
                getebitdaMargin + '?companyId=' + companyId, 1
            )
        }

        if (response && response.status == 200 && response.data != null) {
            setebitdamargin(response?.data);
            var ebitda = [
                { value: response.data.grossprofitmargin ? response.data.grossprofitmargin : 0, name: 'Gross Profit Margin', label: response.data.grossprofitmargin ? response.data.grossprofitmargin : 0 },
                { value: response.data.ebitdaMargin ? response.data.ebitdaMargin : 0, name: 'EDITDA MArgin', label: response.data.ebitdaMargin ? response.data.ebitdaMargin : 0 },
                { value: response.data.netprofitMargin ? response.data.netprofitMargin : 0, name: 'Net Profit Margin', label: response.data.netprofitMargin ? response.data.netprofitMargin : 0 },
            ]
            setebitdamarginOpt(ebitda)
        } else {
            var ebitda = [
                { value: 0, name: 'Gross Profit Margin', label: 0 },
                { value: 0, name: 'EDITDA MArgin', label: 0 },
                { value: 0, name: 'Net Profit Margin', label: 0 },
            ]
            setebitdamarginOpt(ebitda)
        }
    }

    const getfinanceDetails = async () => {
        var query = ''
        const response = await getDataFromApi(
            getAllFinanceDetails, 1
        )
        if (response && response?.status == 200 && response?.data != null) {
            setfinanceDetails(response?.data);
        }
    }

    const getfinanceByCompanyId = async () => {
        var query = ''
        const response = await getDataFromApi(
            getFinanceByCompanyId + companyId,
            1
        )
        if (response && response?.status == 200 && response?.data != null) {
            setfinanceByCompanyId(response?.data);
            setIsLoading(false)
        }
    }

    const getcashYTDGraph = async (cashYTDYear = '') => {
        // setCashDisplay(false)
        var query = ''
        if (formdata.cashYTDYear) {
            var year = formdata.cashYTDYear
        } else {
            var year = new Date().getFullYear();
        }
        const response = await getDataFromApi(
            getCashYTDGraph + year + '&companyId=' + companyId,
            1
        )
        var allsormonth = getSortMonths();
        var cashdataopt = [
            ['product', 'Opening Balance', 'Closing Balance']
        ]
        allsormonth.map((singlemonth) => {
            cashdataopt?.push([singlemonth, 0, 0])
        })
        if (response && response?.status == 200 && response?.data?.length > 0) {
            setcashYTDGraph(response?.data);
            /* const Months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            var cashdataopt = []
            if (response?.data.length > 0) {
                const sorted = response?.data.sort((a, b) => Months.indexOf(a.month) - Months.indexOf(b.month));
                const last_month_index = Months.indexOf(sorted[sorted.length - 1].month);
                const fill_empty_months = Array
                    .from(
                        { length: Math.max(12 - sorted.length, 0) },
                        (v, i) => (last_month_index + i + 1) % 12
                    )
                    .map((month_index) => ({
                        cashInflow: 0,
                        cashOutflow: 0,
                        month: Months[month_index],
                    }))
                    .concat(sorted);
                const sorted2 = fill_empty_months.sort((a, b) => Months.indexOf(a.month) - Months.indexOf(b.month));

                sorted2.map((cash, i) => {
                    var cashopt = [cash.month, cash.cashInflow, cash.cashOutflow]
                    cashdataopt.push(cashopt)
                })
                console.log('cashYTDGraph', response.data, cashdataopt);
            } */

            cashdataopt?.map((month, index) => {
                response?.data?.map((opt, i) => {
                    if (month[0]?.toLowerCase() == opt?.month?.toLowerCase()?.slice(0, 3)) {
                        cashdataopt[index] = [month[0], opt?.cashInflow, opt?.cashOutflow]
                    }
                })
            })
            setcashytdopt(cashdataopt)
            setDisplayVal(true)
        } else {
            setcashytdopt(cashdataopt)
            setDisplayVal(false)
            //    {month: 'JANUARY', cashInflow: 65742, cashOutflow: 34212}
        }
        // setTimeout(() => {
        //     setCashDisplay(true)
        // }, 10);
    }

    const getebidtaYTDGraph = async () => {
        var query = ''
        var year = formdata.year
        const response = await getDataFromApi(
            getEbidtaYTDGraph + year + '&companyId=' + companyId,
            1
        )
        if (response && response?.status == 200 && response?.data != null) {
            setebidtaYTDGraph(response?.data);
            const sortedByYear = response?.data?.sort((a, b) => a.year - b.year);
            var ebidtaYTDeopts = [];
            sortedByYear.map((ebidta, i) => {
                ebidtaYTDeopts.push(ebidta.ebidta)
            })
            setebidtaYTD(ebidtaYTDeopts);
            var ebidtaYTDyearopts = [];
            sortedByYear.map((ebidta, i) => {
                ebidtaYTDyearopts.push(ebidta.year)
            })
            setebidtaYTDyear(ebidtaYTDyearopts);
        }
    }
    const sortedFinance = [...financeByCompanyId].sort((a, b) => a.year - b.year);
    return (
        <Container>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <CircularProgress />
                </Box>) :
                (<>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[

                                { name: 'Finance' },
                            ]}
                        />
                        <div className="breadnavigation">Home / Company lists  {companyLabel ? ' / ' + companyLabel : ''} / Dashboard /  Finance</div>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12} className="noPadding">
                            <StyledCard elevation={6} className="echarts paddingbottom ">
                                <CardHeader className="cardheader nomargin">
                                    <Title>Income Statement ({currency}) </Title>
                                </CardHeader>
                                <div className="table_scroll">
                                    <StyledTable className="customtable odd-even withborder subtable">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Financial Statement</TableCell>
                                                  {sortedFinance.map((item, index) => (
                                                    <TableCell key={index}>{item.year}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {[
                                                {
                                                    label: 'Revenue',
                                                    dataKey: 'revenue',
                                                },
                                                {
                                                    label: 'Cost of goods sold',
                                                    dataKey: 'costofGoodsSold',
                                                },
                                                {
                                                    label: 'Gross Profit',
                                                    dataKey: 'grossProfit',
                                                },
                                                {
                                                    label: 'General & Administrative',
                                                    dataKey: 'generalAdministrative',
                                                },
                                                {
                                                    label: 'Interest',
                                                    dataKey: 'interest',
                                                },
                                                {
                                                    label: 'Total Expenses',
                                                    dataKey: 'generalExpense',
                                                },
                                                {
                                                    label: 'Earning before tax',
                                                    dataKey: 'earningbeforeTaxes',
                                                },
                                                {
                                                    label: 'Taxes',
                                                    dataKey: 'taxes',
                                                },
                                                {
                                                    label: 'Net Earnings',
                                                    dataKey: 'netEarning',
                                                },
                                            ].map((statement, statementIndex) => (
                                                <TableRow  key={statementIndex} className={statement.dataKey === 'costofGoodsSold' || statement.dataKey === 'generalAdministrative' || statement.dataKey === 'interest' || statement.dataKey === 'taxes' ? 'subrow' : ''}>
                                                    <TableCell align="left">{statement.label}</TableCell>
                                                    {sortedFinance.map((first_details, yearIndex) => (
                                                        <TableCell  align="left">
                                                                    <span align="left">{getCommas(first_details[statement.dataKey])}</span>
                                                        </TableCell>
                                                    ))} 
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </StyledTable>
                                </div>
                            </StyledCard>
                        </Grid>
                        <Grid item lg={8} md={8} sm={12} xs={12} className="noPadding">
                            <StyledCard elevation={6} className="echarts paddingbottom">
                                <CardHeader className="cardheader">
                                    <Title>EBIDTA ({currency})</Title>
                                </CardHeader>
                                <SimpleCard >
                                    <ReactEcharts
                                        style={{ height: '230px' }}
                                        option={{
                                            ...cosgraphoption,
                                            color: ['#2F8CD8'],
                                        }}
                                    />
                                </SimpleCard>
                            </StyledCard>
                            <StyledCard elevation={6} className="echarts">
                                <CardHeader className="cardheader">
                                    <Title>Cash YTD ({currency})</Title>
                                </CardHeader>
                                <ValidatorForm className="year-form">
                                    <div className="year-form-inner">
                                        <label>Year:</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            options={yearopt}
                                            defaultValue={yearopt ? yearopt[0] : null}
                                            getOptionLabel={(option) => option.label}
                                            onChange={(event, value) => changeDropdownValue('cashYTDYear', value, getcashYTDGraph)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.cashYTDYear}
                                                    name="cashYTDYear"
                                                    placeholder="Select"
                                                />
                                            )}
                                        />
                                    </div>
                                </ValidatorForm>

                                <SimpleCard >
                                    <ReactEcharts
                                        style={{ height: '230px' }}
                                        option={{
                                            ...revenueQuarter,
                                            color: ['#2F8CD8', '#D43F8D', '#374649'],
                                        }}
                                    />
                                </SimpleCard>
                            </StyledCard>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <StyledCard elevation={6} className="echarts">
                                <CardHeader style={{ whiteSpace: "nowrap" }} className="cardheader">
                                    <Title>Balance sheet ({currency})</Title>
                                    <ValidatorForm className="year-form">
                                        <div style={{ marginLeft: "10px" }} className="year-form-inner">
                                            <label>Year:</label>
                                            <AutoComplete
                                                style={{ width: '100px' }}
                                                className="dropdown"
                                                fullWidth
                                                options={yearopt}
                                                defaultValue={yearopt ? yearopt[0] : null}
                                                getOptionLabel={(option) => option.label}
                                                onChange={(event, value) => changeDropdownValue('balancesheetyear', value, getbalancesheetById)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        value={formdata.balancesheetyear}
                                                        name="balancesheetyear"
                                                        placeholder="Select"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </ValidatorForm>
                                </CardHeader>
                                {/* {console.log("balancesheetById",balancesheetById)}
                        {balancesheetById.map((balancesheetById, index) => ( */}
                                <div className="tableListing">
                                    <div class="detailListinginner heading"><span>Line Items</span><span>Balance</span></div>
                                    <div className="subDiv">
                                        <div className="subDivtitle">1. Assets</div>
                                        <div class="detailListinginner"><span>Cash</span><span>{currency}{getCommas(balancesheetById?.cash)}</span></div>
                                        <div class="detailListinginner"><span>Account receivable</span><span>{currency}{getCommas(balancesheetById?.accountsRecivable)}</span></div>
                                        <div class="detailListinginner"><span>Inventories</span><span>{currency}{getCommas(balancesheetById?.inventories)}</span></div>
                                        <div class="detailListinginner"><span>Current Assets</span><span>{currency}{getCommas(balancesheetById?.currentAssets)}</span></div>
                                        <div class="detailListinginner total"><span>Total Assets</span><span>{currency}{getCommas(balancesheetById?.totalAssests)}</span></div>
                                    </div>
                                    <div className="subDiv">
                                        <div className="subDivtitle">2. Liabilities</div>
                                        <div class="detailListinginner"><span>Account Payable</span><span>{currency}{getCommas(balancesheetById?.accountPayble)}</span></div>
                                        <div class="detailListinginner"><span>Debt</span><span>{currency}{getCommas(balancesheetById?.debt)}</span></div>
                                        <div class="detailListinginner"><span>Current Liabilities</span><span>{currency}{getCommas(balancesheetById?.currentLiabilities)}</span></div>
                                        <div class="detailListinginner total"><span>Total Assets</span><span>{currency}{getCommas(balancesheetById?.totalLiabilites)}</span></div>
                                    </div>
                                    <div className="subDiv">
                                        <div className="subDivtitle">3. Equity</div>
                                        <div class="detailListinginner"><span>Total Assests</span><span>{currency}{getCommas(balancesheetById?.totalAssests)}</span></div>
                                        <div class="detailListinginner"><span>Total Liabilities</span><span>{currency}{getCommas(balancesheetById?.totalLiabilites)}</span></div>
                                        <div class="detailListinginner total"><span>Total Equity</span><span>{currency}{getCommas(balancesheetById?.totalEquity)}</span></div>
                                    </div>
                                </div>
                                {/* ))} */}
                            </StyledCard>
                        </Grid>
                        {/* <Grid item lg={12} md={12} sm={12} xs={12} >
                            <ValidatorForm  className="year-form financeyear">
                                <div style={{ marginLeft: "4px" }} className="year-form-inner">
                                    <label>Year:</label>
                                    <AutoComplete
                                        className="dropdown "
                                        fullWidth
                                        options={yearopt}
                                        defaultValue={yearopt ? yearopt[0] : null}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => changeDropdownValue('creditdebityear', value, getcreditdebitValues)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required year-dropdown"
                                                label="Select"
                                                value={formdata.creditdebityear}
                                                name="creditdebityear"
                                                placeholder="Select"
                                            />
                                        )}
                                    />
                                </div>
                            </ValidatorForm>
                        </Grid> */}
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <div className="setfullheight">
                                <StyledCard elevation={6} className="echarts twodiv">
                                    <CardHeader className="cardheader">
                                        <Title>EBITDA Margin ({currency})</Title>
                                    </CardHeader>
                                    <ValidatorForm className="year-form">
                                        <div className="year-form-inner">
                                            <label>Year:</label>
                                            <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                options={yearopt}
                                                defaultValue={yearopt ? yearopt[0] : null}
                                                getOptionLabel={(option) => option.label}
                                                onChange={(event, value) => changeDropdownValue('ebitdayear', value, getebitdamargin)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        value={formdata.ebitdayear}
                                                        name="ebitdayear"
                                                        placeholder="Select"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </ValidatorForm>
                                    <SimpleCard >
                                        <ReactEcharts
                                            style={{ height: '250px' }}
                                            option={{
                                                ...option,
                                                color: ['#0774f8',
                                                    '#d43f8d', '#ff9900'],
                                            }}
                                        />
                                    </SimpleCard>
                                    <div className="datawithPercentageDiv">
                                        <div className="datawithPercentage">
                                            Gross Profit Margin<span>{formatdecimals(ebitdamargin && ebitdamargin.grossprofitmargin ? ebitdamargin.grossprofitmargin : '')}</span>
                                        </div>
                                        <div className="datawithPercentage">
                                            EBITDA Margin<span>{formatdecimals(ebitdamargin && ebitdamargin.ebitdaMargin ? ebitdamargin.ebitdaMargin : '')}</span>
                                        </div>
                                        <div className="datawithPercentage">
                                            Net Profit Margin<span>{formatdecimals(ebitdamargin && ebitdamargin.netprofitMargin ? ebitdamargin.netprofitMargin : '')}</span>
                                        </div>
                                    </div>
                                </StyledCard>
                            </div>
                        </Grid>

                        <Grid item lg={3} md={3} sm={6} xs={12}>
                            <StyledCard elevation={6} className="echarts">

                                <CardHeader className="cardheader nomargin">
                                    <Title>Debtors days</Title>
                                </CardHeader>
                                {/* {console.log("creditdebitValues",creditdebitValues)}
                        {creditdebitValues && creditdebitValues.map((creditdebitValues, index) => ( */}

                                <div className="debitcreditInner">
                                    <div className="debitcreditSingle">
                                        <div className="alert">{getCommas(creditdebitValues?.debitorDays)}</div>
                                        <div className="content">Goal : {getCommas(creditdebitValues?.debitorGoal)}</div>
                                    </div>
                                    <div className="debitcreditSingle">
                                        <div className="normal">{currency}{getCommas(creditdebitValues?.debitorbankBalance)}</div>
                                        <div className="content">Bank Balance</div>
                                    </div>
                                    <div className="debitcreditSingle">
                                        <div className="normal">{currency}{getCommas(creditdebitValues?.debitortotaldue)}</div>
                                        <div className="content">Total Due</div>
                                    </div>
                                </div>
                                {/* ))} */}
                            </StyledCard>
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={12}>
                            <StyledCard elevation={6} className="echarts debitcredit">
                                <CardHeader className="cardheader nomargin">
                                    <Title>Creditors Days</Title>
                                </CardHeader>
                                {/* {creditdebitValues.map((creditdebitValues, index) => ( */}
                                <div className="debitcreditInner">
                                    <div className="debitcreditSingle">
                                        <div className="alert">{getCommas(creditdebitValues?.creditorDays)}</div>
                                        <div className="content">Goal : {getCommas(creditdebitValues?.creditorGoal)}</div>
                                    </div>
                                    <div className="debitcreditSingle">
                                        <div className="normal">{currency}{getCommas(creditdebitValues?.creditorbankBalance)}</div>
                                        <div className="content">Bank Balance</div>
                                    </div>
                                    <div className="debitcreditSingle">
                                        <div className="normal">{currency}{getCommas(creditdebitValues?.creditorTotaldue)}</div>
                                        <div className="content">Total Due</div>
                                    </div>
                                </div>
                                {/* ))} */}
                            </StyledCard>
                        </Grid>
                    </Grid>
                </>)
            }
        </Container>
    )
}

export default Commercialbusiness
