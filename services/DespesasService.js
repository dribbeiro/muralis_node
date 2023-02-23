const DespesasRepository = require('./../repositories/DespesasRepository')
const ViaCEPService = require('./ViaCEPService')

class DespesasService {
    constructor() {
        this.despesasRepository = new DespesasRepository()
        this.viaCEPService = new ViaCEPService()
    }

    getCurrentMonth(page, limit) {
        return new Promise((resolve, reject) => {
            this.despesasRepository
                .findByMonth(((new Date()).getMonth() + 1), page, limit)
                .then((rows) => resolve(rows))
                .catch((err) => reject(err))
        })
        
    }

    create(despesa) {
        return new Promise((resolve, reject) => {
            this.viaCEPService
                .get(`08675095`)
                .then((endereco) => {
                    despesa.setCep(endereco.cep)
                    despesa.setLogradouro(endereco.logradouro)
                    despesa.setComplemento(endereco.complemento)
                    despesa.setBairro(endereco.bairro)
                    despesa.setLocalidade(endereco.localidade)
                    despesa.setUf(endereco.uf)

                    this.despesasRepository
                        .insert(despesa)
                        .then((id) => resolve(id))
                        .catch((err) => reject(err))
                })
        })
    }

    update(despesa) {
        return new Promise((resolve, reject) => {
            this.despesasRepository
                .update(despesa)
                .then((id) => resolve(id))
                .catch((err) => reject(err))
        })
    }

    patch(despesa) {
        return new Promise((resolve, reject) => {
            this.despesasRepository
                .patch(despesa)
                .then((id) => resolve(id))
                .catch((err) => reject(err))
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.despesasRepository
                .delete(id)
                .then((id) => resolve(id))
                .catch((err) => reject(err))
        })
    }

    getByInterval() {
        return new Promise((resolve, reject) => {
            this.despesasRepository
                .findByInterval()
                .then((rows) => {
                    resolve(rows)
                })
                .catch((err) => reject(err))
        })
    }
}

module.exports = DespesasService