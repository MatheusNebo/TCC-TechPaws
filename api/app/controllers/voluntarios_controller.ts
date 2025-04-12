import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import Animal from '#models/animal'
import Registro from '#models/registro'
import Adocao from '#models/adocao'
import Especie from '#models/especie'
import Raca from '#models/raca'

export default class VoluntariosController {
  async index({}: HttpContext) {
    const voluntario = db.from('voluntarios').select('*')

    return voluntario
  }

  
  async AdicionaAnimal({ request }: HttpContext) {
    const body = request.body()

    let animal = new Animal()

    animal.nome = body.nome
    animal.sexo = body.sexo
    animal.dataResgate = body.dataResgate
    animal.especie =  body.especie
    animal.dataNascimento = body.dataNascimento
    animal.cor = body.cor
    animal.localResgate = body.localResgate
    animal.estadoSaude = body.estadoSaude
    animal.raca = body.raca
    animal.imagemAnimal = body.imagemAnimal

    await animal.save()

    console.log(animal)
  }


  async AlteraAnimal({ request, params }: HttpContext) {
    const body = request.body()

    let animal = await Animal.findOrFail(params.animal_id)

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
  }

  async CriaAdocao({ request }: HttpContext) {
    const body = request.body()
    let animal = await Animal.findOrFail(body.animal_id)
    let adocao = new Adocao()
    //console.log(animal)

    animal.adotado = true
    adocao.animal_id = body.animal_id
    adocao.pessoa_id = body.pessoa_id
    
    await adocao.save()
    await animal.save()
    
  }
  
  /*
  async store({ params }: HttpContext) {
    let voluntario = new Voluntario()

    voluntario.funcionario_id = params.funcionario_id
    voluntario.criadoEm = DateTime.now()

    await voluntario.save()
  }
    
  async show({ params }: HttpContext) {
    const voluntario = await Voluntario.findOrFail(params.id)
    return voluntario
  }

  async destroy({ params }: HttpContext) {
    const voluntario = await Voluntario.findOrFail(params.id)

    voluntario.deletadoEm = DateTime.now()
    await voluntario.save()

    return voluntario
  }
  */
}
