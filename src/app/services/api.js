import { MainUrl } from './CommonService'
var currentyear=new Date().getFullYear()
/* authentication */
export const userlogin = "/public/user/login"
export const forgotpassword = "/public/user/forgotpassword"
export const resetPassword = "/public/user/resetpassword"

/* user management */
export const addUser = "/public/user/adduser"
export const getAllUserDetails = "/user/getalldetails"
export const getsingleUserDetails = "/user/getdetails/"
export const updateUser = "/user/update"
export const updateNewPassword = "/public/user/update"
export const deleteUser = "/user/delete/"

export const searchUserDetails = "/user/searchdetails"


/* Investment pipeline - lead */
export const createCompany = "/company/create"
export const updateCompany = "/company/update"
export const getSingleCompany = "/company/detailsbycompany/"
export const getAllCompanyDetails = "/company/getallcompanydetails"
export const deleteCompany = "/company/delete/"
export const companiesList="/orgdboard/revenueonequarter"

export const searchCompany = "/company/search"


/* Investment pipeline - pipeline management */
export const createplmnt = "/plmnt/create"
export const updateplmnt = "/plmnt/update"
export const getSingleplmnt = "/plmnt/view/"
export const getallplmnt = "/plmnt/details"
export const deleteplmnt = "/plmnt/delete/"

export const searchplmnt = "/plmnt/search"
export const plmntApprove = "/plmnt/approve"
export const plmntDecline = "/plmnt/decline"
export const plmntUpload = "/plmnt/upload"
export const getonboardcmp = "/plmnt/getonboardcmp"


/* organization */
export const createOrg = "/organization/create"
export const assignOrgToCompany = "/organization/"
export const getOrgDetails = "/organization/getorganizationdetails"


/*  COMMERCIAL AND BOSINESS DASHBOARD */
export const createCommBusiness = "/commbusiness/create"
export const getAllCommBusinessInfo = "/commbusiness/getallinfo"
export const deleteCommBusiness = "/commbusiness/delete/"
export const getCommBusinessInfo = "/commbusiness/getinfo/"
export const searchCommBusiness = "/commbusiness/search?year="+currentyear

export const searchTotalSalesDash = "/product/totalsalesdashboard?year="
export const searchProductPerformanceDash = "/product/searchdashboard?year="
export const searchQuarterlySalesDash = "/product/quarterlysales?year="
export const searchRevenueBudgetDash = "/product/revenuedashboard?year="

/* Technology */
export const getSingleTechnology = "/technology/getById?technologyid="
export const deleteTechnology = "/technology/delete?technologyid="
export const getTechnologyByYQM = "/technology?"
export const getCostOfService = "/COSGRAPH?"
export const getCostOfServiceHighest = "/highestgraphcos?"
export const getCostOfExpenditureHighest = "/highestcapitalexpenditures?"
export const getCapitalExpendituresGraph = "/capitalexpenditurs"
export const getCosHighestgraph = "/highestgraphcos"
export const getCapexHighestgraph = "/highestcapitalexpenditures"

// Create Conversion
export const createconversion = "/conversion/create"
export const getConversionValueAPI = "/conversion/getId"
export const getConversionAPI = "/conversion"

/*  Finance  */
export const createFinance = "/finance/create"
export const getAllFinanceDetails = "/finance/getallfinancedetails"
export const updateFinance = "/finance/update"
export const deleteFinance = "/finance/delete/"
export const getFinanceYQM = "/finance?year="
export const getFinanceByCompanyId = "/getincomestatements?companyId="
export const getCashYTDGraph = "/cashytdgraph?year="
export const getEbidtaYTDGraph = "/ebidtagraph?year="
export const getBalancesheetById = "/balancesheet/balancesheetvalues"
export const getCreditDebitValues = "/balancesheet/creditdebitvalues"
export const getebitdaMargin = "/balancesheet/ebitdamargin"

/*  SHAREHOLDER DASHBOARD */
export const createBoardmember = "/boardmember/create"
export const getAllBoardmember = "/boardmember/findall/"
export const getSingleBoardmember = "/boardmember/find/"
export const deleteBoardmember = "/boardmember/delete/"
export const deleteSingleDocument ='/documents/delete/'
export const createSchedule = "/schedule/create"
export const getAllSchedule = "/schedule/find"
export const createIssue = "/issue/create"
export const uploadBoardDocuments ="/documents/upload"
export const searchBoardDocuments ="/documents/search"
export const updateBoardMemberDetails ='/boardmember/update'
    // ORGANIZATION SHAREHOLDER DASHBOARD
export const UploadOrgValuationReport = "/valuation/save"
export const getOrgValauationReports = "/valuation/search"
export const getOrgCompaniesList='/valuation/findCompanyNames'

/* News and Social Media */
export const createSocialMedia = "/socialmedia/create"

export const getSocialMediaFollowers = "/socialmediafollowers"
export const getSocialMediaExposure = "/socialmediaexposure"
export const getSocialMediaTrafichannel = "/socialmediatrafichannel"
export const getSocialMediaSentiment = "/socialmediasentiment"
export const getSocialMediaTopsources = "/socialmediasource"
export const getHeatMap = "socialmedia/heatmap"

/* PEOPLE & CULTURE */
export const getPeopleDetails = "/people/details/"
export const getPeopleByGender = "/people/bygender"
export const getPeopleByDepart = "/people/department"
export const getPeopleByAge = "/people/age"
export const getAverageRenuemeration = "/people/averagerenuemeration"

export const getAllEmployeeDetails = '/employee/alldetails/'
export const getpeopledetailsinfo ='/employeebycompay/getall'


/* Risk  */
export const getRiskHeatMapdata = "/risks/getheatmap"
export const getByTypecategory = "/risks/getbycategorylevel"
export const getRiskByCategory = "/risks/getbycategoryperc"
export const getRiskByRating = "/risks/getbydeptcategory"
export const getstratagicObjetive ="/risks/getobjectives"
export const getControlsEffectiveness ="risks/getcontrols"
export const getTrafficChannel ="risks/getkeyrisks"


/* COMPANY LEVEL  DASHBOARD */
export const getYTDrevenue = "/companydboard/getytdvalues"
export const getProdSplitValues = "/companydboard/getprodsplitvalues"
export const getCostGraph = "/companydboard/costgraph"
export const getCountriesGraph = "/countries"
export const getEBITDAvalues = "/companydboard/getEBITDAvalues"
export const getRevenueGraphQuarterly = "/companydboard/revenue"

/* ORGANIZATION LEVEL DASHBOARD  */
/* export const getRevenuequarter="/orgdboard/revenuequarter" */
export const getRevenuequarter = "/orgdboard/revenue"
export const getEbitdaquarter = "/orgdboard/Ebitdaquarter"
export const getEbitdaPerQuarter = "/orgdboard/Ebitdaquarter"

export const getNewsandSocialmedia = "/getnewsarticles"
export const getSocialmediaHeatmap = "/socialmedia/heatmap"
export const getrevenueonequarter = "/orgdboard/revenueonequarter"
export const getRevenuePerQuarter = "/orgdboard/revenuequarter"
export const getrevenueBycompanyId = "/orgdboard/revenue"

/* EXCEL SHEET UPLOAD DOCS API’S */

export const uploadFileCommercialProduct = "/file/save"
export const uploadFileFinance = "/uploadfile/finance"
export const uploadFileTechnology = "/uploadfile/technology"
export const uploadFileSocialmedia = "/uploadfile/socialmedia"
export const uploadFilepeople = "/people/uploadfile"
export const uploadEmployeesList = "/employee/uploadfile"
export const uploadRisks = "/risks/upload "
export const reportsSearch="/reports/search"
export const getdocumentsAll = "/documents/getall"
export const uploadBoardDocs = "/documents/upload"
export const getBoardDocuments = "/documents/findbycomp"
export const uploadshareholderdocs = "/shareholderdocs/upload"
export const getshareholderdocs = "/shareholderdocs/findbycomp"
export const deletedocumentfile ="/reports/delete/"
export const deletedsubfileocumentfile ="/deletsubfile/"
export const reportsUploadArbitary ="/reports/upload"
export const foldersearch ='/findfolder'
// valuation
export const valuation ="/valuation"
export const getvaluation ="/getvaluation"
export const getInvestmentOverview ="/getvalutionorglevel"
export const getThisyearInvestment ="getvaluationyear"
export const createValuation ="valuation"
export const shareholderRepoTable ="/valuation/getOrgLevelValuation"
export const getValuationEquityValue ="equityvalue/search"
export const getValuationAssetCoverRatio ="/coverratio/search"
