import Feedback from '../model/feedback.model.js'

export default{
    create
}

async function create(req, res, next){
    try{
      const { data } = req.body
      const feedback = new Feedback({ data: data })
      await feedback.save()
      res.status(303).location('/').end();
    }catch(error){
       throw error
    }
}
