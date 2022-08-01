import { ClassEvent } from "../utils/ClassEvent";

export class Model extends ClassEvent {

  constructor() {

    super()

    this._data = {}

  }

  // Recebe um JSON com dados, junta com o que ja tem no objeto e adiciona em this._data
  fromJSON(json) {

    this._data = Object.assign(this._data, json);

    this.trigger('datachange', this.toJSON())

  }

  // Retorna os dados de fato
  toJSON() {

    return this._data

  }

}