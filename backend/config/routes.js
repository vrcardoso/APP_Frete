module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)

    app.route('/produtos')
        .post(app.api.produto.save)
        .get(app.api.produto.get)

    app.route('/produtos/:id')
        .get(app.api.produto.getById)
        .put(app.api.produto.save)
        .delete(app.api.produto.remove)

    app.route('/veiculos')
        .post(app.api.veiculo.save)
        .get(app.api.veiculo.get)

    app.route('/veiculos/:id')
        .get(app.api.veiculo.getById)
        .put(app.api.veiculo.save)
        .delete(app.api.veiculo.remove)

    app.route('/fretes')
        .post(app.api.frete.save)
        .get(app.api.frete.get)

    app.route('/fretes/:id')
        .get(app.api.frete.getById)
        .put(app.api.frete.save)
        .delete(app.api.frete.remove)

    app.route('/historicos')
        .post(app.api.historico.save)
        .get(app.api.historico.get)

    app.route('/historicos/:id')
        .get(app.api.historico.getById)
        .put(app.api.historico.save)
        .delete(app.api.historico.remove)

    app.route('/users/:id/historico')
        .get(app.api.historico.getByUser)
}