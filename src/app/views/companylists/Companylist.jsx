import React, { Fragment,useState,useEffect } from 'react'
import { Grid, Card } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import ReactEcharts from 'echarts-for-react'
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
} from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Small } from 'app/components/Typography'
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import  Icon_countries  from "../../image/Seven-countries-cohorts-menu.svg"
import  profit  from "../../image/profit.svg"
import  loss  from "../../image/loss.svg"
import {yearopt,getFullMonths} from '../../services/CommonObject';
import { Autocomplete } from '@mui/lab'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {getAllCompanyDetails,getallplmnt,getRevenuequarter,getrevenueonequarter,getEBITDAvalues,getNewsandSocialmedia,getHeatMap,searchplmnt,getonboardcmp} from '../../services/api'
import {getDataFromApi} from '../../services/CommonService';
import {statusoptions} from '../../services/CommonObject';
import { useNavigate } from 'react-router-dom'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))



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

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontWeight: '500',
    fontSize: '14px',
    color: theme.palette.primary.main,
}))

const subscribarList = [
    {
        id: '#12345',
        registered: '12-05-2021',
        company: 'Google',
        managedby: 'Lorem Ipsum',
    },
    {
        id: '#13456',
        registered: '08-08-2021',
        company: 'Microsoft',
        managedby: 'Sifha George',
    },
    {
        id: '#25896',
        registered: '18-09-2020',
        company: 'Apple',
        managedby: 'John Heya',
    },
    {
        id: '#58961',
        registered: '22-12-2019',
        company: 'Samsung',
        managedby: 'Das huda',
    },
    {
        id: '#75632',
        registered: '05-07-2018',
        company: 'Amazon',
        managedby: 'kurit yak',
    },
    
]

const countryList = [
  {id: 1,countryname:"United States",status:"Active"},
  {id: 2,countryname:"India",status:"Active"},
  {id: 3,countryname:"Australia",status:"Inactive"},
  {id: 4,countryname:"Brazil",status:"Inactive"},
  {id: 5,countryname:"Africa",status:"Active"},
  {id: 6,countryname:"Canada",status:"Active"},
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
  const { children, value, index, ...other } = props;
  

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
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Companylist = () => {
    var currentyear=new Date().getFullYear()
    const { palette } = useTheme()
    const theme = useTheme()
    const navigate = useNavigate()
    const height='350px'
    const [value, setValue] = React.useState(0);
    const [formdata,setFormData]=useState({year:"", revenueCompany:"",revenueOneCompany:"",ebitdaCompany:"",socialmediaCompany:"",countryCompany:""})
    const [allCompanyDetails,setallCompanyDetails] = useState([])
    const [allplmntDetails,setallplmntDetails]  = useState([]) 
    const [numberOfCompanies,setnumberOfCompanies] = useState();
    const [revenuequarter,setrevenuequarter] = useState([]) 
    const [revenueExpense,setrevenueExpense] = useState([]) 
    const [revenueIncome,setrevenueIncome] = useState([]) 
    const [revenueDatayear,setrevenueDatayear] = useState([])
    const [revenueOneQuarter,setrevenueOneQuarter] = useState([])
    const [totalRevenue,settotalRevenue] = useState([])
    const [onerevenueDatayear,setonerevenueDatayear] = useState([])
    const [EBITDAperQuarter,setEBITDAperQuarter] = useState([])
    const [ebitdaGraphopt,setebitdaGraphopt] = useState([])
    const [ebitdaSeriesopt,setebitdaSeriesopt] = useState([])
    const [newsAndSocialmedia,setnewsAndSocialmedia] = useState([]) 
    const [heatMap,setheatMap] = useState([]) 
    const [companyopt,setcompanyopt] = useState([])
    const [allActivecmp,setallActivecmp] = useState([])
    const [is_edit_loaded, set_is_edit_loaded] = useState(false)
    const { user } = useAuth()

    console.log("ebitdaSeriesopt",ebitdaSeriesopt,ebitdaGraphopt)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    
               

    const option = {
        grid: {
            top: '20px',
            bottom: '80px',
            left: '5%',
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
            bottom: '0px'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: revenueDatayear,
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
                rotate: 45,
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
            },
        },
        series: [
            {
                data: revenueExpense,
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
                data: revenueIncome,
                type: 'line',
                stack: 'INCOME',
                name: 'INCOME',
                smooth: true,
                symbolSize: 4,
                lineStyle: {
                    width: 4,
                },
            },
        ],
    }

    
    const revenue_option = {
        grid: {
            top: '10%',
            bottom: '20%',
            left: '10%',
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
            },
            splitLine: {
                show: false
                /*lineStyle: {
                    color: '#fff',
                    opacity: 0.15,
                },*/
            },
            
          },
          series: [
            {
              data: totalRevenue,
              type: 'bar',
              barWidth: '40%'
            }
          ]
    }
    
     const EBITDAoption = {
      grid: {
            top: '50px',
            bottom: '25px',
            left: '10%',
            right: '5%',
        },
      legend: {
               top: 0,
               itemGap: 10,
               itemWidth: 10,
               itemHeight: 10,
               icon: 'circle',
               textStyle: {
                color: '#fff',
                fontSize: '10'
               },
        },
      tooltip: {},
      dataset: {
        source: ebitdaGraphopt,
      },
      xAxis: { type: 'category' ,
               axisLabel: {
                color: '#fff',
                
            },
    
     },
      yAxis: {axisLabel: {
                color: '#fff',
                
            },},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: ebitdaSeriesopt,
    };

    function changeDropdownValue(type,e,funName=''){
        if(e){
            var value=e.id
         }else{
             var value=""
         }
         setFormData((formData) => ({
             ...formData,
             [type]:value,
         }));
     
         if(funName){
             funName(value);
         }
    }

    useEffect(() => {
        getallActivecmp();
        getallCompanyDetails();
        getallplmntDetails();
        getrevenuequarter();
        getrevenueOneQuarter();
        getEBITDAperQuarter();
        getnewsAndSocialmedia();
        getheatMap();
    }, [])
    
    const getallActivecmp = async () => {
        const response = await getDataFromApi(getonboardcmp, 1,1)
        if (response && response.status == 200 && response.data != null) {
            setallActivecmp(response.data)
            var comOpt= []
            response.data.map((opt)=>{
               var cp = []
               cp['id'] = opt.id
               cp['label'] = opt.companyName
            //    comOpt.push(cp)
               if (user.roles === 'Company Admin'||user.roles === 'Company User') {
                if (user.email === opt?.companyVo?.dealTeams) {
                    comOpt.push(cp)
                }
            }
            else {
                comOpt.push(cp)
            }
            })
            setcompanyopt(comOpt)
            setTimeout(() => {
                set_is_edit_loaded(true)
            }, 100)
        }else{
            setTimeout(() => {
                set_is_edit_loaded(true)
            }, 100)
        }
    }

    const getallCompanyDetails = async () => {
       
        var query = ''
        
        const response = await getDataFromApi(
            getAllCompanyDetails,
            1
        )
        if(response && response.status==200 && response.data !=null){
            
            setallCompanyDetails(response.data.slice(0, 4));
        }
    }

    const getallplmntDetails = async () => {
       
        var query = ''
        
        const response = await getDataFromApi(
            searchplmnt,
            1,1
        )
        if(response && response.status==200 && response.data !=null){
            var plmtdetails = []

            response.data.map((plmnt,i)=>{
                

                var pl = {
                    "id" : plmnt.id,
                     "companyName" : plmnt.companyName,
                     "stage" : plmnt.stage,
                     "status" :plmnt.status
                }
                if(plmnt.status == 'Active' && plmnt.stage!=null){ plmtdetails.push(pl) }
                
            })
            setnumberOfCompanies(plmtdetails.length)
            setallplmntDetails(plmtdetails.slice(0, 3));
        }
        console.log(allplmntDetails)
    }

    const getrevenuequarter = async (revenueCompany='') => {
       
        if(revenueCompany){
            var companyId = revenueCompany
        }else if(companyopt && companyopt[0]){
            var companyId = companyopt[0].id;
        }  else{
            var companyId = '';
        } 
        var query =""
        const response = await getDataFromApi(
            getRevenuequarter+'?companyId='+companyId,
            1
            
        )
        console.log("response890",response)
        if(response && response.status==200 && response.data !=null){
            setrevenuequarter(response.data);
            var expenseopt = []
            var incomeopt = []
            var yearopt = []
            response.data.map((revenue,i)=>{
                expenseopt.push(revenue.totalExpenses)
                incomeopt.push(revenue.income)
                yearopt.push(revenue.quarter+'FY'+revenue.year.substring(2,5))
            })
            setrevenueExpense(expenseopt.length>0?expenseopt:[0])
            setrevenueIncome(incomeopt.length>0?incomeopt:[0])
            setrevenueDatayear(yearopt)
            console.log("yearopt",expenseopt,incomeopt,yearopt)
        }
    }

    const getrevenueOneQuarter = async (revenueOneCompany='') => {
       
        if(revenueOneCompany){
            var companyId = revenueOneCompany
        }else if(companyopt && companyopt[0]){
            var companyId = companyopt[0].id;
        }  else{
            var companyId = '';
        } 
        var query =""
        const response = await getDataFromApi(
            getrevenueonequarter+'?companyId='+companyId,
            1
        )
        console.log("regsdhdh",response)
        if(response && response.status==200 && response.data !=null){
            setrevenueOneQuarter(response.data);
            var revenueopt = []
            var yearopt = []
            response.data.map((revenue,i)=>{
                revenueopt.push(revenue.totalRevenue)
                yearopt.push(revenue.quarter+'FY'+revenue.year.substring(2,5))
            })
            settotalRevenue(revenueopt)
            setonerevenueDatayear(yearopt)
        }
    }
    
    const getEBITDAperQuarter = async (ebitdaCompany='') =>{
        if(ebitdaCompany){
            var companyId = ebitdaCompany
        }else if(companyopt && companyopt[0]){
            var companyId = companyopt[0].id;
        }  else{
            var companyId = '';
        } 
        var query = ""
        const response = await getDataFromApi(getEBITDAvalues+'?companyId='+companyId,1);
    //    var response=[];
        if(response && (response.status==202 || response.status==200) && response.data.length>0){
            setEBITDAperQuarter(response.data);

            var ebitdaprodnameopt = ['product']
            var mainebitdaopt = [ebitdaprodnameopt]
            var alreadyExistQuarter = ''
            var quarterindex = ''
            response.data.map((ebitda,i) => {
                if (ebitdaprodnameopt.indexOf(ebitda.month) === -1) ebitdaprodnameopt.push(ebitda.month.slice(0,3));
                
                mainebitdaopt.find((element) => {
                if(element[0] === 'FY'+ebitda.year){
                    alreadyExistQuarter = 1;
                    quarterindex = mainebitdaopt.findIndex(mainebitdaopt => mainebitdaopt[0] === 'FY'+ebitda.year)
                    
                }else{
                    alreadyExistQuarter = '';
                }
                
                })
                if(!alreadyExistQuarter){
                    var quarteryear = ['FY'+ebitda.year]
                    var prodindex = ebitdaprodnameopt.findIndex(ebitdaprodnameopt => ebitdaprodnameopt === ebitda.month.slice(0,3))
                    if(prodindex){
                    quarteryear[prodindex] = ebitda.EBITDAvalue
                    }
                    mainebitdaopt.push(quarteryear)
                }else{
                    var prodindex = ebitdaprodnameopt.findIndex(ebitdaprodnameopt => ebitdaprodnameopt === ebitda.month.slice(0,3))
                    /* if(prodindex){
                    quarteryear[prodindex] = cos.EBITDAvalue
                    } */
                    mainebitdaopt[quarterindex][prodindex] = ebitda.EBITDAvalue
                }
                
                
            })
            if(mainebitdaopt){
                var seriesdata = []
                var serieslength = mainebitdaopt[0].length - 1
                if(serieslength!= null && serieslength != 0){
                for(var i=1; i<=serieslength; i++){
                    var seriessingle = { type: 'line'}
                    seriesdata.push(seriessingle)
                }
                setebitdaSeriesopt(seriesdata)
                }
            }
            console.log(ebitdaprodnameopt)
            console.log('mainebitdaopt',seriesdata,mainebitdaopt)
            setebitdaGraphopt(mainebitdaopt)

         
        }else{
            var allmonths=getFullMonths()
            var defaultmonths=['product']
            allmonths.map((singlemonth)=>{
                defaultmonths.push(singlemonth)
            })
            const defaultVal = [
                defaultmonths,
                ['FY'+currentyear, '0', '0','0','0','0','0','0','0','0','0','0','0']
            ]
            setebitdaGraphopt(defaultVal)
            setebitdaSeriesopt([
                {type: 'line'},
                {type: 'line'}
            ])
          
        }
    }
    
    const getnewsAndSocialmedia = async (socialmediaCompany='') =>{
        if(socialmediaCompany){
            var companyId = socialmediaCompany
        }else if(companyopt && companyopt[0]){
            var companyId = companyopt[0].id;
        }  else{
            var companyId = '';
        } 
        var query =""
       // var companyId ='f284b8e8-a0d8-44bd-ba31-631ab2520425'
        var offset = '0'
        var pageSize = '3'
        const response = await getDataFromApi(
            getNewsandSocialmedia+'?companyId='+companyId+'&offset='+offset+'&pageSize='+pageSize,
            1
        )
        if(response && response.status==200 && response.data !=null){
            setnewsAndSocialmedia(response.data);
        }
    }
    
    const getheatMap = async (heatMapCompany='') =>{

        if(heatMapCompany){
            var companyId = heatMapCompany
        }else if(companyopt && companyopt[0]){
            var companyId = companyopt[0].id;
        }  else{
            var companyId = '';
        } 
        var query = ""
        const response = await getDataFromApi(getHeatMap+'?companyId='+companyId,1);
        if(response && response.status==200 && response.data !=null){
            setheatMap(response.data);
        }
        // setheatMap([
        //     {
                
        //     }
        // ])
    }

    return is_edit_loaded ? (
        <Fragment>
            <ContentBox className="analytics">
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                       
                        { name: 'Dashboard' },
                    ]}
                />
                <div className="breadnavigation">Home / Dashboard</div>
            </div>
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={3} sx={{ mb: '24px' }}>
                        {allCompanyDetails.map((companyDetails,i)=>(
                                <Grid item xs={12} md={3} className="stat_cards">
                                    <StyledCard elevation={6} >
                                        <ContentBox className="contentBox">
                                            <Box>
                                                <Small>{companyDetails.name}</Small>
                                                <Heading>profit <span>+6.90%</span></Heading>
                                            </Box>
                                            <div className="content">
                                            <Typography>Total Revenue/Quarter</Typography>
                                            <h2>$15,215.70</h2>
                                            </div>
                                        </ContentBox>
                                    </StyledCard>
                                </Grid>
                            ))}
                          
                          
                      </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <StyledCard elevation={6} >
                            <CardHeader className="cardheader">
                                <Title>Investmentcccc overview</Title>
                            </CardHeader>
                            <h6 className="greytext">Total investment value of your plateform</h6>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                              <Tab label="Overview"  />
                              <Tab label="This Year"  />
                              <Tab label="All Time"  />
                            </Tabs>
                            <TabPanel value={value} index={0} className="tabpanel">
                                <div className="tabpanelInner">
                                    <Typography>Currently Actived Investment</Typography>
                                    <Grid container spacing={3}>
                                       <Grid item lg={6} md={6} sm={12} xs={12} >
                                         <div className="invest_amt">
                                             <h4>49,395.395 <span>USD</span></h4>
                                             <Small>amount</Small>
                                         </div>
                                         <div className="invest_amt">
                                             <h4>49,395.395 <span>USD</span></h4>
                                             <Small>Paid Profit</Small>
                                         </div>
                                       </Grid>
                                       <Grid item lg={6} md={6} sm={12} xs={12} >
                                          <div className="invest_amt">
                                             <h4>56 <span className="up"><Icon fontSize="large">arrow_upward</Icon>1.93%</span></h4>
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
                                             <h4>49,395.395 <span>USD</span></h4>
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
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1} className="tabpanel">
                                <div className="tabpanelInner">
                                    <Typography>Currently Actived Investment</Typography>
                                    <Grid container spacing={3}>
                                       <Grid item lg={6} md={6} sm={12} xs={12} >
                                         <div className="invest_amt">
                                             <h4>49,395.395 <span>USD</span></h4>
                                             <Small>amount</Small>
                                         </div>
                                         <div className="invest_amt">
                                             <h4>49,395.395 <span>USD</span></h4>
                                             <Small>Paid Profit</Small>
                                         </div>
                                       </Grid>
                                       <Grid item lg={6} md={6} sm={12} xs={12} >
                                          <div className="invest_amt">
                                             <h4>56 <span className="up"><Icon fontSize="large">arrow_upward</Icon>1.93%</span></h4>
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
                                             <h4>49,395.395 <span>USD</span></h4>
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
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={2} className="tabpanel">
                                <div className="tabpanelInner">
                                    <Typography>Currently Actived Investment</Typography>
                                    <Grid container spacing={3}>
                                       <Grid item lg={6} md={6} sm={12} xs={12} >
                                         <div className="invest_amt">
                                             <h4>49,395.395 <span>USD</span></h4>
                                             <Small>amount</Small>
                                         </div>
                                         <div className="invest_amt">
                                             <h4>49,395.395 <span>USD</span></h4>
                                             <Small>Paid Profit</Small>
                                         </div>
                                       </Grid>
                                       <Grid item lg={6} md={6} sm={12} xs={12} >
                                          <div className="invest_amt">
                                             <h4>56 <span className="up"><Icon fontSize="large">arrow_upward</Icon>1.93%</span></h4>
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
                                             <h4>49,395.395 <span>USD</span></h4>
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
                                </div>
                            </TabPanel>

                        </StyledCard>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <StyledCard elevation={6} className="chart">
                           <CardHeader className="cardheader">
                                <Title>Revenue per quarter</Title>
                            </CardHeader>
                            <ValidatorForm className="year-form">
                                <div className="year-form-inner">                                 
                                    <label>Company:</label>
                                    <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={companyopt && companyopt[0] ? companyopt[0] : null}
                                            options={companyopt}
                                            getOptionLabel={(option) => option.label}
                                            onChange={(event, value) => changeDropdownValue('revenueCompany',value,getrevenuequarter)}
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
                            <SimpleCard >
                                <ReactEcharts
                                    style={{ height: height }}
                                    option={{
                                        ...option,
                                        color: ['#e7515a',
                                                '#2196f3'],
                                    }}
                                />
                            </SimpleCard>
                        </StyledCard>
                    </Grid>
                    <Grid item lg={8} md={8} sm={12} xs={12} className="tablegrid">
                        <StyledCard elevation={6} >
                            <CardHeader className="cardheader">
                                <Title>Number of companies({numberOfCompanies ? numberOfCompanies : ''})</Title>
                                <Button onClick={()=>navigate('/investmentpipeline/pipelinemanagement')}>View All</Button>
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
                                    {allplmntDetails.map((allplmntDetails, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">
                                                    {allplmntDetails.companyName}
                                                </TableCell>
                                                <TableCell align="left" className="lightweight">
                                                    {allplmntDetails.stage}
                                                </TableCell>
                                                <TableCell className="lightweight">{allplmntDetails.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </StyledTable>
                            </div>    
                        </StyledCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <StyledCard elevation={6} >
                            <CardHeader className="cardheader">
                                <Title>Countries(7)</Title>
                                <Button>View All</Button>
                            </CardHeader>
                            <ValidatorForm className="year-form">
                                    <div className="year-form-inner">                                 
                                        <label>Company:</label>
                                        <AutoComplete
                                                className="dropdown"
                                                fullWidth
                                                defaultValue={companyopt && companyopt[0] ? companyopt[0] : null}
                                                options={companyopt}
                                                getOptionLabel={(option) => option.label}
                                                onChange={(event, value) => changeDropdownValue('countryCompany',value,getheatMap)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        className="required"
                                                        label="Select"
                                                        value={formdata.countryCompany}
                                                        name="countryCompany"
                                                        placeholder="Select"
                                                    />
                                                )}
                                        />
                                    </div>
                            </ValidatorForm>
                            <div className="table_scroll">
                                <StyledTable className="customtable">
                                    <TableBody>
                                        {heatMap.map((heatMap, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">
                                                    {heatMap}
                                                </TableCell>
                                                <TableCell align="right" className={heatMap.status == 'Active' ? 'active lightweight' : 'inactive lightweight'}>
                                                    {heatMap.status}
                                                </TableCell>
                                                
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </StyledTable>
                            </div>    
                        </StyledCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div>
                            <StyledCard elevation={6} >
                                <CardHeader className="cardheader">
                                    <Title>News Articles</Title>
                                </CardHeader>
                                <ValidatorForm className="year-form companydrop">
                                    <div className="year-form-inner">                                 
                                        <label>Company:</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={companyopt && companyopt[0] ? companyopt[0] : null}
                                            options={companyopt}
                                            getOptionLabel={(option) => option.label}
                                            onChange={(event, value) => changeDropdownValue('socialmediaCompany',value,getnewsAndSocialmedia)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.socialmediaCompany}
                                                    name="socialmediaCompany"
                                                    placeholder="Select"
                                                />
                                            )}
                                        />
                                    </div>
                                </ValidatorForm>
                                {newsAndSocialmedia && newsAndSocialmedia.map((newsarticle, index) => (
                                    <Grid container spacing={3} className="newsArticle">
                                       <Grid item lg={3} md={3} sm={3} xs={3}>
                                         <div className="articleimg"></div>
                                       </Grid>
                                       <Grid item lg={9} md={9} sm={9} xs={9}>
                                         <Title>{newsarticle.headLines}</Title>
                                         <Typography>{newsarticle.newsArticles}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </StyledCard>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div>
                            <StyledCard elevation={6} className="echarts" >
                                <CardHeader className="cardheader">
                                    <Title>Revenue per quarter</Title>
                                </CardHeader>
                                <ValidatorForm className="year-form">
                                    <div className="year-form-inner">                                 
                                    <label>Company:</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={companyopt && companyopt[0] ? companyopt[0] : null}
                                            options={companyopt}
                                            getOptionLabel={(option) => option.label}
                                            onChange={(event, value) => changeDropdownValue('revenueOneCompany',value,getrevenueOneQuarter)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.revenueOneCompany}
                                                    name="revenueOneCompany"
                                                    placeholder="Select"
                                                />
                                            )}
                                        />
                                    </div>
                                </ValidatorForm>
                                <SimpleCard >
                                    <ReactEcharts
                                        style={{ height: '200px' }}
                                        option={{
                                            ...revenue_option,
                                            color: ['#2f8cd880',
                                                    theme.palette.primary.light,],
                                        }}

                                    />
                                </SimpleCard>
                            </StyledCard>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div>
                            <StyledCard elevation={6} className="echarts" >
                                <CardHeader className="cardheader">
                                    <Title>EBITDA per quarter</Title>
                                </CardHeader>
                                <ValidatorForm className="year-form">
                                    <div className="year-form-inner">                                 
                                    <label>Company:</label>
                                        <AutoComplete
                                            className="dropdown"
                                            fullWidth
                                            defaultValue={companyopt && companyopt[0] ? companyopt[0] : null}
                                            options={companyopt}
                                            getOptionLabel={(option) => option.label}
                                            onChange={(event, value) => changeDropdownValue('ebitdaCompany',value,getEBITDAperQuarter)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="required"
                                                    label="Select"
                                                    value={formdata.revenueOneCompany}
                                                    name="ebitdaCompany"
                                                    placeholder="Select"
                                                />
                                            )}
                                        />
                                    </div>
                                </ValidatorForm>
                                <SimpleCard >
                                    <ReactEcharts
                                        style={{ height: '200px' }}
                                        option={{
                                            ...EBITDAoption,
                                            color: ['#8B3DA8',
                                                    '#02A6CF','#D7BB4F','#49C9BD'],
                                        }}
                                    />
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

export default Companylist
