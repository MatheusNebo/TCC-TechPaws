import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import Funcionario from '#models/funcionario'
import Pessoa from '#models/pessoa'
import Animal from '#models/animal'
import Registro from '#models/registro'

export default class FuncinariosController {
  async index({}: HttpContext) {
    const funcionarios = await db.from('funcionarios').select('*')

    return funcionarios
  }

  async store({ request }: HttpContext) {
    const body = request.body()

    const funcionario = new Funcionario()
    funcionario.pessoa_id = body.pessoa_id
    funcionario.clinica_id = body.clinica_id
    funcionario.administrador_id = body.administrador_id
    funcionario.salario = body.salario
    funcionario.criadoEm = DateTime.now()

    funcionario.save()
    const pessoa = await Pessoa.findOrFail(body.pessoa_id)
    pessoa.cargo = 'funcionario'
    pessoa.save()

    await funcionario.save()
  }

  async show({ params }: HttpContext) {
    const funcionario = await Funcionario.findOrFail(params.id)

    return {
      funcionario: funcionario,
    }
  }

  async update({ request, params }: HttpContext) {
    const body = request.body()
    let funcionario = await Funcionario.findOrFail(params.id)

    funcionario.salario = body.salario

    funcionario.save()

    return funcionario
  }

  async destroy({ params }: HttpContext) {
    const funcionario = await Funcionario.findOrFail(params.id)

    funcionario.deletadoEm = DateTime.now()
    funcionario.save()

    return funcionario
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
    animal.adotado = body.adotado

    await animal.save()
  }

  async BuscaFuncionarioPelaPessoa({ params }: HttpContext) {
    const funcionario = (await Funcionario.query().where('pessoa_id', params.pessoa_id))[0]

    return funcionario
  }

  async AdicionaRegistro({ request }: HttpContext) {
    const body = request.body()

    let registro = new Registro()

    registro.autor = body.autor
    registro.informacoes = body.informacoes
    registro.tipoRegistro = body.tipo_registro
    registro.dataRegistro = DateTime.now()
    registro.funcionario_id = body.funcionario_id
    registro.animal_id = body.animal_id
    registro.criadoEm = DateTime.now()

    await registro.save()
  }
  /*
  async teste({ request, params }: HttpContext) {
    const body = request.body()

    let registro = new Registro()

    registro.autor = body.autor
    registro.informacoes = body.informacoes
    registro.tipoRegistro = body.tipoRegistro
    registro.dataRegistro = DateTime.now()
    registro.funcionario_id = body.funcionario_id
    registro.animal_id = body.animal_id
    registro.criadoEm = DateTime.now()

    //await registro.save()
  }
    */
}
