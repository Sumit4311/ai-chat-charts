import React, { Fragment, useEffect, useState } from 'react'
import Scrollbar from 'react-perfect-scrollbar'
import { navigations } from 'app/navigations'
import { MatxVerticalNav } from 'app/components'
import useSettings from 'app/hooks/useSettings'
import { styled } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import { postDataFromApi, getDataFromApi, putDataFromApi } from '../../services/CommonService';
import { getonboardcmp } from '../../services/api';
import NotFound from 'app/views/sessions/NotFound'
import { useLocation } from 'react-router-dom'
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
    const location = useLocation();

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
        const companylistmenu = []
        companies.map((companyList, index) => {
            {
                companylistmenu.push({
                    name: companyList.companyName,
                    iconText: 'SI',
                    secondlevelmenu: 'true',
                    path: '/companylists/companydashboard/' + companyList.id,
                    companyid: companyList.id,
                    //comment this if no need to restrict menu for perticular company
                    isCompany: 1,
                    //End
                    children: [
                        // {
                        //     name: 'Commercial & Business',
                        //     iconText: 'SI',
                        //     path: '/companylists/dashboard/commercialandbusiness/' + companyList.id,
                        // },
                        // {
                        //     name: 'Finance',
                        //     iconText: 'SI',
                        //     path: '/companylists/dashboard/finance/' + companyList.id,
                        // },
                        // {
                        //     name: 'People & Culture',
                        //     iconText: 'SI',
                        //     path: '/companylists/dashboard/peopleandculture/' + companyList.id,
                        // },
                        // {
                        //     name: 'Technology',
                        //     iconText: 'SI',
                        //     path: '/companylists/dashboard/technology/' + companyList.id,
                        // },
                        // {
                        //     name: 'Opex',
                        //     iconText: 'SI',
                        //     path: '/companylists/dashboard/opex/' + companyList.id,
                        // },
                        // {
                        //     name: 'Shareholder Repository',
                        //     iconText: 'SI',
                        //     path: '/companylists/dashboard/shareholderrepository/' + companyList.id,
                        // },
                        // {
                        //     name: 'Others',
                        //     iconText: 'SI',
                        //     openinpoup: 1,
                        //     mainMenu: companyList.companyName,
                        //     children: [
                        //         {
                        //             name: 'Regulatory & Compliance',
                        //             iconText: 'SI',
                        //             path: '/companylists/dashboard/others/regulatorycompliance/' + companyList.id,
                        //             othersMenulink: 'true',
                        //         },
                        //         {
                        //             name: 'ESG',
                        //             iconText: 'SI',
                        //             path: '/companylists/dashboard/others/esg/' + companyList.id,
                        //             othersMenulink: 'true',
                        //         },
                        //         {
                        //             name: 'Risks',
                        //             iconText: 'SI',
                        //             path: '/companylists/dashboard/others/risk/' + companyList.id,
                        //             othersMenulink: 'true',
                        //         },
                        //         {
                        //             name: 'Valuation',
                        //             iconText: 'SI',
                        //             path: '/companylists/dashboard/others/valuation/' + companyList.id,
                        //             othersMenulink: 'true',
                        //         },
                        //         {
                        //             name: 'News & Social Media',
                        //             iconText: 'SI',
                        //             path: '/companylists/dashboard/others/newsandsocialmedia/' + companyList.id,
                        //             othersMenulink: 'true',
                        //         },
                        //     ],
                        // },
                    ],
                })
            }
        })
        var roles = user.user.roles
        roles = roles.toLowerCase().replace(/\s/g, '')
        var menus = [];
        var currentLocation = location.pathname;
        var companyid = "";
        if (currentLocation.includes('companylists')) {
            var sp = currentLocation.split('/');
            companyid = sp.pop();
        }
        var values = [];
        if (companyid) {
            values = await getListDetails(companyid, companylistmenu)
        }
        const updated = companylistmenu.map(item => {
            if (item.companyid === companyid) {
                return { ...item, children: values }
            } else {
                return item
            }
        })
        console.log(updated,"updated")
        if (roles) {
            if (roles === 'superadmin') {
                menus = [
                    {
                        name: 'Dashboard',
                        path: '/dashboard/default',
                        icon: 'dashboard',
                        toplevelmenu: 'true',
                        children: [
                            {
                                name: 'Valuation',
                                iconText: 'SI',
                                path: '/companylists/dashboard/shareholderrepository/:orgID',
                            },
                        ]
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
                            ...updated
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
                if (companylistmenu && companylistmenu?.length > 0) {
                    const companyId = companylistmenu[0]?.companyid
                    localStorage.setItem("selectedCompanyId", companyId)
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
                if (companylistmenu && companylistmenu.length > 0) {
                    const companyId = companylistmenu[0].companyid
                    localStorage.setItem("selectedCompanyId", companyId)
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

    const getListDetails = async (companyid, companylistmenu) => {
        console.log("insideeeee4444444");
        var mainmenulist = companylistmenu.filter((single) => {
            return single.companyid == companyid
        })
        var mainmenuname = ''
        if (mainmenulist.length > 0) {
            mainmenuname = mainmenulist[0].name
        }
        const response = await getDataFromApi(`getcategor?companyId=${companyid}`, 1, 1)
        var menuItems = [
            {
                name: 'Commercial & Business',
                iconText: 'SI',
                path: '/companylists/dashboard/commercialandbusiness/' + companyid,
            },
            {
                name: 'Finance',
                iconText: 'SI',
                path: '/companylists/dashboard/finance/' + companyid,
            },
            {
                name: 'People & Culture',
                iconText: 'SI',
                path: '/companylists/dashboard/peopleandculture/' + companyid,
            },
            {
                name: 'Technology',
                iconText: 'SI',
                path: '/companylists/dashboard/technology/' + companyid,
            },
            {
                name: 'Opex',
                iconText: 'SI',
                path: '/companylists/dashboard/opex/' + companyid,
            },
            {
                name: 'Shareholder Repository',
                iconText: 'SI',
                path: '/companylists/dashboard/shareholderrepository/' + companyid,
            },
        ]
        let dataItems = []
        if (response && response.data && Array.isArray(response.data)) {
            dataItems = menuItems.filter((menuItem) =>
                {
                    if(menuItem.name == "Shareholder Repository"){
                        return true
                    }
                    else
                     if(menuItem.name=="Technology" || menuItem.name=="Opex"){
                        if(response.data.includes('Technology') || response.data.includes('Opex')){
                            return true
                        }
                    }
                    else if(response.data.includes(menuItem.name)){
                        return true
                    }
                    return false
                }
            )
        }
        else {
            dataItems.push({
                name: 'Shareholder Repository',
                iconText: 'SI',
                path: '/companylists/dashboard/shareholderrepository/' + companyid,
            })
        }
        const othersMenuItems = [
            {
                name: 'Regulatory & Compliance',
                iconText: 'SI',
                path: '/companylists/dashboard/others/regulatorycompliance/' + companyid,
                othersMenulink: 'true',
            },
            {
                name: 'ESG',
                iconText: 'SI',
                path: '/companylists/dashboard/others/esg/' + companyid,
                othersMenulink: 'true',
            },
            {
                name: 'Risks',
                iconText: 'SI',
                path: '/companylists/dashboard/others/risk/' + companyid,
                othersMenulink: 'true',
            },
            {
                name: 'Valuation',
                iconText: 'SI',
                path: '/companylists/dashboard/others/valuation/' + companyid,
                othersMenulink: 'true',
            },
            {
                name: 'NewsAndSocialMedia',
                iconText: 'SI',
                path: '/companylists/dashboard/others/newsandsocialmedia/' + companyid,
                othersMenulink: 'true',
            },
        ];
        let hasOthersMenu = false;
        const filteredOthersMenuItems = othersMenuItems.filter((menuItem) => {
            if (menuItem.name == "Valuation") {
                hasOthersMenu = true;
                return true;
            }
            else if (response && response.data && Array.isArray(response.data)) {
                if (response.data.includes(menuItem.name.replace(/ /g, ''))) {
                    hasOthersMenu = true;
                    return true;
                }
            }
            return false;
        });

        if (hasOthersMenu) {
            dataItems.push({
                name: 'Others',
                iconText: 'SI',
                openinpoup: 1,
                mainMenu: mainmenuname,
                children: filteredOthersMenuItems,
            });
        }
        return dataItems
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
    async function getSubmenus(item) {
        console.log("insideeeee");
        var submenulist = []
        const response = await getDataFromApi(`getcategor?companyId=${item.companyid}`, 1, 1)
        var menuItems = [
            {
                name: 'Commercial & Business',
                iconText: 'SI',
                path: '/companylists/dashboard/commercialandbusiness/' + item.companyid,
            },
            {
                name: 'Finance',
                iconText: 'SI',
                path: '/companylists/dashboard/finance/' + item.companyid,
            },
            {
                name: 'People & Culture',
                iconText: 'SI',
                path: '/companylists/dashboard/peopleandculture/' + item.companyid,
            },
            {
                name: 'Technology',
                iconText: 'SI',
                path: '/companylists/dashboard/technology/' + item.companyid,
            },
            {
                name: 'Opex',
                iconText: 'SI',
                path: '/companylists/dashboard/opex/' + item.companyid,
            },
            {
                name: 'Shareholder Repository',
                iconText: 'SI',
                path: '/companylists/dashboard/shareholderrepository/' + item.companyid,
            },
        ]
        const othersMenuItems = [
            {
                name: 'Regulatory & Compliance',
                iconText: 'SI',
                path: '/companylists/dashboard/others/regulatorycompliance/' + item.companyid,
                othersMenulink: 'true',
            },
            {
                name: 'ESG',
                iconText: 'SI',
                path: '/companylists/dashboard/others/esg/' + item.companyid,
                othersMenulink: 'true',
            },
            {
                name: 'Risks',
                iconText: 'SI',
                path: '/companylists/dashboard/others/risk/' + item.companyid,
                othersMenulink: 'true',
            },
            {
                name: 'Valuation',
                iconText: 'SI',
                path: '/companylists/dashboard/others/valuation/' + item.companyid,
                othersMenulink: 'true',
            },
            {
                name: 'NewsAndSocialMedia',
                iconText: 'SI',
                path: '/companylists/dashboard/others/newsandsocialmedia/' + item.companyid,
                othersMenulink: 'true',
            },
        ];
        var newmenuItems = []
        if (response && response.data && Array.isArray(response.data)) {
            newmenuItems = menuItems.filter((menuItem) =>
                {
                    // return true
                    if(menuItem.name == "Shareholder Repository"){
                        return true
                    }
                    else if(menuItem.name=="Technology" || menuItem.name=="Opex"){
                        if(response.data.includes('Technology') || response.data.includes('Opex')){
                            return true
                        }
                    }
                    else if(response.data.includes(menuItem.name)){
                        return true
                    }
                    return false
                }
            )
        }
        else{
            newmenuItems.push({
                name: 'Shareholder Repository',
                iconText: 'SI',
                path: '/companylists/dashboard/shareholderrepository/' + item.companyid,
            })
        }
        let hasOthersMenu = false;
        const filteredOthersMenuItems = othersMenuItems.filter((menuItem) => {
            // hasOthersMenu = true;
            // return true
            if (menuItem.name == "Shareholder Repository") {
                hasOthersMenu = true;
                return true;
            }
            else if (response && response.data && Array.isArray(response.data)) {
                if (response.data.includes(menuItem.name.replace(/ /g, ''))) {
                    hasOthersMenu = true;
                    return true;
                }
            }
            return false;
        });

        if (hasOthersMenu) {
            newmenuItems.push({
                name: 'Others',
                iconText: 'SI',
                openinpoup: 1,
                mainMenu: item.name,
                children: filteredOthersMenuItems,
            });
        }
        var newcompanymenu = {
            name: item.name,
            iconText: 'SI',
            secondlevelmenu: 'true',
            path: '/companylists/companydashboard/' + item.companyid,
            companyid: item.companyid,
            children: newmenuItems,
        }
        var mapcomplete = false
        menulist.map((list, index) => {
            if (list.name == "Company Lists") {
                list.children.map((lst, i) => {
                    if (lst.companyid == item.companyid) {
                        lst = newcompanymenu
                    }
                    list.children[i] = lst
                })
            }
            if (menulist.length - 1 === index) {
                mapcomplete = true
            }
            submenulist.push(list)
        })
        //Comment this if no need to restrict menu for company
        if (mapcomplete) {
            setMenulist(submenulist)
        }
    }

    return (
        <Fragment>
            <StyledScrollBar options={{ suppressScrollX: true }} className='mysidebar' >
                <div className='mysidebar-div'>
                    {children}
                    {/* <MatxVerticalNav items={navigations} /> */}
                   <MatxVerticalNav items={menulist}
                        getSearchValue={getSearchValue}
                        getSubmenus={getSubmenus}
                    />
                </div>
            </StyledScrollBar>
            <SideNavMobile
                onClick={() => updateSidebarMode({ mode: 'close' })}
            />
        </Fragment>
    )
}
export default Sidenav
