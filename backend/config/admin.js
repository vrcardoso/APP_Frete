module.exports= middleware =>{

    return(req,res,next)=>{
        if(req.user.perfil =='admin'){
            middleware(req,res,next)
        }else{
            res.status(401).send('Usuario não é administrador.')
        }
    }

}