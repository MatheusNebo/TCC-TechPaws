import Animal from '#models/animal'
import Especie from '#models/especie'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class AnimaisController {
  async index() {
    const animais = await Animal.all()

    return animais
  }

  async store({ request, response }: HttpContext) {
    const body = request.body()

    const animal = await Animal.create(body)

    response.status(201)

    return animal
  }

  async show({ params }: HttpContext) {
    const animal = await Animal.findOrFail(params.id)

    return animal
  }

  async update({ params, request }: HttpContext) {
    const body = request.body()
    let animal = await Animal.findOrFail(params.id)

    animal.nome = body.nome
    animal.sexo = body.sexo
    animal.dataResgate = body.dataResgate
    animal.especie = body.especie
    animal.dataNascimento = body.dataNascimento
    animal.cor = body.cor
    animal.localResgate = body.localResgate
    animal.estadoSaude = body.estadoSaude
    animal.raca = body.raca
    
    await animal.save()

    return animal
  }

  async destroy({ params }: HttpContext) {
    const animal = await Animal.findOrFail(params.id)

    animal.deletadoEm = DateTime.now()
    animal.save()

    return animal
  }

  async getTodasEspecies() {
    const especies = await Especie.all()
    return especies
  }

  async getRaca({ params } : HttpContext) {
    const racas = await db
      .from('racas')
      .innerJoin('especies', 'racas.especie_id', 'especies.id')
      .select('racas.*')
      .where('racas.especie_id', params.especie_id)
    return racas
  }

  async getEspecie({ params } : HttpContext) {
    const especie = await db
      .from('especies')
      .innerJoin('animais', 'especies.id', 'animais.especie_id')
      .select('especies.*')
      .where('animais.especie_id', params.especie_id)
    return especie
  }

}
