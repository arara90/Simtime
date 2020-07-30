export const setCookie = (name, value, exp) => {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    };
    

export const getCookie = name => {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
    };

// export const deleteCookie = name => {
//         // document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//         document.cookie = name + '=' + value + ';expires=-1';
//       }
        
 
