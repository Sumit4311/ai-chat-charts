import React, { useState, useEffect } from 'react'
import { Grid, Card, Fab, Tab, Tabs } from '@mui/material'
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
import { useOutletContext } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import Typography from '@mui/material/Typography'
import Revenue from '../../image/revenue.svg'
import ReactEcharts from 'echarts-for-react';
import Icon_countries from '../../image/Seven-countries-cohorts-menu.svg'
import {
    getCurrencyValue,
    getSortMonths,
    yearopt,
    thousandsOf,
    getCommas,
    DataFormater,
    formatValueWithCurrency,
    financialYearopt
} from '../../services/CommonObject'
import { Autocomplete } from '@mui/lab'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    getYTDrevenue,
    getProdSplitValues,
    getCostGraph,
    getCountriesGraph,
    getEBITDAvalues,
    getRevenueGraphQuarterly,
    getHeatMap,
} from '../../services/api'
import { getDataFromApi } from '../../services/CommonService'
import { useParams } from 'react-router-dom'
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import { geoCentroid } from 'd3-geo'
import PropTypes from 'prop-types'

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


const Companydashboard = () => {
    var currentyear = new Date().getFullYear()
    const theme = useTheme()
    const navigate = useNavigate()
    const height = '350px'
    const [formdata, setFormData] = useState({
        revenuyear: currentyear,
        year: currentyear,
        costyear: '',
        ytdYear: currentyear,
    })
    const [tabDataValue, setTabDataValue] = useState({
        productSplitLabels: 'productSplitLabels_0',
        revenueQuarter: 'revenueQuarter_0',
        cosGraphMonth: 'cosGraphMonth_0',
        ebitdaGraphopt: 'ebitdaGraphopt_0',
    })
    const [ytdRevenue, setytdRevenue] = useState([])
    const [dropdown, setdropdown] = useState('USD')
    const [prodSplitValues, setprodSplitValues] = useState([])
    const [costGraph, setcostGraph] = useState([])
    const [countriesGraph, setcountriesGraph] = useState([])
    const [ebitdaGraphValues, setebitdaGraphValues] = useState([])
    const [prodSplitvaluesGraphopt, setprodSplitvaluesGraphopt] = useState([])
    const [prodSplitvaluesSeriesopt, setprodSplitvaluesSeriesopt] = useState([])
    const [cosGraphMonth, setcosGraphMonth] = useState([])
    const [cosGraphData, setcosGraphData] = useState([])
    const [revenueGraphQuarterly, setrevenueGraphQuarterly] = useState([])
    const [revenueIncome, setrevenueIncome] = useState([])
    const [profitloss, setProfitloss] = useState([])
    const [revenueExpense, setrevenueExpense] = useState([])
    const [revenueQuarterYear, setrevenueQuarterYear] = useState([])
    const [TooltipContent, setTooltipContent] = useState('')
    const [heatMap, setheatMap] = useState([])
    const [ebitdaLabel, setEbitdaLabel] = useState(true)
    const [EBITDAperQuarter, setEBITDAperQuarter] = useState([])
    const [ebitdaGraphopt, setebitdaGraphopt] = useState([])
    const [ebitdaSeriesopt, setebitdaSeriesopt] = useState([])
    const [productSplitLabels, setProductSplitLabels] = useState(false)
    const [currency] = useOutletContext()
    const [forceUpdate, setForceUpdate] = useState(false);

    let { companyId } = useParams()
    var companyLabel = ''

    var companyopt = JSON.parse(localStorage.getItem('companyDet'))

    companyopt &&
        companyopt.map((opt) => {
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

        useEffect(() => {
            // This effect will run whenever any of these dependencies change
            // It will trigger a re-render by toggling the value of forceUpdate
            setForceUpdate(prevState => !prevState);
        }, [companyFinancialYear, financialYearopt, yearopt, formdata.totalSaleyear,formdata.year]);
      

    const option = {
        grid: {
            top: '22%',
            bottom: '22%',
        },
        legend: {
            show: true,
            textStyle: {
                color: '#fff',
            },
            itemGap: 10,
            icon: 'circle',
            // itemStyle:{
            //     color:"blue"
            // }
        
        },
        tooltip: {},
        dataset: {
            source: prodSplitvaluesGraphopt,
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
                // formatter: '{value} ' + currency,
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
        series: prodSplitvaluesSeriesopt,
        type: "bar",
        // itemStyle: {
        //     color: function (params) {
        //         return params?.data[1] < 0 ? 'red' : null;
        //     },
        // },
    }

    const getSeriesData = (profitloss) => {
        const seriesData = profitloss?.map((value) => ({
            value,
            itemStyle: {
                color: value < 0 ? 'red' : 'green',
            },
        }));
        return seriesData;
    };

    const getRevenueExpense = (revenueExpense) => {
        const revenueExpenseData = revenueExpense?.map((value) => ({
            value,
            itemStyle: {
                color: value < 0 ? 'red' : 'green',
            },
        }));
        return revenueExpenseData;
    };
    const getRevenueIncome = (revenueIncome) => {
        const revenueIncomeData = revenueIncome?.map((value) => ({
            value,
            itemStyle: {
                color: value < 0 ? 'red' : 'green',
            },
        }));
        return revenueIncomeData;
    };
    const revenueQuarter = {
        grid: {
            top: '10%',
            bottom: '10%',
            left: '12%',
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
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: revenueQuarterYear,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#fff',
                fontSize: 14,
                fontFamily: 'roboto',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#fff',
                    opacity: 0.1,
                },
            },
        },
        yAxis: {
            data: ['12K', '14K', '16K', '18K', '20K', '22K'],
            type: 'value',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
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
                    return formatValueWithCurrency(value, currency);
                },
            },
        },
        series: [
            {
                data: getRevenueIncome(revenueExpense),
                type: 'line',
                stack: 'EXPENSES',
                name: 'EXPENSES',
                smooth: true,
                symbolSize: 8,
                lineStyle: {
                    width: 4,
                },
            },
            {
                data: getRevenueExpense(revenueIncome),
                type: 'line',
                stack: 'INCOME',
                name: 'INCOME',
                smooth: true,
                symbolSize: 8,
                lineStyle: {
                    width: 4,
                },

            },
            {
                data: getSeriesData(profitloss),
                type: 'line',
                stack: 'PROFIT',
                name: 'PROFIT',
                smooth: true,
                symbolSize: 8,
                lineStyle: {
                    width: 4,
                },
            },
        ],
    }

    const cosgraphoption = {
        grid: {
            left: '17%',
        },
        tooltip: {
            trigger: 'item',
        },

        xAxis: {
            type: 'category',
            data: cosGraphMonth,
            axisLabel: {
                color: '#fff',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff',
                // formatter: '{value} ' + currency,
                // formatter: (value) => {
                //     return DataFormater(value) + ' ' + currency
                // },
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
                data: cosGraphData,
                type: 'line',
            },
        ],
    }

    const EBITDAoption = {
        grid: {
            left: '17%',
        },
        legend: {
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
        },
        tooltip: {},
        dataset: {
            source: ebitdaGraphopt,
        },
        xAxis: {
            type: 'category',
            data: cosGraphMonth,
            axisLabel: {
                color: '#fff',
            },
        },
        yAxis: {
            axisLabel: {
                color: '#fff',
                // formatter: '{value} ' + currency,
                // formatter: (value) => {
                //     return DataFormater(value) + ' ' + currency
                // },
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
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: ebitdaSeriesopt,
        type: 'line',
        itemStyle: {
            color: (params) => {
                const value = params.value[1];
                return value < 0 ? 'red' : 'green';
            },
        },
    }
    function changedropdownvalue(type, e, funName = '') {
        if (e) {
            var value = e.label
        } else {
            var value = ''
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }))

        // if (funName) {
        //     funName(value);
        // }
    }

    useEffect(() => {
        getprodSplitValues()
        // getcountriesGraph();
    }, [companyId, currency])
    useEffect(() => {
        getytdRevenue()
    }, [companyId, formdata.ytdYear, currency])
    useEffect(() => {
        getrevenueGraphQuarterly()
    }, [companyId, formdata.revenuyear, currency])
    useEffect(() => {
        getebitdaGraphValues()
    }, [formdata.year, companyId, currency])
    useEffect(() => {
        getheatMap()
    }, [formdata.heatyear, companyId, currency])
    useEffect(() => {
        getcostGraph()
    }, [formdata.costyear, companyId, currency])

    const getytdRevenue = async () => {
        const response = await getDataFromApi(
            getYTDrevenue + '?companyId=' + companyId + '&year=' + formdata.ytdYear, 1)
        if (response && response.status == 200 && response.data != null) {
            setytdRevenue(response?.data)
        }
    }

    const getprodSplitValues = async () => {
        var query = ''

        const response = await getDataFromApi(
            getProdSplitValues + '?companyId=' + companyId,
            1
        )
        console.log(response, "resss")
        // response=[]
        if (response && response.status == 200 && response.data.length > 0) {
            setprodSplitValues(response.data)

            var prodSplitvaluesopt = ['product']
            var mainprodSplitvaluesopt = [prodSplitvaluesopt]
            var alreadyExistQuarter = ''
            var quarterindex = ''
            var prodSplitvalueMonth = ''
            const updated = response.data.sort((a, b) => a.year - b.year)

            response.data.map((splitval, i) => {
                if (splitval.year) {
                    prodSplitvalueMonth = splitval.year
                }
                if (
                    prodSplitvaluesopt.indexOf(
                        splitval.productname.toUpperCase()
                    ) === -1
                ) {
                    prodSplitvaluesopt.push(splitval.productname.toUpperCase())
                }
                mainprodSplitvaluesopt.find((element) => {
                    if (element[0] === prodSplitvalueMonth) {
                        alreadyExistQuarter = 1
                        quarterindex = mainprodSplitvaluesopt.findIndex(
                            (mainprodSplitvaluesopt) =>
                                mainprodSplitvaluesopt[0] ===
                                prodSplitvalueMonth
                        )
                    } else {
                        alreadyExistQuarter = ''
                    }
                })

                if (!alreadyExistQuarter) {
                    var quarteryear = [prodSplitvalueMonth]
                    var prodindex = prodSplitvaluesopt.findIndex(
                        (prodSplitvaluesopt) =>
                            prodSplitvaluesopt === splitval.productname
                    )
                    if (prodindex) {
                        quarteryear[prodindex] = splitval.totalvalues
                    }
                    mainprodSplitvaluesopt.push(quarteryear)
                } else {
                    var prodindex = prodSplitvaluesopt.findIndex(
                        (prodSplitvaluesopt) =>
                            prodSplitvaluesopt === splitval.productname
                    )

                    mainprodSplitvaluesopt[quarterindex][prodindex] =
                        splitval.totalvalues
                }
            })

            if (mainprodSplitvaluesopt) {
                var seriesdata = []
                var serieslength = mainprodSplitvaluesopt[0].length - 1
                if (serieslength != null && serieslength != 0) {
                    for (var i = 1; i <= serieslength; i++) {
                        var seriessingle = { type: 'bar', barWidth: '4.9%', barGap: "10%" }
                        seriesdata.push(seriessingle)
                    }
                    setprodSplitvaluesSeriesopt(seriesdata)
                }
            }
            console.log('mainprodSplitvaluesoptmainprodSplitvaluesopt', mainprodSplitvaluesopt)
            setprodSplitvaluesGraphopt(mainprodSplitvaluesopt)
        } else {
            var defaultData = []
            for (i = currentyear - 5; i <= currentyear; i++) {
                defaultData.push([i, 0, 0, 0, 0, 0, 0, 0])
            }
            // const defaultData = [
            //     // ['product', 'mouse', 'CPU', 'keyboard', 'mobile', 'charger', 'desktop', 'loptop'],
            //     ['2017', 0, 0, 0, 0, 0, 0, 0],
            //     ['2018', 0, 0, 0, 0, 0, 0, 0],
            //     ['2019', 0, 0, 0, 0, 0, 0, 0],
            //     ['2020', 0, 0, 0, 0, 0, 0, 0],
            //     ['2021', 0, 0, 0, 0, 0, 0, 0],
            //     ['2022', 0, 0, 0, 0, 0, 0, 0]
            // ]
            setprodSplitvaluesSeriesopt([
                { type: 'bar', barWidth: '10%' },
                { type: 'bar', barWidth: '10%' },
                { type: 'bar', barWidth: '10%' },
                { type: 'bar', barWidth: '10%' },
                { type: 'bar', barWidth: '10%' },
                { type: 'bar', barWidth: '10%' },
                { type: 'bar', barWidth: '10%' },
            ])

            setprodSplitvaluesGraphopt(defaultData)
        }
        setProductSplitLabels(false)
        setTimeout(() => {
            setProductSplitLabels(true)
        }, 1)
    }

    const getcostGraph = async (costyear = '') => {
        var query = ''
        let year = ''
        if (formdata.costyear) {
            year = formdata.costyear
        } else {
            year = new Date().getFullYear().toString()
        }
        if (companyFinancialYear === "Financial Year") {
            year = year.split('-')[0]; // Extract the starting year
        }

        const response = await getDataFromApi(
            getCostGraph + '?year=' + year + '&companyId=' + companyId,
            1
        )
        
        if (response && response?.status == 200 ) {
            setcostGraph(response.data)
            let cosmonthopt;
            if (companyFinancialYear==="Financial Year") {
                cosmonthopt = generateMonths(startMonth, endMonth);
            } else {
                cosmonthopt = getSortMonths();
            }
            var cosdataopt = []
            cosmonthopt?.map((opt, i) => {
                Object.entries(response?.data).map(([key, value]) => {
                    if (key.toLocaleLowerCase().slice(0, 3) == opt.toLocaleLowerCase().slice(0, 3)) {
                        cosdataopt?.splice(i, 0, value ? value : 0);
                    }
                });
            });
        
            console.log("allmonth", cosmonthopt);
        
            setcosGraphMonth(cosmonthopt);
            setcosGraphData(cosdataopt);
        } else {
            var cosmonthopt = getSortMonths()
            var cosdataopt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            setcosGraphMonth(cosmonthopt)
            setcosGraphData(cosdataopt)
        }
      
    }

    const getcountriesGraph = async () => {
        var query = ''

        const response = await getDataFromApi(
            getCountriesGraph + '?companyId=' + companyId,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setcountriesGraph(response.data)
        }
    }

    const getebitdaGraphValues = async () => {
        var query = '';
        let year = '';
        
        // Assign year based on formdata or current year
        if (formdata.year) {
            year = formdata.year;
        } else {
            year = new Date().getFullYear().toString(); // Ensure it's a string
        }
        
        // Ensure year is a string before processing it
        if (typeof year === 'number') {
            year = year.toString();
        }
        
        console.log("year", year);
        
        if (companyFinancialYear === "Financial Year") {
            year = year.split('-')[0]; // Extract the starting year if it's a range
        }
        
        console.log("Processed year", year);
 


        const response = await getDataFromApi(
            getEBITDAvalues +
            '?companyId=' +
            companyId +
            '&year=' +
            year,
            1
        )
        var allsormonth = getSortMonths()
        var monthData = [['product', '']]
        allsormonth.map((singlemonth) => {
            monthData.push([singlemonth, 0])
        })

        if (
            response &&
            (response.status == 200 || response.status == 202) &&
            response.data.length > 0
        ) {
            setebitdaGraphValues(response.data)
            const monthopt = [
                { id: '1', month: 'Jan' },
                { id: '2', month: 'Feb' },
                { id: '3', month: 'Mar' },
                { id: '4', month: 'Apr' },
                { id: '5', month: 'May' },
                { id: '6', month: 'Jun' },
                { id: '7', month: 'Jul' },
                { id: '8', month: 'Aug' },
                { id: '9', month: 'Sep' },
                { id: '10', month: 'Oct' },
                { id: '11', month: 'Nov' },
                { id: '12', month: 'Dec' },
            ]

            let performanceprodnameopt = ['']
            let mainprodperformanceopt = [performanceprodnameopt]
            let alreadyExistQuarter = ''
            let quarterindex = ''
            let prodperformanceMonth = ''
            response.data.map((prodperformance, i) => {
                monthopt.find((opt) => {
                    if (prodperformance.month) {
                        if (
                            opt.id == prodperformance.month ||
                            opt.month.toLocaleLowerCase() ==
                            prodperformance.month
                                .toLocaleLowerCase()
                                .slice(0, 3)
                        ) {
                            prodperformanceMonth = opt.month
                        }
                    }
                })

                if (performanceprodnameopt.indexOf(prodperformance.year) === -1)
                    performanceprodnameopt.push(prodperformance.year)
                mainprodperformanceopt.find((element) => {
                    if (element[0] === prodperformanceMonth) {
                        alreadyExistQuarter = 1
                        quarterindex = mainprodperformanceopt.findIndex(
                            (mainprodperformanceopt) =>
                                mainprodperformanceopt[0] ===
                                prodperformanceMonth
                        )
                    } else {
                        alreadyExistQuarter = ''
                    }
                })
                if (!alreadyExistQuarter) {
                    var quarteryear = [prodperformanceMonth]
                    var prodindex = performanceprodnameopt.findIndex(
                        (performanceprodnameopt) =>
                            performanceprodnameopt === prodperformance.year
                    )
                    if (prodindex) {
                        quarteryear[prodindex] = prodperformance.EBITDAvalue
                    }
                    mainprodperformanceopt.push(quarteryear)
                } else {
                    mainprodperformanceopt[quarterindex] =
                        prodperformance.EBITDAvalue
                }
            })

            if (mainprodperformanceopt) {
                var seriesdata = []
                var serieslength = mainprodperformanceopt[0].length - 1
                if (serieslength != null && serieslength != 0) {
                    for (var i = 1; i <= serieslength; i++) {
                        var seriessingle = { type: 'line', smooth: true }
                        seriesdata.push(seriessingle)
                    }
                    // setprodPerformanceSeriesopt(seriesdata)
                }
            }

            if (mainprodperformanceopt.length == 1) {
                return
            } else {
                for (var i = 0, l = monthData.length; i < l; i++) {
                    for (
                        var j = 0, ll = mainprodperformanceopt.length;
                        j < ll;
                        j++
                    ) {
                        if (monthData[i][0] === mainprodperformanceopt[j][0]) {
                            monthData.splice(i, 1, mainprodperformanceopt[j])
                            break
                        }
                    }
                }
            }
            setebitdaGraphopt(monthData)
            setebitdaSeriesopt([{ type: 'line' }, { type: 'line' }])
        } else {
            const defaultVal = monthData
            setebitdaGraphopt(defaultVal)
            setebitdaSeriesopt([{ type: 'line' }, { type: 'line' }])
        }
        setEbitdaLabel(false)
        setTimeout(() => {
            setEbitdaLabel(true)
        }, 1)
    }

    const getrevenueGraphQuarterly = async () => {
        var query = ''
        var year = ''
        if (formdata.revenuyear) {
            year = formdata.revenuyear
        } else {
            year = new Date().getFullYear()
        }
        const response = await getDataFromApi(
            getRevenueGraphQuarterly +
            '?companyId=' +
            companyId +
            '&year=' +
            year,
            1
        )
        if (response && response.status == 200 && response.data.length > 0) {
            setrevenueGraphQuarterly(response.data)
            var expenseopt = []
            var incomeopt = []
            var revenueyear = []
            var ProfitRevenue = []
            response.data.reverse().map((revenue, i) => {
                expenseopt.push(revenue.totalExpenses)
                incomeopt.push(revenue.income)
                revenueyear.push(
                    revenue.quarter + 'FY' + revenue.year.substring(2, 5)
                )
                ProfitRevenue.push(revenue.totalProfitLoss)
            })
            setrevenueIncome(incomeopt)
            setrevenueExpense(expenseopt)
            setrevenueQuarterYear(revenueyear)
            setProfitloss(ProfitRevenue)

            console.log('revenueyearrevenueyear', revenueyear)
        } else {
            setrevenueIncome([0, 0, 0, 0])
            setrevenueExpense([0, 0, 0, 0])
            setProfitloss([0, 0, 0, 0])

            setrevenueQuarterYear(['Q1FY22', 'Q2FY22', 'Q3FY22', 'Q4FY22'])
        }
    }

    const getheatMap = async (year = '') => {
        var query = ''
        var year = ''
        if (formdata.heatyear) {
            year = formdata.heatyear
        } else {
            year = new Date().getFullYear()
        }
        console.log('yyy', year)
        const response = await getDataFromApi(
            getHeatMap + '?year=' + year + '&companyId=' + companyId,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            setheatMap(response.data)
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
                <Breadcrumb routeSegments={[{ name: 'Company Dashboard' }]} />
                <div className="breadnavigation">
                    Home / Company lists{' '}
                    {companyLabel ? ' / ' + companyLabel : ''} / Company
                    Dashboard
                </div>

                <ValidatorForm className="year-form">
                    <div className="year-form-inner">
                        <label>Year:</label>
                        <AutoComplete
                            className="dropdown"
                            fullWidth
                            defaultValue={yearopt ? yearopt[0] : null}
                            options={yearopt}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                                changedropdownvalue(
                                    'ytdYear',
                                    value,
                                    getytdRevenue
                                )
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="required"
                                    label="Select"
                                    value={formdata?.ytdYear}
                                    name="revenuyear"
                                    placeholder="Select"
                                />
                            )}
                        />
                    </div>
                </ValidatorForm>
            </div>




            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <StyledCard
                        elevation={3}
                        sx={{ p: 2 }}
                        className="statcard2"
                    >
                        <ContentBox className="contentbox">
                            <img src={Revenue} />
                            <div>
                                <Typography
                                    textcolor={'#fff'}
                                    className="revenueName"
                                >
                                    YTD revenue
                                </Typography>
                                <h2 textcolor={'#fff'} className='spacenowrap'>
                                    {currency}{' '}
                                    {ytdRevenue?.totalRevenueValue
                                        ? getCommas(ytdRevenue?.totalRevenueValue)
                                        : '0'}
                                </h2>
                            </div>
                        </ContentBox>
                        {/* <ContentBox sx={{ pt: 2 }} className="contentbox">
                            <Typography className="viewmore">View more</Typography>
                            <Icon className="icon">arrow_forward</Icon>
                        </ContentBox> */}
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledCard
                        elevation={3}
                        sx={{ p: 2 }}
                        className="statcard2"
                    >
                        <ContentBox className="contentbox">
                            <img src={Revenue} />
                            <div>
                                <Typography
                                    textcolor={'#fff'}
                                    className="revenueName"
                                >
                                    YTD EBITDA
                                </Typography>
                                <h2 textcolor={'#fff'} className='spacenowrap'>
                                    {currency}{' '}
                                    {ytdRevenue?.totalEBITDAvalue
                                        ? getCommas(ytdRevenue?.totalEBITDAvalue)
                                        : '0'}
                                </h2>
                            </div>
                        </ContentBox>
                        {/* <ContentBox sx={{ pt: 2 }} className="contentbox">
                            <Typography className="viewmore">View more</Typography>
                            <Icon className="icon">arrow_forward</Icon>
                        </ContentBox> */}
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledCard
                        elevation={3}
                        sx={{ p: 2 }}
                        className="statcard2"
                    >
                        <ContentBox className="contentbox">
                            <img src={Revenue} />
                            <div>
                                <Typography
                                    textcolor={'#fff'}
                                    className="revenueName"
                                >
                                    Total Budget
                                </Typography>
                                <h2 textcolor={'#fff'} className='spacenowrap'>
                                    {currency}{' '}
                                    {ytdRevenue?.totalBudgetValue
                                        ? getCommas(ytdRevenue?.totalBudgetValue)
                                        : '0'}
                                </h2>
                            </div>
                        </ContentBox>
                        {/* <ContentBox sx={{ pt: 2 }} className="contentbox">
                            <Typography className="viewmore">View more</Typography>
                            <Icon className="icon">arrow_forward</Icon>
                        </ContentBox> */}
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledCard
                        elevation={3}
                        sx={{ p: 2 }}
                        className="statcard2"
                    >
                        <ContentBox className="contentbox">
                            <img src={Revenue} />
                            <div>
                                <Typography
                                    textcolor={'#fff'}
                                    className="revenueName"
                                >
                                    Cash Latest
                                </Typography>
                                <h2 textcolor={'#fff'} className='spacenowrap'>
                                    {currency}{' '}
                                    {ytdRevenue?.totalCashValue ? getCommas(ytdRevenue?.totalCashValue
                                    ) : "0"}
                                </h2>
                            </div>
                        </ContentBox>
                        {/* <ContentBox sx={{ pt: 2 }} className="contentbox">
                            <Typography className="viewmore">View more</Typography>
                            <Icon className="icon">arrow_forward</Icon>
                        </ContentBox> */}
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
                    <StyledCard elevation={6} className="echarts">
                        <CardHeader className="cardheader">
                            <Title>
                                Product Split Revenue View
                                ({currency})
                            </Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.productSplitLabels}
                            onChange={(e, value) => handleTabsChange(value, 'productSplitLabels')}
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
                            <Tab label="Graph" value={'productSplitLabels_0'} />
                            <Tab label="Table" value={'productSplitLabels_1'} />
                        </Tabs>
                        <ValidatorForm className="year-form">
                            <div className="year-form-inner">
                                {/* <label>Year:</label> */}
                                {/* <AutoComplete
                                    // className="dropdown"
                                    fullWidth
                                    options={yearopt}
                                     defaultValue={yearopt ? yearopt[0] : null}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changedropdownvalue('year', value)}
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
                                /> */}
                            </div>
                            <TabPanel
                                value={tabDataValue.productSplitLabels}
                                index={'productSplitLabels_0'}
                                className="tabpanel nopadding notclear"
                            >
                                {productSplitLabels && (
                                    <ReactEcharts
                                        style={{ height: height }}
                                        option={{
                                            ...option,
                                            color: [
                                                '#8B3DA8',
                                                '#02A6CF',
                                                '#D7BB4F',
                                                '#49C9BD',
                                                "#008080",
                                                '#00FF00',
                                                '#0000FF',
                                                '#FFA500',
                                                '#008000',
                                                '#FFC0CB',
                                                '#FF6347',
                                                '#4B0082',
                                                '#32CD32',
                                                '#FF1493',
                                                '#ADFF2F',
                                                "gold",
                                                "gray",
                                                "#CD5C5C",
                                                "#FF00FF",
                                                "#800080",
                                            ],
                                        }}
                                    />
                                )}
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.productSplitLabels}
                                index={'productSplitLabels_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll">
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {prodSplitvaluesGraphopt.length > 0 && prodSplitvaluesGraphopt[0].map((singleData, index) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {singleData}
                                                        </span>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {prodSplitvaluesGraphopt.map((singleData, index) => (
                                                index != 0 && (
                                                    <TableRow key={index}>
                                                        {
                                                            singleData.map((yeardata, i) => (

                                                                <TableCell align="left" className="imgCell">
                                                                    <span>
                                                                        {getCommas(yeardata)}
                                                                    </span>
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                )
                                            ))}
                                        </TableBody>
                                    </StyledTable>
                                </div>
                            </TabPanel>


                        </ValidatorForm>
                        {/* <SimpleCard >
                            <ReactEcharts
                                style={{ height: height }}
                                option={{
                                    ...option,
                                    color: ['#8B3DA8',
                                        '#02A6CF', '#D7BB4F', '#49C9BD'],
                                }}
                            />
                        </SimpleCard> */}
                    </StyledCard>
                </Grid>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts">
                        <CardHeader className="cardheader">
                            <Title>
                                Revenue Graph quarterly ({currency})
                            </Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.revenueQuarter}
                            onChange={(e, value) => handleTabsChange(value, 'revenueQuarter')}
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
                            <Tab label="Graph" value={'revenueQuarter_0'} />
                            <Tab label="Table" value={'revenueQuarter_1'} />
                        </Tabs>
                        <ValidatorForm className="year-form">
                            <div className="year-form-inner">
                                <label>Year:</label>
                                <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    defaultValue={yearopt ? yearopt[0] : null}
                                    options={yearopt}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) =>
                                        changedropdownvalue(
                                            'revenuyear',
                                            value,
                                            getrevenueGraphQuarterly
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.revenuyear}
                                            name="revenuyear"
                                            placeholder="Select"
                                        />
                                    )}
                                />
                            </div>
                        </ValidatorForm>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.revenueQuarter}
                                index={'revenueQuarter_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: height }}
                                    option={{
                                        ...revenueQuarter,
                                        color: ['#E7515A', '#2196f3', '#D7BB4F'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.revenueQuarter}
                                index={'revenueQuarter_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll">
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" className="imgCell">
                                                    <span>
                                                        Type
                                                    </span>
                                                </TableCell>
                                                {revenueQuarterYear.length > 0 && revenueQuarterYear.map((singleData, index) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {singleData}
                                                        </span>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {['EXPENSES', 'INCOME', 'PROFIT'].map((singleData, index) => (
                                                (
                                                    <TableRow key={index}>

                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleData}
                                                            </span>
                                                        </TableCell>
                                                        {
                                                            revenueQuarterYear.map((yeardata, i) => (

                                                                <TableCell align="left" className="imgCell">
                                                                    <span>
                                                                        {index == 0 ? getCommas(revenueExpense[i], currency) : index == 1 ? getCommas(revenueIncome[i], currency) : getCommas(profitloss[i], currency)}
                                                                    </span>
                                                                </TableCell>
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
                    <div className="setfullheight">
                        <StyledCard elevation={6}>
                            <CardHeader className="cardheader">
                                <Title>Countries({heatMap.length})</Title>
                            </CardHeader>
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
                                        onChange={(event, value) =>
                                            changedropdownvalue(
                                                'heatyear',
                                                value,
                                                getheatMap
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.heatyear}
                                                name="heatyear"
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
                    </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts">
                        <CardHeader className="cardheader">
                            <Title>
                                CoS Graph MoM ({currency})
                            </Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.cosGraphMonth}
                            onChange={(e, value) => handleTabsChange(value, 'cosGraphMonth')}
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
                            <Tab label="Graph" value={'cosGraphMonth_0'} />
                            <Tab label="Table" value={'cosGraphMonth_1'} />
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
                                    onChange={(event, value) =>
                                        changedropdownvalue(
                                            'costyear',
                                            value,
                                            getcostGraph
                                        )
                                    }                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.costyear}
                                            name="costyear"
                                            placeholder="Select"
                                        />
                                    )}
                                /> </>:  <AutoComplete
                                className="dropdown"
                                fullWidth
                                options={yearopt}
                                defaultValue={yearopt ? yearopt[0] : null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) =>
                                    changedropdownvalue(
                                        'costyear',
                                        value,
                                        getcostGraph
                                    )
                                }                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Select"
                                        value={formdata.costyear}
                                            name="costyear"
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
                                    onChange={(event, value) =>
                                        changedropdownvalue(
                                            'costyear',
                                            value,
                                            getcostGraph
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.costyear}
                                            name="costyear"
                                            placeholder="Select"
                                        />
                                    )}
                                /> */}
                            </div>
                        </ValidatorForm>
                        <SimpleCard>
                            
                            <TabPanel
                                value={tabDataValue.cosGraphMonth}
                                index={'cosGraphMonth_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '300px' }}
                                    option={{
                                        ...cosgraphoption,
                                        color: ['#00d1ff', '#2196f3'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel style={{overflow:'auto'}}
                                value={tabDataValue.cosGraphMonth}
                                index={'cosGraphMonth_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll companytablescroll" style={{width:'200%'}}>
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    cosGraphMonth.map((month) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {month}
                                                            </span>
                                                        </TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                {
                                                    cosGraphData.map((data) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {getCommas(data)}
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts">
                        <CardHeader className="cardheader">
                            <Title>
                                EBITDA Graph MoM ({currency})
                            </Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.ebitdaGraphopt}
                            onChange={(e, value) => handleTabsChange(value, 'ebitdaGraphopt')}
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
                            <Tab label="Graph" value={'ebitdaGraphopt_0'} />
                            <Tab label="Table" value={'ebitdaGraphopt_1'} />
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
                                    onChange={(event, value) => {
                                        changedropdownvalue('year', value)
                                    }}                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.year}
                                            name="year"
                                            placeholder="Select"
                                        />
                                    )}
                                /> </>:  <AutoComplete
                                className="dropdown"
                                fullWidth
                                options={yearopt}
                                defaultValue={yearopt ? yearopt[0] : null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => {
                                    changedropdownvalue('year', value)
                                }}                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Select"
                                        value={formdata.year}
                                        name="year"
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
                                    onChange={(event, value) => {
                                        changedropdownvalue('year', value)
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
                                /> */}
                            </div>
                        </ValidatorForm>
                        {ebitdaLabel && (
                            <SimpleCard>
                                <TabPanel
                                    value={tabDataValue.ebitdaGraphopt}
                                    index={'ebitdaGraphopt_0'}
                                    className="tabpanel nopadding notclear"
                                >

                                    <ReactEcharts
                                        style={{ height: '300px' }}
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
                                <TabPanel style={{overflow:'auto'}}
                                    value={tabDataValue.ebitdaGraphopt}
                                    index={'ebitdaGraphopt_1'}
                                    className="tabpanel nopadding notclear"
                                >
                                    <div className="table_scroll companytablescroll" style={{width:'300%'}}>
                                        <StyledTable className="customtable odd-even withborder">
                                            <TableHead>
                                                <TableRow>
                                                    {
                                                        ebitdaGraphopt.map((month, index) => (
                                                            index != 0 && (<TableCell align="left" className="imgCell">
                                                                <span>
                                                                    {month[0]}
                                                                </span>
                                                            </TableCell>)
                                                        ))
                                                    }
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    {
                                                        ebitdaGraphopt.map((month, index) => (
                                                            index != 0 && (<TableCell align="left" className="imgCell">
                                                                <span>
                                                                    {index == 0 ? month[1] : parseFloat(month[1]).toLocaleString('en-US')}
                                                                </span>
                                                            </TableCell>)
                                                        ))
                                                    }
                                                </TableRow>
                                            </TableBody>
                                        </StyledTable>
                                    </div>
                                </TabPanel>
                            </SimpleCard>
                        )}
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Companydashboard
