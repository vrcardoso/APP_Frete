module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validation
    
      const save = async (req, res) => {
          const historico = {...req.body}
  
          if(req.params.id) historico.id = req.params.id
  
          try{

              existsOrError(historico.idFrete, "ID do frete não informado")
              const frete = await app.db('fretes')
              .where({id:historico.idFrete})
              .first()
              existsOrError(frete, 'Frete não encontrado')


              existsOrError(historico.idUsuario, "ID do usuario não informado")       
              const usuario = await app.db('users')
              .where({id:historico.idUsuario})
              .first()
              existsOrError(usuario, 'Usuario não encontrado')
  
          }catch(msg){
              return res.status(400).send(msg)
          }
  
          if(historico.id){
              app.db('historicos')
                  .update(historico)
                  .where({id:historico.id})
                  .then(_=>res.status(204).send())
                  .catch(err =>res.status(500).send(err))

              
          }else{
              app.db('historicos')
                  .insert(historico)
                  .then(_=> res.status(204).send())
                  .catch(err=>res.status(500).send(err))
          }
      }
  
     
      const get = async(req,res) =>{
          const limit = req.query.limit || 15
  
          const page = req.query.page || 1
  
          const result = await app.db('historicos').count('id').first()
  
          const count = parseInt(result["count(`id`)"])

          app.db('historicos')
              .limit(limit).offset((page * limit)-limit)
              .then(historicos =>res.json({data:historicos,count,limit}))
              .catch(err =>res.status(500).send(err))
      }
  
      const getById = (req, res) =>{
          app.db('historicos')
              .where({id:req.params.id})
              .first()
              .then(historicos =>res.json(historicos))
              .catch(err =>res.status(500).send(err))
  
  
      }
  
      const remove = async (req, res) =>{
          try{
  
              existsOrError(req.params.id,"Codigo do Produto não informado")
      
              const rowsDeleted = await app.db('historicos')
                  .where({id:req.params.id}).del()
              existsOrError(rowsDeleted, 'Produto não encontrado')
          
              res.status(204).send()
          
          }catch(msg){
              res.status(400).send(msg)
              
          }
      }

      const getByUser = async (req, res) =>{
        const limit = req.query.limit || 15
        const userId = [req.params.id]
        const page = req.query.page || 1
        
        app.db({h:"historicos",f:"fretes"})
            .select('h.id','f.nomeProduto','f.pesoProduto','f.nomeVeiculo','f.pesoVeiculo',
            'f.distancia','f.precoFrete','f.taxa','f.dataPostagem','f.status')
            .limit(limit).offset((page * limit)-limit)
            .whereRaw('??=??',['f.id','h.idFrete'])
            .whereIn('idUsuario',userId)
            .orderBy('h.id','desc')
            .then(historicos => res.json(historicos))
            .catch(err => res.status(500).send(err))
        }
  
      return { save,get, getById, remove, getByUser }
  }