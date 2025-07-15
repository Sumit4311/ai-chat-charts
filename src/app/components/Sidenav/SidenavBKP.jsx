import React, { Fragment, useEffect, useState } from 'react'
import Scrollbar from 'react-perfect-scrollbar'
import { navigations } from 'app/navigations'
import { MatxVerticalNav } from 'app/components'
import useSettings from 'app/hooks/useSettings'
import { styled } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import { postDataFromApi, getDataFromApi, putDataFromApi } from '../../services/CommonService';
import { getonboardcmp } from '../../services/api';

const StyledScrollBar = styled(Scrollbar)(() => ({
    paddingLeft: '1rem',
    paddingRight: '1rem',
    position: 'relative',
    // overflowY:'scroll !important'
}))

const SideNavMobile = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100vw',
    background: 'rgba(0, 0, 0, 0.54)',
    zIndex: -1,
    [theme.breakpoints.up('lg')]: {
        display: 'none',
    },
}))

const Sidenav = ({ children }) => {
    const { settings, updateSettings } = useSettings()
    const [menulist, setMenulist] = useState([])
    const user = useAuth()
    useEffect(() => {
        getMenuList()
    }, [])
    const getMenuList = async (searchvalue = "") => {
        var companies = [];
        const response = await getDataFromApi(getonboardcmp + `?userId=${user?.user?.id}`, 1, 1)
        if (response && response.status == 200 && response.data != null) {
            response.data.map((opt) => {
                if (searchvalue) {
                    if (opt.companyName && opt.companyName.toLowerCase().includes(searchvalue.toLowerCase())) {
                        companies.push(opt)
                    }
                } else {
                    companies.push(opt)
                }
            })
        }
        /* const response = await postDataFromApi(
            'masters/allMasters/getEmployeeDetails',
            query
        ) */

        /*var companies = JSON.parse(localStorage.getItem('companyDet'))
        console.log(companies)
        if(!companies){
         var companies=[]
        }*/

        const companylistmenu = []
        console.log(companies,"commmm")
        companies.map((companyList, index) => {
            // const response = await getDataFromApi("getcategor" + `?companyId=${companyList?.id}`, 1, 1)
            // console.log(response,"respppp")

            if (user?.user?.roles === 'Company Admin' || user?.user?.roles === 'Company User') {
                let emails = companyList?.companyVo?.dealTeams.split(",")
                if (emails.includes(user?.user?.email)) {
                    companylistmenu.push({
                        name: companyList.companyName,
                        iconText: 'SI',
                        secondlevelmenu: 'true',
                        companyid: companyList.id,
                        path: '/companylists/companydashboard/' + companyList.id,
                        children: [
                            {
                                name: 'Commercial & Business',
                                iconText: 'SI',
                                path: '/companylists/dashboard/commercialandbusiness/' + companyList.id,
                            },
                            {
                                name: 'Finance',
                                iconText: 'SI',
                                path: '/companylists/dashboard/finance/' + companyList.id,
                            },
                            {
                                name: 'People & Culture',
                                iconText: 'SI',
                                path: '/companylists/dashboard/peopleandculture/' + companyList.id,
                            },
                            {
                                name: 'Technology',
                                iconText: 'SI',
                                path: '/companylists/dashboard/technology/' + companyList.id,
                            },
                            {
                                name: 'Opex',
                                iconText: 'SI',
                                path: '/companylists/dashboard/opex/' + companyList.id,
                            },
                            {
                                name: 'Shareholder Repository',
                                iconText: 'SI',
                                path: '/companylists/dashboard/shareholderrepository/' + companyList.id,
                            },
                            {
                                name: 'Others',
                                iconText: 'SI',
                                openinpoup: 1,
                                mainMenu: companyList.companyName,
                                children: [
                                    {
                                        name: 'Regulatory & Compliance',
                                        iconText: 'SI',
                                        path: '/companylists/dashboard/others/regulatorycompliance/' + companyList.id,
                                        othersMenulink: 'true',
                                    },
                                    {
                                        name: 'ESG',
                                        iconText: 'SI',
                                        path: '/companylists/dashboard/others/esg/' + companyList.id,
                                        othersMenulink: 'true',
                                    },
                                    {
                                        name: 'Risks',
                                        iconText: 'SI',
                                        path: '/companylists/dashboard/others/risk/' + companyList.id,
                                        othersMenulink: 'true',
                                    },
                                    {
                                        name: 'News & Social Media',
                                        iconText: 'SI',
                                        path: '/companylists/dashboard/others/newsandsocialmedia/' + companyList.id,
                                        othersMenulink: 'true',
                                    },
                                ],
                            },
                        ],
                    })
                }
            }
            else {
                companylistmenu.push({
                    name: companyList.companyName,
                    iconText: 'SI',
                    secondlevelmenu: 'true',
                    path: '/companylists/companydashboard/' + companyList.id,
                    companyid: companyList.id,
                    children: [
                        {
                            name: 'Commercial & Business',
                            iconText: 'SI',
                            path: '/companylists/dashboard/commercialandbusiness/' + companyList.id,
                        },
                        {
                            name: 'Finance',
                            iconText: 'SI',
                            path: '/companylists/dashboard/finance/' + companyList.id,
                        },
                        {
                            name: 'People & Culture',
                            iconText: 'SI',
                            path: '/companylists/dashboard/peopleandculture/' + companyList.id,
                        },
                        {
                            name: 'Technology',
                            iconText: 'SI',
                            path: '/companylists/dashboard/technology/' + companyList.id,
                        },
                        {
                            name: 'Opex',
                            iconText: 'SI',
                            path: '/companylists/dashboard/opex/' + companyList.id,
                        },
                        {
                            name: 'Shareholder Repository',
                            iconText: 'SI',
                            path: '/companylists/dashboard/shareholderrepository/' + companyList.id,
                        },
                        {
                            name: 'Others',
                            iconText: 'SI',
                            openinpoup: 1,
                            mainMenu: companyList.companyName,
                            children: [
                                {
                                    name: 'Regulatory & Compliance',
                                    iconText: 'SI',
                                    path: '/companylists/dashboard/others/regulatorycompliance/' + companyList.id,
                                    othersMenulink: 'true',
                                },
                                {
                                    name: 'ESG',
                                    iconText: 'SI',
                                    path: '/companylists/dashboard/others/esg/' + companyList.id,
                                    othersMenulink: 'true',
                                },
                                {
                                    name: 'Risks',
                                    iconText: 'SI',
                                    path: '/companylists/dashboard/others/risk/' + companyList.id,
                                    othersMenulink: 'true',
                                },
                                {
                                    name: 'Valuation',
                                    iconText: 'SI',
                                    path: '/companylists/dashboard/others/valuation/' + companyList.id,
                                    othersMenulink: 'true',
                                },
                                {
                                    name: 'News & Social Media',
                                    iconText: 'SI',
                                    path: '/companylists/dashboard/others/newsandsocialmedia/' + companyList.id,
                                    othersMenulink: 'true',
                                },
                            ],
                        },
                    ],
                })
            }
        })
        var roles = user.user.roles
        roles = roles.toLowerCase().replace(/\s/g, '')
        var menus = [];
        if (roles) {
            if (roles === 'superadmin') {
                menus = [
                    {
                        name: 'Dashboard',
                        path: '/dashboard/default',
                        icon: 'dashboard',
                    },
                    {
                        name: 'Company Lists',
                        icon: 'location_city',
                        path: '/dashboard/default',
                        toplevelmenu: 'true',
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
                        toplevelmenu: 'true',
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
                        toplevelmenu: 'true'
                    },
                    {
                        name: 'Documents',
                        path: '/documents',
                        icon: 'rate_review',
                        toplevelmenu: 'true'
                    },
                ]
            } else if (roles === 'admin') {
                menus = [
                    {
                        name: 'Dashboard',
                        path: '/dashboard/default',
                        icon: 'dashboard',
                    },
                    {
                        name: 'Company Lists',
                        icon: 'location_city',
                        path: '/dashboard/default',
                        toplevelmenu: 'true',
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
                        toplevelmenu: 'true',
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
                        toplevelmenu: 'true'
                    },
                    {
                        name: 'Documents',
                        path: '/documents',
                        icon: 'rate_review',
                        toplevelmenu: 'true'
                    },
                ]

            } else if (roles === 'shareholder') {
                menus = [
                    {
                        name: 'Dashboard',
                        path: '/dashboard/default',
                        icon: 'dashboard',
                    },
                    {
                        name: 'Company Lists',
                        icon: 'location_city',
                        path: '/dashboard/default',
                        toplevelmenu: 'true',
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
                        toplevelmenu: 'true',
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
                ]
            } else if (roles === 'companyadmin') {
                if (companylistmenu && companylistmenu.length > 0) {
                    const companyId = companylistmenu[0].companyid
                    menus = [
                        {
                            name: 'Company Lists',
                            icon: 'location_city',
                            path: `/companylists/companydashboard/${companyId}`,
                            toplevelmenu: 'true',
                            children: [
                                {
                                    label: 'Search',
                                    type: 'label',
                                },
                                ...companylistmenu
                            ],
                        },
                        {
                            name: 'User management',
                            path: '/usermanagement',
                            icon: 'person',
                            toplevelmenu: 'true'
                        },
                        {
                            name: 'Documents',
                            path: '/documents',
                            icon: 'rate_review',
                            toplevelmenu: 'true'
                        },
                    ]
                }
                else {
                    menus = [
                        {
                            name: 'User management',
                            path: '/usermanagement',
                            icon: 'person',
                            toplevelmenu: 'true'
                        },
                        {
                            name: 'Documents',
                            path: '/documents',
                            icon: 'rate_review',
                            toplevelmenu: 'true'
                        },
                    ]
                }
            } else if (roles === 'companyuser') {
                console.log(roles, "roles???")
                if (companylistmenu && companylistmenu.length > 0) {
                    const companyId = companylistmenu[0].companyid
                    menus = [
                        {
                            name: 'Company Lists',
                            icon: 'location_city',
                            // path: '/dashboard/default',
                            path: `/companylists/companydashboard/${companyId}`,
                            toplevelmenu: 'true',
                            children: [
                                {
                                    label: 'Search',
                                    type: 'label',
                                },
                                ...companylistmenu
                            ],
                        },
                        {
                            name: 'Documents',
                            path: '/documents',
                            icon: 'rate_review',
                            toplevelmenu: 'true'
                        },
                    ]
                }
                else {
                    menus = [
                        {
                            name: 'Company Lists',
                            icon: 'location_city',
                            path: '/dashboard/default',
                            toplevelmenu: 'true',
                            children: [
                                {
                                    label: 'Search',
                                    type: 'label',
                                },
                                ...companylistmenu
                            ],
                        },
                        {
                            name: 'Documents',
                            path: '/documents',
                            icon: 'rate_review',
                            toplevelmenu: 'true'
                        },
                    ]
                }

            }
        }
        /* console.log('roles',roles)
        var menus=[{
            name: 'Dashboard',
            path: '/dashboard/default',
            icon: 'dashboard',
        }] */
        /* if (response && response.data.code && response.data.data != null) {
            // var menus=navigations(response.data.data.menuList);
            var menus=[];
            var role="test"
            if(role=="shareholder"){
                menus=[{
                    name: 'Dashboard',
                    path: '/dashboard/default',
                    icon: 'dashboard',
                }]
            }else if(role=="test"){
                menus=[{
                    name: 'Dashboard',
                    path: '/dashboard/default',
                    icon: 'dashboard',
                },
                {
                    name: 'Dashboard',
                    path: '/dashboard/default',
                    icon: 'dashboard',
                }]
            } */

        setMenulist(menus)
        // }
    }
    const updateSidebarMode = (sidebarSettings) => {
        let activeLayoutSettingsName = settings.activeLayout + 'Settings'
        let activeLayoutSettings = settings[activeLayoutSettingsName]

        updateSettings({
            ...settings,
            [activeLayoutSettingsName]: {
                ...activeLayoutSettings,
                leftSidebar: {
                    ...activeLayoutSettings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        })
    }

    function getSearchValue(value) {
        getMenuList(value)
        // var value=e.target.value.trimStart()
        // setFormData((formData) => ({
        //     ...formData,
        //     [e.target.name]:value,
        // }));
    }
    // const style = {
    //     overflowY: `scroll ${" !important"}`
    // };

    return (
        <Fragment>
            <StyledScrollBar options={{ suppressScrollX: true }} className='mysidebar' >
                <div className='mysidebar-div'>
                    {children}
                    {/* <MatxVerticalNav items={navigations} /> */}
                    <MatxVerticalNav items={menulist} getSearchValue={getSearchValue} />
                </div>
            </StyledScrollBar>

            <SideNavMobile
                onClick={() => updateSidebarMode({ mode: 'close' })}
            />
        </Fragment>
    )
}

export default Sidenav
