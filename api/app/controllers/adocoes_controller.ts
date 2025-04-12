import Adocao from '#models/adocao'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class AdocoesController {
  async index() {
    const adocoes = await db.from('adocoes').select('*')
    const data = await this.pegaDataAdocao()
    return {
      adocoes: adocoes,
      data: data,
    }
  }

  async show({ params }: HttpContext) {
    const adocao = await Adocao.findOrFail(params.id)

    return adocao
  }

  async pegaDataAdocao() {
    const data = await db.from('adocoes').select('criado_em')
    return data
  }

  async destroy({ params }: HttpContext) {
    const adocao = await Adocao.findOrFail(params.id)

    adocao.deletadoEm = DateTime.now()
    adocao.save()

    return adocao
  }
}
