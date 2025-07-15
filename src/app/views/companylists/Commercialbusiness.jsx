import React, { useState, useEffect, useRef } from 'react'
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
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import Typography from '@mui/material/Typography';
import Revenue from "../../image/revenue.svg"
import ReactEcharts from 'echarts-for-react'
import Icon_countries from "../../image/Seven-countries-cohorts-menu.svg"
import { createCommBusiness, getAllCommBusinessInfo, getCommBusinessInfo, searchTotalSalesDash, searchProductPerformanceDash, searchQuarterlySalesDash, searchRevenueBudgetDash } from "../../services/api"
import { postDataFromApi, putDataFromApi, getDataFromApi } from '../../services/CommonService';
import { getSortMonths, yearopt, thousandsOf, DataFormater, formatValueWithCurrency, getChartItemStyle, getColorSkyBlue, getColorPink, getCommas,financialYearopt } from '../../services/CommonObject';
import { Autocomplete } from '@mui/lab'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
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




const Commercialbusiness = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const height = '350px'
    const [commBusinessInfo, setcommBusinessInfo] = useState([])
    const [allCommBusinessInfo, setallCommBusinessInfo] = useState([])
    let { companyId } = useParams();
    const [formdata, setFormData] = useState({ companyid: "", productid: "", year: "", quarter: "", month: "", sales: "", budget: "", revenue: "", product: [], revenueBudgetyear: "", quarterSalesyear: "", totalSaleyear: "", productperYear: "" })
    const [searchTotalSales, setsearchTotalSales] = useState([])
    const [searchProductPerformance, setsearchProductPerformance] = useState([])
    const [searchQuarterlySales, setsearchQuarterlySales] = useState([])
    const [searchRevenueBudget, setsearchRevenueBudget] = useState([])
    const [revenueSourceopt, setrevenueSourceopt] = useState([])
    const [totalSalesOpt, settotalSalesOpt] = useState([])
    const [totalSalesMonthOpt, settotalSalesMonthOpt] = useState([])
    const [quatSalesOpt, setquatSalesOpt] = useState([])
    const [quatSalesMonthOpt, setquatSalesMonthOpt] = useState([])
    const [prodPerformanceGraphopt, setprodPerformanceGraphopt] = useState([])
    const [prodPerformanceSeriesopt, setprodPerformanceSeriesopt] = useState([])
    const [isProductPerfoemenceChanged, setisProductPerfoemenceChanged] = useState(true)
    const [currency] = useOutletContext();
    const [tabDataValue, setTabDataValue] = useState({
        totalSalesMonthOpt: 'totalSalesMonthOpt_0',
        prodperformanceopt: 'prodperformanceopt_0',
        quatSalesMonthOpt: 'quatSalesMonthOpt_0',
        revenueSourceopt: 'revenueSourceopt_0',
    })

    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        // This effect will run whenever any of these dependencies change
        // It will trigger a re-render by toggling the value of forceUpdate
        setForceUpdate(prevState => !prevState);
    }, [companyFinancialYear, financialYearopt, yearopt, formdata.totalSaleyear]);

  
      


    var companyLabel = ""
    var companyopt = JSON.parse(localStorage.getItem('companyDet'))


    companyopt && companyopt.map((opt) => {
        if (opt.id == companyId) {
            companyLabel = opt.yearType
        }
    })

   


    var companyFinancialYear=""
    companyopt && companyopt.map((opt) => {
        if (opt.id == companyId) {
            companyFinancialYear = opt.financialYear
        }
    })


    var allsortmonths = getSortMonths()
    var monthopt = [];
    allsortmonths.map((singlemonth, i) => {
        monthopt.push({ id: i + 1, month: singlemonth })
    })
    // function getCommas(number) {
    //     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //   }
   
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            top: '10%',
            bottom: '10%',
            left: '80px',
            right: '5%',
        },

        xAxis: {
           
            type: 'category',
            data: totalSalesMonthOpt,
            axisLabel: { color: '#fff', },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff',
                formatter: (value) => {
                    return formatValueWithCurrency(value, currency);
                },
            },
            splitLine: { show: false, },
        },
        series: [
            {
                // data: chartData,
                data: totalSalesOpt.map((item) => ({
                    value: item,
                    ...getChartItemStyle(item)
                })),
                type: 'bar',
                barWidth: '20px',
                tooltip: {},
            }
        ]
    }; 


    const revenueQuarter = {
        grid: {
            top: '5%',
            bottom: '25%',
            left: '8%',
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
        tooltip: {},
        dataset: {
            source: revenueSourceopt,
        },
        // xAxis: {
        //     type: 'category',
        //     axisLabel: {
        //         color: '#fff',
        //     },
        // },
        xAxis: {
           
            type: 'category',
            data: totalSalesMonthOpt,
            axisLabel: { color: '#fff', },
        },
       yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff',
                formatter: (value) => {
                    return formatValueWithCurrency(value, currency);
                },
            },
            splitLine: { show: false, },
        },
        series: [
            {
                type: 'bar',
                barWidth: '20%',
                barGap: 0,
                itemStyle: {
                    color: (params) => {
                        return getColorSkyBlue(params?.data[1]);
                    },
                },
            },
            {
                type: 'bar',
                barWidth: '20%',
                barGap: 0,
                itemStyle: {
                    color: (params) => {
                        return getColorPink(params?.data[2]);
                    },
                },
            },
        ],
    };
    const quatoption = {
        grid: {
            left: '17%',
        },
        xAxis: {
            type: 'category',
            data: quatSalesMonthOpt,
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
                //     return DataFormater (value) +' '+ currency
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
        tooltip: {},
        series: [
            {
                data: quatSalesOpt,
                type: 'line'
            }
        ]
    };

    const prodperformanceopt = {
        grid: {
            top: '25%',
            bottom: "25%",
            left: '20%',
        },
        legend: {
            // show:false,
            type: 'scroll',
            align: 'left',
            // show:false,//hide the legend dots
            itemGap: 9,
            itemWidth: 20,
            itemHeight: 10,
            icon: 'circle',
            textStyle: { color: '#fff', },
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return `${params.seriesName}: ${params.data[1]}<br>${params.marker}${params.name}`;
            },
        },
        // tooltip: {},
        dataset: {
            source: prodPerformanceGraphopt,
        },
        xAxis: {
           
            type: 'category',
            data: totalSalesMonthOpt,
            axisLabel: { color: '#fff', },
        },
        //    xAxis: {
        //     type: 'category',
        //     axisLabel: {
        //         color: '#fff',
        //     },
        // },
        yAxis: {
            axisLabel: {
                color: '#fff',
                // formatter: '{value} ' + currency
                // formatter :(value)=>{
                //     return DataFormater (value) +' '+ currency
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
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: prodPerformanceSeriesopt,
    };

    function changeDropdownValue(type, e, funName = '') {
     
        if (e) {
            var value = e.label
        } else {
            var value = ""
        }
        setFormData((formData) => ({
            ...formData,
            [type]: value,
        }));

        // if (funName) {
        //     funName(value);
        // }
    }

    useEffect(() => {
        // getcommBusinessInfo();
        getallCommBusinessInfo();
        // getsearchTotalSales();
        // getsearchProductPerformance();
        // getsearchQuarterlySales();
        // getsearchRevenueBudget();
    }, [companyId, currency])

    useEffect(() => {
        getsearchTotalSales();
    }, [formdata.totalSaleyear, companyId, currency,companyFinancialYear])
    useEffect(() => {
        getsearchProductPerformance();
    }, [formdata.productperYear, companyId, currency])
    useEffect(() => {
        getsearchQuarterlySales();
    }, [formdata.quarterSalesyear, companyId, currency])
    useEffect(() => {
        getsearchRevenueBudget();
    }, [formdata.revenueBudgetyear, companyId, currency])

    const getcommBusinessInfo = async () => {
        var query = ''

        const response = await getDataFromApi(
            getCommBusinessInfo + '?companyId=' + companyId,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            //setcommBusinessInfo(response.data);
            
        }

    }
    const getallCommBusinessInfo = async () => {
        var query = ''
        const response = await getDataFromApi(
            getAllCommBusinessInfo + '?companyId=' + companyId,
            1
        )
        if (response && response.status == 200 && response.data != null) {
            //setallCommBusinessInfo(response.data);
         
        }
    }
    const getsearchTotalSales = async (totalSaleyear = '') => {
        var query = ''
        let year = ''; // Initialize year as an empty string

        if (formdata.totalSaleyear) {
            year = formdata.totalSaleyear;
        } else {
            year = new Date().getFullYear().toString(); // Convert to string
        }
        if (companyFinancialYear === "Financial Year") {
            year = year.split('-')[0]; // Extract the starting year
        }
        
     
        const response = await getDataFromApi(
            searchTotalSalesDash + year + '&companyId=' + companyId,
            1
        )
        var salesdataopt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        var salesdataoptmonth = getSortMonths();

        if (response && response.status == 200 && response.data != null) {
            setsearchTotalSales(response.data);


            salesdataoptmonth.map((opt, index) => {
                response.data.map((data, i) => {
                    if (opt.toLocaleLowerCase() == data.month.toLocaleLowerCase().slice(0, 3)) {
                        salesdataopt.splice(index, 0, data.revenue)
                    }
                })
            })
       

        
            response.data.sort((a, b) => {
                if (a.year !== b.year) {
                    return a.year.localeCompare(b.year);
                } else {
                    const monthsOrder = {
                        JANUARY: 0,
                        FEBRUARY: 1,
                        MARCH: 2,
                        APRIL: 3,
                        MAY: 4,
                        JUNE: 5,
                        JULY: 6,
                        AUGUST: 7,
                        SEPTEMBER: 8,
                        OCTOBER: 9,
                        NOVEMBER: 10,
                        DECEMBER: 11
                    };
                    return monthsOrder[a.month] - monthsOrder[b.month];
                }
            });
            
            // Extract months and revenue from the sorted data
            const monthsByYear = {};
            const revenueByYear = {};
            
            response.data.forEach(item => {
                monthsByYear[item.year] = monthsByYear[item.year] || [];
                revenueByYear[item.year] = revenueByYear[item.year] || [];
                monthsByYear[item.year].push(item.month);
                revenueByYear[item.year].push(item.revenue); // Assuming revenue is a property of each item
            });
            
            // Combine months from all years into a single array
            const allMonths = Object.values(monthsByYear).flat();
            const allRevenue = Object.values(revenueByYear).flat();
  
            const monthAbbreviations = {
                JANUARY: 'Jan',
                FEBRUARY: 'Feb',
                MARCH: 'Mar',
                APRIL: 'Apr',
                MAY: 'May',
                JUNE: 'Jun',
                JULY: 'Jul',
                AUGUST: 'Aug',
                SEPTEMBER: 'Sep',
                OCTOBER: 'Oct',
                NOVEMBER: 'Nov',
                DECEMBER: 'Dec'
            };
            const allMonthsAbbreviated = allMonths.map(month => monthAbbreviations[month]);
          
            if(companyFinancialYear==="Financial Year"){
                settotalSalesOpt(allRevenue)
                settotalSalesMonthOpt(allMonthsAbbreviated)

            }
            else{
                settotalSalesOpt(salesdataopt)
                settotalSalesMonthOpt(salesdataoptmonth)  
            }
         
        } else {
            settotalSalesOpt(salesdataopt)
            settotalSalesMonthOpt(salesdataoptmonth)
        }
    }
   
    const getsearchProductPerformance = async (productperYear = '') => {
        var query = ''
        let year=''
        if (formdata.productperYear) {
             year = formdata.productperYear
        } else {
            year = new Date().getFullYear().toString();
        }
        if (companyFinancialYear === "Financial Year") {
            year = year.split('-')[0]; // Extract the starting year
        }
        // year=2017
        const response = await getDataFromApi(
            searchProductPerformanceDash + year + '&companyId=' + companyId,
            1
        )
        var allsortmonths = getSortMonths();
        var monthData = [
            ['product', '']
        ]
        allsortmonths.map((singlemonth) => {
            monthData.push([singlemonth, 0])
        })
        if (response && response.status == 200 && response?.data?.length > 0) {
            setsearchProductPerformance(response.data);
            var performanceprodnameopt = ['product']
            var mainprodperformanceopt = [performanceprodnameopt]
            var alreadyExistQuarter = ''
            var quarterindex = ''
            var prodperformanceMonth = ''
            response.data.map((prodperformance, i) => {
                monthopt.find((opt) => {
                    if (prodperformance?.month) {
                        if (opt?.id == prodperformance?.month ||
                            opt?.month?.toLocaleLowerCase() == prodperformance?.month?.toLocaleLowerCase()?.slice(0, 3)) {
                            prodperformanceMonth = opt?.month
                        }
                      
                    }
                })
                if (performanceprodnameopt.indexOf(prodperformance.productName.toUpperCase()) === -1)
                    performanceprodnameopt.push(prodperformance.productName.toUpperCase())
                mainprodperformanceopt.find((element) => {
                    if (element[0] === prodperformanceMonth) {
                       
                        alreadyExistQuarter = 1;
                        
                        quarterindex = mainprodperformanceopt.findIndex
                            (mainprodperformanceopt => mainprodperformanceopt[0] === prodperformanceMonth)
                        
                    } else {
                        alreadyExistQuarter = '';
                    }
                })
                if (!alreadyExistQuarter) {
                    var quarteryear = [prodperformanceMonth]
                    var prodindex = performanceprodnameopt.findIndex
                        (performanceprodnameopt => performanceprodnameopt === prodperformance.productName)
                    if (prodindex === 1) {
                        // quarteryear[prodindex] = prodperformance.productsales
                        quarteryear[prodindex] = prodperformance.productrevenue
                      
                        mainprodperformanceopt.push(quarteryear)
                    }
                    else if (prodindex === 2 || prodindex === 3) {
                        const dd = mainprodperformanceopt.map(each => {
                            if (each[0] === quarteryear[0]) {
                                // each.push(prodperformance.productsales)
                                each.push(prodperformance.productrevenue)
                            }
                        })
                    }
                } else {
                    var prodindex = performanceprodnameopt.
                        findIndex(performanceprodnameopt => performanceprodnameopt === prodperformance.productName)
                    // mainprodperformanceopt[quarterindex][prodindex] = prodperformance.productsales
                    mainprodperformanceopt[quarterindex][prodindex] = prodperformance.productrevenue
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
                    setprodPerformanceSeriesopt(seriesdata)
                }
              
            }
            if (mainprodperformanceopt.length == 1) {
                var mainprodperformanceopt = monthData
                
            } else {
                for (var i = 0, l = monthData.length; i < l; i++) {
                    for (var j = 0, ll = mainprodperformanceopt.length; j < ll; j++) {
                        if (monthData[i][0] === mainprodperformanceopt[j][0]) {
                            monthData.splice(i, 1, mainprodperformanceopt[j]);
                            break;
                        }
                    }
                }
      
            }
          
            setprodPerformanceGraphopt(monthData)
           
        } else {
         
            setprodPerformanceGraphopt([])
            var mainprodperformanceopt = monthData
          
            setprodPerformanceGraphopt(mainprodperformanceopt)
            setprodPerformanceSeriesopt([
                { type: 'line', smooth: true },
                { type: 'line', smooth: true },
                { type: 'line', smooth: true },
                { type: 'line', smooth: true },
                { type: 'line', smooth: true },
                { type: 'line', smooth: true },
                { type: 'line', smooth: true },
            ])
        }
        setisProductPerfoemenceChanged(false)
        setTimeout(() => {
            setisProductPerfoemenceChanged(true)
        }, 1);

    }
    const getsearchQuarterlySales = async (quarterYear = '') => {
        var query = ''
        let year=''
        if (formdata.quarterSalesyear) {
            year = formdata.quarterSalesyear
           
        } else {
            year = new Date().getFullYear().toString();
        }
        if (companyFinancialYear === "Financial Year") {
            year = year.split('-')[0]; // Extract the starting year
        }

        const response = await getDataFromApi(
            searchQuarterlySalesDash + year + '&companyId=' + companyId,
            1
        )
        const Months = ['Q1', 'Q2', 'Q3', 'Q4'];
        let datas = [];
        if (response && response.status == 200 && response.data != null && response.data.length > 0) {
            setsearchQuarterlySales(response.data);
            Months.map((opt, index) => {
                response.data.map((data, i) => {
                    if (opt == data.quarter) {
                        datas.splice(index, 0, data.totalRevenue)
                    }
                })
            })

            /*  
             const last_month_index = Months && response.data[response.data.length - 1].quarter ? Months.indexOf(response.data[response.data.length - 1].quarter) : '';
             const fill_empty_months = Array
                 .from(
                     { length: Math.max(4 - response.data.length, 0) },
                     (v, i) => (last_month_index + i + 1) % 12
                 )
                 .map((month_index) => ({
                     totalsales: 0,
                     year: year.toString(),
                     quarter: Months[month_index+1],
                 }))
                 .concat(response.data);
             const sorted2 = fill_empty_months.sort((a, b) => Months.indexOf(a.quarter) - Months.indexOf(b.quarter));
             var salesdataopt = []
             var salesmonthopt = []
             fill_empty_months.map((sales, i) => {
                 if (sales.quarter) {
                     salesmonthopt.push(sales.quarter)
                 }
                 salesdataopt.push(sales.totalsales)
             }) */
           
            setquatSalesOpt(datas)
            setquatSalesMonthOpt(Months)
        } else {
            datas = [0, 0, 0, 0];
            setquatSalesMonthOpt(Months)
            setquatSalesOpt(datas)
        }
    }
    const getsearchRevenueBudget = async (revenueBudgetyear = '') => {
        var query = ''
        let year = ''; 

        if (formdata.revenueBudgetyear) {
             year = formdata.revenueBudgetyear
        } else {
            year = new Date().getFullYear().toString(); // Convert to string
        }
        if (companyFinancialYear === "Financial Year") {
            year = year.split('-')[0]; // Extract the starting year
        }
        const response = await getDataFromApi(
            searchRevenueBudgetDash + year + '&companyId=' + companyId,
            1
        )
        var allsortmonths = getSortMonths();
        var revenuebudgetopt = [
            ['product', 'Actual Revenue', 'Budget'],
        ]
        allsortmonths.map((singlemonth) => {
            revenuebudgetopt.push([singlemonth, 0, 0])
        })
        if (response && response.status == 200 && response?.data?.length > 0) {
            setsearchRevenueBudget(response.data);
            revenuebudgetopt.map((month, index) => {
                response.data.map((opt, i) => {
                    if (month[0].toLowerCase() == opt.month.toLowerCase().slice(0, 3)) {
                        revenuebudgetopt[index] = [month[0], opt.revenue, opt.budget]
                    }
                })
            })
            setrevenueSourceopt(revenuebudgetopt)
        } else {
            setrevenueSourceopt(revenuebudgetopt)
        }
        /*['product', 'Actual Revenue', 'Budget'],
          ['Jan', 75, 60],
          ['Feb', 35, 60],
          ['Mar', 64, 60],
          ['Apr', 68, 60],
          ['May', 75, 60],
          ['Jun', 57, 60],
          ['Jul', 58, 60],
          ['Aug', 59, 60],
          ['Sep', 70, 60],
          ['Oct', 65, 60],
          ['Nov', 55, 60],
          ['Dec', 68, 60], */
    }
    const handleSubmit = async (e) => {
        var response = ""
        var newformdata = {
            companyid: formdata.companyid,
            productid: formdata.productid,
            year: formdata.year,
            quarter: formdata.quarter,
            month: formdata.month,
            sales: formdata.sales,
            budget: formdata.budget,
            revenue: formdata.revenue
        }
        response = await postDataFromApi(createCommBusiness, newformdata, 1)
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
                <Breadcrumb
                    routeSegments={[
                        { name: 'Commercial & Business' },
                    ]}
                />
                <div className="breadnavigation">Home / Company lists  {companyLabel ? ' / ' + companyLabel : ''} / Dashboard / Commercial & Business</div>
            </div>
            <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12} className="noPadding">
                    <StyledCard elevation={6} className="echarts">
                        <CardHeader className="cardheader">
                            <Title>total Revenue YTD ({currency})</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.totalSalesMonthOpt}
                            onChange={(e, value) => handleTabsChange(value, 'totalSalesMonthOpt')}
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
                            <Tab label="Graph" value={'totalSalesMonthOpt_0'} />
                            <Tab label="Table" value={'totalSalesMonthOpt_1'} />
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
                                    onChange={(event, value) => changeDropdownValue('totalSaleyear', value, getsearchTotalSales)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.totalSaleyear}
                                            name="totalSaleyear"
                                            placeholder="Select"
                                        />
                                    )}
                                /> </>:  <AutoComplete
                                className="dropdown"
                                fullWidth
                                options={yearopt}
                                defaultValue={yearopt ? yearopt[0] : null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => changeDropdownValue('totalSaleyear', value, getsearchTotalSales)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Select"
                                        value={formdata.totalSaleyear}
                                        name="totalSaleyear"
                                        placeholder="Select"
                                    />
                                )}
                            />}





                                {/* <AutoComplete
                                    className="dropdown"
                                    fullWidth
                                    options={companyFinancialYear==="Financial Year"?financialYearopt:yearopt}
                                    defaultValue={companyFinancialYear==="Financial Year" ?(financialYearopt ? financialYearopt[0] : null):(yearopt ? yearopt[0] : null)}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => changeDropdownValue('totalSaleyear', value, getsearchTotalSales)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.totalSaleyear}
                                            name="totalSaleyear"
                                            placeholder="Select"
                                        />
                                    )}
                                /> */}
                            </div>
                        </ValidatorForm>
                        <SimpleCard >
                            <TabPanel
                                
                                value={tabDataValue.totalSalesMonthOpt}
                                index={'totalSalesMonthOpt_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: height }}
                                    option={{
                                        ...option,
                                        color: ['#2F8CD8'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel style={{overflow:'auto'}}
                                value={tabDataValue.totalSalesMonthOpt}
                                index={'totalSalesMonthOpt_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll" style={{width:'200%'}}>
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" className="imgCell">
                                                    <span>
                                                        Month
                                                    </span>
                                                </TableCell>
                                                {
                                                    totalSalesMonthOpt.map((singleData) => (
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
                                                        Revenue
                                                    </span>
                                                </TableCell>
                                                {totalSalesMonthOpt.map((singleData, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {getCommas(totalSalesOpt[i])}
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
                        <CardHeader className="cardheader ">
                            <Title>Product performance ({currency})</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.prodperformanceopt}
                            onChange={(e, value) => handleTabsChange(value, 'prodperformanceopt')}
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
                            <Tab label="Graph" value={'prodperformanceopt_0'} />
                            <Tab label="Table" value={'prodperformanceopt_1'} />
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
                                    onChange={(event, value) => changeDropdownValue('productperYear', value, getsearchProductPerformance)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.productperYear}
                                            name="productperYear"
                                            placeholder="Select"
                                        />
                                    )}
                                /> </>:  <AutoComplete
                                className="dropdown"
                                fullWidth
                                options={yearopt}
                                defaultValue={yearopt ? yearopt[0] : null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => changeDropdownValue('productperYear', value, getsearchProductPerformance)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Select"
                                        value={formdata.productperYear}
                                        name="productperYear"
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
                                    onChange={(event, value) => changeDropdownValue('productperYear', value, getsearchProductPerformance)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.productperYear}
                                            name="productperYear"
                                            placeholder="Select"
                                        />
                                    )}
                                /> */}
                            </div>
                        </ValidatorForm>
                        <SimpleCard >
                            <TabPanel
                                value={tabDataValue.prodperformanceopt}
                                index={'prodperformanceopt_0'}
                                className="tabpanel nopadding notclear"
                            >
                                {isProductPerfoemenceChanged ?
                                    (<ReactEcharts
                                        style={{ height: height }}
                                        option={{
                                            ...prodperformanceopt,
                                            color: [
                                                '#8B3DA8',
                                                '#02A6CF',
                                                '#D7BB4F',
                                                '#49C9BD',
                                                '#FF0000',
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
                                                "#008080"
                                            ],
                                        }}
                                    />) : ''}
                            </TabPanel>
                            <TabPanel style={{overflow:'auto'}}
                                value={tabDataValue.prodperformanceopt}
                                index={'prodperformanceopt_1'}
                                className="tabpanel nopadding notclear "
                            >
                                <div className="table_scroll" style={{width:'500%',height:'285px'}}>
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    prodPerformanceGraphopt.map((singleData) => (
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
                                                prodPerformanceGraphopt.length > 0 && prodPerformanceGraphopt[0].map((singleData, index) => (
                                                    <TableRow>
                                                        {
                                                            index != 0 && prodPerformanceGraphopt.map((singleRow) => (

                                                                <TableCell align="left" className="imgCell">
                                                                    <span>
                                                                        {getCommas(singleRow[index])}
                                                                    </span>
                                                                </TableCell>

                                                            ))
                                                        }
                                                    </TableRow>
                                                ))
                                            }

                                        </TableBody>

                                    </StyledTable>
                                </div>
                            </TabPanel>
                        </SimpleCard>
                    </StyledCard>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <div className="setfullheight">
                        <StyledCard elevation={6} className="echarts">
                            <CardHeader className="cardheader">
                                <Title>Quarterly Revenue ({currency})</Title>
                            </CardHeader>
                            <Tabs
                                value={tabDataValue.quatSalesMonthOpt}
                                onChange={(e, value) => handleTabsChange(value, 'quatSalesMonthOpt')}
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
                                <Tab label="Graph" value={'quatSalesMonthOpt_0'} />
                                <Tab label="Table" value={'quatSalesMonthOpt_1'} />
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
                                    onChange={(event, value) => changeDropdownValue('quarterSalesyear', value, getsearchQuarterlySales)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.quarterSalesyear}
                                            name="quarterSalesyear"
                                            placeholder="Select"
                                        />
                                    )}
                                /> </>:  <AutoComplete
                                className="dropdown"
                                fullWidth
                                options={yearopt}
                                defaultValue={yearopt ? yearopt[0] : null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => changeDropdownValue('quarterSalesyear', value, getsearchQuarterlySales)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Select"
                                        value={formdata.quarterSalesyear}
                                        name="quarterSalesyear"
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
                                        onChange={(event, value) => changeDropdownValue('quarterSalesyear', value, getsearchQuarterlySales)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="required"
                                                label="Select"
                                                value={formdata.quarterSalesyear}
                                                name="quarterSalesyear"
                                                placeholder="Select"
                                            />
                                        )}
                                    /> */}
                                </div>
                            </ValidatorForm>
                            <SimpleCard >
                                <TabPanel
                                    value={tabDataValue.quatSalesMonthOpt}
                                    index={'quatSalesMonthOpt_0'}
                                    className="tabpanel nopadding notclear"
                                >
                                    <ReactEcharts
                                        style={{ height: '300px' }}
                                        option={{
                                            ...quatoption,
                                            color: ['#00d1ff', '#2196f3',],
                                        }}
                                    />
                                </TabPanel>
                                <TabPanel style={{overflow:'auto'}}
                                    value={tabDataValue.quatSalesMonthOpt}
                                    index={'quatSalesMonthOpt_1'}
                                    className="tabpanel nopadding notclear"
                                >
                                    <div className="table_scroll" style={{width:'200%'}}>
                                        <StyledTable className="customtable odd-even withborder">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left" className="imgCell">
                                                        <span>  Quarter</span>
                                                    </TableCell>
                                                    {
                                                        quatSalesMonthOpt.map((singleQ) => (
                                                            <TableCell align="left" className="imgCell">
                                                                <span>
                                                                    {singleQ}
                                                                </span>
                                                            </TableCell>
                                                        ))
                                                    }
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left" className="imgCell">
                                                        <span>  Revenue</span>
                                                    </TableCell>
                                                    {
                                                        quatSalesMonthOpt.map((singleQ, i) => (
                                                            <TableCell align="left" className="imgCell">
                                                                <span>
                                                                    {/* {  getCommas  ({quatSalesOpt[i] != undefined ? quatSalesOpt[i] : 0})} */}
                                                                    {getCommas(quatSalesOpt[i] !== undefined ? quatSalesOpt[i] : 0)}
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
                    </div>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts">
                        <CardHeader className="cardheader">
                            <Title>revenue vs Budget ({currency})</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.revenueSourceopt}
                            onChange={(e, value) => handleTabsChange(value, 'revenueSourceopt')}
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
                            <Tab label="Graph" value={'revenueSourceopt_0'} />
                            <Tab label="Table" value={'revenueSourceopt_1'} />
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
                                    onChange={(event, value) => changeDropdownValue('revenueBudgetyear', value, getsearchRevenueBudget)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.revenueBudgetyear}
                                            name="revenueBudgetyear"
                                            placeholder="Select"
                                        />
                                    )}
                                /> </>:  <AutoComplete
                                className="dropdown"
                                fullWidth
                                options={yearopt}
                                defaultValue={yearopt ? yearopt[0] : null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => changeDropdownValue('revenueBudgetyear', value, getsearchRevenueBudget)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="required"
                                        label="Select"
                                        value={formdata.revenueBudgetyear}
                                            name="revenueBudgetyear"
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
                                    onChange={(event, value) => changeDropdownValue('revenueBudgetyear', value, getsearchRevenueBudget)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="required"
                                            label="Select"
                                            value={formdata.revenueBudgetyear}
                                            name="revenueBudgetyear"
                                            placeholder="Select"
                                        />
                                    )}
                                /> */}
                            </div>
                        </ValidatorForm>
                        <SimpleCard >
                            <TabPanel
                                value={tabDataValue.revenueSourceopt}
                                index={'revenueSourceopt_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '300px' }}
                                    option={{
                                        ...revenueQuarter,
                                        color: ['#2F8CD8', '#D43F8D',],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel style={{overflow:'auto'}}
                                value={tabDataValue.revenueSourceopt}
                                index={'revenueSourceopt_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll" style={{width:'200%'}}>
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    revenueSourceopt.map((singleQ) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleQ[0]}
                                                            </span>
                                                        </TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                revenueSourceopt.length > 0 && revenueSourceopt[0].map((singleQ, index) => (
                                                    index != 0 && (<TableRow>

                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {singleQ}
                                                            </span>
                                                        </TableCell>
                                                        {
                                                            revenueSourceopt.map((singleQ, i) =>
                                                            (
                                                                i != 0 && (<TableCell align="left" className="imgCell">
                                                                    <span>
                                                                        {getCommas(singleQ[index])}
                                                                    </span>
                                                                </TableCell>)
                                                            ))
                                                        }
                                                    </TableRow>)
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
        </Container >
    )
}

export default Commercialbusiness
