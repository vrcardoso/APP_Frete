module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validation
    
      const save = async (req, res) => {
          const produto = {...req.body}
  
          if(req.params.id) produto.id = req.params.id
  
          try{
              existsOrError(produto.name, "Nome não informado")
              existsOrError(produto.peso, "Peso não informado")
  
          }catch(msg){
              return res.status(400).send(msg)
          }
  
          if(produto.id){
              app.db('produtos')
                  .update(produto)
                  .where({id:produto.id})
                  .then(_=>res.status(204).send())
                  .catch(err =>res.status(500).send(err))
  
              const fretes = await app.db('fretes')
                  .where({idProduto:req.params.id})
  
              if(fretes){
  
                  for(let frete of fretes){
                      var datahj= new Date()
                      var dataOntem = new Date(datahj.getDate()-1)
                      var datafrete = new Date(frete.dataPostagem)
                      if((datafrete > dataOntem) && (datafrete < datahj)){
                          frete.pesoProduto = produto.peso
                          app.db('fretes')
                              .update(frete)
                              .where({id:frete.id})
                              .then(_=>res.status(204).send())
                              .catch(err =>res.status(500).send(err))
                      }
      
                  }
              }
              
          }else{
              app.db('produtos')
                  .insert(produto)
                  .then(_=> res.status(204).send())
                  .catch(err=>res.status(500).send(err))
          }
      }
  
     
      const get = async(req,res) =>{
          const limit = req.query.limit || 15
  
          const page = req.query.page || 1
  
          const result = await app.db('produtos').count('id').first()
  
          const count = parseInt(result["count(`id`)"])
  
          app.db('produtos')
              .limit(limit).offset((page * limit)-limit)
              .then(produtos =>res.json({data:produtos,count,limit}))
              .catch(err =>res.status(500).send(err))
      }
  
      const getById = (req, res) =>{
          app.db('produtos')
              .where({id:req.params.id})
              .first()
              .then(produtos =>res.json(produtos))
              .catch(err =>res.status(500).send(err))
  
  
      }
  
      const remove = async (req, res) =>{
          try{
  
              existsOrError(req.params.id,"Codigo do Produto não informado")
      
              const frete = await app.db('fretes')
                  .where({idProduto:req.params.id})
      
              notExistsOrError(frete,'Produto Possui fretes vinculados')
      
              const rowsDeleted = await app.db('produtos')
                  .where({id:req.params.id}).del()
              existsOrError(rowsDeleted, 'Produto não encontrado')
          
              res.status(204).send()
          
          }catch(msg){
              res.status(400).send(msg)
              
          }
      }
  
      return { save,get, getById, remove }
  }