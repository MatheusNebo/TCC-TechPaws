import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'animais'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('sexo')
      table.dateTime('data_resgate')
      table.string('especie')
      table.dateTime('data_nascimento')
      table.string('cor')
      table.string('local_resgate')
      table.string('estado_saude')
      table.string('raca')
      table.boolean('adotado')
      table.timestamp('criado_em')
      table.timestamp('deletado_em')
      //table.integer('especie_id').unsigned().references('especies.id').onDelete('CASCADE')
      //table.integer('raca_id').unsigned().references('racas.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
