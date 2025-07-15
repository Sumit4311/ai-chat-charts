import React, { useState, useEffect } from 'react'
import { Grid, Card, Fab, Tabs, Tab } from '@mui/material'
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
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import Typography from '@mui/material/Typography'
import Revenue from '../../image/revenue.svg'
import ReactEcharts from 'echarts-for-react'
import { useOutletContext } from "react-router-dom";

import Icon_countries from '../../image/Seven-countries-cohorts-menu.svg'
import people from '../../image/people.svg'
import {
    getSingleTechnology,
    deleteTechnology,
    getTechnologyByYQM,
    getCostOfService,
    getCapitalExpendituresGraph,
    getCosHighestgraph,
    getCapexHighestgraph,
    getCostOfServiceHighest,
    getCostOfExpenditureHighest,
} from '../../services/api'
import {
    postDataFromApi,
    putDataFromApi,
    getDataFromApi,
} from '../../services/CommonService'
import { getFullMonths, fullMonths, getSortMonths, quaterOpt, yearopt, thousandsOf, DataFormater, formatValueWithCurrency, getCommas } from '../../services/CommonObject'
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

const OpexClass = () => {
    var currentyear = new Date().getFullYear()
    const theme = useTheme()
    const navigate = useNavigate()
    const height = '350px'
    const [singleTechDetails, setsingleTechnoDetails] = useState([])
    const [techByYQM, settechByYQM] = useState([])
    const [costOfService, setcostOfService] = useState([])
    const [capitalExpendituresGraph, setcapitalExpendituresGraph] = useState([])
    const [formdata, setFormData] = useState({ yearCapex: currentyear, yearCos: currentyear, quaterCOS: "Q1", quaterCapex: "Q1" })
    const [cosGraphopt, setcosGraphopt] = useState([])
    const [cosSeriesopt, setcosSeriesopt] = useState([])
    const [capexGraphopt, setcapexGraphopt] = useState([])
    const [capexSeriesopt, setcapexSeriesopt] = useState([])
    const [cosHighest, setcosHighest] = useState([])
    const [cosHighestList, setcosHighestList] = useState([])
    const [monthsList, setMonthList] = useState([])
    const [cosExHighestList, setcosExHighestList] = useState([])
    const [currency] = useOutletContext();
    const [isOpexChart, setisOpexChart] = useState(false)
    const [isOpexYTD, setIsOpexYTD] = useState(false)
    const [cosExmonthsList, setcosExMonthList] = useState([])
    const [capesHighest, setcapesHighest] = useState([])
    const convater = currency == '$' ? "USD" : "RAND"

    const [tabDataValue, setTabDataValue] = useState({
        capexGraphopt: "capexGraphopt_0",
        optionbycapexhighest: "optionbycapexhighest_0",
    })
    let { companyId } = useParams()

    var companyLabel = ''
    var companyopt = JSON.parse(localStorage.getItem('companyDet'))

    companyopt &&
        companyopt.map((opt) => {
            if (opt.id == companyId) {
                companyLabel = opt.name
            }
        })

    function changedropdownvalue(type, e) {
        setFormData((formData) => ({
            ...formData,
            [type]: e,
        }))
    }

    const optionbycos = {
        baseOption: {
            color: ['#8B3DA8', '#02A6CF', '#D7BB4F', '#49C9BD'],
            legend: {
                orient: 'vertical',
                itemGap: 20,
                icon: 'circle',
                textStyle: {
                    color: '#fff',
                },
                right: '0%',
            },
            grid: {
                left: '50px',
                right: '100px',
                bottom: '60px',
                top: '5%',
            },
            tooltip: {},
            dataset: {
                source: cosGraphopt,
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#fff',
                    rotate: 45,
                },
            },
            yAxis: {
                axisLabel: {
                    color: '#fff',
                    formatter: '{value} ' + currency,
                },
                splitLine: {
                    show: false,
                },
            },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: cosSeriesopt,
        },
        media: [
            {
                option: {
                    legend: {
                        orient: 'vertical',
                        itemGap: 20,
                        icon: 'circle',
                        textStyle: {
                            color: '#fff',
                        },
                        right: '0%',
                    },
                },
            },

            {
                query: {
                    maxWidth: 767,
                },
                option: {
                    legend: {
                        bottom: '0%',
                        orient: 'horizontal',
                    },
                    grid: {
                        left: '50px',
                        right: '0px',
                        bottom: '100px',
                        top: '5%',
                    },
                },
            },
        ],
    }

    const optionbycapex = {
        baseOption: {
            color: ['#8B3DA8', '#02A6CF', '#D7BB4F', '#49C9BD'],
            legend: {
                orient: 'vertical',
                itemGap: 20,
                icon: 'circle',
                textStyle: {
                    color: '#fff',
                },
                right: '0%',
            },
            grid: {
                left: '7%',
                right: '100px',
                bottom: '60px',
                top: '5%',
            },
            tooltip: {},
            dataset: {
                source: capexGraphopt,
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#fff',
                    rotate: 45,
                },
            },
            yAxis: {
                axisLabel: {
                    color: '#fff',
                    // formatter: '{value} ' + currency,
                    // formatter:(value)=>{
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
            series: cosSeriesopt,
        },
        // media: [
        //     {
        //         option: {
        //             legend: {
        //                 orient: 'vertical',
        //                 itemGap: 20,
        //                 icon: 'circle',
        //                 textStyle: {
        //                     color: '#fff',
        //                 },
        //                 right: '0%',
        //             },
        //         },
        //     },

        //     {
        //         query: {
        //             maxWidth: 767,
        //         },
        //         option: {
        //             legend: {
        //                 bottom: '0%',
        //                 orient: 'horizontal',
        //             },
        //             grid: {
        //                 left: '50px',
        //                 right: '0px',
        //                 bottom: '100px',
        //                 top: '5%',
        //             },
        //         },
        //     },
        // ],
    }



    const optionbycoshighest = {

        // legend: {
        //     itemGap: 20,
        //     icon: 'circle',
        //     textStyle: {
        //         color: '#fff',
        //     },
        //     left: '5%',
        // },
        // grid: {
        //     left: '40px',
        //     right: '20px',
        //     bottom: '40px',
        // },
        grid: {
            top: '10%',
            bottom: '10%',
            left: '80px',
            right: '5%',
        },
        tooltip: {},
        dataset: {
            source: [
                ...monthsList

            ],

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
                formatter: '{value} ',
            },
            splitLine: {
                show: false,
            },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {
                type: 'bar',
                barWidth: '20px',
                // smooth: true,
                // lineStyle: {
                //     width: 5,
                // },
                tooltip: {
                    // valueFormatter: function (value) {
                    //     return value + ' K';
                    // }
                },
            },
        ],
    }
    const optionbycapexhighest = {
        legend: {
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            left: '5%',
        },
        grid: {
            left: '7%',
            right: '20px',
            bottom: '40px',
        },
        tooltip: {},
        dataset: {
            source: [
                // capitalExpendituresGraph.map(
                //     (elem) => [elem.productName],
                //     ['Jan', 10]
                //     // console.log('elem,', elem.productName)
                // ),
                // ['product', 'Product 1'],
                ...cosExmonthsList
                // ['Jan', 10],
                // ['feb', 25],
                // ['Mar', 50],
                // ['Apr', 20],
                // ['May', 45],
                // ['Jun', 25],
                // ['Jul', 55],
                // ['Aug', 50],
                // ['Sep', 22],
                // ['Oct', 65],
                // ['Nov', 24],
                // ['Dec', 65],
            ],
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
                // formatter: '{value}' + currency,
                // formatter:(value)=>{
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
            {
                // type: 'line',
                type: 'bar',
                barWidth: '20px',
                smooth: true,
                lineStyle: {
                    width: 5,
                },
                itemStyle: {
                    color: function (params) {
                        return params.data[1] < 0 ? 'red' : '#D7BB4F';
                    },
                },
            },
        ],
    }

    useEffect(() => {
        // getsingleTechDetails()
        gettechByYQM()
        getcostOfService()
        // getcapitalExpendituresGraph()
        // getcosHighest()
        getcapexHighest()
    }, [currency, companyId])
    useEffect(() => {
        getOpexHighestList()
    }, [formdata.yearCapex, formdata.quaterCapex, currency, companyId])
    useEffect(() => {
        getOpexYTDGraph()
    }, [currency, companyId, formdata.yearCos])
    // useEffect(() => {
    //     getCosHighestList()
    // }, [formdata.quaterCOS, currency, companyId])


    const getCosHighestList = async () => {
        const response = await getDataFromApi(
            getCostOfServiceHighest + `year=${formdata.yearCapex}&companyId=${companyId}&quarter=${formdata.quaterCapex}&convater=${convater}`,
            1
        )
        if (response && response.status == 200 && Object.keys(response?.data?.monthsValue).length > 0) {
            setcosHighestList(response?.data?.monthsValue)
            const arrayOfObj = Object.entries(response?.data?.monthsValue).map((e) => ({ [e[0]]: e[1] }));
            const Months = fullMonths()
            const sorted = arrayOfObj.sort((a, b) => Months.indexOf(Object.keys(a)[0]) - Months.indexOf(Object.keys(b)[0]));
            const last_month_index = Months.indexOf(sorted[sorted.length - 1]);
            const fill_empty_months = Array


                .from(
                    { length: Math.max(12 - sorted.length, 0) },
                    (v, i) => (last_month_index + i + 1) % 12
                )
                .map((month_index) => {
                    let month = Months[month_index];
                    let update = { [month]: 0 }
                    return update
                })
                .concat(sorted);
            const fill_empty_months_info = sorted.map((obj) => {
                const firstCaps = Object.keys(obj)[0][0].toUpperCase() + Object.keys(obj)[0].slice(1).toLowerCase();
                return ([firstCaps?.slice(0, 3), Object.values(obj)[0]])
            }
            )
            setMonthList([['product', response.data.productName], ...fill_empty_months_info])
        } else {
            var allsormonth = getSortMonths();
            var sormonths = [
                ['Product']
            ]
            allsormonth.map((singlemonth) => {
                sormonths.push([singlemonth, 0])
            })
            setMonthList(sormonths)

        }
    }

    const getOpexHighestList = async () => {
        const response = await getDataFromApi(
            getCostOfExpenditureHighest + `year=${formdata.yearCapex}&companyId=${companyId}&quarter=${formdata.quaterCapex}&convater=${convater}`, 1
            // '&companyId=' + `046a7c0d-e1cf-4ab2-a66e-490cd06b59ae&year=${formdata.year}&quarter=Q2`,
            // 1
        )
        setisOpexChart(false)
        if (response && response.status == 200 && Object.keys(response?.data?.monthsValue).length > 0) {
            setcosHighestList(response?.data?.monthsValue)
            const arrayOfObj = Object.entries(response?.data?.monthsValue).map((e) => ({ [e[0]]: e[1] }));
            // const Months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
            const Months = fullMonths()
            const sorted = arrayOfObj.sort((a, b) => Months.indexOf(Object.keys(a)[0]) - Months.indexOf(Object.keys(b)[0]));
            const last_month_index = Months.indexOf(sorted[sorted.length - 1]);
            const fill_empty_months = Array
                .from(
                    { length: Math.max(12 - sorted.length, 0) },
                    (v, i) => (last_month_index + i + 1) % 12
                )
                .map((month_index) => {
                    let month = Months[month_index];
                    let update = { [month]: 0 }
                    return update
                })
                .concat(sorted);
            const fill_empty_months_info = sorted.map((obj) => {
                const firstCaps = Object.keys(obj)[0][0].toUpperCase() + Object.keys(obj)[0].slice(1).toLowerCase();
                return ([firstCaps?.slice(0, 3), Object.values(obj)[0]])
            }
            )
            setcosExMonthList([['product', response.data.productName], ...fill_empty_months_info])
            setTimeout(() => {
                setisOpexChart(true)
            }, 10)
        }
        else {

            var allsormonth = getSortMonths();

            var sormonths = [
                ['Product']
            ]
            allsormonth.map((singlemonth) => {
                sormonths.push([singlemonth, 0])
            })
            setcosExMonthList(sormonths)
            setTimeout(() => {
                setisOpexChart(true)
            }, 10)
        }
    }

    // console.log("cosHighestList", cosE)

    const getsingleTechDetails = async () => {
        var query = ''

        const response = await getDataFromApi(
            getSingleTechnology + companyId + convater,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            //setsingleTechDetails(response.data);
            //console.log('singleTechDetails',response.data);
        }
    }
    const gettechByYQM = async () => {
        // var query = ''
        // var year = currentyear

        const response = await getDataFromApi(
            getTechnologyByYQM + `year=${formdata.yearCapex}&companyId=${companyId}&convater=${convater}`,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            //settechByYQM(response.data);
            //console.log('techByYQM',response.data)
        }
    }

    const getcostOfService = async () => {
        var query = ''
        var year = currentyear

        const response = await getDataFromApi(
            getCostOfService + `year=${formdata.yearCapex}&companyId=${companyId}&convater=${convater}`,
            1
        )
        if (response && response.status == 200 && response.data.length > 0) {
            setcostOfService(response.data)
            var cosprodnameopt = ['product']
            var maincosopt = [cosprodnameopt]
            var alreadyExistQuarter = ''
            var quarterindex = ''

            response.data.map((cos, i) => {
                if (cosprodnameopt.indexOf(cos.productName) === -1)
                    cosprodnameopt.push(cos.productName)
                /* if (maincosopt.indexOf(cos.quarter+'FY'+cos.year) === -1){
           var quarteryear = [cos.quarter+'FY'+cos.year]
         } else{
          console.log('check')
         } */
                //var quarteryear = []
                maincosopt.find((element) => {
                    if (element[0] === cos.quarter + 'FY' + cos.year) {
                        alreadyExistQuarter = 1
                        quarterindex = maincosopt.findIndex(
                            (maincosopt) =>
                                maincosopt[0] === cos.quarter + 'FY' + cos.year
                        )
                    } else {
                        alreadyExistQuarter = ''
                    }
                })
                if (!alreadyExistQuarter) {
                    cos.value.reverse().map((cosvalue, i) => {
                        var quarteryear = [cosvalue.quarter + 'FY' + cosvalue.year]
                        var prodindex = cosprodnameopt.findIndex(
                            (cosprodnameopt) => cosprodnameopt === cos.productName
                        )
                        if (prodindex) {
                            quarteryear[prodindex] = cosvalue.cValue
                        }
                        maincosopt.push(quarteryear)
                    })
                } else {
                    var prodindex = cosprodnameopt.findIndex(
                        (cosprodnameopt) => cosprodnameopt === cos.productName
                    )
                    /* if(prodindex){
              quarteryear[prodindex] = cos.cValue
            } */
                    maincosopt[quarterindex][prodindex] = cos.cValue
                }
            })
            if (maincosopt) {
                var seriesdata = []
                var serieslength = maincosopt[0].length - 1
                if (serieslength != null && serieslength != 0) {
                    for (var i = 1; i <= serieslength; i++) {
                        var seriessingle = { type: 'line', smooth: true }
                        seriesdata.push(seriessingle)
                    }
                    setcosSeriesopt(seriesdata)
                }
            }
            console.log(cosprodnameopt)
            setcosGraphopt(maincosopt)
        } else {
            setcosGraphopt([
                // ['product', 'BOOK', 'PRODUCTNAMEC', 'PEN'],
                ['Q1FY' + currentyear, 0,],
                ['Q2FY' + currentyear, 0,],
                ['Q3FY' + currentyear, 0,],
            ])
            setcosSeriesopt([
                { type: 'line', smooth: true },
                { type: 'line', smooth: true },
                { type: 'line', smooth: true }
            ])
        }
    }

    const getOpexYTDGraph = async () => {
        var year = currentyear
        // Getdata
        // 'http://solcondev-env.us-east-1.elasticbeanstalk.com/api/v1/capitalexpenditurs/?companyId=c68a7105-6bf2-4447-ad84-fd776713545c'
        let response = await getDataFromApi(
            getCapitalExpendituresGraph + '?companyId=' + `${companyId}&year=${formdata.yearCos}`,
            1
        )
        console.log(response, "ressss0000")
        if (response?.data?.[0]?.value?.length === 0) {
            response = [
                {
                    "productName": response.data?.[0]?.productName,
                    "value": [
                        {
                            "quarter": "Q1",
                            "cValue": 0,
                            "productName": response.data?.[0]?.productName,
                            "year": formdata.yearOpexLine
                        },
                        {
                            "quarter": "Q2",
                            "cValue": 0,
                            "productName": response.data?.[0]?.productName,
                            "year": formdata.yearOpexLine
                        },
                        {
                            "quarter": "Q3",
                            "cValue": 0,
                            "productName": response.data?.[0]?.productName,
                            "year": formdata.yearOpexLine
                        },
                        {
                            "quarter": "Q4",
                            "cValue": 0,
                            "productName": response.data?.[0]?.productName,
                            "year": formdata.yearOpexLine
                        }
                    ]
                }
            ]
        }
        if (response && response?.status == 200 && response?.data?.length > 0) {
            setcapitalExpendituresGraph(response.data)
            setcostOfService(response.data)
            var capexprodnameopt = ['product']
            var maincapexopt = [capexprodnameopt]
            var alreadyExistQuarter = ''
            var quarterindex = ''
            response?.data?.map((capex, i) => {
                if (capexprodnameopt.indexOf(capex?.productName) === -1)
                    capexprodnameopt.push(capex?.productName)
                maincapexopt.find((element) => {
                    if (element[0] === capex.quarter + 'FY' + capex.year) {
                        alreadyExistQuarter = 1
                        quarterindex = maincapexopt.findIndex(
                            (maincapexopt) =>
                                maincapexopt[0] ===
                                capex.quarter + 'FY' + capex.year
                        )
                    } else {
                        alreadyExistQuarter = ''
                    }
                })
                if (!alreadyExistQuarter) {
                    capex.value.reverse().map((capexvalue) => {
                        var quarteryear = [capexvalue.quarter + 'FY' + capexvalue.year]
                        var prodindex = capexprodnameopt.findIndex(
                            (capexprodnameopt) =>
                                capexprodnameopt === capex.productName
                        )
                        if (prodindex) {
                            quarteryear[prodindex] = capexvalue.cValue
                        }
                        maincapexopt.push(quarteryear)
                    })

                } else {
                    var prodindex = capexprodnameopt.findIndex(
                        (capexprodnameopt) =>
                            capexprodnameopt === capex.productName
                    )
                    maincapexopt[quarterindex][prodindex] = capex.cValue
                }
            })
            if (maincapexopt) {
                var seriesdata = []
                var serieslength = maincapexopt[0].length - 1
                if (serieslength != null && serieslength != 0) {
                    for (var i = 1; i <= serieslength; i++) {
                        var seriessingle = { type: 'line', smooth: true }
                        seriesdata.push(seriessingle)
                    }
                    setcapexSeriesopt(seriesdata)
                }
            }
            setcapexGraphopt(maincapexopt)
            setIsOpexYTD(false)
            setTimeout(() => {
                setIsOpexYTD(true)
            }, 1)
        }
        else {
            setcapexSeriesopt([
                { type: 'line', smooth: true },
                { type: 'line', smooth: true },
                { type: 'line', smooth: true },
            ])
            setcapexGraphopt([
                // ['product', 'BOOK', 'PRODUCTNAMEC', 'PEN'],
                ['Q1FY' + currentyear, 0],
                ['Q2FY' + currentyear, 0,],
                ['Q3FY' + currentyear, 0,],
            ])
            setIsOpexYTD(false)
            setTimeout(() => {
                setIsOpexYTD(true)
            }, 1)
        }
    }

    const getcosHighest = async () => {
        var query = ''
        var year = currentyear

        const response = await getDataFromApi(
            // '&companyId=' + `${companyId}&year=${formdata.yearCos}&convater=${convater}`,
            getCosHighestgraph + '&companyId=' + `${companyId}&year=${formdata.yearCos}&convater=${convater}`,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setcosHighest(response.data)
        }
    }
    const getcapexHighest = () => { }

    const handleTabsChange = (event, newValue) => {
        setTabDataValue((formData) => ({
            ...formData,
            [newValue]: event,
        }))
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Opex' }]} />
                <div className="breadnavigation">
                    Home / Company lists{' '}
                    {companyLabel ? ' / ' + companyLabel : ''} / Dashboard /
                    Opex{' '}
                </div>
            </div>
            <Grid container spacing={3}>
                {/* <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="noPadding"
                >
                    <StyledCard elevation={6} className="echarts paddingbottom">
                        <CardHeader className="cardheader">
                            <Title>CoS YTD and per quarter</Title>
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
                                    onChange={(event, value) => {
                                        console.log("event", event, value);
                                        changedropdownvalue('yearCos', value?.label)
                                    }
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
                            <ReactEcharts
                                style={{ height: '350px' }}
                                option={{
                                    ...optionbycos,
                                    color: [
                                        '#8B3DA8',
                                        '#02A6CF',
                                        '#D7BB4F',
                                        '#49C9BD',
                                    ],
                                }}
                            />
                        </SimpleCard>
                    </StyledCard>
                </Grid> */}
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
                            <Title>Opex YTD and per quarter ({currency})</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.capexGraphopt}
                            onChange={(e, value) => handleTabsChange(value, 'capexGraphopt')}
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
                            <Tab label="Graph" value={'capexGraphopt_0'} />
                            <Tab label="Table" value={'capexGraphopt_1'} />
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
                                    onChange={(event, value) => {
                                        changedropdownvalue('yearCos', value?.label)
                                    }
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
                                value={tabDataValue.capexGraphopt}
                                index={'capexGraphopt_0'}
                                className="tabpanel nopadding notclear"
                            >
                                {isOpexYTD &&
                                    <ReactEcharts
                                        style={{ height: '350px' }}
                                        option={{
                                            ...optionbycapex,
                                            color: [
                                                '#8B3DA8',
                                                '#02A6CF',
                                                '#D7BB4F',
                                                '#49C9BD',
                                            ],
                                        }}
                                    />
                                }
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.capexGraphopt}
                                index={'capexGraphopt_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll">
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    capexGraphopt.map((singleData) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData[0]}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {
                                                capexGraphopt.length > 0 && capexGraphopt[0].map((singleData, index) => (
                                                    index != 0 && (
                                                        <TableRow>
                                                            <TableCell align="left" className="imgCell">
                                                                <span>
                                                                    {singleData}
                                                                </span>
                                                            </TableCell>
                                                            {
                                                                capexGraphopt.map((singleData, i) => (
                                                                    i != 0 && (
                                                                        <TableCell align="left" className="imgCell">
                                                                            <span>
                                                                                {getCommas(singleData[index])}
                                                                            </span>
                                                                        </TableCell>
                                                                    )
                                                                ))
                                                            }

                                                        </TableRow>
                                                    )

                                                ))
                                            }
                                        </TableBody>
                                    </StyledTable>
                                </div>
                            </TabPanel>
                        </SimpleCard>
                    </StyledCard>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} className="noPadding">
                    <StyledCard elevation={6} className="echarts paddingbottom">
                        <CardHeader className="cardheader">
                            <Title>Opex Highest ({currency})</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.optionbycapexhighest}
                            onChange={(e, value) => handleTabsChange(value, 'optionbycapexhighest')}
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
                            <Tab label="Graph" value={'optionbycapexhighest_0'} />
                            <Tab label="Table" value={'optionbycapexhighest_1'} />
                        </Tabs>
                        <ValidatorForm className="year-form">

                            <div className="year-form-inner">
                                <label>Quarter:</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={quaterOpt}
                                    defaultValue={quaterOpt ? quaterOpt[0] : null}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>

                                        changedropdownvalue('quaterCapex', value?.label)


                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.quaterCapex}
                                            name="year"
                                            placeholder="Select"
                                        />
                                    )}
                                />

                                <label>Year:</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={yearopt}
                                    defaultValue={yearopt ? yearopt[0] : null}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue('yearCapex', value?.label)

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
                                value={tabDataValue.optionbycapexhighest}
                                index={'optionbycapexhighest_0'}
                                className="tabpanel nopadding notclear"
                            >
                                {
                                    isOpexChart &&
                                    <ReactEcharts
                                        style={{ height: '350px' }}
                                        option={{
                                            ...optionbycapexhighest,
                                            color: ['#D7BB4F'],
                                        }}
                                    />

                                }
                            </TabPanel>
                            <TabPanel style={{overflow:'auto'}}
                                value={tabDataValue.optionbycapexhighest}
                                index={'optionbycapexhighest_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll" style={{width:'200%'}}>
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    cosExmonthsList.map((singleData) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData[0]}
                                                            </span>
                                                        </TableCell>

                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {
                                                cosExmonthsList.length > 0 && cosExmonthsList[0].map((singleData, index) => (
                                                    index != 0 && (
                                                        <TableRow>
                                                            <TableCell align="left" className="imgCell">
                                                                <span>
                                                                    {singleData}
                                                                </span>
                                                            </TableCell>
                                                            {
                                                                cosExmonthsList.map((singleData, i) => (
                                                                    i != 0 && (
                                                                        <TableCell align="left" className="imgCell">
                                                                            <span>
                                                                                {getCommas(singleData[index])}
                                                                            </span>
                                                                        </TableCell>
                                                                    )
                                                                ))
                                                            }

                                                        </TableRow>
                                                    )

                                                ))
                                            }
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
export default OpexClass
