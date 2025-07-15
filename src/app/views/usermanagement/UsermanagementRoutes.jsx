import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Usermanagement = Loadable(lazy(() => import("./Usermanagement")));
const Usermanagementadd = Loadable(lazy(() => import("./Usermanagementadd")));
const Usermanagementview = Loadable(lazy(() => import("./Usermanagementview")));

const usermanagementRoutes = [
    {
        path: '/usermanagement',
        element: <Usermanagement />,
    },
    {
        path: '/usermanagement/add',
        element: <Usermanagementadd />,
    },
    {
        path: '/usermanagement/update/:userid',
        element: <Usermanagementadd />,
    },
    {
        path: '/usermanagement/view/:userid',
        element: <Usermanagementview />,
    },
    {
        path: 'user/:myprofile/:userid',
        element: <Usermanagementview />,
    },
]

export default usermanagementRoutes
