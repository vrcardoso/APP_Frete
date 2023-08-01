module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation
    
      const save = async (req, res) => {
          const frete = {...req.body}
  
          if(req.params.id) frete.id = req.params.id
  
          try{

            existsOrError(frete.idProduto, "Id do Produto não informado")

                const produto = await app.db('produtos')
                    .where({id:frete.idProduto})
                    .first()

            existsOrError(produto, 'Produto não encontrado')

            existsOrError(frete.nomeProduto, "Nome do Produto não informado")
            equalsOrError(frete.nomeProduto,produto.name, "Nome do Produto não confere")

            existsOrError(frete.pesoProduto, "Peso do Produto não informado")
            equalsOrError(frete.pesoProduto,produto.peso, "Peso do Produto não confere")

            existsOrError(frete.idVeiculo, "Id do Veiculo não informado")          

            const veiculo = await app.db('veiculos')
                .where({id:frete.idVeiculo})
                .first()

            existsOrError(veiculo, 'Veiculo não encontrado')


            existsOrError(frete.nomeVeiculo,veiculo.name, "Nome do Veiculo não informado")
            equalsOrError(frete.nomeVeiculo,veiculo.peso, "Nome do Veiculo não confere")

            existsOrError(frete.pesoVeiculo, "Peso do Veiculo não informado")
            equalsOrError(frete.pesoVeiculo, "Peso do Veiculo não confere")
              
            existsOrError(frete.distancia, "Distancia não informada")
            existsOrError(frete.precoFrete, "Preço do Frete não informado")
            existsOrError(frete.taxa, "Taxa não informada")
            existsOrError(frete.dataPostagem, "Data da Postagem não informada")
  
          }catch(msg){
              return res.status(400).send(msg)
          }
  
          if(frete.id){
              try{

                  const historico = await app.db('historicos')
                      .where({idFrete:req.params.id})
      
                  notExistsOrError(historico,'Frete ja esta vinculado a um historico')
                  
                    app.db('fretes')
                      .update(frete)
                      .where({id:frete.id})
                      .then(_=>res.status(204).send())
                      .catch(err =>res.status(500).send(err))

              }catch(msg){
                  res.status(400).send(msg)      
             }
              
          }else{
              app.db('fretes')
                  .insert(frete)
                  .then(_=> res.status(204).send())
                  .catch(err=>res.status(500).send(err))
          }
      }
  
     
      const get = async(req,res) =>{
          const limit = req.query.limit || 15
  
          const page = req.query.page || 1
  
          const result = await app.db('fretes').count('id').first()
  
          const count = parseInt(result["count(`id`)"])
  
          app.db('fretes')
              .limit(limit).offset((page * limit)-limit)
              .then(fretes =>res.json({data:fretes,count,limit}))
              .catch(err =>res.status(500).send(err))
      }
  
      const getById = (req, res) =>{
          app.db('fretes')
              .where({id:req.params.id})
              .first()
              .then(fretes =>res.json(fretes))
              .catch(err =>res.status(500).send(err))
  
  
      }
  
      const remove = async (req, res) =>{
          try{
  
              existsOrError(req.params.id,"Codigo do frete não informado")
      
              const historico = await app.db('historicos')
                  .where({idFrete:req.params.id})
      
              notExistsOrError(historico,'Frete esta vinculado a um historico')
      
              const rowsDeleted = await app.db('fretes')
                  .where({id:req.params.id}).del()

              existsOrError(rowsDeleted, 'Frete não encontrado')
          
              res.status(204).send()
          
          }catch(msg){
              res.status(400).send(msg)
          }
      }
  
      return { save,get, getById, remove }
  }