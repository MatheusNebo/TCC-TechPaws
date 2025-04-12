import type { HttpContext } from '@adonisjs/core/http'
import Raca from "#models/raca"
import Especie from '#models/especie'
import db from '@adonisjs/lucid/services/db'

export default class RacasController {
    async index(){
        const racas = await Raca.all()

        return racas
    }

    async getRaca({params} : HttpContext )  {
        const especie = await Especie.find(params.especie_id);
        const racas = await db.from('racas').select('racas.*').where('racas.especie_id', params.especie_id);

        return racas

    }
}