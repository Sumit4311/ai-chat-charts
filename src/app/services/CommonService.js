import axios from 'axios'

// export const  BaseUrl ="http://solcon-dev.us-east-1.elasticbeanstalk.com";

// export const BaseUrl = "http://solcontest-env.eba-xsxrdzwc.us-east-1.elasticbeanstalk.com";
// export const BaseUrl = "http://solcondev-env.us-east-1.elasticbeanstalk.com"; //backend server
//export const BaseUrl = "http://solcontestbackend-env.us-east-2.elasticbeanstalk.com" //dev server
// export const BaseUrl="https://platformsolconcapital.us-east-1.elasticbeanstalk.com" //new backend
 export const BaseUrl="https://api-platform.solcon.capital" //prod server
let BASE_URL = BaseUrl + '/api/v1'
let BASE_URL2 = BaseUrl + '/api1/v1'
export const MainUrl = BaseUrl + '/api/v1'
export const organisationId = 'bdbe2579-8772-44a8-8da8-366b8925c0e7'


// let BASE_URL='http://localhost/Davininfo'
// call the api (GET) endpoint internal system
// const headers = {
//     'Content-Type': 'text/plain'
// };

var accessToken = localStorage.getItem('accessToken')
accessToken = accessToken ? accessToken : ''

export const getDataFromApi = (getUrl, token = '', is_api1 = '', data = '') => {
    // console.log('getUrl,token,is_api1,data', localStorage.getItem('accessToken'));
    getUrl =
        getUrl.indexOf('mocky') !== -1
            ? getUrl
            : getUrl.startsWith('/')
                ? `${is_api1 ? BASE_URL2 : BASE_URL}${getUrl}`
                : `${BASE_URL}/${getUrl}`
    // var config = {
    //     method: 'get',
    //     url: getUrl,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept-Encoding' : 'gzip, deflate, br',
    //         'Accept': '*/*'
    //     }
    // }
    // var config = {
    //     method: 'get',
    //     url: 'http://staffingportaldev-env.eba-3h7ey5cf.us-east-1.elasticbeanstalk.com/api1/v1/people/details?companyId=2d2c9dac-647c-4e6e-b5b5-73b7b8050d1b',
    //     headers: {
    //       'Content-Type': 'Application/json'
    //     }
    //   };
    var config = {
        method: 'get',
        url: getUrl,
    }
    if (token && localStorage.getItem('accessToken')) {
        if (data) {
            config['data'] = data;
            config['headers'] = {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'Application/json',
            }
        } else {
            config['headers'] = {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            }
        }

    }
    // const resp = axios(config)
    if (data) {
        // config['data']=data
    }
    const resp = axios(config)
        .then(res => {
            return res
            
        })
        .catch(err => {
            console.log('Error', err)
            return {status:err.response.status}
        })
    // const resp = axios.get(getUrl,'')
    /* .then(res => {
        return res
    })
    .catch(err => {
        console.log('Error', err)
    }) */
    return resp
}

// call the api (PUT) endpoint internal system
export const putDataFromApi = (putUrl, model, token = '', is_api1 = '') => {
    putUrl = putUrl.startsWith('/')
        ? `${is_api1 ? BASE_URL2 : BASE_URL}${putUrl}`
        : `${BASE_URL}/${putUrl}`

    var config = {
        method: 'put',
        url: putUrl,
        data: model,
    }
    if (token && localStorage.getItem('accessToken')) {
        config['headers'] = {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        }
    }

    const resp = axios(config)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log('Error', err)
        })
    return resp
}

// call the api (POST) endpoint internal system
export const postDataFromApi = async (postUrl, model, token = '', is_api1 = '', is_formdata = "") => {
    // const headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // };
    postUrl = postUrl.startsWith('/')
        ? `${is_api1 ? BASE_URL2 : BASE_URL}${postUrl}`
        : `${BASE_URL}/${postUrl}`

    var config = {
        method: 'post',
        url: postUrl,
        data: model,
    }
    if (token && localStorage.getItem('accessToken')) {
        config['headers'] = {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),

        }
    }
    if (is_formdata) {
        config['headers']['Content-Type'] = 'multipart/form-data'
    }

    const resp = axios(config)
        .then(res => {
            return res
        })
        .catch(err => {
            // (resp.data.message)
            console.log(err)
            return err
        })
    return resp
}

// call the api (DELETE) endpoint internal system
export const deleteDataFromApi = (deleteUrl, model, token = '', is_api1 = '') => {
    deleteUrl = deleteUrl.startsWith('/')
        ? `${is_api1 ? BASE_URL2 : BASE_URL}${deleteUrl}`
        : `${BASE_URL}/${deleteUrl}`
    var config = {
        method: 'delete',
        url: deleteUrl,
        data: model,
    }
    if (token && localStorage.getItem('accessToken')) {
        config['headers'] = {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        }
    }
    const resp = axios(config)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log('Error', err)
        })
    return resp
}
