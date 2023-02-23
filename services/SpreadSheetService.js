const xlsx = require('xlsx')

class SpreadSheetService {
    constructor() {}

    generateDespesas(despesas) {
        new Promise((resolve, reject) => {
            const columnNames = [
                'ID',
                'Valor',
                'Data',
                'Descricao',
                'Pagamento ID',
                'Pagamento tipo',
                'Categoria ID',
                'Categoria nome',
                'Categoria descricao',
                'CEP',
                'Logradouro',
                'Complemento',
                'Bairro',
                'Localidade',
                'UF',
                'Numero'
            ]
    
            const workSheetName = 'Despesas'
            const filePath = './public/despesas.xlsx'
    
            const workBook = xlsx.utils.book_new()
            const workSheetData = [
                columnNames,
                ...despesas.map(d => [
                    d.id,
                    d.valor,
                    d.data_compra,
                    d.descricao,
                    d.tipo_pagamento_id,
                    d.tipo_pagamento_tipo,
                    d.categoria_id,
                    d.categoria_nome,
                    d.categoria_descricao,
                    d.cep,
                    d.logradouro,
                    d.complemento,
                    d.bairro,
                    d.localidade,
                    d.uf,
                    d.numero
                ])
            ]

            const workSheet = xlsx.utils.aoa_to_sheet(workSheetData)
            xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName)
            xlsx.writeFile(workBook, filePath)

            resolve(filePath)
        })
    }
}

module.exports = SpreadSheetService