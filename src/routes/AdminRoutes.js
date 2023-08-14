import { AdminLayout } from "../layouts/admin/AdminLayout";
import Dashboard from "../views/admin/dashboard/Dashboard";
import User from "../views/admin/user/User";
import Manager from "../views/admin/manager/Manager";
import Club from "../views/admin/club/Club";
import CactusCrates from "../views/admin/crates/CactusCrates";
import LeaderBoard from "../views/admin/leaderboard/LeaderBoard";
import News from "../views/admin/news/News";
import ApprovedUser from "../views/admin/user/ApprovedUser";
import ApprovedManager from "../views/admin/manager/ApprovedManager";
import ClubDetails from "../views/admin/club/ClubDetails";
import Proposal from "../views/admin/club/Proposal";
import TradeHistory from "../views/admin/club/TradeHistory";
import CactusCrateList from "../views/admin/crates/CactusCrateList";
import CreateCactusCrates from "../views/admin/crates/CreateCactusCrates";
import EditCrates from "../views/admin/crates/EditCrates";
import EditCactusCrates from "../views/admin/crates/EditCactusCrates";
import CreateNews from "../views/admin/news/CreateNews";
import EditNews from "../views/admin/news/EditNews";
import ViewNews from "../views/admin/news/ViewNews";
import UserDetails from "../views/admin/user/UserDetails";
import ManagerDetails from "../views/admin/manager/ManagerDetails";
import ManagerClubDetails from "../views/admin/manager/ManagerClubDetails";
import ViewClub from "../views/admin/club/ViewClub";
import Pages from "../views/admin/pages/Pages";
import CreatePages from "../views/admin/pages/CreatePages";
import ProposalDetails from "../views/admin/club/ProposalDetails";
import UserOrderDetails from "../views/admin/user/UserOrderDetails";
import UpdatePage from "../views/admin/pages/UpdatePage";
import TransactionState from "../views/admin/manager/TransactionState";
import TransactionStatement from "../views/admin/transaction/TransactionStatement";


var AdminRoutes = [
    {
        path: "/dashboard",
        layout: AdminLayout,
        component: Dashboard
    },
    {
        path: "/users",
        layout: AdminLayout,
        component: User,
    },
    {
        path: "/user-details/:id",
        layout: AdminLayout,
        component: UserDetails,
    },
    {
        path: "/user/order-details/:id",
        layout: AdminLayout,
        component: UserOrderDetails,
    },
    {
        path: "/view-clubs",
        layout: AdminLayout,
        component: ViewClub,
    },
    {
        path: "/approved-user-profile",
        layout: AdminLayout,
        component: ApprovedUser,
    },
    {
        path: "/manager",
        layout: AdminLayout,
        component: Manager,
    },
    {
        path: "/manager-details/:id",
        layout: AdminLayout,
        component: ManagerDetails,
    },
    {
        path: "/manager-club-details",
        layout: AdminLayout,
        component: ManagerClubDetails,
    },
    {
        path: "/approved-manager-profile",
        layout: AdminLayout,
        component: ApprovedManager
    },
    {
        path: "/clubs",
        layout: AdminLayout,
        component: Club
    },
    {
        path: '/club-details/:id/:type',
        layout: AdminLayout,
        component: ClubDetails
    },
    {
        path: "/club-proposals/:id",
        layout: AdminLayout,
        component: Proposal
    },
    {
        path: "/club/proposal-details/:id",
        layout: AdminLayout,
        component: ProposalDetails
    },
    {
        path: "/club-trade-history/:id",
        layout: AdminLayout,
        component: TradeHistory
    },
    {
        path: "/cactus-crates",
        layout: AdminLayout,
        component: CactusCrates
    },
    {
        path: "/cactus-crates-list/:id",
        layout: AdminLayout,
        component: CactusCrateList
    },
    {
        path: "/edit-crates",
        layout: AdminLayout,
        component: EditCrates
    },
    {
        path: "/cactus-crates-create",
        layout: AdminLayout,
        component: CreateCactusCrates
    },
    {
        path: "/cactus-crates-edit/:id",
        layout: AdminLayout,
        component: EditCactusCrates
    },
    {
        path: "/leaderboard",
        layout: AdminLayout,
        component: LeaderBoard
    },
    {
        path: "/news",
        layout: AdminLayout,
        component: News
    },
    {
        path: "/create-news",
        layout: AdminLayout,
        component: CreateNews
    },
    {
        path: "/edit-news/:id",
        layout: AdminLayout,
        component: EditNews
    },
    {
        path: "/view-news/:id",
        layout: AdminLayout,
        component: ViewNews
    },
    {
        path: "/pages",
        layout: AdminLayout,
        component: Pages
    },
    {
        path: "/create-page",
        layout: AdminLayout,
        component: CreatePages
    },
    {
        path: "/edit-page/:id",
        layout: AdminLayout,
        component: UpdatePage
    },
    {
        path: "/transaction-statement/:id",
        layout: AdminLayout,
        component: TransactionState
    },
    {
        path: "/transaction-statement",
        layout: AdminLayout,
        component: TransactionStatement
    },
];

export default AdminRoutes;