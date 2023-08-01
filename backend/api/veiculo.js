module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validation
    
      const save = async (req, res) => {
          const veiculo = {...req.body}
  
          if(req.params.id) veiculo.id = req.params.id
  
          try{
              existsOrError(veiculo.name, "Nome não informado")
              existsOrError(veiculo.peso, "Peso não informado")
  
          }catch(msg){
              return res.status(400).send(msg)
          }
  
          if(veiculo.id){
              app.db('veiculos')
                  .update(veiculo)
                  .where({id:veiculo.id})
                  .then(_=>res.status(204).send())
                  .catch(err =>res.status(500).send(err))
  
              const fretes = await app.db('fretes')
                  .where({idVeiculo:req.params.id})
  
              if(fretes){
  
                  for(let frete of fretes){
                      var datahj= new Date()
                      var dataOntem = new Date(datahj.getDate()-1)
                      var datafrete = new Date(frete.dataPostagem)

                      if((datafrete > dataOntem) && (datafrete < datahj)){
                          frete.pesoVeiculo = veiculo.peso
                          app.db('fretes')
                              .update(frete)
                              .where({id:frete.id})
                              .then(_=>res.status(204).send())
                              .catch(err =>res.status(500).send(err))
                      }
      
                  }
              }
              
          }else{
              app.db('veiculos')
                  .insert(veiculo)
                  .then(_=> res.status(204).send())
                  .catch(err=>res.status(500).send(err))
          }
      }
  
     
      const get = async(req,res) =>{
          const limit = req.query.limit || 15
  
          const page = req.query.page || 1
  
          const result = await app.db('veiculos').count('id').first()
  
          const count = parseInt(result["count(`id`)"])
  
          app.db('veiculos')
              .limit(limit).offset((page * limit)-limit)
              .then(veiculo =>res.json({data:veiculo,count,limit}))
              .catch(err =>res.status(500).send(err))
      }
  
      const getById = (req, res) =>{
          app.db('veiculos')
              .where({id:req.params.id})
              .first()
              .then(veiculos =>res.json(veiculos))
              .catch(err =>res.status(500).send(err))
  
  
      }
  
      const remove = async (req, res) =>{
          try{
  
              existsOrError(req.params.id,"Codigo do Veiculo não informado")
      
              const frete = await app.db('fretes')
                  .where({idVeiculo:req.params.id})
      
              notExistsOrError(frete,'Veiculo Possui fretes vinculados')
      
              const rowsDeleted = await app.db('veiculos')
                  .where({id:req.params.id}).del()
              existsOrError(rowsDeleted, 'Veiculo não encontrado')
          
              res.status(204).send()
          
          }catch(msg){
              res.status(400).send(msg)
              
          }
      }
  
      return { save,get, getById, remove }
  }