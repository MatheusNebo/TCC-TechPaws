/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const VeterinarioController = () => import('#controllers/veterinarios_controller')
const VoluntarioController = () => import('#controllers/voluntarios_controller')
const TelefonesController = () => import('#controllers/telefones_controller')
const RegistroController = () => import('#controllers/registros_controller')
const PessoasController = () => import('#controllers/pessoas_controller')
const EnderecosController = () => import('#controllers/enderecos_controller')
const DoacoesController = () => import('#controllers/doacoes_controller')
const ClinicasController = () => import('#controllers/clinicas_controller')
const ClientesController = () => import('#controllers/clientes_controller')
const AnimaisController = () => import('#controllers/animais_controller')
const AdocoesController = () => import('#controllers/adocoes_controller')
const FuncionariosController = () => import('#controllers/funcionarios_controller')
const AdministradoresController = () => import('#controllers/administradores_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import Administrador from '#models/administrador'
import { administrador, veterinario, voluntario } from '#abilities/main'
import db from '@adonisjs/lucid/services/db'
import Pessoa from '#models/pessoa'
import EspeciesController from '#controllers/especies_controller'
import RacasController from '#controllers/racas_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

//ROTAS DO ADMINISTRADOR
router.resource('/administradores', AdministradoresController).apiOnly()
router.post('/administradores/AdicionaFuncionario', [AdministradoresController, 'AdicionaFuncionario'])
router.post('/administradores/AlterarSalario', [AdministradoresController, 'AlteraSalario'])
router.post('administradores/Demitir', [AdministradoresController, 'Demitir'])
//router.post('/administradores/:pessoa_id/:clinica_id/teste', [AdministradoresController, 'store'])

//ROTAS DA ADOÇÂO
router.resource('/adocoes', AdocoesController).apiOnly()
router.get('/adocoes/pegaDataAdocao', [AdocoesController, 'pegaDataAdocao'])

//ROTA DO ANIMAL
router.resource('/animais', AnimaisController).apiOnly()
router.get('animais/especies', [AnimaisController, 'getTodasEspecies'])

router.get('/especies', [EspeciesController, "index"])
router.get('/racas', [RacasController, 'index'])
router.get('/racas/:especie_id', [AnimaisController, 'getRaca'])

//ROTAS DO CLIENTE
router.resource('/clientes', ClientesController).apiOnly()
router.post('/clientes/:pessoa_id/:clinica_id/teste', [ClientesController, 'store'])

//ROTA DA CLINICA
router.resource('/clinicas', ClinicasController).apiOnly()

//ROTAs DA DOAÇÂO
router.resource('/doacoes', DoacoesController).apiOnly()
router.post('/doacoes/:cliente_id/:voluntario_id/teste', [DoacoesController, 'store'])

//ROTAs DO ENDEREÇOS
router.resource('/enderecos', EnderecosController).apiOnly()
router.post('/enderecos/:clinica_id/:pessoa_id/teste', [EnderecosController, 'store'])

//ROTAS DO FUNCIONARIO
router.resource('/funcionarios', FuncionariosController).apiOnly()
router.get('/funcionarios/BuscaFuncionarioPelaPessoa/:pessoa_id', [FuncionariosController, 'BuscaFuncionarioPelaPessoa'])
router.post('/funcionarios/AlteraAnimal/:animal_id', [FuncionariosController, 'AlteraAnimal'])
router.post('/funcionarios/AdicionaRegistro/', [FuncionariosController, 'AdicionaRegistro'])

//ROTA DA PESSOA
//router.resource('/pessoas', PessoasController).apiOnly()
router.get('/pessoas/todasPessoas', [PessoasController, 'todasPessoas'])
router.get('/pessoas/:pessoa_id', [PessoasController, 'show'])
router.post('/pessoas/:cargo', [PessoasController, 'criar'])
router.post('/login', [PessoasController, 'login'])
router.put('/pessoas/atualizar', [PessoasController, 'atualizar'])

//ROTAS DO REGISTRO
router.resource('/registros', RegistroController).apiOnly()
router.post('registros/adiciona', [RegistroController, 'store'])
router.get('registros/animal/:animal_id', [RegistroController, 'RegistrosAnimal'])

//ROTAS DO TELEFONE
router.resource('/telefones', TelefonesController).apiOnly()
router.post('/telefones/:clinica_id/:pessoa_id/teste', [TelefonesController, 'store'])

//ROTA DO VETERINARIO
router.resource('/veterinarios', VeterinarioController).apiOnly()
router.post('/veterinarios/AdicionaAnimail', [VeterinarioController, 'AdicionaAnimal'])
router.post('/veterinarios/AlteraAnimal/:animal_id', [VeterinarioController, 'AlteraAnimal'])
router.post('/veterinarios/AdicionaRegistro/:veterinario_id', [VeterinarioController, 'AdicionaRegistro'])

//ROTA DO VOLUNTARIO
router.resource('/voluntarios', VoluntarioController).apiOnly()
router.post('/voluntarios/AdicionaAnimail', [VoluntarioController, 'AdicionaAnimal'])
router.post('/voluntarios/AlteraAnimal/:animal_id', [VoluntarioController, 'AlteraAnimal'])
router.post('/voluntarios/CriaAdocao', [VoluntarioController, 'CriaAdocao'])

/**
 * TODO
 * utilizar os middleware para verificação de rotas
 * adsdad
 */
router .get('/todasPessoasTeste',  async ({ auth }) => {
    console.log(auth.user) // User
    console.log(auth.authenticatedViaGuard) // 'api'
    console.log(auth.user!.currentAccessToken) // AccessToken
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

  router.get('/pessoasTeste', [PessoasController, 'todasPessoas']).use(
    middleware.auth({
      guards: ['api'],
    })
  )

