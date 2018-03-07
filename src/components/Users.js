import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  listUsers as listUsersAction,
  updateUserProfile as updateUserProfileAction,
} from '../actions'

const areas = {
  ALL_REPORTS: 'ALL_REPORTS',
  TOPOGRAFIA: 'TOPOGRAFIA',
  GEOMATICA: 'GEOMATICA',
  ADMINISTRACION: 'ADMINISTRACION',
  OPERACIONES: 'OPERACIONES',
}
const roles = {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
}

class Users extends Component {
  async componentDidMount() {
    const { listUsers } = this.props
    await listUsers()
  }

  preventDefault = e => {
    e.preventDefault()
  }

  dragStart = (e, user) => {
    e.dataTransfer.setData('text', JSON.stringify(user))
  }

  dropAllReports = e => this.drop(e, areas.ALL_REPORTS, roles.ADMIN)
  dropUsersToAssign = e => this.drop(e, '', '')
  dropTopografiaManagers = e => this.drop(e, areas.TOPOGRAFIA, roles.ADMIN)
  dropTopografia = e => this.drop(e, areas.TOPOGRAFIA, roles.MEMBER)
  dropGeomaticaManagers = e => this.drop(e, areas.GEOMATICA, roles.ADMIN)
  dropGeomatica = e => this.drop(e, areas.GEOMATICA, roles.MEMBER)
  dropAdministracionManagers = e => this.drop(e, areas.ADMINISTRACION, roles.ADMIN)
  dropAdministracion = e => this.drop(e, areas.ADMINISTRACION, roles.MEMBER)
  dropOperacionesManagers = e => this.drop(e, areas.OPERACIONES, roles.ADMIN)
  dropOperaciones = e => this.drop(e, areas.OPERACIONES, roles.MEMBER)

  drop = (e, area, role) => {
    e.preventDefault()
    let user = undefined
    try {
      user = JSON.parse(e.dataTransfer.getData('text'))
      user.area = area
      user.role = role
      this.props.updateUserProfile(user)
    } catch (e) {
      return
    }
  }

  render() {
    const {
      usersToAssign,
      allReports,
      topografiaManagers,
      topografia,
      geomaticaManagers,
      geomatica,
      administracionManagers,
      administracion,
      operacionesManagers,
      operaciones,
      usersList,
    } = this.props
    if (!usersList || !Object.keys(usersList).length) return null

    return (
      <div className="flex-column manage-users">
        <fieldset className="flex-row users-unassigned">
          <legend>Usuarios por asignar</legend>
          <div
            className="flex-row users-unassigned"
            onDragOver={this.preventDefault}
            onDrop={this.dropUsersToAssign}
          >
            {usersToAssign.map((u, k) => {
              return (
                <div
                  key={`user_${k}`}
                  className="user-element flex-center"
                  draggable="true"
                  onDragStart={e => this.dragStart(e, u)}
                >
                  <div>{u.nickname}</div>
                  <img src={u.picture} alt={'profile pic'} />
                </div>
              )
            })}
          </div>
        </fieldset>
        <div className="flex-row">
          <div className="flex-row">
            <fieldset className="areas-group">
              <legend>Todos los reportes</legend>
              <fieldset
                className="areas-group-miembros"
                onDragOver={this.preventDefault}
                onDrop={this.dropAllReports}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {allReports.map((u, k) => {
                    return (
                      <div
                        key={`user_${k}`}
                        className="user-element flex-center"
                        draggable="true"
                        onDragStart={e => this.dragStart(e, u)}
                      >
                        <div>{u.nickname}</div>
                        <img src={u.picture} alt={'profile pic'} />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="areas-group">
              <legend>Topografia</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropTopografiaManagers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {topografiaManagers.map((u, k) => {
                    return (
                      <div
                        key={`user_${k}`}
                        className="user-element flex-center"
                        draggable="true"
                        onDragStart={e => this.dragStart(e, u)}
                      >
                        <div>{u.nickname}</div>
                        <img src={u.picture} alt={'profile pic'} />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
              <fieldset
                className="areas-group-miembros"
                onDragOver={this.preventDefault}
                onDrop={this.dropTopografia}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {topografia.map((u, k) => {
                    return (
                      <div
                        key={`user_${k}`}
                        className="user-element flex-center"
                        draggable="true"
                        onDragStart={e => this.dragStart(e, u)}
                      >
                        <div>{u.nickname}</div>
                        <img src={u.picture} alt={'profile pic'} />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="areas-group">
              <legend>Geomatica</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropGeomaticaManagers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {geomaticaManagers.map((u, k) => {
                    return (
                      <div
                        key={`user_${k}`}
                        className="user-element flex-center"
                        draggable="true"
                        onDragStart={e => this.dragStart(e, u)}
                      >
                        <div>{u.nickname}</div>
                        <img src={u.picture} alt={'profile pic'} />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
              <fieldset
                className="areas-group-miembros"
                onDragOver={this.preventDefault}
                onDrop={this.dropGeomatica}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {geomatica.map((u, k) => {
                    return (
                      <div
                        key={`user_${k}`}
                        className="user-element flex-center"
                        draggable="true"
                        onDragStart={e => this.dragStart(e, u)}
                      >
                        <div>{u.nickname}</div>
                        <img src={u.picture} alt={'profile pic'} />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="areas-group">
              <legend>Administracion</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropAdministracionManagers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {administracionManagers.map((u, k) => {
                    return (
                      <div
                        key={`user_${k}`}
                        className="user-element flex-center"
                        draggable="true"
                        onDragStart={e => this.dragStart(e, u)}
                      >
                        <div>{u.nickname}</div>
                        <img src={u.picture} alt={'profile pic'} />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
              <fieldset
                className="areas-group-miembros"
                onDragOver={this.preventDefault}
                onDrop={this.dropAdministracion}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {administracion.map((u, k) => {
                    return (
                      <div
                        key={`user_${k}`}
                        className="user-element flex-center"
                        draggable="true"
                        onDragStart={e => this.dragStart(e, u)}
                      >
                        <div>{u.nickname}</div>
                        <img src={u.picture} alt={'profile pic'} />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="areas-group">
              <legend>Operaciones</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropOperacionesManagers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {operacionesManagers.map((u, k) => {
                    return (
                      <div
                        key={`user_${k}`}
                        className="user-element flex-center"
                        draggable="true"
                        onDragStart={e => this.dragStart(e, u)}
                      >
                        <div>{u.nickname}</div>
                        <img src={u.picture} alt={'profile pic'} />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
              <fieldset
                className="areas-group-miembros"
                onDragOver={this.preventDefault}
                onDrop={this.dropOperaciones}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {operaciones.map((u, k) => {
                    return (
                      <div
                        key={`user_${k}`}
                        className="user-element flex-center"
                        draggable="true"
                        onDragStart={e => this.dragStart(e, u)}
                      >
                        <div>{u.nickname}</div>
                        <img src={u.picture} alt={'profile pic'} />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
            </fieldset>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => {
  const usersList = data.usersList

  let usersToAssign = []
  let allReports = []
  let topografiaManagers = []
  let topografia = []
  let geomaticaManagers = []
  let geomatica = []
  let administracionManagers = []
  let administracion = []
  let operacionesManagers = []
  let operaciones = []

  if (usersList && usersList.length > 0) {
    usersToAssign = usersList.filter(u => !u.area)
    allReports = usersList.filter(u => u.area === areas.ALL_REPORTS && u.role === roles.ADMIN)
    topografiaManagers = usersList.filter(
      u => u.area === areas.TOPOGRAFIA && u.role === roles.ADMIN,
    )
    topografia = usersList.filter(u => u.area === areas.TOPOGRAFIA && u.role !== roles.ADMIN)
    geomaticaManagers = usersList.filter(u => u.area === areas.GEOMATICA && u.role === roles.ADMIN)
    geomatica = usersList.filter(u => u.area === areas.GEOMATICA && u.role !== roles.ADMIN)
    administracionManagers = usersList.filter(
      u => u.area === areas.ADMINISTRACION && u.role === roles.ADMIN,
    )
    administracion = usersList.filter(
      u => u.area === areas.ADMINISTRACION && u.role !== roles.ADMIN,
    )
    operacionesManagers = usersList.filter(
      u => u.area === areas.OPERACIONES && u.role === roles.ADMIN,
    )
    operaciones = usersList.filter(u => u.area === areas.OPERACIONES && u.role !== roles.ADMIN)
  }

  return {
    usersList,
    usersToAssign,
    allReports,
    topografiaManagers,
    topografia,
    geomaticaManagers,
    geomatica,
    administracionManagers,
    administracion,
    operacionesManagers,
    operaciones,
  }
}

const mapDispatchToProps = dispatch => ({
  listUsers: () => dispatch(listUsersAction()),
  updateUserProfile: user => dispatch(updateUserProfileAction(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
