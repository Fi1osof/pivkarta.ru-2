import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Link, browserHistory } from 'react-router'

import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'

import MoreIcon from 'material-ui-icons/More'
import EditIcon from 'material-ui-icons/Edit'
import SaveIcon from 'material-ui-icons/Save'

import UserLink from 'modules/Site/components/fields/User/link'

import CompanyView from '../View'

import Page from '../../../layout'

let { ...propTypes } = Page.propTypes || {}

propTypes = Object.assign(propTypes || {}, {
  // item: PropTypes.object.isRequired,
  // open: PropTypes.bool.isRequired,		// Флаг, что это полная статья, раскрытая
})

let { ...defaultProps } = Page.defaultProps || {}

defaultProps = Object.assign(defaultProps || {}, {
  // open: true,
  // commentOpen: true,
})

let { ...contextTypes } = Page.contextTypes || {}

contextTypes = Object.assign(contextTypes || {}, {
  localQuery: PropTypes.func.isRequired,
  updateTopicItem: PropTypes.func.isRequired,
  saveTopicItem: PropTypes.func.isRequired,
})

export default class CompanyCreatePage extends Page {
  static propTypes = propTypes

  static defaultProps = defaultProps

  static contextTypes = contextTypes

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let { coords } = this.context

    if (!coords || !coords.lat || !coords.lng) {
      coords = {
        lat: 55.753767,
        lng: 37.631778,
      }
    }

    const {
      user: { user: currentUser },
    } = this.context

    Object.assign(this.state, {
      company: {
        // Author: currentUser,
        coords,
        _isDirty: {},
      },
    })

    super.componentWillMount()
  }

  updateItem = (item, data) => {
    const {
      // updateContactItem,
      updateItem,
    } = this.context

    // updateContactItem(item, data);
    updateItem(item, data)

    this.forceUpdate()
  }

  render() {
    const {} = this.props

    const { company } = this.state

    if (!company) {
      return null
    }

    return super.render(
      <CompanyView
        item={company}
        open={true}
        commentOpen={true}
        updateItem={::this.updateItem}
        reloadData={::this.reloadData}
      />
    )
  }
}
