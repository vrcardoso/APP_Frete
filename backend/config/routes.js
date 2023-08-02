module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin',app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)

    app.route('/produtos')
        .all(app.config.passport.authenticate())
        .post(app.api.produto.save)
        .get(app.api.produto.get)

    app.route('/produtos/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.produto.getById)
        .put(app.api.produto.save)
        .delete(app.api.produto.remove)

    app.route('/veiculos')
        .all(app.config.passport.authenticate())    
        .post(app.api.veiculo.save)
        .get(app.api.veiculo.get)

    app.route('/veiculos/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.veiculo.getById)
        .put(app.api.veiculo.save)
        .delete(app.api.veiculo.remove)

    app.route('/fretes')
        .all(app.config.passport.authenticate())
        .post(app.api.frete.save)
        .get(app.api.frete.get)

    app.route('/fretes/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.frete.getById)
        .put(app.api.frete.save)
        .delete(app.api.frete.remove)

    app.route('/historicos')
        .all(app.config.passport.authenticate())
        .post(app.api.historico.save)
        .get(app.api.historico.get)

    app.route('/historicos/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.historico.getById)
        .put(app.api.historico.save)
        .delete(app.api.historico.remove)

    app.route('/users/:id/historico')
        .all(app.config.passport.authenticate())
        .get(app.api.historico.getByUser)
}