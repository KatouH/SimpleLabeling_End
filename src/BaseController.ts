export default class BaseController {
    send(msg="successs",data:any){
        return {
            code:'200',
            msg:msg,
            data:data
        }
    }
    error(code=0,msg="ERROR",data:any){
        return {
            code:600+code,
            msg:msg,
            data:data
        }
    }
}