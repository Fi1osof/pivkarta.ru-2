import React, { Component } from 'react'

import PropTypes from 'prop-types'

import GraphiQL from 'graphiql'

import Switch from 'material-ui/Switch'

import Page from '../layout'

// import { graphql, buildSchema } from 'graphql';

//
//

// import ORM from '../../ORM';

import defaultQuery from '../../ORM/query'

import {
  buildSchema,
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  introspectionQuery,
  buildClientSchema,
  printSchema,
} from 'graphql'

import 'graphiql/graphiql.css'

// class contact extends Component{

//   constructor(a,b,c){

//     super(a);

//

//     Object.assign(this, a);
//   }

//   render(){
//     return null;
//   }
// }

// const ContactType = new GraphQLObjectType({
//   name: "Contact",
//   fields: {
//     id: {
//       type: GraphQLID,
//     },
//     username: {
//       type: GraphQLString,
//     },
//     child: {
//       type: new GraphQLObjectType({
//         name: 'child',
//         fields: {
//           test: {
//             type: GraphQLID,
//           }
//         },
//       }),
//       resolve: (obj, args, context) => {
//
//       }
//     }
//   },
// });

// const RootType = new GraphQLObjectType({
//   name: "Root",
//   fields: {
//     contact: {
//       type: new GraphQLList(ContactType),
//       resolve: (object, args, context) => {

//

//         // return [343];

//         return [new contact({
//           username: "SDfdsf",
//         })];
//       },
//     },
//   },
// });

let { ...contextTypes } = Page.contextTypes || {}

Object.assign(contextTypes, {
  loadItems: PropTypes.func,
  apiRequest: PropTypes.func.isRequired,
  localQuery: PropTypes.func.isRequired,
  initData: PropTypes.func.isRequired,
  // orm: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  // db: PropTypes.object.isRequired,
})

export default class PageGraphiQL extends Page {
  static contextTypes = contextTypes

  constructor(props) {
    super(props)

    this.state = {
      storage: 'local',
    }
  }

  componentDidMount() {
    // this.loadSchema();
    // this.getSchema();

    // const {
    //   remoteQuery,
    // } = this.context;

    // remoteQuery();

    // this.graphQLFetcher({
    //   operationName: "apiData",
    // });

    super.componentDidMount && super.componentDidMount()
  }

  // getSchema(){

  //   const schema = this._getSchema();

  //   this.setState({
  //     schema: schema,
  //   });
  // }

  // _getSchema(){

  //   var schema = new GraphQLSchema({
  //     query: RootType,
  //     // mutation: Mutation,
  //   });

  //   return schema;
  // }

  // getSchema(){

  //   // this.setState({
  //   //   schema: new ORM().getSchema(),
  //   // });
  // }

  // getSchema(){

  //   const Query = {
  //     human(obj, args, context) {

  //

  //       return context.db.loadHumanByID(args.id).then(
  //         userData => new Human(userData)
  //       )
  //     }
  //   }

  //   this.setState({
  //     schema: Query,
  //   });
  // }

  reloadData() {}

  apiRequest(path, params, options) {
    let { apiRequest } = this.context

    return apiRequest(null, true, path, params, options)
  }

  // loadSchema(){

  //   this.apiRequest('schema', {}, {
  //     callback: (data, errors) => {

  //       if(data.success && data.object){

  //         let {
  //           data: introspectionSchema,
  //         } = data.object;

  //         var schema = buildClientSchema(introspectionSchema);
  //         // var schema = introspectionSchema;

  //         this.setState({
  //           schema,
  //         });
  //       }

  //       return;
  //     }
  //   })
  // }

  _graphQLFetcher(graphQLParams, a, b, c) {
    const { storage } = this.state

    const fetcher =
      storage == 'local' ? this.graphQLFetcherLocal : this.graphQLFetcher

    return fetcher.call(this, graphQLParams, a, b, c)
  }

  async graphQLFetcher(graphQLParams) {
    // var body = new FormData();

    // body: JSON.stringify({...params, variables})

    // for(var i in graphQLParams){

    //   var value = graphQLParams[i];

    //   if(value === null || value === undefined){
    //     continue;
    //   }

    //   body.append(i, JSON.stringify(value));
    //   // body.append(i, value);
    // };

    const { query, ...other } = graphQLParams

    let result = fetch('/api/?pub_action=graphql', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...other }),
      // body: JSON.stringify(body),
      // body: body,
    })
      .then((response) => response.json())
      .then((r) => {
        const { operationName } = other

        switch (operationName) {
          case 'apiData':
            const { initData } = this.context

            initData(r && r.data)

            break
        }

        return r
      })
      .catch((e) => {
        throw e
      })

    return result
  }

  graphQLFetcherLocal(graphQLParams) {
    const { localQuery } = this.context

    return localQuery(graphQLParams)

    // const {
    //   orm,
    // } = this.context;

    // return orm.execute(graphQLParams);

    // return new ORM().execute();

    // return fetch('/api/?pub_action=graphql', {
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/json' },
    //   // body: JSON.stringify(graphQLParams),
    //   // body: JSON.stringify(body),
    //   body: body,
    // }).then(response => response.json());
  }

  // graphQLFetcherLocal(graphQLParams, a,b,c) {

  //   const {
  //     schema,
  //   } = this.context;

  //   // var schema = this._getSchema();

  //   const {
  //     query,
  //     operationName,
  //     variables,
  //   } = graphQLParams;

  //   // return graphql({
  //   //   schema,
  //   //   source: query,
  //   //   variableValues: variables || undefined,
  //   //   contextValue: this.context,
  //   // }).then((response) => {

  //   //
  //   // });

  //   // graphql({
  //   //   schema,
  //   //   source: query,
  //   //   variableValues: variables || undefined,
  //   //   contextValue: this.context,
  //   // }).then((response) => {

  //   //   this.success("", response);
  //   // });

  //   return new Promise((resolve, reject) => {

  //     class user {

  //       constructor(props){

  //         Object.assign(this, props);
  //       }

  //     }

  //     graphql({
  //       schema,
  //       operationName,
  //       source: query,
  //       rootValue: {
  //         companies: {
  //           success: true,
  //           object: [new user({
  //             id: 12,
  //             name: "DSfsdf",
  //           })],
  //         },
  //       },
  //       variableValues: variables || undefined,
  //       contextValue: this.context,
  //       fieldResolver: (source, args, context, info) => {

  //         let result;

  //         const {
  //           fieldName,
  //         } = info;

  //         if(source && source[fieldName]){

  //           result = source[fieldName];

  //         }
  //         // else{

  //         //   result = {
  //         //     success: true,
  //         //     object: [new user({
  //         //       id: 12,
  //         //       name: "DSfsdf",
  //         //     })],
  //         //   };

  //         // }

  //         return result;

  //       }
  //     }).then((response) => {

  //       resolve(this.success('', response));
  //     })
  //     .catch(e => {
  //       console.error(e);
  //       reject();
  //     });

  //     // resolve({
  //     //   data: {},
  //     // });
  //   });

  //   // return new ORM().execute();

  //   // return fetch('/api/?pub_action=graphql', {
  //   //   method: 'post',
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   // body: JSON.stringify(graphQLParams),
  //   //   // body: JSON.stringify(body),
  //   //   body: body,
  //   // }).then(response => response.json());
  // }

  success(msg, object) {
    return {
      success: true,
      message: msg || '',
      object: object,
    }
  }

  failure(msg, object) {
    return {
      success: false,
      message: msg || '',
      object: object,
    }
  }

  render() {
    if (typeof window === 'undefined') {
      return null
    }

    const { storage, schema: remoteSchema } = this.state

    let schema

    const { schema: localSchema } = this.context

    schema = localSchema

    // if(storage === 'local'){
    //   schema = localSchema;
    // }
    // else{
    //   schema = remoteSchema;
    // }

    if (!schema) {
      return null
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Switch
            checked={storage == 'local'}
            onChange={(event, checked) =>
              this.setState({
                storage: storage == 'local' ? '' : 'local',
              })
            }
          />{' '}
          <b>Локальное хранилище: </b>
        </div>

        <GraphiQL
          schema={schema}
          defaultQuery={defaultQuery}
          fetcher={::this._graphQLFetcher}
          // fetcher={::this.graphQLFetcherLocal}
        />
      </div>
    )
  }
}
