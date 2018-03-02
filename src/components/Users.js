import React, { Component } from 'react'
import { connect } from 'react-redux'

class Users extends Component {}

const mapStateToProps = ({ data }) => ({
  usersList: data.usersList,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
