var companies = JSON.parse(localStorage.getItem('companyDet'))
console.log(companies)
if(!companies){
var companies=[]
}

//var companies=[{id:1,name:'Google'},{id:2,name:"Microsoft"},{id:3,name:"Apple"},{id:4,name:"Samsung"},{id:5,name:"Amazon"}]


const companylistmenu=[]

companies.map((companyList,index) => {
    companylistmenu.push({
        name: companyList.name,
        iconText: 'SI',
        secondlevelmenu : 'true',
        companyid:companyList.id,
        path: '/companylists/companydashboard/'+companyList.id, 
        children: [
                   
                    {
                        name: 'Commercial & Business',
                        iconText: 'SI',
                        path: '/companylists/dashboard/commercialandbusiness/'+companyList.id,
                    },
                    {
                        name: 'Finance',
                        iconText: 'SI',
                        path: '/companylists/dashboard/finance/'+companyList.id,
                    },
                    {
                        name: 'People & Culture',
                        iconText: 'SI',
                        path: '/companylists/dashboard/peopleandculture/'+companyList.id,
                    },
                    {
                        name: 'Technology',
                        iconText: 'SI',
                        path: '/companylists/dashboard/technology/'+companyList.id,
                    },
                    {
                        name: 'Opex',
                        iconText: 'SI',
                        path: '/companylists/dashboard/opex/'+companyList.id,
                    },
                    {
                        name: 'Shareholder Repository',
                        iconText: 'SI',
                        path: '/companylists/dashboard/shareholderrepository/'+companyList.id,
                    },
                    {
                        name: 'Others',
                        iconText: 'SI',
                        openinpoup:1,
                        mainMenu:companyList.name,
                        children: [
                                    {
                                        name: 'Regulatory & Compliance',
                                        iconText: 'SI',
                                        path: '/companylists/dashboard/others/regulatorycompliance/'+companyList.id,
                                        othersMenulink: 'true',
                                    }, 
                                    {
                                        name: 'ESG',
                                        iconText: 'SI',
                                        path: '/companylists/dashboard/others/esg/'+companyList.id,
                                        othersMenulink: 'true',
                                    },
                                    {
                                        name: 'Risks',
                                        iconText: 'SI',
                                        path: '/companylists/dashboard/others/risk/'+companyList.id,
                                        othersMenulink: 'true',
                                    },
                                 
                                    {
                                        name: 'News & Social Media',
                                        iconText: 'SI',
                                        path: '/companylists/dashboard/others/newsandsocialmedia/'+companyList.id,
                                        othersMenulink: 'true',
                                    },
                                ],
                    },
                
        ],
    })
})

export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
   
    /*companyList.map((companyList,index) => {
       console.log(companyList.companyName);
    })*/

    {
        name: 'Company Lists',
        icon: 'location_city',
        path: '/companylist',
        toplevelmenu : 'true',
        children: [
            {
                label: 'Search',
                type: 'label',
            },
            ...companylistmenu
            
        ],
    },
    {
        name: 'Investment Pipeline',
        icon: 'assignment',
        toplevelmenu : 'true',
        children: [
            {
                name: 'Lead',
                iconText: 'SI',
                path: '/investmentpipeline/lead',
            },
            {
                name: 'Pipeline Management',
                iconText: 'SI',
                path: '/investmentpipeline/pipelinemanagementprogress',
            },
            
        ],
    },
    {
        name: 'User management',
        path: '/usermanagement',
        icon: 'person',
        toplevelmenu : 'true'
    },
    {
        name: 'Documents',
        path: '/documents',
        icon: 'rate_review',
        toplevelmenu : 'true'
    },
    
    /*{
        label: 'PAGES',
        type: 'label',
    },
    {
        name: 'Session/Auth',
        icon: 'security',
        children: [
            {
                name: 'Sign in',
                iconText: 'SI',
                path: '/session/signin',
            },
            {
                name: 'Sign up',
                iconText: 'SU',
                path: '/session/signup',
            },
            {
                name: 'Forgot Password',
                iconText: 'FP',
                path: '/session/forgot-password',
            },
            {
                name: 'Error',
                iconText: '404',
                path: '/session/404',
            },
        ],
    },
    {
        label: 'Components',
        type: 'label',
    },
    {
        name: 'Components',
        icon: 'favorite',
        badge: { value: '30+', color: 'secondary' },
        children: [
            {
                name: 'Auto Complete',
                path: '/material/autocomplete',
                iconText: 'A',
            },
            {
                name: 'Buttons',
                path: '/material/buttons',
                iconText: 'B',
            },
            {
                name: 'Checkbox',
                path: '/material/checkbox',
                iconText: 'C',
            },
            {
                name: 'Dialog',
                path: '/material/dialog',
                iconText: 'D',
            },
            {
                name: 'Expansion Panel',
                path: '/material/expansion-panel',
                iconText: 'E',
            },
            {
                name: 'Form',
                path: '/material/form',
                iconText: 'F',
            },
            {
                name: 'Icons',
                path: '/material/icons',
                iconText: 'I',
            },
            {
                name: 'Menu',
                path: '/material/menu',
                iconText: 'M',
            },
            {
                name: 'Progress',
                path: '/material/progress',
                iconText: 'P',
            },
            {
                name: 'Radio',
                path: '/material/radio',
                iconText: 'R',
            },
            {
                name: 'Switch',
                path: '/material/switch',
                iconText: 'S',
            },
            {
                name: 'Slider',
                path: '/material/slider',
                iconText: 'S',
            },
            {
                name: 'Snackbar',
                path: '/material/snackbar',
                iconText: 'S',
            },
            {
                name: 'Table',
                path: '/material/table',
                iconText: 'T',
            },
        ],
    },
    {
        name: 'Charts',
        icon: 'trending_up',

        children: [
            {
                name: 'Echarts',
                path: '/charts/echarts',
                iconText: 'E',
            },
        ],
    },
    {
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/',
    },*/

]
