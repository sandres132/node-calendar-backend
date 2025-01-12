const moment = require("moment")

const isDate = ( value, { req, location, path } ) => {

    if ( !value ) return false;

    if ( value < 0 ) return false;
    
    const fecha = moment( value );

    if( fecha.isValid() ){
        return true;
    }else {
        return false;
    }

}

module.exports = {
    isDate
}