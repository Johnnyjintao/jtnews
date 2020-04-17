var global = {
    user: {},//用户信息
    islogin:false,
    getQueryString: function (e) {
      let t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
        i = window.location.search.substr(1).match(t);
      return null != i ? unescape(i[2]) : null;
    },
    projectData:{}
  };



export default global
