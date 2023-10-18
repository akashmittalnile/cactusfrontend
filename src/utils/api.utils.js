exports.api = {
    login: `auth/admin/login`,
    Notification: `admin/notification`,
    ClearNotification: `admin/clear/notification`,
    Dashboard: `admin/dashboard`,
    UserManagerGraphData: `admin/user/dashboard`,
    AllUser: `admin/users`,
    UserDetails: `admin/user/id/`,
    UserOrderList: `admin/user/orders/id/`,
    UserClubList: `admin/user/club/id/`,
    UserOrderDetails: `admin/order/id/`,
    UserStatusChange: `admin/user-status/id/`,
    ManagerApproval: `admin/switch/user/status`,
    AllManager: `admin/managers`,
    ManagerClub: `admin/manager/club/id/`,
    AllClub: `admin/clubs`,
    ClubDetails: `admin/club/id/`,
    ClubOrderList: `admin/club/orders/id/`,
    ClubProposalList: `admin/club/proposal/id/`,
    ClubProposalVotes: `admin/proposal/votes/id/`,
    ClubProposalDetails: `admin/proposal/id/`,
    UserLeaderboard: `admin/boards`,
    ManagerLeaderboard: `admin/manager/boards`,
    TwelveDataStock: `https://api.twelvedata.com/stocks`,
    TwelveDataPrice: `https://api.twelvedata.com/price`,
    CreatePage: `admin/page`,
    GetPageDetails: `admin/page/id/`,
    DeletePage: `admin/post/id/`,
    UpdatePage: `admin/page/id/`,
    GetAllPages: `admin/page?post_type=page`,
    AllUserClub: `admin/user/clubs`,
    AllManagerClub: `admin/manager/clubs`,
    CreateCrate: `admin/crates`,
    AllCrate: `admin/crates`,
    DeleteCrate: `admin/crates/id/`,
    CrateDetails: `admin/crates/id/`,
    CrateShareDetails: `admin/crates/shares/id/`,
    EditCrateDetails: `admin/crates/id/`,
    CrateStockList: `admin/crates/shares/id/`,
    CrateStockDetails: `admin/crate-share/id/`,
    ClubShareUser: `club/share/id/`,
    ClubShareManager: `manager/club/share/id/`,
    DeleteCrateStock: `admin/crate-share/id/`,
    AddCrateStock: `admin/crate-share`,
    CreateNews: `admin/news`,
    NewsDetails: `admin/page/id/`,
    AllNews: `admin/page?post_type=news`,
    DeleteNews: `admin/post/id/`,
    UpdateNews: `admin/news/id/`,
    TransactionStatement: `admin/statement`,
    Portfolio: `admin/portfolio/id/`,
};