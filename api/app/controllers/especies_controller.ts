import type { HttpContext } from '@adonisjs/core/http'
import Especie from "#models/especie"

export default class EspeciesController {
    async index(){
        const especies = await Especie.all()
        return especies
    }
}