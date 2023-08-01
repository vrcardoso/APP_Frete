module.exports = app =>{

    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value ==='string' && value.length === 0) throw msg
    
    }
    
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        }catch(msg) {
            return
        }
        throw msg;
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function numberOrError(value,msg) {
        if(isNaN(value)) throw msg
    }

    function dateOrError(value, msg) {
        if(new Date(value)=="Invalid Date") throw msg

    }

    return {existsOrError, notExistsOrError, equalsOrError, numberOrError, dateOrError}
}