const PDFDocument = require('pdfkit')
const fs = require('fs')

class PDFService {
    constructor() {}

    generateDespesas(despesas) {
        return new Promise((resolve, reject) => {
            const filePath = './public/file.pdf'
            const doc = new PDFDocument()

            doc.pipe(fs.createWriteStream(filePath))

            for(const d of despesas) {
                doc.text(`Valor: ${d.valor}`)
                doc.text(`Data da compra: ${d.data_compra}`)
                doc.text(`Descrição: ${d.descricao}`)
                doc.text(`Tipo do pagamento: ${d.tipo_pagamento_tipo}`)
                doc.text(`Categoria: ${d.categoria_nome}`)
                doc.text(`CEP: ${d.cep}`)
                doc.text(`Logradouro: ${d.logradouro}`)
                doc.text(`Complemento: ${d.complemento}`)
                doc.text(`Bairro: ${d.bairro}`)
                doc.text(`Localidade: ${d.localidade}`)
                doc.text(`UF: ${d.uf}`)
                doc.text(`Numero: ${d.numero}`)
                doc.text(' ')
            }

            doc.end()
            resolve(filePath)
        })
    }
}

module.exports = PDFService