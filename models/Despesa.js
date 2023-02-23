class Despesa {
    constructor(despesa) {
        this.id = despesa.id,
        this.valor = despesa.valor,
        this.data_compra = despesa.data_compra,
        this.descricao = despesa.descricao,
        this.tipo_pagamento_id = despesa.tipo_pagamento_id,
        this.categoria_id = despesa.categoria_id,
        this.cep = despesa.cep,
        this.logradouro = despesa.logradouro,
        this.complemento = despesa.complemento,
        this.bairro = despesa.bairro,
        this.localidade = despesa.localidade,
        this.uf = despesa.uf,
        this.numero = despesa.numero
    }

    setValor(value) {
        this.valor = value
    }

    setDataCompra(value) {
        this.data_compra = value
    }

    setDescricao(value) {
        this.descricao = value
    }

    setTipoPagamentoId(value) {
        this.tipo_pagamento_id = value
    }

    setCategoriaId(value) {
        this.categoria_id = value
    }

    setCep(value) {
        this.cep = value
    }

    setLogradouro(value) {
        this.logradouro = value
    }

    setComplemento(value) {
        this.complemento = value
    }

    setBairro(value) {
        this.bairro = value
    }

    setLocalidade(value) {
        this.localidade = value
    }

    setUf(value) {
        this.uf = value
    }

    setNumero(value) {
        this.numero = value
    }
}

module.exports = Despesa