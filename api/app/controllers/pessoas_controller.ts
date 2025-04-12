import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Pessoa from '#models/pessoa'
import Voluntario from '#models/voluntario'
import Cliente from '#models/cliente'
import Veterinario from '#models/veterinario'
import Administrador from '#models/administrador'
import Funcionario from '#models/funcionario'
import db from '@adonisjs/lucid/services/db'
import { close } from 'fs'
import Clinica from '#models/clinica'

/* TODO
  Organizar o select{
    não deve aparecer os deletados
  }
  Arrumar os erros da atualização
*/

export default class PessoasController {
  async todasPessoas() {
    const pessoas = await Pessoa.all()

    return pessoas
  }

  async criar({ request, params }: HttpContext) {
    const body = request.body()
    let pessoa = new Pessoa()
    pessoa.nome = body.nome
    pessoa.cpf = body.cpf
    pessoa.rg = body.rg
    pessoa.email = body.email
    pessoa.senha = body.senha
    pessoa.data_nascimento = body.dataNascimento
    pessoa.sexo = body.sexo
    pessoa.cargo = 'cliente'
    pessoa.criadoEm = DateTime.now()

    await pessoa.save()

    const ultimoIdRegistrado = await db.from('pessoas').orderBy('id', 'desc').first()
    const idRegistrado = ultimoIdRegistrado?.id

    let cliente = new Cliente()
    cliente.pessoa_id = idRegistrado
    cliente.clinica_id = 1

    await cliente.save()
  }

  async show({ params }: HttpContext) {
    const pessoa = await Pessoa.findOrFail(params.pessoa_id)

    return pessoa
  }

  async atualizar({ request }: HttpContext) {
    const body = request.body()
    const pessoa = await Pessoa.findOrFail(body.id)

    console.log(pessoa)
    pessoa.nome = body.nome
    pessoa.cpf = body.cpf
    pessoa.rg = body.rg
    pessoa.email = body.email
    pessoa.senha = body.senha
    pessoa.data_nascimento = body.dataNascimento
    pessoa.sexo = body.sexo

    await pessoa.save()
    return pessoa
  }

  async login({ request }: HttpContext) {
    const body = request.body()

    const id = body.id
    const pessoa = await Pessoa.findOrFail(id)
    console.log(pessoa)
    const token = await Pessoa.accessTokens.create(pessoa)

    return token
  }

  async destroy({ params }: HttpContext) {
    const pessoa = await Pessoa.findOrFail(params.id)
    if (!Pessoa.VerificaAdmin(pessoa)) return console.log('não passou')
    pessoa.deletadoEm = DateTime.now()
    pessoa.save()
    return pessoa
  }
}
