import React, { useState, useEffect } from 'react'
import { Grid, Tab, Tabs } from '@mui/material'
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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Breadcrumb, SimpleCard } from 'app/components'
import { H3 } from 'app/components/Typography'
import { Card } from '@mui/material'
import { Autocomplete } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { Small } from 'app/components/Typography'
import ReactEcharts from 'echarts-for-react'
import heatmap from '../../image/heat-map.svg';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { getSocialMediaFollowers, getSocialMediaExposure, getSocialMediaTrafichannel, getSocialMediaSentiment, getSocialMediaTopsources, getHeatMap, getNewsandSocialmedia } from "../../services/api"
import { getDataFromApi } from '../../services/CommonService';
import { getProfile } from '../../services/CommonObject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom';
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
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
    fontSize: '1.3rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#fff',
}))

const SubTitle = styled('span')(() => ({
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: '10px',
}))

const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': {
        color: theme.palette.text.secondary,
    },
    '& .icon': {
        opacity: 0.6,
        fontSize: '44px',
        color: theme.palette.primary.main,
    },
}))

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontWeight: '500',
    fontSize: '14px',
    color: theme.palette.primary.main,
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

/*const Trafficchannel = [
    {
        id: 1,
        channel: 'Organic Search',
        sessions: '4305',
        prevSessions: '4129',
        change: '4.29%',
    },
    {
        id: 2,
        channel: 'Social Media',
        sessions: '859',
        prevSessions: '936',
        change: '15.8%',
    },
    {
        id: 3,
        channel: 'Referrals',
        sessions: '482',
        prevSessions: '793',
        change: '41.3%',
    },
    {
        id: 4,
        channel: 'Others',
        sessions: '138',
        status: 'Cancelled',
        prevSessions: '97',
        change: '12.6%',
    },
   
]*/

const followers = [
    {
        id: 1,
        name: 'Facebook',
        value: '650',
        quarter: 'Q2'
    },
    {
        id: 2,
        name: 'Google',
        value: '480',
        quarter: 'Q2'
    },
    {
        id: 3,
        name: 'Twitter',
        value: '320',
        quarter: 'Q2'
    },
    {
        id: 4,
        name: 'Youtube',
        value: '650',
        quarter: 'Q2'
    },
]

const Newsandsocialmedia = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [socialMediaFollowers, setsocialMediaFollowers] = useState([
        { name: 'FACEBOOK', value: 0, quarter: 'Q2' },
        { name: 'GOOGLE', value: 0, quarter: 'Q2' },
        { name: 'TWITTER', value: 0, quarter: 'Q2' },
        { name: 'YOUTUBE', value: 0, quarter: 'Q2' }
    ])
    const [socialMediaExposure, setsocialMediaExposure] = useState([])
    const [socialMediaTrafichannel, setsocialMediaTrafichannel] = useState([])
    const [mediaExposure, setmediaExposure] = useState([])
    const [mediaExposureyear, setmediaExposureyear] = useState([])
    const [socialMediaSentiment, setsocialMediaSentiment] = useState([])
    const [mediaSenti, setmediaSenti] = useState([])
    const [socialMediaTopsources, setsocialMediaTopsources] = useState([])
    const [topSourcedata, settopSourcedata] = useState([])
    let { companyId } = useParams();
    const [TooltipContent, setTooltipContent] = useState("");
    const [heatMap, setheatMap] = useState([])
    const [newsAndSocialmedia, setnewsAndSocialmedia] = useState([])
    const [tabDataValue, setTabDataValue] = useState({
        mediaExposureyear: 'mediaExposureyear_0',
        optionbySentiments: 'optionbySentiments_0',
        topSources: 'topSources_0'
    })
    var companyLabel = ""
    var companyopt = JSON.parse(localStorage.getItem('companyDet'))

    companyopt && companyopt.map((opt) => {
        if (opt.id == companyId) {
            companyLabel = opt.name
        }
    })


    console.log(topSourcedata, "topSourcedata>>>>>")
    const option = {
        legend: {
            textStyle: {
                color: '#fff',
            },

        },
        dataset: {
            source: topSourcedata,
        },
        grid: { top: '0%', bottom: '0%', left: '100px', right: '50px' },
        xAxis: {
            splitLine: { show: false }, textStyle: {
                color: '#fff',
            },
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                color: '#fff',
            },
        },

        series: [
            {
                type: 'bar',
                barWidth: '40px',
                encode: {
                    x: 'amount',
                    // Map the "amount" column to X axis.

                    // Map the "product" column to Y axis
                    y: 'product'
                },
                label: {
                    show: true,
                    position: 'right',
                    color: '#fff'
                },
            }
        ]
    };
    const mediaexp = {
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
            data: mediaExposureyear,
            axisLabel: {
                color: '#fff',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)',
                    opacity: 0.2,
                },
            }
        },
        series: [
            {
                data: mediaExposure,
                type: 'line',
                smooth: true
            }
        ]
    };


    const optionbySentiments = {


        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'bottom',
            textStyle: {
                color: '#fff',

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
                    formatter: '{c}'
                },

                labelLine: {
                    show: false
                },
                data: mediaSenti,
            }
        ]
    };



    useEffect(() => {
        getsocialMediaFollowers();
        getsocialMediaExposure();
        getsocialMediaTrafichannel();
        getsocialMediaSentiment();
        getsocialMediaTopsources();
        getheatMap();
        getnewsAndSocialmedia();
    }, [companyId,]);

    const getsocialMediaFollowers = async () => {
        var query = ""
        const response = await getDataFromApi(getSocialMediaFollowers + '?companyId=' + companyId, 1);
        if (response && response.status == 200 && response.data != null) {
            if (response.data.length > 0)
                setsocialMediaFollowers(response.data);
            console.log('socialMediaFollowers data', response.data);
        }
    }
    const getsocialMediaExposure = async () => {
        var query = ""
        const response = await getDataFromApi(getSocialMediaExposure + '?companyId=' + companyId, 1);
        console.log("response345", response)
        if (response && response.status == 200 && response.data != null) {
            // setsocialMediaFollowers(response.data);
            console.log('SocialMediaExposure data', response);

            var mediaExposureopts = [];
            Object.entries(response.data).map(([key, value]) => {
                mediaExposureopts.push(value)
            })
            setmediaExposure(mediaExposureopts);

            var mediaExposureyearopts = [];
            Object.entries(response.data).map(([key, value]) => {
                mediaExposureyearopts.push(key)
            })
            setmediaExposureyear(mediaExposureyearopts);

        }
    }
    const getsocialMediaTrafichannel = async () => {
        var query = ""
        const response = await getDataFromApi(getSocialMediaTrafichannel + '?companyId=' + companyId, 1);
        if (response && response.status == 200 && response.data != null) {
            setsocialMediaTrafichannel(response.data);
            console.log('SocialMediaTrafichannel data', response);
        }
    }

    const getsocialMediaSentiment = async () => {
        var query = ""
        const response = await getDataFromApi(getSocialMediaSentiment + '?companyId=' + companyId, 1);
        if (response && response.status == 200 && response.data != null) {
            setsocialMediaSentiment(response.data);
            console.log('socialMediaSentiment data', response);

            var mediaSentiopts = [];
            Object.entries(response.data).map(([key, value]) => {
                var st = {
                    value: value, name: key
                };
                /* st['value']=value
                st['name']=key */
                mediaSentiopts.push(st)

            })
            setmediaSenti(mediaSentiopts);
            console.log('mediaSenti', mediaSenti)
        }
    }



    const getsocialMediaTopsources = async () => {
        var query = ""
        const response = await getDataFromApi(getSocialMediaTopsources + '?companyId=' + companyId, 1);

        if (response && response.status == 200 && response.data.length > 0) {
            setsocialMediaTopsources(response.data);
            var sourceopt = [];
            sourceopt.push(['amount', 'product']);
            response.data.map((topsource, i) => {
                sourceopt.push([topsource.value, topsource.name]);
            })
            console.log("responsesss", sourceopt);
            settopSourcedata(sourceopt);
        }
        else {
            settopSourcedata([
                ['amount', 'product'],
                [0, 'FACEBOOK'],
                [0, 'GMAIL'],
                [0, 'LINKEDIN'],
                [0, 'PINTEREST'],
                [0, 'TWITTER'],
                [0, 'YOUTUBE']
            ])

        }


    }

    const getheatMap = async () => {
        var query = ""
        const response = await getDataFromApi(getHeatMap + '?companyId=' + companyId, 1);
        console.log("response123", response)
        if (response && response.status == 200 && response.data != null) {
            setheatMap(response.data);
        }
    }

    const getnewsAndSocialmedia = async () => {

        var query = ""
        // var companyId ='f284b8e8-a0d8-44bd-ba31-631ab2520425'
        var offset = '0'
        var pageSize = '3'
        const response = await getDataFromApi(
            getNewsandSocialmedia + '?companyId=' + companyId + '&offset=' + offset + '&pageSize=' + pageSize,
            1
        )
        console.log('socialMediaTopsources data', response);

        if (response && response.status == 200 && response.data != null) {
            setnewsAndSocialmedia(response.data);
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
            <div className="breadcrumb leftalign_breadcrumb">
                <Breadcrumb
                    routeSegments={[

                        { name: 'News & Social Media' },
                    ]}
                />
                <div className="breadnavigation">Home / Company lists  {companyLabel ? ' / ' + companyLabel : ''} / Dashboard / Others / News & Social Media </div>
            </div>
            <Grid container spacing={3}>
                {/* {followers.map((socialMediaFollowers,index)=>(
                       <Grid item sm={12} xs={12} md={3} className="socialGrid"> 
                            <StyledCard elevation={6}>
                                <ContentBox>
                                    <FacebookIcon />
                                    <Box ml="12px">
                                        <Heading>{socialMediaFollowers.value}</Heading>
                                    </Box>
                                </ContentBox>
                                <div className="followers">followers</div>
                            </StyledCard>
                        </Grid>
                    ))} */}

                <Grid item sm={12} xs={12} md={12} className="socialGrid">
                    <Grid container spacing={3}>
                        {socialMediaFollowers.map((media, index) => (
                            <Grid item sm={12} xs={12} md={3} className="socialGrid">
                                <StyledCard elevation={6}>
                                    <ContentBox>
                                        {/* <FacebookIcon /> */}
                                        <div className="MuiSvgIcon-root">
                                            <Typography className="firstletter">{getProfile(media.name)}</Typography>
                                        </div>

                                        <Box ml="12px">
                                            <Heading>{media.value}</Heading>
                                        </Box>
                                    </ContentBox>
                                    <div className="followers">followers</div>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className="sameHeightColumn">
                    <StyledCard elevation={6} >
                        <CardHeader className="cardheader">
                            <Title>News Articles</Title>
                        </CardHeader>
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
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <StyledCard elevation={6} >
                        <CardHeader className="cardheader nomarginBottom">
                            <Title>Traffic Channel</Title>
                        </CardHeader>
                        <div className="table_scroll">
                            <StyledTable className="customtable">
                                {socialMediaTrafichannel?.length > 0 &&
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Channel</TableCell>
                                            <TableCell>Sessions</TableCell>
                                            <TableCell>Prev Sessions</TableCell>
                                            <TableCell>Change</TableCell>
                                            <TableCell>Trend</TableCell>
                                        </TableRow>
                                    </TableHead>
                                }
                                <TableBody>
                                    {socialMediaTrafichannel.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">
                                                {user.channel}
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.sessions}
                                            </TableCell>
                                            <TableCell align="left" className="lightweight">
                                                {user.prevSessions}
                                            </TableCell>
                                            <TableCell className="lightweight">{user.change}{user.change && user.change >= 0 ? <Icon fontSize="small" className="down">arrow_upward</Icon> : <Icon fontSize="small" className="down">arrow_downward</Icon>}</TableCell>
                                            <TableCell className="lightweight"></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </StyledTable>
                        </div>
                    </StyledCard>
                </Grid>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts " >
                        <CardHeader className="cardheader">
                            <Title>Media exposure</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.mediaExposureyear}
                            onChange={(e, value) => handleTabsChange(value, 'mediaExposureyear')}
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
                            <Tab label="Graph" value={'mediaExposureyear_0'} />
                            <Tab label="Table" value={'mediaExposureyear_1'} />
                        </Tabs>
                        <SimpleCard >
                            <TabPanel
                                value={tabDataValue.mediaExposureyear}
                                index={'mediaExposureyear_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...mediaexp,
                                        color: ['#2F8CD8'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.mediaExposureyear}
                                index={'mediaExposureyear_1'}
                                className="tabpanel nopadding notclear"
                            >

                                <div className="table_scroll">
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" className="imgCell">
                                                    <span>
                                                        Year
                                                    </span>
                                                </TableCell>
                                                {
                                                    mediaExposureyear.map((singleyear, i) => (
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
                                                        Media Exposure
                                                    </span>
                                                </TableCell>
                                                {
                                                    mediaExposureyear.map((singleyear, i) => (
                                                        <TableCell align="left" className="imgCell">
                                                            <span>
                                                                {mediaExposure[i]}
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
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts " >
                        <CardHeader className="cardheader">
                            <Title>Sentiments</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.optionbySentiments}
                            onChange={(e, value) => handleTabsChange(value, 'optionbySentiments')}
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
                            <Tab label="Graph" value={'optionbySentiments_0'} />
                            <Tab label="Table" value={'optionbySentiments_1'} />
                        </Tabs>
                        <SimpleCard >
                            <TabPanel
                                value={tabDataValue.optionbySentiments}
                                index={'optionbySentiments_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...optionbySentiments,
                                        color: ['#46bc5c', '#733aeb', '#e42640'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.optionbySentiments}
                                index={'optionbySentiments_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <StyledTable className="customtable odd-even withborder">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                mediaSenti.map((singleyear, i) => (
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
                                                mediaSenti.map((singleyear, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {singleyear.value}
                                                        </span>
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableBody>
                                </StyledTable>
                            </TabPanel>
                        </SimpleCard>
                    </StyledCard>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className="sameHeightColumn">
                    <StyledCard elevation={6} className="echarts " >
                        <CardHeader className="cardheader">
                            <Title>Heat Map</Title>
                        </CardHeader>
                        {/*  <img src={heatmap} /> */}

                        <ComposableMap data-tip="">

                            <Geographies geography="/features.json">
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        var d = ""
                                        heatMap.map((opt) => {

                                            if (opt == geo.id) {
                                                d = geo.id;

                                            }

                                        })
                                        return (<Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                                setTooltipContent(`${geo.properties.name}`);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                            style={{
                                                default: {
                                                    fill: heatMap.length != 0 && d ? '#2F8CD8' : "#D6D6DA",
                                                    outline: "none"
                                                },
                                                hover: {
                                                    fill: "#F53",
                                                    outline: "none"
                                                },
                                                pressed: {
                                                    fill: "#E42",
                                                    outline: "none"
                                                }
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
                <Grid item lg={6} md={6} sm={12} xs={12} className="sameHeightColumn">
                    <StyledCard elevation={6} className="echarts " >
                        <CardHeader className="cardheader">
                            <Title>Top Sources</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.topSources}
                            onChange={(e, value) => handleTabsChange(value, 'topSources')}
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
                            <Tab label="Graph" value={'topSources_0'} />
                            <Tab label="Table" value={'topSources_1'} />
                        </Tabs>

                        <SimpleCard >
                            <TabPanel
                                value={tabDataValue.topSources}
                                index={'topSources_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '300px' }}
                                    option={{
                                        ...option,
                                        color: ['#2F8CD8'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.topSources}
                                index={'topSources_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <div className="table_scroll">
                                    <StyledTable className="customtable odd-even withborder">
                                        <TableHead>
                                            <TableRow>
                                                {topSourcedata.map((singleData) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {singleData[1]}
                                                        </span>
                                                    </TableCell>
                                                ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                {topSourcedata.map((singleData) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {singleData[0]}
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

export default Newsandsocialmedia
