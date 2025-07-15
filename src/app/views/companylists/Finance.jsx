import React, { useState, useEffect } from 'react'
import { Grid, Card, Fab, Tabs, Tab } from '@mui/material'
import { useTheme, Box, styled } from '@mui/system'
import { useOutletContext } from "react-router-dom";
import { CircularProgress } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import { Line } from 'react-chartjs-2';

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
import { getSortMonths, yearopt, thousandsOf, formatdecimals, DataFormater, formatValueWithCurrency, getChartItemStyle, getColorPink, getColorSkyBlue,financialYearopt } from '../../services/CommonObject';
import { Autocomplete } from '@mui/lab'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useParams } from 'react-router-dom';
import { getCommas } from 'app/services/CommonObject'
import { Chart, registerables } from "chart.js"
import PropTypes from 'prop-types'
Chart.register(...registerables);

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

    const [tabDataValue, setTabDataValue] = useState({
        ebidtaYTDyear: 'ebidtaYTDyear_0',
        revenueQuarter: 'revenueQuarter_0',
        ebitdamarginOpt: 'ebitdamarginOpt_0',
    })
    var companyLabel = ""
    var companyopt = JSON.parse(localStorage.getItem('companyDet'))


    companyopt && companyopt.map((opt) => {
        if (opt.id == companyId) {
            companyLabel = opt.name
        }
    })

    var companyFinancialYear=""
    var startMonth=""
    var endMonth=""
    companyopt && companyopt.map((opt) => {
        if (opt.id == companyId) {
            console.log("sdsd",opt)
            companyFinancialYear = opt.financialYear
            startMonth=opt.startMonth
            endMonth=opt.endMonth

        }
    })

    var allsortmonths = getSortMonths()
    var monthopt = [];
    allsortmonths.map((singlemonth, i) => {
        monthopt.push({ id: i + 1, month: singlemonth })
    })

    const generateMonths = (startMonth, endMonth) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const startIdx = months.findIndex(month => month.toLocaleLowerCase() === startMonth.toLocaleLowerCase().slice(0, 3));
        const endIdx = months.findIndex(month => month.toLocaleLowerCase() === endMonth.toLocaleLowerCase().slice(0, 3));
        let generatedMonths = [];
    
        if (startIdx !== -1 && endIdx !== -1) {
            if (startIdx <= endIdx) {
                generatedMonths = months.slice(startIdx, endIdx + 1);
            } else {
                generatedMonths = months.slice(startIdx).concat(months.slice(0, endIdx + 1));
            }
        }
    
        return generatedMonths;
    };


    { console.log(ebitdamarginOpt, "ebitdamarginOpt") }
    const option = {
        grid: {
            top: '10%',
            bottom: '20%',
            left: '15%',
            right: '10%',
        },
        tooltip: {
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                color: '#fff',
            },
            data: ebitdamarginOpt.map((item) => item.name),
            splitLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff',
                formatter: (value) => {
                    return formatValueWithCurrency(value, '%');
                },
                //  formatter: (value) => {
                //     return formatValueWithCurrency(value) + ' ' + currency
                // },
            },
            splitLine: {
                show: false,
            },
            axisLine: {
                show: true,
                // lineStyle: {
                //   color: '#fff', // Color of the y-axis line
                // },
            },
        },
        series: [
            {
                name: 'EBITDA MARGIN',
                type: 'bar',
                barWidth: '20%',
                barGap: 0,
                // data: ebitdamarginOpt.map((item) => item.value),
                data: ebitdamarginOpt.map((item) => ({
                    value: item.value?.toFixed(2),
                    ...getChartItemStyle(item.value)
                    // itemStyle: {
                    //     color: item.value > 0 ? '#02A6CF' : 'red'
                    // },
                })),
                label: {},
            },
        ],
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

    const revenueQuarter = {
        tooltip: {
            trigger: 'item',
        },
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
        dataset: {
            source: cashytdopt,
        },
        
        xAxis: {
            type: 'category',
            data: '',
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
        series: [
            {
                type: 'bar',
                barWidth: '30%',
                barGap: 0,
                itemStyle: {
                    color: (params) => {
                        return getColorSkyBlue(params.data[1]);
                    },
                },
            }, {
                type: 'bar',
                barWidth: '30%',
                barGap: 0,
                itemStyle: {
                    color: (params) => {
                        return getColorPink(params.data[2]);
                    },
                },
            }
            // {
            //     type: 'line', data: [25, 40, 55, 75, 10, 70, 55, 50, 15, 50, 65, 70], smooth: true,
            //     lineStyle: { width: 4 },
            // }
        ]
    };

    // const cosgraphoption = {
    //     grid: {
    //         top: '5%',
    //         bottom: '10%',
    //         left: '12%',
    //         right: '5%',
    //     },
    //     xAxis: {
    //         type: 'category',
    //         data: ebidtaYTDyear,
    //         axisLabel: {
    //             color: '#fff',
    //         },
    //     },
    //     tooltip: {
    //         show: true,
    //         trigger: 'axis',
    //         axisPointer: {
    //             type: 'cross',
    //             lineStyle: {
    //                 opacity: 0,
    //             },
    //         },
    //         crossStyle: {
    //             color: '#000',
    //         },
    //     },
    //     yAxis: {
    //         type: 'value',
    //         axisLabel: {
    //             color: '#fff',
    //             formatter: (value) => {
    //                 return formatValueWithCurrency(value, currency);
    //             },
    //         },
    //         splitLine: {
    //             show: true,
    //             lineStyle: {
    //                 // color: 'rgba(255, 255, 255, 0.5)',
    //                 color: 'red',
    //                 opacity: 0.1,
    //             },
    //         },
    //     },
    //     series: [
    //         {
    //             type: 'line',
    //             data: ebidtaYTD.map(value => ({
    //                 value,
    //                 itemStyle: {
    //                     color: value < 0 ? 'red' : 'green',
    //                 },
    //             })),
    //         },
    //     ],
    // };
    const ebidtas = ['2000', '4000', '5000', '-4000', '-6000', '-7000']
    const isAnyValueNegative = ebidtaYTD.some(value => parseInt(value) < 0)
    const cosgraphoption = {
        grid: {
            top: '5%',
            bottom: '10%',
            left: '12%',
            right: '5%',
        },
        xAxis: {
            type: 'category',
            // data: ['2012','2013','2014','2015','2016','2017'],
            data: ebidtaYTDyear,
            axisLabel: {
                color: '#fff',
            },
            axisLine: {
                lineStyle: {
                    color: 'darkgrey',
                },
            }
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
                formatter: (value) => {
                    return formatValueWithCurrency(value, currency);
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
                type: 'bar',
                barWidth: 30,
                // symbol: 'circle',
                // symbolSize: (params) => {
                //     const dataIndex = params.dataIndex;
                //     const value = parseInt(ebidtaYTD[dataIndex]); 
                //     return value < 0 ? 10 : 5;
                // },
                data: ebidtaYTD.map(value => ({
                    value: parseInt(value),
                    // itemStyle: {
                    //     color: parseInt(value) < 0 ? 'red' : 'green', 
                    // },
                    ...getChartItemStyle(value)
                })),
                // lineStyle: {
                //     color: isAnyValueNegative === 0 ? 'pink' : (isAnyValueNegative ? 'red' : 'green'),
                //     width: 2,
                //     shadowBlur: 10,
                //     shadowColor: 'rgba(0, 0, 0, 0.3)',
                // },
                // lineStyle: {
                //     color: (params) => {
                //         const value = params.value;
                //         if (value === 0) {
                //             return 'pink';
                //         } else if (value < 0) {
                //             return 'red';
                //         } else {
                //             return 'green';
                //         }
                //     },
                //     width: 2,
                // }, 
            },
        ],
    };
    // emphasis: {
    //     color: 'pink',
    // },
    // const fixedYAxisValues = [12666, 16669, 7777, 8888];
    const candlestickData = ebidtaYTDyear.map((year, index) => ({
        x: year,
        y: [
            ebidtaYTD[index],
            Math.min(...ebidtaYTD),
            Math.max(...ebidtaYTD),
            ebidtaYTD[index],
        ],
        // y: fixedYAxisValues,
        fillColor: ebidtaYTD[index] < 0 ? '#FF0000' : '#008000',
        strokeColor: ebidtaYTD[index] < 0 ? '#FF0000' : '#008000',
    }));

    const options = {
        chart: {
            type: 'candlestick',
            height: 350,
            width: 500,
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            type: 'category',
            labels: {
                style: {
                    cssClass: 'x-axis-labels',
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (value) => {
                    return formatValueWithCurrency(value, currency);
                },
                style: {
                    colors: ['white'],
                },
            },
        },
        plotOptions: {
            candlestick: {
                // colors: {
                //     upward: '#008000',
                //     downward: '#FF0000',
                // },

            },
        },
        fill: {
            opacity: 1,
        },
        toolbar: {
            tools: {
                download: false,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
            },
            autoSelected: 'zoom',
        },
    };

    const ebidtaData = {
        labels: ebidtaYTDyear,
        datasets: [
            {
                label: 'EBIDTA YTD',
                fill: false,
                lineTension: 0.1,
                backgroundColor: ebidtaYTD.map(value => (value < 0 ? 'red' : 'green')),
                borderColor: ebidtaYTD.map(value => (value < 0 ? 'red' : 'green')),
                pointBorderColor: ebidtaYTD.map(value => (value < 0 ? 'red' : 'green')),
                pointBackgroundColor: ebidtaYTD.map(value => (value < 0 ? 'red' : 'green')),
                data: ebidtaYTD,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const ebidtaOptions = {
        scales: {
            x: [
                {
                    type: 'category',
                    ticks: {
                        color: '#fff',
                    },
                    grid: {
                        color: 'darkgrey',
                    },
                },
            ],
            y: [
                {
                    ticks: {
                        color: '#fff',
                        callback: (value) => formatValueWithCurrency(value, currency),
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        borderWidth: 1,
                    },
                },
            ],
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff',
                },
            },
            tooltip: {
                backgroundColor: '#000',
            },
        },
    };


    // const positiveData = ebidtaYTD.map((value, index) => (value > 0 ? value : null));
    // const negativeData = ebidtaYTD.map((value, index) => (value < 0 ? value : null));
    // const cosgraphoption = {
    //     grid: {
    //         top: '5%',
    //         bottom: '10%',
    //         left: '12%',
    //         right: '5%',
    //     },
    //     xAxis: {
    //         type: 'category',
    //         data: ebidtaYTDyear,
    //         axisLabel: {
    //             color: '#fff',
    //         },
    //     },
    //     tooltip: {
    //         show: true,
    //         trigger: 'axis',
    //         axisPointer: {
    //             type: 'cross',
    //             lineStyle: {
    //                 opacity: 0,
    //             },
    //         },
    //         crossStyle: {
    //             color: '#000',
    //         },
    //     },
    //     yAxis: {
    //         type: 'value',
    //         axisLabel: {
    //             color: '#fff',
    //             formatter: (value) => {
    //                 return formatValueWithCurrency(value, currency);
    //             },
    //         },
    //         splitLine: {
    //             show: true,
    //             lineStyle: {
    //                  color: 'rgba(255, 255, 255, 0.5)',
    //                 // color: 'red', 
    //                 opacity: 0.1,
    //             },
    //         },
    //     },
    //     series: [
    //         {
    //             type: 'line',
    //             data: positiveData,
    //             lineStyle: {
    //                 color: 'green',
    //                 width: 2,
    //             },
    //             itemStyle: {
    //                 color: 'green',
    //             },
    //         },
    //         {
    //             type: 'line',
    //             data: negativeData,
    //             lineStyle: {
    //                 color: 'red',
    //                 width: 2,
    //             },
    //             itemStyle: {
    //                 color: 'red',
    //             },
    //         },
    //     ],
    // };

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
        if (typeof year === 'number') {
            year = year.toString();
        }
        
        console.log("year", year);
        
        if (companyFinancialYear === "Financial Year") {
            year = year.split('-')[0]; // Extract the starting year if it's a range
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

            let cosmonthopt;
if (companyFinancialYear) {
    cosmonthopt = generateMonths(startMonth, endMonth);
} else {
    cosmonthopt = getSortMonths(); // Assuming getSortMonths returns an array of abbreviated month names
}
let cashdataopt = cosmonthopt.map(month => [month, 0, 0]);

response?.data?.map(opt => {
    let month = opt?.month?.toLowerCase().slice(0, 3);
    cashdataopt.map((entry, index) => {
        if (entry[0].toLowerCase() === month) {
            cashdataopt[index] = [entry[0], opt?.cashInflow?.toFixed(2), opt?.cashOutflow?.toFixed(2)];
        }
    });
});
setcashytdopt(cashdataopt);
            console.log('cashdataoptcashdataoptcashdataopt', cashdataopt)
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
    const handleTabsChange = (event, newValue) => {
        setTabDataValue((formData) => ({
            ...formData,
            [newValue]: event,
        }))
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
                                    {sortedFinance.length > 0 ? (
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
                                                        dataKey: 'totalExpenses',
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
                                                ].map((statement, statementIndex) => {
                                                    const hasExpenses =
                                                        (sortedFinance.some((details) => details[statement.dataKey] > 0) ||
                                                            sortedFinance.some((details) => details[statement.dataKey] < 0))
                                                    return (
                                                        !hasExpenses &&
                                                            (statement.dataKey === 'totalExpenses ' || 'revenue' ||
                                                                'netEarning' || 'earningbeforeTaxes' || 'generalAdministrative' || 'grossProfit' || 'costofGoodsSold' || 'taxes'
                                                                || 'interest')
                                                            ? null : (
                                                                <TableRow
                                                                    key={statementIndex}
                                                                    className={
                                                                        statement.dataKey === 'costofGoodsSold' ||
                                                                            statement.dataKey === 'generalAdministrative' ||
                                                                            statement.dataKey === 'interest' ||
                                                                            statement.dataKey === 'taxes'
                                                                            ? 'subrow'
                                                                            : ''
                                                                    }
                                                                >
                                                                    <TableCell align="left">{statement.label}</TableCell>
                                                                    {sortedFinance.map((first_details, yearIndex) => (
                                                                        <TableCell align="left" key={yearIndex}>
                                                                            <span align="left">{getCommas(first_details[statement.dataKey])}</span>
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            )
                                                    )
                                                })}
                                            </TableBody>
                                        </StyledTable>
                                    ) : (
                                        <p className='incomestatement'>No data available</p>
                                    )}
                                </div>
                            </StyledCard>
                        </Grid>
                        {console.log(sortedFinance, "jjjjj000")}
                        <Grid item lg={8} md={8} sm={12} xs={12} className="noPadding">
                            <StyledCard elevation={6} className="echarts paddingbottom">
                                <CardHeader className="cardheader">
                                    <Title>EBIDTA ({currency})</Title>
                                </CardHeader>
                                <Tabs
                                    value={tabDataValue.ebidtaYTDyear}
                                    onChange={(e, value) => handleTabsChange(value, 'ebidtaYTDyear')}
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
                                    <Tab label="Graph" value={'ebidtaYTDyear_0'} />
                                    <Tab label="Table" value={'ebidtaYTDyear_1'} />
                                </Tabs>
                                <SimpleCard >
                                    <TabPanel
                                        value={tabDataValue.ebidtaYTDyear}
                                        index={'ebidtaYTDyear_0'}
                                        className="tabpanel nopadding notclear"
                                    >
                                        <ReactEcharts
                                            style={{ height: '230px' }}
                                            option={{
                                                ...cosgraphoption,
                                                color: ['#2F8CD8'],
                                            }}
                                        />
                                    </TabPanel>
                                    <TabPanel style={{overflow:'auto'}}
                                        value={tabDataValue.ebidtaYTDyear}
                                        index={'ebidtaYTDyear_1'}
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
                                                            ebidtaYTDyear.map((singleyear) => (
                                                                <TableCell align="left" className="imgCell">
                                                                    <span>
                                                                        {singleyear}
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
                                                                Ebidta
                                                            </span>
                                                        </TableCell>
                                                        {
                                                            ebidtaYTD.map((singleData) => (
                                                                <TableCell align="left" className="imgCell">
                                                                    <span>
                                                                        {getCommas(singleData, currency)}
                                                                    </span>
                                                                </TableCell>

                                                            ))
                                                        }
                                                    </TableRow>
                                                </TableBody>
                                            </StyledTable>
                                        </div>
                                    </TabPanel>
                                    {/* <ReactApexChart
                                        id="candlestick-chart"
                                        options={options}
                                        series={[{ data: candlestickData }]}
                                        type="candlestick"
                                        height={350} /> */}
                                    {/* <Line data={ebidtaData} 
                                    options={ebidtaOptions} 
                                    /> */}

                                </SimpleCard>
                            </StyledCard>
                            <StyledCard elevation={6} className="echarts">
                                <CardHeader className="cardheader">
                                    <Title>Cash YTD({currency})</Title>
                                </CardHeader>
                                <Tabs
                                    value={tabDataValue.revenueQuarter}
                                    onChange={(e, value) => handleTabsChange(value, 'revenueQuarter')}
                                    aria-label="basic tabs example"
                                    className="whitebg"
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    sx={{
                                        '& .MuiTabScrollButton-root': { color: 'white', },
                                    }}
                                >
                                    <Tab label="Graph" value={'revenueQuarter_0'} />
                                    <Tab label="Table" value={'revenueQuarter_1'} />
                                </Tabs>
                                <ValidatorForm className="year-form">
                                    <div className="year-form-inner">
                                        <label>Year:</label>
                                        {companyFinancialYear==="Financial Year" ?<> <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={financialYearopt}
                                    defaultValue={financialYearopt ? financialYearopt[0] : null}
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
                                /> </>:  <AutoComplete
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
                            />}
                                        {/* <AutoComplete
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
                                        /> */}
                                    </div>
                                </ValidatorForm>

                                <SimpleCard >
                                    <TabPanel
                                        value={tabDataValue.revenueQuarter}
                                        index={'revenueQuarter_0'}
                                        className="tabpanel nopadding notclear"
                                    >
                                        <ReactEcharts
                                            style={{ height: '230px' }}
                                            option={{
                                                ...revenueQuarter,
                                                color: ['#2F8CD8', '#D43F8D', '#374649'],
                                            }}
                                        />
                                    </TabPanel>
                                    <TabPanel
                                        value={tabDataValue.revenueQuarter}
                                        index={'revenueQuarter_1'}
                                        className="tabpanel nopadding notclear"
                                        style={{overflowX:'scroll'}}
                                    >
                                        <div className="table_scroll" style={{width:'275%'}}>
                                            <StyledTable className="customtable odd-even withborder">
                                                <TableHead>
                                                    <TableRow>
                                                        {cashytdopt.length > 0 && cashytdopt.map((singleData, index) => (
                                                            <TableCell align="left" className="imgCell">
                                                                <span>
                                                                    {singleData[0]}
                                                                </span>
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {cashytdopt.length > 0 && cashytdopt[0].map((singleData, index) => (
                                                        index != 0 && (
                                                            <TableRow key={index}>
                                                                <TableCell align="left" className="imgCell">
                                                                    <span>
                                                                        {singleData}
                                                                    </span>
                                                                </TableCell>
                                                                {cashytdopt.map((singleValue, i) => (
                                                                    i != 0 && (<TableCell align="left" className="imgCell">
                                                                        <span>
                                                                            {getCommas(singleValue[index])}
                                                                        </span>
                                                                    </TableCell>)
                                                                ))
                                                                }
                                                            </TableRow>
                                                        )
                                                    ))}
                                                </TableBody>
                                            </StyledTable>
                                        </div>
                                    </TabPanel>
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
                        <Grid item lg={7} md={7} sm={12} xs={12}>
                            <div className="setfullheight">
                                <StyledCard elevation={6} className="echarts twodiv">
                                    <CardHeader className="cardheader">
                                        <Title>EBITDA Margin(%)
                                            {/* ({currency}) */}
                                        </Title>
                                    </CardHeader>
                                    <Tabs
                                        value={tabDataValue.ebitdamarginOpt}
                                        onChange={(e, value) => handleTabsChange(value, 'ebitdamarginOpt')}
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
                                        <Tab label="Graph" value={'ebitdamarginOpt_0'} />
                                        <Tab label="Table" value={'ebitdamarginOpt_1'} />
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
                                    {/* <SimpleCard > */}
                                    <TabPanel
                                        value={tabDataValue.ebitdamarginOpt}
                                        index={'ebitdamarginOpt_0'}
                                        className="tabpanel nopadding notclear"
                                    >
                                        <ReactEcharts
                                            style={{ height: '250px', width: "110%" }}
                                            option={{
                                                ...option,
                                                color: ['#2F8CD8', '#ff9900'],
                                            }}
                                        />
                                    </TabPanel>
                                    <TabPanel
                                        value={tabDataValue.ebitdamarginOpt}
                                        index={'ebitdamarginOpt_1'}
                                        className="tabpanel nopadding notclear"
                                    >

                                        <div className="table_scroll">
                                            <StyledTable className="customtable odd-even withborder">
                                                <TableHead>
                                                    <TableRow>
                                                        {
                                                            ebitdamarginOpt.map((singleyear) => (
                                                                <TableCell align="left" className="imgCell">
                                                                    <span>
                                                                        {singleyear.name}
                                                                    </span>
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        {
                                                            ebitdamarginOpt.map((singleyear) => (
                                                                <TableCell align="left" className="imgCell">
                                                                    <span>
                                                                        {getCommas(singleyear.value)}
                                                                    </span>
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                </TableBody>
                                            </StyledTable>
                                        </div>
                                    </TabPanel>
                                    {/* </SimpleCard> */}
                                    {/* <div className="datawithPercentageDiv">
                                        <div className="datawithPercentage">
                                            Gross Profit Margin<span>{formatdecimals(ebitdamargin && ebitdamargin.grossprofitmargin ? ebitdamargin.grossprofitmargin : '')}</span>
                                        </div>
                                        <div className="datawithPercentage">
                                            EBITDA Margin<span>{formatdecimals(ebitdamargin && ebitdamargin.ebitdaMargin ? ebitdamargin.ebitdaMargin : '')}</span>
                                        </div>
                                        <div className="datawithPercentage">
                                            Net Profit Margin<span>{formatdecimals(ebitdamargin && ebitdamargin.netprofitMargin ? ebitdamargin.netprofitMargin : '')}</span>
                                        </div>
                                    </div> */}
                                </StyledCard>
                            </div>
                        </Grid>

                        <Grid item lg={2.5} md={2.5} sm={6} xs={12}>
                            <StyledCard elevation={6} className="echarts">

                                <CardHeader className="cardheader nomargin">
                                    <Title>Debtors days</Title>
                                </CardHeader>
                                {/* {console.log("creditdebitValues",creditdebitValues)}
                        {creditdebitValues && creditdebitValues.map((creditdebitValues, index) => ( */}

                                <div className="debitcreditInner">
                                    {/* <div className="debitcreditSingle">
                                        <div className="alert">{getCommas(creditdebitValues?.debitorDays)}</div>
                                        <div className="content">Goal : {getCommas(creditdebitValues?.debitorGoal)}</div>
                                    </div> */}
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
                        <Grid item lg={2.5} md={2.5} sm={6} xs={12}>
                            <StyledCard elevation={6} className="echarts debitcredit">
                                <CardHeader className="cardheader nomargin">
                                    <Title>Creditors Days</Title>
                                </CardHeader>
                                {/* {creditdebitValues.map((creditdebitValues, index) => ( */}
                                <div className="debitcreditInner">
                                    {/* <div className="debitcreditSingle">
                                        <div className="alert">{getCommas(creditdebitValues?.creditorDays)}</div>
                                        <div className="content">Goal : {getCommas(creditdebitValues?.creditorGoal)}</div>
                                    </div> */}
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
        </Container >
    )
}

export default Commercialbusiness
