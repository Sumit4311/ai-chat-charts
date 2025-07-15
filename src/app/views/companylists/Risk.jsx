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
import Typography from '@mui/material/Typography'
import { Small } from 'app/components/Typography'
import ReactEcharts from 'echarts-for-react'
import heatmap from '../../image/heat-map.svg'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import {
    getRiskHeatMapdata,
    getByTypecategory,
    getRiskByCategory,
    getRiskByRating,
    getstratagicObjetive,
    getControlsEffectiveness,
    getTrafficChannel,
} from '../../services/api'
import { getDataFromApi } from '../../services/CommonService'
import { useParams } from 'react-router-dom'
import { SwipeRightAltTwoTone } from '@mui/icons-material'
import RiskHeatMap from './RiskHeatMap'
import { useOutletContext } from "react-router-dom";
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

const averageRenumaration = {
    grid: {
        top: '5%',
        bottom: '10%',
        left: '5%',
        right: '5%',
    },
    xAxis: {
        type: 'category',
        data: ['2015', '2016', '2017', '2018', '2019', '2020'],
        axisLabel: {
            color: '#fff',
        },
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#fff',
        },
    },
    series: [
        {
            data: [50, 20, 25, 45, 22, 15, 5, 45, 40, 37, 30, 25],
            type: 'line',
            smooth: true,
        },
    ],
}





const optionbySentiments = {
    tooltip: {
        trigger: 'item',
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
                formatter: '{c}%',
            },

            labelLine: {
                show: false,
            },
            data: [
                { value: 55, name: 'Neutral' },
                { value: 30, name: 'Positive' },
                { value: 15, name: 'Negative' },
            ],
        },
    ],
}

const option = {
    legend: {
        textStyle: {
            color: '#fff',
        },
    },
    dataset: {
        source: [
            ['amount', 'product', 'score'],
            [2000, 'Facebook', 100],
            [1300, 'You Tube', 90],
            [1213, 'Gmail', 88],
            [617, 'Linkedin', 50],
            [500, 'Twitter', 45],
            [498, 'Pinterest', 44],
        ],
    },
    grid: { top: '0%', bottom: '0%', left: '15%', right: '5%' },
    xAxis: {
        splitLine: { show: false },
        textStyle: {
            color: '#fff',
        },
    },
    yAxis: {
        type: 'category',
        textStyle: {
            color: '#fff',
        },
    },

    series: [
        {
            type: 'bar',
            encode: {
                x: 'amount',
                // Map the "amount" column to X axis.

                // Map the "product" column to Y axis
                y: 'product',
            },
            label: {
                show: false,
                formatter: '{c}',
            },
        },
    ],
}

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

const Trafficchannel = [
    {
        id: 1,
        channel: 'Organic Search',
        sessions: '4305',
        prevsessions: '4129',
        change: '4.29%',
    },
    {
        id: 2,
        channel: 'Social Media',
        sessions: '859',
        prevsessions: '936',
        change: '15.8%',
    },
    {
        id: 3,
        channel: 'Referrals',
        sessions: '482',
        prevsessions: '793',
        change: '41.3%',
    },
    {
        id: 4,
        channel: 'Others',
        sessions: '138',
        status: 'Cancelled',
        prevsessions: '97',
        change: '12.6%',
    },
]

const Risk = () => {
    var currentyear = new Date().getFullYear()
    const theme = useTheme()
    const navigate = useNavigate()
    const [riskHeatMapdata, setriskHeatMapdata] = useState([])
    const [riskMapValue, setRiskMapValue] = useState([])
    const [byTypecategory, setbyTypecategory] = useState([])
    const [riskByCategory, setriskByCategory] = useState([])
    const [riskByRating, setriskByRating] = useState([])
    const [riskByCategoryopt, setriskByCategoryopt] = useState([])
    const [riskBystrategicobj, setriskBystrategicobj] = useState([])
    const [risksstrategic, setrisksstrategic] = useState([])
    const [controllist, setControllist] = useState([])
    const [inherit, setInherit] = useState([])
    const [residual, setResidual] = useState([])
    const [residualRiskopt, setresidualRiskopt] = useState([])
    const [lowriskopt, setlowriskopt] = useState([])
    const [highriskopt, sethighriskopt] = useState([])
    const [moderateriskopt, setmoderateriskopt] = useState([])
    const [significantriskopt, setsignificantriskopt] = useState([])
    const [typeCatKeyLabelopt, settypeCatKeyLabelopt] = useState([])
    const [typecathighopt, settypecathighopt] = useState([])
    const [typecatlowopt, settypecatlowopt] = useState([])
    const [typecatmoderateopt, settypecatmoderateopt] = useState([])
    const [typecatsigniopt, settypecatsigniopt] = useState([])
    const [heatGraphdata, setheatGraphdata] = useState([])
    let { companyId } = useParams()
    const [currency] = useOutletContext();
    //var companyId = 'F284b8e8-A0d8-44bd-Ba31-631ab2520425';
    const [tabDataValue, setTabDataValue] = useState({
        riskByCategoryopts: 'riskByCategoryopt_0',
        controlEffectivenes: 'controlsEffectiveness_0',
        strategicObjectives: 'strategicObjectives_0',
        heatMapLevels: 'heatMapLevels_0',
        trafficChannels: 'trafficChannel_0',
        residualRiskRating:'residualRiskRating_0',
        riskHeatMapLevels:'riskHeatMapLevels_0'
    })
    var companyLabel = ''
    var companyopt = JSON.parse(localStorage.getItem('companyDet'))

    companyopt &&
        companyopt.map((opt) => {
            if (opt.id == companyId) {
                companyLabel = opt.name
            }
        })

    useEffect(() => {
        getriskHeatMapdata()
        getbyTypecategory()
        getriskByCategory()
        getriskByRating()
        getStratagicObjetiveListing()
        getcontrolseffectiveness()
        getTrafficList()
    }, [companyId, currency])

    const trafficChannelData = [
        'Concentration to a single counterparty sector or country',
        'Organisation of information security',
        'Compliance to regulatory requirements',
        'Foreign exchange rate fluctuation',
    ]
    const keyrisks = {
        legend: {
            data: ['Inherent Risk Score', 'Residual Risk Score'],
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            bottom: '0%',
        },
        grid: {
            containLabel: true,
            top: '5%',
            bottom: '10%',
            left: '1%',
            right: '5%',
        },
        xAxis: {
            show: false,

            type: 'value',
            splitLine: {
                show: false,
            },
        },

        yAxis: {
            type: 'category',
            data: trafficChannelData,
            axisLabel: {
                color: '#fff',
                fontSize: 12,
                formatter: function (value) {
                    const lines = value.split(' ');
                    const maxCharsPerLine = 40;
                    const wrappedLines = [];
                    let currentLine = '';
                    lines.forEach((word) => {
                        if (currentLine.length + word.length <= maxCharsPerLine) {
                            currentLine += ' ' + word;
                        } else {
                            wrappedLines.push(currentLine.trim());
                            currentLine = word;
                        }
                    });
                    wrappedLines.push(currentLine.trim());
                    return wrappedLines.join('\n');
                },
            },
        },
        series: [
            {
                name: 'Inherent Risk Score',
                data: inherit,
                type: 'bar',
                barGap: 0,
                barWidth: '30%',
                label: {
                    show: true,
                    position: 'right',
                },
            },
            {
                name: 'Residual Risk Score',
                data: residual,
                type: 'bar',
                barWidth: '30%',
                barGap: 0,
                label: {
                    show: true,
                    position: 'right',
                },
            },
        ],
    }


    const riskbycategory = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            right: '0%',
        },
        series: [
            {
                name: 'Finance',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['35%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },
                labelLine: {
                    show: false,
                },
                data: riskByCategoryopt,
            },
            {
                name: 'Finance',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['35%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },

                labelLine: {
                    show: false,
                },
                data: riskByCategoryopt,
            },
            {
                name: 'Strategic',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['35%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },

                labelLine: {
                    show: false,
                },
                data: riskByCategoryopt,
            },
            {
                name: 'Operational',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['35%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },

                labelLine: {
                    show: false,
                },
                data: riskByCategoryopt,
            },

            {
                name: 'Financial',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['35%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },

                labelLine: {
                    show: false,
                },
                data: riskByCategoryopt,
            },
            {
                name: 'Compliance',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['35%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },
                labelLine: {
                    show: false,
                },
                data: riskByCategoryopt,
            },
            {
                name: 'Risks by category',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['35%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },
                labelLine: {
                    show: false,
                },
                data: riskByCategoryopt,
            },
        ],
    }
    const controlleffectiveness = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            right: '0%',
        },
        series: [
            {
                name: 'Controls Effectiveness',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['35%', '40%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'inner',
                    formatter: '{c}%',
                },
                labelLine: {
                    show: false,
                },
                data: controllist,
            },
        ],
    }
    const stratagicObjetive = {
        grid: {
            containLabel: true,
            top: '5%',
            bottom: '0%',
            left: '1%',
            right: '8%',
        },
        xAxis: {
            label: {
                show: false,
            },
            type: 'value',
            splitLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'category',
            data: risksstrategic,
            axisLabel: {
                fontSize: 12,
                color: '#fff',
            },
        },
        series: [
            {
                data: riskBystrategicobj,
                type: 'bar',
                barWidth: '30%',
                label: {
                    show: true,
                    position: 'right',
                },
            },
        ],
    }
    const residualriskoption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        legend: {
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: 'rgba(255, 255, 255, 0.5)',
            },
            bottom: '0%',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: residualRiskopt,
            axisLabel: {
                fontSize: 12,
                color: '#fff',
                rotate: 45,
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
                    color: 'rgba(255,255,255,0.2)',
                },
            },
            // min: 0,
            // max: 5,
            // splitNumber: 5,
            min: highriskopt.length > 0 || significantriskopt.length > 0 || moderateriskopt.length > 0 || lowriskopt.length > 0 ? null : 0,
            max: highriskopt.length > 0 || significantriskopt.length > 0 || moderateriskopt.length > 0 || lowriskopt.length > 0 ? null : 5,
            splitNumber: 5
        },
        series: [
            {
                name: 'Low',
                type: 'bar',
                stack: 'total',
                barWidth: '30px',
                label: {
                    show: true,
                    color: '#000',
                },
                emphasis: {
                    focus: 'series',
                },
                data: lowriskopt,
            },
            {
                name: 'Moderate',
                type: 'bar',
                stack: 'total',
                barWidth: '30%',
                label: {
                    show: true,
                    color: '#000',
                },
                emphasis: {
                    focus: 'series',
                },
                data: moderateriskopt,
            },
            {
                name: 'Significant',
                type: 'bar',
                stack: 'total',
                barWidth: '30%',
                label: {
                    show: true,
                    color: '#000',
                },
                emphasis: {
                    focus: 'series',
                },
                data: significantriskopt,
            },
            {
                name: 'High',
                type: 'bar',
                barWidth: '30%',
                stack: 'total',
                label: {
                    show: true,
                    color: '#000',
                },
                emphasis: {
                    focus: 'series',
                },
                data: highriskopt,
            },
        ],
    }
    //risk 2nd graph 
    const keyoption = {
        legend: {
            data: ['Low', 'Moderate', 'Significant', 'High'],
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            bottom: '0%',
        },
        grid: {
            containLabel: true,
            top: '5%',
            bottom: '10%',
            left: '2%',
            right: '5%',
        },
        xAxis: {
            show: false,
            type: 'value',
            splitLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'category',
            data: typeCatKeyLabelopt,
            axisLabel: {
                fontSize: 12,
                color: '#fff',
            },
        },
        series: [
            {
                name: 'Low',
                data: typecatlowopt,
                type: 'bar',
                barWidth: '50%',
                stack: 'total',
                emphasis: {
                    focus: 'series',
                },
                label: {
                    show: true,
                    color: '#000',
                },
            },
            {
                name: 'Moderate',
                data: typecatmoderateopt,
                type: 'bar',
                barWidth: '50%',
                stack: 'total',
                emphasis: {
                    focus: 'series',
                },
                label: {
                    show: true,
                    color: '#000',
                },
            },
            {
                name: 'Significant',
                data: typecatsigniopt,
                type: 'bar',
                barWidth: '50%',
                stack: 'total',
                emphasis: {
                    focus: 'series',
                },
                label: {
                    show: true,
                    color: '#000',
                },
            },
            {
                name: 'High',
                data: typecathighopt,
                type: 'bar',
                barWidth: '50%',
                stack: 'total',
                emphasis: {
                    focus: 'series',
                },
                label: {
                    show: true,
                    color: '#000',
                },
            },
        ],
    }
    const heatoption = {
        legend: {
            data: ['Low', 'Moderate', 'Significant', 'High', 'Riskheat map'],
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#fff',
            },
            bottom: '0%',
        },
        tooltip: {
            position: 'top',
        },
        animation: false,
        grid: {
            height: '60%',
            show: true,
            top: '10%',
            borderWidth: 10,
            borderColor: '#000',
        },
        xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5'],
            splitArea: {
                show: true,
            },
            axisLabel: {
                color: '#fff',
            },
            splitLine: {
                interval: 1,
                show: true,
                lineStyle: {
                    color: ['#fff'],
                },
            },
        },
        yAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5'],
            splitArea: {
                show: true,
            },
            axisLabel: {
                color: '#fff',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#00000',
                },
            },
        },
        visualMap: {
            min: 0,
            max: 5,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            type: 'continuous',
            bottom: '15%',
            inRange: {
                color: ['#92D055', '#F6FE1F', '#FCBF0F', '#F80604'],
            },
        },
        series: [
            {
                name: 'Low',
                type: 'heatmap',
            },
            {
                name: 'Moderate',
                type: 'heatmap',
            },
            {
                name: 'Significant',
                type: 'heatmap',
            },
            {
                name: 'High',
                type: 'heatmap',
            },
            {
                // name: 'Risk heat map',
                type: 'heatmap',
                data: [
                    [0, 0, 1],
                    [1, 0, 1],
                    [0, 1, 1],
                    [0, 0, 1],
                    [1, 1, 2],
                    [2, 0, 2],
                    [0, 2, 2],
                    [1, 3, 3],
                    [0, 3, 3],
                    [0, 4, 3],
                    [1, 2, 3],
                    [2, 1, 3],
                    [2, 2, 3],
                    [3, 0, 3],
                    [3, 1, 3],
                    [1, 4, 4],
                    [2, 3, 4],
                    [3, 2, 4],
                    [4, 0, 3],
                    [4, 1, 4],
                    [2, 4, 4],
                    [3, 3, 4],
                    [4, 2, 4],
                    [4, 3, 5],
                    [3, 4, 5],
                    [4, 4, 5],
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 50,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                // label: {
                //     show: true,
                // },
            },
            {
                symbolSize: 110,
                label: {
                    show: true,
                },
                data: [{ value: [2.02, 2.68], name: 'Risk heat map' }],
                type: 'scatter',
                color: '#000000',
                itemStyle: {
                    color: '#fff',
                },
            },
            {
                symbolSize: 120,
                data: [{ value: [2.0, 1.0], name: 'Significant' }],
                type: 'scatter',
                color: '#000000',
                itemStyle: {
                    color: '#fff',
                },
            },
            {
                symbolSize: 100,
                data: [{ value: [2.02, 4.47], name: 'Moderate' }],
                type: 'scatter',
                color: '#000000',
                itemStyle: {
                    color: '#fff',
                },
            },
            {
                symbolSize: 80,
                data: [{ value: [4.05, 4.96], name: 'High' }],
                type: 'scatter',
                color: '#000',
                itemStyle: {
                    color: '#fff',
                },
            },
            {
                symbolSize: 90,
                data: [{ value: [3.03, 1.23], name: 'Low' }],
                type: 'scatter',
                color: 'blue',
                itemStyle: {
                    color: '//#endregionblue',
                },
            },
        ],
    }
    const getriskHeatMapdata = async () => {
        var query = ''
        var year = currentyear
        const response = await getDataFromApi(
            getRiskHeatMapdata + '?year=' + year + '&companyId=' + companyId,
            1
        )
        console.log(response?.data?.labelValuedto, "hehwe")
        if (response && response.status == 200 && response?.data?.labelValuedto && response?.data?.labelValuedto.length > 0) {
            setRiskMapValue(response.data)

            setriskHeatMapdata(response.data)
            console.log('riskHeatMapdata data', response)
            const heatarray = []
            response.data.labelValuedto.map((labelValuedto, i) => {
                heatarray.push([labelValuedto.label, labelValuedto.value])
            })
            setheatGraphdata(heatarray)
            console.log('heatarray', heatarray)
        } else {
            let heatmap = {
                labelValuedto: [
                    { label: 'High', value: 0 },
                    { label: 'Low', value: 0 },
                    { label: 'Moderate', value: 0 },
                    { label: 'Significant', value: 0 }
                ]
            }
            setRiskMapValue(heatmap)
            console.log("heaatmap3546", heatmap)
        }
    }
    // API issue risk 2nd graph
    const getbyTypecategory = async () => {
        var query = ''
        var year = currentyear
        const response = await getDataFromApi(
            getByTypecategory + '?year=' + year + '&companyId=' + companyId,
            1
        )
        console.log('byTypecdataategory ', response)
        if (response && response.status == 200 && response?.data?.length > 0) {
            setbyTypecategory(response.data)
            var typecatlabelopt = []
            var typecathigh = []
            var typecatlow = []
            var typecatmoderate = []
            var typecatsignificant = []

            const filter = [...new Map(response.data.map(item => [item['type'], item])).values()]
            console.log("fikleter", filter)

            filter.map((category, i) => {
                typecatlabelopt.push(category.type)
                filter[i].labelValuedto.map((labelval, index) => {
                    if (labelval.label == 'High' || labelval.label == 'high') {
                        typecathigh.push(labelval.value)
                    } else if (
                        labelval.label == 'Low' ||
                        labelval.label == 'low'
                    ) {
                        typecatlow.push(labelval.value)
                    } else if (
                        labelval.label == 'Moderate' ||
                        labelval.label == 'moderate'
                    ) {
                        typecatmoderate.push(labelval.value)
                    } else if (
                        labelval.label == 'Significant' ||
                        labelval.label == 'significant'
                    ) {
                        typecatsignificant.push(labelval.value)
                    }
                })
            })
            console.log('typeCatKeyLabelopt', typeCatKeyLabelopt)
            settypeCatKeyLabelopt(typecatlabelopt)
            settypecatsigniopt(typecatsignificant)
            settypecatlowopt(typecatlow)
            settypecathighopt(typecathigh)
            settypecatmoderateopt(typecatmoderate)
        } else {
            settypeCatKeyLabelopt(['STRATEGIC', 'OPERATIONAL', 'FINANCIAL', 'COMPLIANCE'])
            settypecatsigniopt([[0, 0, 0, 0]])
            settypecatlowopt([[0, 0, 0, 0]])
            settypecathighopt([[0, 0, 0, 0]])
            settypecatmoderateopt([[0, 0, 0, 0]])
        }
    }
    // This Api is also not fetching the data
    const getriskByCategory = async () => {
        var query = ''
        var year = currentyear
        const response = await getDataFromApi(
            getRiskByCategory + '?year=' + year + '&companyId=' + companyId,
            1
        )
        console.log('responseresponse', response)
        if (response && response.status == 200 && response?.data?.labelValuedto.length > 0) {
            setriskByCategory(response.data.data)
            console.log('riskByCategory data123', response.data.data)

            var catopt = []
            const filter = [...new Map(response.data.labelValuedto.map(item => [item['label'], item])).values()]
            filter.map((labelValuedto, i) => {
                var ct = {
                    value: labelValuedto.value,
                    name: labelValuedto.label,
                }
                catopt.push(ct)
            })
            console.log('catopt', filter)

            setriskByCategoryopt(catopt)
        } else {
            var riskByCat = [
                // { value: 0, name: 'Finance ' },
                // { value: 0, name: 'Strategic' },
                // { value: 0, name: 'Operational' },
                // { value: 0, name: 'Financial' },
                // { value: 0, name: 'Compliance' },

                { name: 'STRATEGIC', value: 0 },
                { name: 'OPERATIONAL', value: 0 },
                { name: 'FINANCIAL', value: 0 },
                { name: 'COMPLIANCE', value: 0 },
            ]
            setriskByCategoryopt(riskByCat)
            console.log("riakd", riskByCat)
        }
    }
    const getStratagicObjetiveListing = async () => {
        var query = ""
        var year = currentyear
        const response = await getDataFromApi(
            getstratagicObjetive + '?year=' + year + '&companyId=' + companyId,
            1
        )
        console.log("response678t87t97", response)
        if (response && response.status == 200 && Object.keys(response.data).length !== 0) {

            setriskBystrategicobj(Object.values(response.data))
            setrisksstrategic(Object.keys(response.data))
        }
        else {
            console.log("starate", response)
            setrisksstrategic(
                ['Compliance', 'Maximize return', 'Availability'],
            )
            setriskBystrategicobj(
                [0, 0, 0],
            )
        }
    }
    const getcontrolseffectiveness = async () => {
        var year = currentyear
        const response = await getDataFromApi(
            getControlsEffectiveness + '?year=' + year + '&companyId=' + companyId,
            1
        )
        console.log(response, "respone56789098")
        if (response && response.status == 200 && Object.keys(response.data).length !== 0) {
            var departopts = []
            Object.entries(response.data).map(([key, value]) => {
                var st = { value: value, name: key }
                departopts.push(st)
            })
            setControllist(departopts)
        }
        else {
            console.log(response, "response234567")
            setControllist([
                { value: 0, name: 'Mostly Effective' },
                { value: 0, name: 'Partially Effective' },
            ])
        }

    }
    //Traffic
    const getTrafficList = async () => {
        var year = currentyear
        const response = await getDataFromApi(
            getTrafficChannel + '?year=' + year + '&companyId=' + companyId,
            1
        )
        console.log("traffci123", response)
        let dd = []
        let inherit = []
        let residual = []
        if (response && response.status == 200 && Object.keys(response.data).length > 0) {
            console.log("respomngt56788", response)
            Object.entries(response.data).map(([key, value]) => {
                var st = { value: value, name: key }
                // departopts.push(st)
                // if (key.includes('Inherient')) {
                //     inherit.push(value)
                // } else if (key.includes('Residual')) {
                //     residual.push(value)
                // }
                if (key.includes('Inherient')) {
                    if (key.includes('ForeignExchangeratefluctuations')) {
                        inherit[3] = value
                    }
                    else if (key.includes('Compliancetoregulatoryrequirements')) {
                        inherit[2] = value
                    }
                    else if (key.includes('Organizationofinformationsecurity')) {
                        inherit[1] = value
                    }
                    else {
                        inherit[0] = value
                    }
                } else if (key.includes('Residual')) {
                    if (key.includes('ForeignExchangeratefluctuations')) {
                        residual[3] = value
                    }
                    else if (key.includes('Compliancetoregulatoryrequirements')) {
                        residual[2] = value
                    }
                    else if (key.includes('Organizationofinformationsecurity')) {
                        residual[1] = value
                    }
                    else {
                        residual[0] = value
                    }
                }
            })
            setInherit(inherit)
            setResidual(residual)
            console.log("updated", inherit, residual)
        }
        else {
            // data: [
            //     'Concentartion to a single counterparty sector or country',
            //     'Organisation of information security',
            //     'Compliance to regulatory requirements',
            //     'Foreign exchange rate fluctuation',
            // ],
            setInherit([0, 0, 0, 0])
            setResidual([0, 0, 0, 0])
            console.log("wgwdywfg")
        }
    }
    //riskrating
    const getriskByRating = async () => {
        var query = ''
        var year = currentyear
        const response = await getDataFromApi(
            getRiskByRating + '?year=' + year + '&companyId=' + companyId,
            1
        )
        console.log('riskByRating data', response)
        if (response && response.status == 200 && response.data.length > 0) {
            setriskByRating(response.data)
            console.log('riskByRating data', response)
            var riskByRatopt = []
            var highopt = []
            var lowopt = []
            var moderateopt = []
            var significantopt = []
            response.data.map((values, i) => {
                if (riskByRatopt.indexOf(values.type.toUpperCase()) === -1) {
                    riskByRatopt.push(values.type.toUpperCase())
                    response.data[i].labelValuedto.map((labelValuedto, index) => {
                        if (
                            labelValuedto.label.toLowerCase() == 'high'
                        ) {
                            highopt.push(labelValuedto.value)
                        } else if (
                            labelValuedto.label.toLowerCase() == 'low'
                        ) {
                            lowopt.push(labelValuedto.value)
                        } else if (
                            labelValuedto.label.toLowerCase() == 'moderate'
                        ) {
                            moderateopt.push(labelValuedto.value)
                        } else if (
                            labelValuedto.label.toLowerCase() == 'significant'
                        ) {
                            significantopt.push(labelValuedto.value)
                        }
                    })
                }
            })
            console.log('riskByRatoptriskByRatopt', riskByRatopt, lowopt, highopt, moderateopt, significantopt)
            setresidualRiskopt(riskByRatopt)
            setlowriskopt(lowopt)
            sethighriskopt(highopt)
            setmoderateriskopt(moderateopt)
            setsignificantriskopt(significantopt)
            console.log("abcd11", significantopt, moderateopt, highopt, lowopt, riskByRatopt)
        } else {
            setresidualRiskopt(['Treasury', 'Accounts', 'Compiliance', 'Management', 'IT', 'HR', 'Sales', 'Procurement', 'Administration', 'Projects'])
            // setlowriskopt([0,0,0,0,0,0,0,0,0,0])
            // sethighriskopt([4, 3, 3, 1, 4, 3, 3, 1, 1, 1] )
            // setmoderateriskopt([2, 1, 4, 2, 2, 1, 4, 2, 2, 2] )
            // setsignificantriskopt( [5, 4, 1, 2, 5, 4, 1, 2, 2, 2] )
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
                <Breadcrumb routeSegments={[{ name: 'Risk' }]} />
                <div className="breadnavigation">
                    Home / Company lists{' '}
                    {companyLabel ? ' / ' + companyLabel : ''} / Dashboard /
                    Others / Risks{' '}
                </div>
            </div>
            <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts ">
                        <CardHeader className="cardheader nomarginBottom">
                            <Title>Risk Heat Map</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.riskHeatMapLevels}
                            onChange={(e, value) => handleTabsChange(value, 'riskHeatMapLevels')}
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
                            <Tab label="Graph" value={'riskHeatMapLevels_0'} />
                            <Tab label="Table" value={'riskHeatMapLevels_1'} />
                        </Tabs>
                        <SimpleCard>
                        <TabPanel
                                value={tabDataValue.riskHeatMapLevels}
                                index={'riskHeatMapLevels_0'}
                                className="tabpanel nopadding notclear"
                            >
                              <RiskHeatMap riskMapValue={riskMapValue} />
                            </TabPanel>
                         
                            {/* <ReactEcharts
                                style={{ height: '530px' }}
                                option={{
                                    ...heatoption,
                                    color: [
                                        '#92D055',
                                        '#F6FE1F',
                                        '#FCBF0F',
                                        '#F80604',
                                    ],
                                }}
                            /> */}
                             <TabPanel
                                value={tabDataValue.riskHeatMapLevels}
                                index={'riskHeatMapLevels_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <StyledTable className="customtable odd-even withborder">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                typeCatKeyLabelopt.map((singleyear, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {singleyear.label}
                                                        </span>
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {
                                                typeCatKeyLabelopt.map((singleyear, i) => (
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts marginBottom">
                        <Tabs
                            value={tabDataValue.heatMapLevels}
                            onChange={(e, value) => handleTabsChange(value, 'heatMapLevels')}
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
                            <Tab label="Graph" value={'heatMapLevels_0'} />
                            <Tab label="Table" value={'heatMapLevels_1'} />
                        </Tabs>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.heatMapLevels}
                                index={'heatMapLevels_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...keyoption,
                                        color: [
                                            '#92D055',
                                            '#F6FE1F',
                                            '#FCBF0F',
                                            '#F80604',
                                        ],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.heatMapLevels}
                                index={'heatMapLevels_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <StyledTable className="customtable odd-even withborder">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                typeCatKeyLabelopt.map((heatmaplevels, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {heatmaplevels}
                                                        </span>
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {
                                                typeCatKeyLabelopt.map((options, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {typeCatKeyLabelopt.options}
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
                    <StyledCard elevation={6} className="echarts ">
                        <CardHeader className="cardheader nomarginBottom">
                            <Title>Traffic Channel</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.trafficChannels}
                            onChange={(e, value) => handleTabsChange(value, 'trafficChannels')}
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
                            <Tab label="Graph" value={'trafficChannel_0'} />
                            <Tab label="Table" value={'trafficChannel_1'} />
                        </Tabs>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.trafficChannels}
                                index={'trafficChannel_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    // style={{ height: '230px' }}
                                    // render={'svg'}
                                    option={{
                                        ...keyrisks,
                                        color: ['#E42640', '#733AEB'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.trafficChannels}
                                index={'trafficChannel_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <StyledTable className="customtable odd-even withborder">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                trafficChannelData?.map((item, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {item}
                                                        </span>
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {
                                                riskByCategoryopt.map((singleyear, i) => (
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
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts ">
                        <CardHeader className="cardheader">
                            <Title>Risks by category</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.riskByCategoryopts}
                            onChange={(e, value) => handleTabsChange(value, 'riskByCategoryopts')}
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
                            <Tab label="Graph" value={'riskByCategoryopt_0'} />
                            <Tab label="Table" value={'riskByCategoryopt_1'} />
                        </Tabs>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.riskByCategoryopts}
                                index={'riskByCategoryopt_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...riskbycategory,
                                        color: [
                                            '#B39D47',
                                            '#DC3912',
                                            '#0774F8',
                                            '#D43F8D',
                                        ],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.riskByCategoryopts}
                                index={'riskByCategoryopt_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <StyledTable className="customtable odd-even withborder">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                riskByCategoryopt.map((singleyear, i) => (
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
                                                riskByCategoryopt.map((singleyear, i) => (
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
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts ">
                        <CardHeader className="cardheader">
                            <Title>Strategic Objectives</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.strategicObjectives}
                            onChange={(e, value) => handleTabsChange(value, 'strategicObjectives')}
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
                            <Tab label="Graph" value={'strategicObjectives_0'} />
                            <Tab label="Table" value={'strategicObjectives_1'} />
                        </Tabs>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.strategicObjectives}
                                index={'strategicObjectives_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...stratagicObjetive,
                                        color: ['#2F8CD8'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.strategicObjectives}
                                index={'strategicObjectives_1'}
                                className="tabpanel nopadding notclear  objtable"
                            >
                                <StyledTable className="customtable odd-even withborder ">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                risksstrategic?.map((risksobjectives, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {risksobjectives}
                                                        </span>
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {
                                                riskBystrategicobj?.map((risksvalues, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {risksvalues}
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
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts ">
                        <CardHeader className="cardheader">
                            <Title>Controls Effectiveness</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.controlEffectivenes}
                            onChange={(e, value) => handleTabsChange(value, 'controlEffectivenes')}
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
                            <Tab label="Graph" value={'controlsEffectiveness_0'} />
                            <Tab label="Table" value={'controlsEffectiveness_1'} />
                        </Tabs>
                        <SimpleCard>
                            <TabPanel
                                value={tabDataValue.controlEffectivenes}
                                index={'controlsEffectiveness_0'}
                                className="tabpanel nopadding notclear"
                            >
                                <ReactEcharts
                                    style={{ height: '230px' }}
                                    option={{
                                        ...controlleffectiveness,
                                        color: ['#0774F8', '#D43F8D'],
                                    }}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.controlEffectivenes}
                                index={'controlsEffectiveness_1'}
                                className="tabpanel nopadding notclear objtable"
                            >
                                <StyledTable className="customtable odd-even withborder">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                controllist.map((singleyear, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {singleyear?.name}
                                                        </span>
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {
                                                controllist.map((singleyear, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {singleyear?.value}
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
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <StyledCard elevation={6} className="echarts ">
                        <CardHeader className="cardheader">
                            <Title>Residual Risk Rating</Title>
                        </CardHeader>
                        <Tabs
                            value={tabDataValue.residualRiskRating}
                            onChange={(e, value) => handleTabsChange(value, 'residualRiskRating')}
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
                            <Tab label="Graph" value={'residualRiskRating_0'} />
                            <Tab label="Table" value={'residualRiskRating_1'} />
                        </Tabs>
                        <SimpleCard>
                        <TabPanel
                                value={tabDataValue.residualRiskRating}
                                index={'residualRiskRating_0'}
                                className="tabpanel nopadding notclear"
                            >
                             <ReactEcharts
                                style={{ height: '500px' }}
                                option={{
                                    ...residualriskoption,
                                    color: [
                                        '#92D055',
                                        '#F6FE1F',
                                        '#FCBF0F',
                                        '#F80604',
                                    ],
                                }}
                            />
                            </TabPanel>
                            <TabPanel
                                value={tabDataValue.residualRiskRating}
                                index={'residualRiskRating_1'}
                                className="tabpanel nopadding notclear"
                            >
                                <StyledTable className="customtable odd-even withborder">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                residualRiskopt?.map((rating, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {rating}
                                                        </span>
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {
                                                residualRiskopt.map((singleyear, i) => (
                                                    <TableCell align="left" className="imgCell">
                                                        <span>
                                                            {singleyear?.value}
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
            </Grid>
        </Container>
    )
}

export default Risk
