import xlsxgreen from "../image/xlsxgreen.svg"
import pdf from "../image/pdf.svg"
import zip from "../image/zip.svg"
import zipFolder from '../image/zipFolder.svg'
import filepng from "../image/filepng.svg"
import WordNew from "../image/WordNew.svg"
import IMGNEW from "../image/IMGNEW.svg"
import pdfNew from "../image/pdfNew.svg"
import txtfile from "../image/txtfile.svg"
import PPTNew from "../image/PPTNew.svg"
import csvfile from "../image/csvfile.svg"
import { country_arr } from './countries'

var countryarray = []
country_arr.map((opt) => {
    var country = []
    country['id'] = opt
    country['label'] = opt
    countryarray.push(country)

})
export const countryOpt = countryarray

export const departmentopt = [
    { id: "Account", label: "Account" },
    { id: "Marketing", label: "Marketing" },
    { id: "Sales", label: "Sales" },
    { id: "Designing", label: "Designing" },
    { id: "Testing", label: "Testing" },
    { id: "Development", label: "Development" },
]

export const rolesopt = [
    { id: "Super Admin", label: "Super Admin" },
    { id: "Admin", label: "Admin" },
    { id: "Shareholder", label: "Shareholder" },
    { id: "Company Admin", label: "Company Admin" },
    { id: "Company User", label: "Company User" },
]


export const statusoptions = [
    { id: 1, label: "Complete" },
    { id: 2, label: "Screening" },
    { id: 3, label: "Review" },
]

export const managedByoptions = [
    { id: 1, label: "test" },
    { id: 2, label: "test1" },
    { id: 3, label: "test2" },
]

export const modulePermission = [
    { id: 1, role: "super admin", dashboard: "true", user: "true", documents: "true" },
    { id: 2, role: "Admin", dashboard: "true", user: "true", documents: "true" },
    { id: 3, role: "share holders", dashboard: "true", user: "false", documents: "false" },
    { id: 4, role: "Company Admin", dashboard: "true", user: "true", documents: "true" },
    { id: 5, role: "Company users", dashboard: "true", user: "false", documents: "true" },
]

export const leadPermission = [
    { id: 1, role: "super admin", createlead: "true", progress: "true" },
    { id: 2, role: "Admin", createlead: "true", progress: "true" },
    { id: 3, role: "share holders", createlead: "true", progress: "false" },
    { id: 4, role: "Company Admin", createlead: "true", progress: "true" },
    { id: 5, role: "Company users", createlead: "true", progress: "false" },
]

export const progressStageslist = [
    'Origination',
    'Teaser',
    'NDA',
    'Initial Information',
    'Exco Approval',
    'Internal Resource Allocation',
    'Initial IC Approval',
    'Due Diligence',
    'Draft Term sheet',
    'IC Term Sheet Approval',
    'Valuation & Terms Negotiations',
    'Terms Sheet Signoff',
    'CPs Met',
    'Final Agreement',
    'Sign Agreement',
    'Pay Away',
];
export const progressStages2 = [
    { id: 1, label: 'Origination' },
    { id: 2, label: 'NDA' },
    { id: 3, label: 'Addition to Pipeline' },
    { id: 4, label: 'Termsheet/EOI/NBO' },
    { id: 5, label: 'Due Dilligence' },
    { id: 6, label: 'Draft Agreements' },
    { id: 7, label: 'Pay Away' },
    { id: 8, label: 'Sign Agreement' },
]
export const progressStagesfunction = () => {
    const chartSteplists = [
        'Origination',
        'Initial Information',
        'Exco Approval',
        'Due Diligence',
        'Draft Term sheet',
        'Terms Sheet Signoff',
        'CPs Met',
        'Pay Away',
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        'Teaser',
        'NDA',
        'Internal Resource Allocation',
        'Initial IC Approval',
        'IC Term Sheet Approval',
        'Valuation And Terms Negotiations',
        'Final Agreement',
        'Sign Agreement',
    ];
    var chartsteplist = [];
    chartSteplists.map((list, i) => {
        var indexno = progressStageslist.indexOf(list)
        chartsteplist.push({
            id: indexno,
            label: list,
            isdown: indexno % 2 != 0 ? 1 : 0,
        })
    })
    return chartsteplist
}

export const progressStagesfunc = () => {
    var steplists = [
        'Origination',
        'Teaser',
        'Initial Information',
        'NDA',
        'Exco Approval',
        'Internal Resource Allocation',
        'Due Dilligence',
        'Initial IC Approval',
        'Draft Term sheet',
        'IC Term Sheet Approval',
        'Terms Sheet Signoff',
        'Valuation And Terms Negotiations',
        'CPs Met',
        'Final Agreement',
        'Pay Away',
        'Sign Agreement',
    ];
    var steplist = [];
    steplists.map((list, i) => {
        var indexno = progressStageslist.indexOf(list)
        steplist.push({
            id: indexno,
            label: list,
            isdown: indexno % 2 != 0 ? 1 : 0,
        })
    })
    return steplist
}

let minOffset = 0, maxOffset = 122;
let thisYear = (new Date()).getFullYear();
var newYearArray = []
for (let x = 0; x <= maxOffset; x++) {
    var year = { id: thisYear - x, label: "" + thisYear - x + "" }
    newYearArray.push(year)
}
export var yearopt = newYearArray;

const yearRanges = [];
for (let x = 0; x <= maxOffset; x++) {
    const startYear = thisYear - x;
    const endYear = startYear + 1;
    const yearRange = `${startYear}-${endYear}`;
    const year = { id: yearRange, label: yearRange };
    yearRanges.push(year);
}
export const financialYearopt = yearRanges;



export const quaterOpt = [
    { id: "Q1", label: 'Q1' },
    { id: "Q2", label: 'Q2' },
    { id: "Q3", label: 'Q3' },
    { id: "Q4", label: 'Q4' },
];

export const getProfile = (fname = "", lname = "") => {
    var name = ""
    var flater = ""
    var llater = "";
    if (lname == "") {
        var spname = fname.split(' ')
        lname = spname.length > 0 ? spname[1] : ''
        if (/^[a-zA-Z0-9]*$/.test(lname) == false) {
            lname = ""
        }
    }
    flater = fname ? fname.charAt(0) : "";
    llater = lname ? lname.charAt(0) : "";
    name = flater + '' + llater
    return name;
};
export const thousandsOf = (val) => {
    return "1000's of " + val;
};
// export const getFixed = (num) => {
//     // var  myNumber;
//     num = num ? num : 0
//     return Math.abs(num).toFixed(1)
// }
export const getCommas = (num) => {
    // var  myNumber;
    // num = num ? num : 0
    // if(num!==Math.floor(num)){
    //     num=num.toFixed(2)
    // }
    // return num.toLocaleString("en-US");
    num = num ? num : 0;
    return num.toLocaleString("en-US", {
        // minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

export const getFullMonths = () => {
    var months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December"];
    return months;
}
export const getSortMonths = () => {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months;
}

export const fullMonths = () => {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return months;
}

export const getCurrencyValue = () => {
    return localStorage.getItem('currencyValue') === "RAND" ? 'R' : '$'
}

export const getFileIcon = (filename = "", isfolder = '') => {
    if (isfolder || filename === null || filename === undefined) {
        return zipFolder
    }
    var ext = filename.split('.').pop();
    var trans = ext.toLowerCase()
    var trans = ext.split('?')[0]
    var imgtype = ['jpg', 'jpeg', 'png']
    var doctype = ['doc', 'docs', 'docx']

    if (trans == "pdf") {
        return pdfNew
    }
    else if (doctype.includes(trans)) {
        return WordNew
    }
    else if (trans == "zip") {
        return zipFolder
    }
    else if (imgtype.includes(trans)) {
        return IMGNEW
    }
    else if (trans == "ppt") {
        return PPTNew
    }
    else if (trans == "txt") {
        return txtfile

    }
    else if (trans == "csv") {
        return csvfile

    }
    else {
        return xlsxgreen
    }
}

export const getFileExtension = (filename = "") => {
    var ext = ''
    if (filename === null || filename === undefined) {
        return 'zip'
    }
    var ext = filename.split('.').pop();
    var trans = ext.toLowerCase()
    var trans = ext.split('?')[0]
    return trans;
}

export const getCurrenctQuarter = (year) => {
    var quar = 'Q4';
    if (year == thisYear) {
        var month = new Date().getMonth() + 1
        if (month <= 3) {
            quar = 'Q1'
        }
        else if (month <= 6) {
            quar = 'Q2'
        }
        else if (month <= 9) {
            quar = 'Q3'
        }
        else {
            quar = 'Q4'
        }
    }
    else if (year > thisYear) {
        quar = 'Q'
    }
    return quar
}
export const formatdecimals = (amount) => {
    return amount % 1 !== 0 ? amount?.toFixed(2) : amount;
}

export const formatNumbers = (numbers) => {
    return numbers.map((number) => {
        const [integerPart, decimalPart] = number.split('.');
        const formattedDecimal = decimalPart ? `.${decimalPart.slice(0, 2)}` : '';
        return `${integerPart}${formattedDecimal}`;
    });
}

export const DataFormater = (number) => {
    if (number >= 1000000000) {
        return (number / 1000000000) +' '+ 'B'
    } else if (number >= 1000000) {
        return (number / 1000000) + ' '+'M'
    } else if (number >= 1000) {
        return (number / 1000) + ' '+'K'
    } else {
        return number;
    }
};
export const formatValueWithCurrency = (value, currency) => {
    const formattedValue = value < 0 ? "-" + DataFormater(Math.abs(value)) : DataFormater(value);
    return   (currency   + ' '+formattedValue) ;
}

export const getChartItemStyle = (value) => ({
    itemStyle: {
        color: value >= 0 ? 'green' : 'red',
    },
});
export const getColorPink = (value) => {
    return value < 0 ? 'red' : '#D43F8D';
};

export const getColorSkyBlue = (value) => {
    return value < 0 ? 'red' : '#2F8CD8';
};