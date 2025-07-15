import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Companydashboard = Loadable(lazy(() => import("./Companydashboard")));
const Commercialbusiness = Loadable(lazy(() => import("./Commercialbusiness")));
const Finance = Loadable(lazy(() => import("./Finance")));
const Peopleandculture = Loadable(lazy(() => import("./Peopleandculture")));
const Technology = Loadable(lazy(() => import("./Technology")));
const Opex = Loadable(lazy(() => import("./Opex")));

const Shareholderrepository = Loadable(lazy(() => import("./Shareholderrepository")));
const Newsandsocialmedia = Loadable(lazy(() => import("./Newsandsocialmedia")));
const Risk = Loadable(lazy(() => import("./Risk")));
const Valuation = Loadable(lazy(() => import("./Valuation")))
const Companylist = Loadable(lazy(() => import("./Companylist")));
const ESG = Loadable(lazy(() => import("./ESG")));
const RegulatoryCompliance = Loadable(lazy(() => import("./RegulatoryCompliance")));

const companylistsRoutes = [
    {
        path: '/companylists/companydashboard/:companyId',
        element: <Companydashboard />,
    },
    {
        path: '/companylists/dashboard/commercialandbusiness/:companyId',
        element: <Commercialbusiness />,
    },
    {
        path: '/companylists/dashboard/finance/:companyId',
        element: <Finance />,
    },
    {
        path: '/companylists/dashboard/peopleandculture/:companyId',
        element: <Peopleandculture />,
    },
    {
        path: '/companylists/dashboard/technology/:companyId',
        element: <Technology />,
    },
    {
        path: '/companylists/dashboard/opex/:companyId',
        element: <Opex />,
    },
    {
        path: '/companylists/dashboard/shareholderrepository/:companyId',
        element: <Shareholderrepository />,
    },
    {
        path: '/companylists/dashboard/others/newsandsocialmedia/:companyId',
        element: <Newsandsocialmedia />,
    },
    {
        path: '/companylists/dashboard/others/risk/:companyId',
        element: <Risk />,
    },
    {
        path: '/companylists/dashboard/others/valuation/:companyId',
        element: <Valuation />,
    },
    {
        path: '/companylists/dashboard/others/esg/:companyId',
        element: <ESG />,
    },
    {
        path: '/companylists/dashboard/others/regulatorycompliance/:companyId',
        element: <RegulatoryCompliance />,
    },
    {
        path: '/companylist',
        element: <Companylist />,
    },
    
]

export default companylistsRoutes
