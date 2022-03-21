const PwdRgx = (passwd) =>{
    

        const regexPwd = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        
        return regexPwd.test(passwd)     


}


const rfcRgx = (rfc)=>{

    const regexRFC = /^[ña-z]{3,4}[0-9]{6}[0-9a-z]{3}$/i
    
    return regexRFC.test(rfc)
}

module.exports = {
    PwdRgx,
    rfcRgx
};
