import User from '../model/user.model.js'
import StatusCode from 'http-status-codes'

export default {
    getProfileById
}

async function getProfileById(req, res, next){
  try{
    const id = req.session.userInfo.id
    const user = await User.findById( id )
    res.send({
        profile: user
    })
  }catch(error){
    next(error)
  }
}