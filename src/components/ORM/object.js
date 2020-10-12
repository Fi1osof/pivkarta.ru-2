let _app

export default class ModelObject {
  constructor(props, app) {
    Object.assign(this, props)

    _app = app

    // Object.assign(this, {
    //   app,
    // });

    // this.localQuery = app.localQuery;
  }

  getApp() {
    return _app
  }

  /*
    Обновление объекта.
    В каждом отдельном классе надо прописать свой апдейтер
  */
  update(data, silent) {
    console.error('Метод update не задан')

    return true
  }

  /*
    Для ререндеринга. Выкидываем сигнал, чтобы в каждом отдельном интерфейсе ререндеринг произошел
  */
  forceUpdate() {
    this.update(null, true)
  }

  fieldResolver(source, args, context, info) {
    const { fieldName } = info

    const value = (source && source[fieldName]) || undefined

    // switch(fieldName){

    //   case 'image':

    //     // value = value && value.image && value.image.original || null;
    //     value = value && value.original || null;

    //     break;
    // }

    return value
  }

  // localQuery(params){

  // }

  getFullData(params, force) {
    return new Promise((resolve, reject) => {
      if (this._loaded && !force) {
        return resolve()
      }

      this.getData(params).then((result) => {
        this._loaded = true

        resolve(result)
      })
    })
  }

  localQuery(params = {}) {
    let { _alias, variables } = params

    variables = Object.assign(variables || {}, {
      id: this.id,
    })

    Object.assign(params, {
      variables,
    })

    return new Promise((resolve, reject) => {
      _app
        .localQuery(params)
        .then((result) => {
          if (result && result.data && _alias) {
            // const {
            //   item,
            // } = result.data;

            const item = result.data[_alias]

            Object.assign(this, item)
            // this.forceUpdate();
          }

          resolve(result)
        })
        .catch((e) => reject(e))
    })
  }

  remoteQuery(params = {}) {
    return _app.remoteQuery(params)
  }
}

// export default class ModelObject{

//   constructor(props, app){

//     Object.assign(this, props);

//     this._app = app;

//   }

//   fieldResolver(source, args, context, info) {

//     const {
//       fieldName,
//     } = info;

//     let value = source && source[fieldName] || undefined;

//     // switch(fieldName){

//     //   case 'image':

//     //     // value = value && value.image && value.image.original || null;
//     //     value = value && value.original || null;

//     //     break;
//     // }

//     return value;
//   }

// }
