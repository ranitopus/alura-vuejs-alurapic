export default class FotoService {
  constructor(resource) {
    this._resource = resource('fotos{/id}');
  }

  list() {
    return this._resource.query().then(response =>
      response.json()
    , error => {
      console.log('Error from FotoService.list(): ', error);
      throw new Error('Não foi possível obter as fotos :( Tente novamente mais tarde');
    });
  }

  search(fotoId) {
    return this._resource.get({id: fotoId}).then(response =>
      response.json()
    , error =>
      console.log('Error from FotoService.search(): ', error)
    );
  }

  save(foto) {
    let savePromise;

    if (foto._id) {
      savePromise = this._resource.update({
        id: foto._id
      }, foto);
    }
    else {
      savePromise = this._resource.save(foto);
    }

    return savePromise.then(null, error =>
      console.log('Error from FotoService.save(): ', error)
    );
  }

  remove(fotoId) {
    return this._resource.delete({id: fotoId}).then(null, error => {
      console.log('Error from FotoService.remove(): ', error);
      throw new Error ('Não foi possível remover a foto');
    });
  }
}
