const bcrypt = require('bcrypt-nodejs')
const { use } = require('passport')

module.exports = app => {
  const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation
  
  const encryptPassword = password =>{
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
  
    const save = async (req, res) => {
        const user = {...req.body}

        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.StartsWith('/users')) user.perfil="motorista"
        if(!req.user || !(req.user.perfil == "admin")) user.perfil = "motorista"

        try{
            existsOrError(user.name, "Nome não informado")
            existsOrError(user.email, "E-mail não informado")
            existsOrError(user.password, "Senha não informada")
            existsOrError(user.confirmPassword, "Confirmação de senha invalida")
            equalsOrError(user.password,user.confirmPassword,"Senhas não conferem")

            const userFromDB = await app.db('users')
                .where({email: user.email}).first()

            if(!user.id){
                notExistsOrError(userFromDB,'Usuario ja cadastrado')
            }
        }catch(msg){
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id){
            app.db('users')
                .update(user)
                .where({id:user.id})
                .then(_=>res.status(204).send())
                .catch(err =>res.status(500).send(err))
        }else{
            app.db('users')
                .insert(user)
                .then(_=> res.status(204).send())
                .catch(err=>res.status(500).send(err))
        }
    }

    const get =(req,res) =>{
        app.db('users')
            .select('id','name','email','perfil')
            .then(users =>res.json(users))
            .catch(err =>res.status(500).send(err))
    }

    const getById = (req, res) =>{
        app.db('users')
            .select('id','name','email','perfil')
            .where({id:req.params.id})
            .first()
            .then(produtos =>res.json(produtos))
            .catch(err =>res.status(500).send(err))
    }

    const remove = async (req, res) =>{
        try{
            const historico = await app.db('historicos')
                                .where({idUsuario:req.params.id})
                            notExistsOrError(historico,"Usuario possui historicos associados")

            const rowsUpdated = await app.db('users')
                            .update({deletedAt:new Date()})
                            .where({id:req.params.id})
       
            existsOrError(rowsUpdated, "Usuario não foi encontrado.")
            res.status(204).send()
       
        }catch(msg){
            res.status(400).send(msg)
        }
    }
    
    return { save,get,getById,remove }
}