const axios = require('axios')

class ViaCEPService {
    constructor() {
        this.api = `https://viacep.com.br/ws`
    }

    async get(cep) {
        const endereco = await axios.get(`${this.api}/${cep}/json`)
        return endereco.data
    }
}

module.exports = ViaCEPService