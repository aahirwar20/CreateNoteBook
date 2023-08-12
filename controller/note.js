import Note from '../model/note.model.js'
import mailTranspoter from '../utils/mail.js'

export default {
  createNote,
  getAllNotes,
  getById,
  updateNote,
  deleteNote,
  sendNoteToMail
}

async function createNote(req, res, next){
    try{
      const {name, data} = req.body
      const note = new Note({
        userId: req.session.userInfo.id,
        name: name,
        data: data
      })
      const noteData = await note.save()
      res.redirect('/dashboard')
    }catch(error){
      throw error
    } 
}

async function getAllNotes(req, res, next){
    try{
      const id = req.session.userInfo.id
      const notes = await Note.find({userId : id})
      const notesData = notes.map((note)=>{
        return {
          noteId: note._id,
          name: note.name,
          data: note.data
        } 
      })
      res.send({
        notes : notesData
      })
    }catch(error){
        throw error
    }
}

async function getById(req, res, next){
    try{
       const id  = req.param.id
       const note = await Note.findById(id)
       res.render('Notepage.ejs',{ note: note }) 
    }catch(error){
        throw error
    }
}

async function updateNote(req, res, next){
    try{
      const {id, name, data} = req.body
      const note = await Note.findById(id)
      if (!note) {
        return res.status(404).send('Note not found');
      }
      note.name = name
      note.data = data
      await note.save()
      res.status(303).location('/dashboard').end();
    }catch(error){
        throw error
    }
}

async function deleteNote(req, res, next){
    try{
       const id  = req.param.id
       await Note.findByIdAndRemove(id)
       res.redirect('/dashboard')
    }catch(error){
        throw error
    }
}

async function sendNoteToMail(req, res, next){
    try{
        const { to_mail } = req.body
        const mailDetails={
         from:"ankitahirwarvinod2@gmail.com",
         to: to_mail,
         subject:"creative notebook",
         text:"It is from creative notebook"+qu.name+' '+qu.data+' ',
        }
        mailTranspoter.sendMail(mailDetails,function(err,data){
         if(err){throw err;}
         else{console.log("email sent succefully")}
       });
       res.send('email sent succefully');
    }catch(error){
        next(error)
    }
}
