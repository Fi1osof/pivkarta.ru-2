import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Page from '../layout/..'

import { Link, browserHistory } from 'react-router'

import TopicsPage from '../../Topics'
// import Topic from './Topic';

export default class OtzivyPage extends TopicsPage {
  // getOperationName(){

  // 	return "ObzoryZavedeniy";

  // }

  // getLocalData(){

  //   let topics = super.getLocalData();

  // 	return topics && topics.filter(n => n.template === 28);

  // }

  setPageTitle(title) {
    super.setPageTitle(title || 'Обзоры и отзывы')
  }

  loadServerData(provider, options = {}) {
    const {
      operationName = 'ObzoryZavedeniy',
      title = 'Обзоры и отзывы',
      ...debugOptions
    } = options

    Object.assign(options, {
      operationName,
      title,
    })

    return super.loadServerData(provider, options)
  }

  // constructor(props){

  // 	super(props);

  // 	// Object.assign(this.state, {
  // 	// });
  // }

  // componentDidMount(){

  // 	const {
  // 		TopicsStore,
  // 	} = this.context;

  // 	this.TopicsStoreListener = TopicsStore.getDispatcher().register(payload => {

  // 		this.loadData();

  // 	});

  // 	this.loadData();
  // }

  // loadData(){

  // 	const {
  // 		localQuery,
  // 	} = this.context;

  // 	let result = localQuery({
  // 		operationName: "Topics",
  // 		variables: {
  // 			resourcesLimit: 10,
  // 		},
  // 	})
  // 	.then(r => {

  // 		const {
  // 			topics,
  // 		} = r.data;

  // 		this.setState({
  // 			topics,
  // 		});
  // 	});

  // }

  // renderTopics(){

  // 	const {
  // 		topics,
  // 	} = this.state;

  // 	let topicsList = [];

  // 	topics && topics.map(topic => {

  // 		const {
  // 			id,
  // 			name,
  // 		} = topic;

  // 		topicsList.push(<Topic
  // 			key={id}
  // 			item={topic}
  // 		>
  // 			{name}
  // 		</Topic>);

  // 	});

  // 	return <div>
  // 		{topicsList}
  // 	</div>

  // }

  // renderContent(){

  // 	const {
  // 		params,
  // 	} = this.props;

  // 	// {
  // 	// 	TopicsStore,
  // 	// } = this.context;

  // 	const {
  // 		topics,
  // 	} = this.state;

  // 	const {
  // 		topicAlias,
  // 	} = params || {};

  // 	// let item;
  // 	// let company;

  // 	let content;

  // 	if(topicAlias){

  // 		// const item = TopicsStore.getState().find(n => n.id == topicAlias || n.alias == topicAlias);
  // 		const item = topics.find(n => n.id == topicAlias || n.alias == topicAlias);

  // 		if(item){

  // 			content = <Topic
  // 				item={item}
  // 			/>

  // 		}
  // 		else{
  // 			content = <div
  // 				style={{
  // 					color: "red",
  // 				}}
  // 			>
  // 				Документ не был найден
  // 			</div>
  // 		}

  // 	}
  // 	else{
  // 		content = this.renderTopics();
  // 	}

  // 	return <div>

  // 			{content}

  // 	</div>
  // }
}
