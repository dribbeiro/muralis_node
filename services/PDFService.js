const PDFDocument = require('pdfkit')
const fs = require('fs')

class PDFService {
    constructor() {}

    generateDespesas(despesas) {
        return new Promise((resolve, reject) => {
            const filePath = './public/file.pdf'
            const doc = new PDFDocument
            // const stream  = doc.pipe(blobStream())

            doc.pipe(fs.createWriteStream(filePath))

            for(const d of despesas) {
                doc.text(`Valor: ${d.valor}`)
                doc.text(`Data da compra: ${d.data_compra}`)
                doc.text(`Descrição: ${d.descricao}`)
                doc.text(`Tipo do pagamento: ${d.tipo_pagamento_tipo}`)
                doc.text(`Categoria: ${d.categoria_nome}`)
            }

            doc.end()
            resolve(filePath)
        })
    }
}

module.exports = PDFService