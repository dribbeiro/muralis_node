const Despesa = require('./../models/Despesa')
const DespesasService = require('./../services/DespesasService')
const PDFService = require('./../services/PDFService')
const SpreadSheetService = require('./../services/SpreadSheetService')

class DespesasController {
    constructor() {
        this.despesasService = new DespesasService()
        this.pdfService = new PDFService()
        this.spreadSheetService = new SpreadSheetService()
    }

    get(req, res) {
        this.despesasService
            .getCurrentMonth(
                req.query.page ?? 0,
                req.query.limit ?? 0
            )
            .then((rows) => {
                res.status(200).send(
                    {
                        data: rows,
                        success: true
                    }
                )
            })
            .catch((err) => res.status(500).send(
                {
                    data: err,
                    success: false
                }
            ))
    }

    create(req, res) {
        const despesa = new Despesa(req.body)
        this.despesasService
            .create(despesa)
            .then((id) => {
                res.status(200).send(
                    {
                        data: id,
                        success: true
                    }
                )
            })
            .catch((err) => res.status(500).send(
                {
                    data: err,
                    success: false
                }
            ))
    }

    update(req, res) {
        this.despesasService
            .update({...req.body, id: req.params.id})
            .then((id) => {
                res.status(200).send(
                    {
                        data: id,
                        success: true
                    }
                )
            })
            .catch((err) => res.status(500).send(
                {
                    data: err,
                    success: false
                }
            ))
    }

    patch(req, res) {
        this.despesasService
            .patch({...req.body, id: req.params.id})
            .then((id) => {
                res.status(200).send(
                    {
                        data: id,
                        success: true
                    }
                )
            })
            .catch((err) => res.status(500).send(
                {
                    data: err,
                    success: false
                }
            ))
    }

    delete(req, res) {
        this.despesasService
            .delete(req.params.id)
            .then((id) => {
                res.status(200).send(
                    {
                        data: id,
                        success: true
                    }
                )
            })
            .catch((err) => res.status(500).send(
                {
                    data: err,
                    success: false
                }
            ))
    }

    getPDF(req, res) {
        this.despesasService
            .getByInterval({
                from: req.body.from,
                to: req.body.to
            })
            .then((despesas) => {
                this.pdfService
                    .generateDespesas(despesas)
                    .then((filePath) => {
                        res.download(filePath)
                    })
            })
            .catch((err) => res.status(500).send(
                {
                    data: err,
                    success: false
                }
            ))
    }

    getSpreadSheet(req, res) {
        this.despesasService
            .getCurrentMonth()
            .then((despesas) => {
                this.spreadSheetService
                    .generateDespesas(despesas)
                    .then((filePath) => {
                        res.download(filePath)
                    })
            })
            .catch((err) => res.status(500).send(
                {
                    data: err,
                    success: false
                }
            ))
    }
}

module.exports = DespesasController