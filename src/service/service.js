import {post}  from './index'

//也可以不需要
// const _baseUrl=process.env.API_URL;//这里我在项目配置文件里面设置了相对路径
//登录方法
const loginURL = `localhost:8089/login`;
export const  loginApi= function(json) {
    return post(loginURL,{"username":json.username,"passwd":json.password})
};
//修改账号信息RESTful
// const editAdminUrl = `${_baseUrl}api/admin/user/info`;
// export const editAdminListApi = function (id,json) {
//     return Vue.prototype.$put(`${editAdminUrl}/${id}`,json)
// };
//等等...
