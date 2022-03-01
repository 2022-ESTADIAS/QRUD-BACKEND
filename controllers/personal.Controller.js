const {response} = require('express')
const Personal = require('../models/personal.Model')

const PersonalGet = (req,res = response)=>{

    const query = req.query

    res.json({
        ok: true,
        msg: 'QRUD API',
        query
    })
}
const PersonalPost = async(req,res = response)=>{
    
    const body = req.body
    const personal = new Personal(body)

    await personal.save()
    
    res.json({
        msg: 'QRUD API POST controller',
        body,
        personal
    })
}


const PersonalPut = (req,res = response)=>{
    
    const id = req.params.id    
    res.json({
        msg: 'QRUD API POST controller',
        id
    })
}



module.exports = {
    PersonalGet,
    PersonalPost,
    PersonalPut
};
