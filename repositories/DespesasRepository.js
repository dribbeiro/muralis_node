const DatabaseService = require('../services/DatabaseService')

class DespesasRepository {
    constructor() {
        const db_connection = new DatabaseService()
        this.conn = db_connection.getConnection()

        this._tableName = 'despesas'
    }

    findByMonth(month, page, limit) {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT
                    d.id,
                    d.valor,
                    d.data_compra,
                    d.descricao,
                    d.tipo_pagamento_id,
                    tp.tipo AS tipo_pagamento_tipo,
                    d.categoria_id,
                    c.nome AS categoria_nome,
                    c.descricao AS categoria_descricao
                FROM ${this._tableName} d
                JOIN tipos_pagamento tp ON tp.id = d.tipo_pagamento_id
                JOIN categorias c ON c.id = d.categoria_id
                WHERE MONTH(data_compra) = ?`

            let values = [month]

            if(page && limit) {
                sql += ' LIMIT ? OFFSET ?'
                values.push(parseInt(limit))
                values.push(parseInt((page - 1) * limit))
            }

            this.conn.execute(sql, values, (err, rows) => {
                if(err) { reject(err) }

                resolve(rows)
            })
        })
    }

    findByInterval(interval =
        {
            from: new Date(),
            to: new Date()
        }
    ) {
        return new Promise((resolve, reject) => {
            interval.from.setUTCHours(0,0,0,0)
            interval.to.setUTCHours(23,59,59,999)
            
            const fromISO = interval.from.toISOString()
            const toISO = interval.to.toISOString()

            const sql = `
                SELECT
                    d.id,
                    d.valor,
                    d.data_compra,
                    d.descricao,
                    d.tipo_pagamento_id,
                    tp.tipo AS tipo_pagamento_tipo,
                    d.categoria_id,
                    c.nome AS categoria_nome,
                    c.descricao AS categoria_descricao
                FROM ${this._tableName} d
                JOIN tipos_pagamento tp ON tp.id = d.tipo_pagamento_id
                JOIN categorias c ON c.id = d.categoria_id
                WHERE data_compra BETWEEN ? AND ?
            `

        
            this.conn.execute(sql, [fromISO, toISO], (err, rows) => {
                if(err) { reject(err) }

                resolve(rows)
            })
        })
    }

    insert(despesa) {
        const fields = [
            'valor',
            'data_compra',
            'descricao',
            'tipo_pagamento_id',
            'categoria_id',
            'cep',
            'logradouro',
            'complemento',
            'bairro',
            'localidade',
            'uf',
            'numero'
        ]

        const sql = `
            INSERT INTO ${this._tableName}
            (${fields.join(', ')})
            VALUES (${fields.map(f => '?').join(', ')})
        `

        // Ordena os valores corretamente
        const values = fields.map(f => despesa[f])

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, result) => {
                if(err) { reject(err) }

                resolve(result.insertId)
            })
        })
    }

    update(despesa) {
        const sql = `
            UPDATE ${this._tableName} SET
                valor = ?,
                data_compra = ?,
                descricao = ?,
                tipo_pagamento_id = ?,
                categoria_id = ?
            WHERE id = ?
        `

        // Ordena os valores corretamente
        const values = [
            despesa.valor,
            despesa.data_compra,
            despesa.descricao,
            despesa.tipo_pagamento_id,
            despesa.categoria_id,
            despesa.id
        ]

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, result) => {
                if(err) { reject(err) }

                resolve(despesa.id)
            })
        })
    }

    patch(despesa) {
        let sql = `UPDATE ${this._tableName} SET `
        let fieldsSql = []
        let values = []

        for(const [field, value] of Object.entries(despesa)) {
            if(field === 'id') continue; // Skip ID column

            fieldsSql.push(`${field} = ?`)
            values.push(value)
        }

        sql += `${fieldsSql.join(', ')} WHERE id = ${despesa.id}`

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, result) => {
                if(err) { reject(err) }

                resolve(despesa.id)
            })
        })
    }

    delete(id) {
        const sql = `
            DELETE FROM ${this._tableName} WHERE id = ?
        `

        const values = [id]

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, result) => {
                if(err) { reject(err) }

                resolve(id)
            })
        })
    }
}

module.exports = DespesasRepository