import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  listUsers as listUsersAction,
  updateUserProfile as updateUserProfileAction,
} from '../actions'
import { areas } from './constants'

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

  dropAllReports = e => this.drop(e, areas.TODAS_LAS_AREAS.key, roles.ADMIN)
  dropUsersToAssign = e => this.drop(e, '', '')
  dropTopografiaManagers = e => this.drop(e, areas.TOPOGRAFIA.key, roles.ADMIN)
  dropTopografia = e => this.drop(e, areas.TOPOGRAFIA.key, roles.MEMBER)
  dropGeomaticaManagers = e => this.drop(e, areas.GEOMATICA.key, roles.ADMIN)
  dropGeomatica = e => this.drop(e, areas.GEOMATICA.key, roles.MEMBER)
  dropAdministracionManagers = e => this.drop(e, areas.ADMINISTRACION.key, roles.ADMIN)
  dropAdministracion = e => this.drop(e, areas.ADMINISTRACION.key, roles.MEMBER)
  dropOperacionesManagers = e => this.drop(e, areas.OPERACIONES_AEREAS.key, roles.ADMIN)
  dropOperaciones = e => this.drop(e, areas.OPERACIONES_AEREAS.key, roles.MEMBER)
  dropMarketingManagers = e => this.drop(e, areas.MARKETING_COMERCIAL.key, roles.ADMIN)
  dropMarketing = e => this.drop(e, areas.MARKETING_COMERCIAL.key, roles.MEMBER)
  dropSeguridadManagers = e => this.drop(e, areas.SEGURIDAD_HSEC.key, roles.ADMIN)
  dropSeguridad = e => this.drop(e, areas.SEGURIDAD_HSEC.key, roles.MEMBER)
  dropQuellavecoGlobalManagers = e => this.drop(e, areas.QUELLAVECO_GLOBAL.key, roles.ADMIN)
  dropQuellavecoGlobal = e => this.drop(e, areas.QUELLAVECO_GLOBAL.key, roles.MEMBER)
  dropQuellavecoAdmManagers = e => this.drop(e, areas.QUELLAVECO_ADMINISTRACION.key, roles.ADMIN)
  dropQuellavecoAdm = e => this.drop(e, areas.QUELLAVECO_ADMINISTRACION.key, roles.MEMBER)
  dropQuellaveco1000Managers = e => this.drop(e, areas.QUELLAVECO_1000.key, roles.ADMIN)
  dropQuellaveco1000 = e => this.drop(e, areas.QUELLAVECO_1000.key, roles.MEMBER)
  dropQuellaveco2000Managers = e => this.drop(e, areas.QUELLAVECO_2000.key, roles.ADMIN)
  dropQuellaveco2000 = e => this.drop(e, areas.QUELLAVECO_2000.key, roles.MEMBER)
  dropQuellaveco3000Managers = e => this.drop(e, areas.QUELLAVECO_3000.key, roles.ADMIN)
  dropQuellaveco3000 = e => this.drop(e, areas.QUELLAVECO_3000.key, roles.MEMBER)
  dropQuellaveco4000Managers = e => this.drop(e, areas.QUELLAVECO_4000.key, roles.ADMIN)
  dropQuellaveco4000 = e => this.drop(e, areas.QUELLAVECO_4000.key, roles.MEMBER)
  dropQuellaveco5000Managers = e => this.drop(e, areas.QUELLAVECO_5000.key, roles.ADMIN)
  dropQuellaveco5000 = e => this.drop(e, areas.QUELLAVECO_5000.key, roles.MEMBER)

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
      marketingManagers,
      marketing,
      seguridadManagers,
      seguridad,
      quellavecoGlobalManagers,
      quellavecoAdmManagers,
      quellavecoAdm,
      quellaveco1000Managers,
      quellaveco1000,
      quellaveco2000Managers,
      quellaveco2000,
      quellaveco3000Managers,
      quellaveco3000,
      quellaveco4000Managers,
      quellaveco4000,
      quellaveco5000Managers,
      quellaveco5000,
      usersList,
      isAllReports,
    } = this.props
    if (!isAllReports) return null
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
          <div className="flex-row areaWrapper">
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
              <legend>Operaciones Aereas</legend>
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
            <fieldset className="areas-group">
              <legend>Marketing y Comercial</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropMarketingManagers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {marketingManagers.map((u, k) => {
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
                onDrop={this.dropMarketing}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {marketing.map((u, k) => {
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
              <legend>Seguridad HSEC</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropSeguridadManagers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {seguridadManagers.map((u, k) => {
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
                onDrop={this.dropSeguridad}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {seguridad.map((u, k) => {
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
              <legend>Quellaveco</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropQuellavecoGlobalManagers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {quellavecoGlobalManagers.map((u, k) => {
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
              <legend>Quellaveco Administracion</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropQuellavecoAdmManagers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {quellavecoAdmManagers.map((u, k) => {
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
                onDrop={this.dropQuellavecoAdm}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {quellavecoAdm.map((u, k) => {
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
              <legend>Quellaveco 1000</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropQuellaveco1000Managers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {quellaveco1000Managers.map((u, k) => {
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
                onDrop={this.dropQuellaveco1000}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {quellaveco1000.map((u, k) => {
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
              <legend>Quellaveco 2000</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropQuellaveco2000Managers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {quellaveco2000Managers.map((u, k) => {
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
                onDrop={this.dropQuellaveco2000}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {quellaveco2000.map((u, k) => {
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
              <legend>Quellaveco 3000</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropQuellaveco3000Managers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {quellaveco3000Managers.map((u, k) => {
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
                onDrop={this.dropQuellaveco3000}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {quellaveco3000.map((u, k) => {
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
              <legend>Quellaveco 4000</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropQuellaveco4000Managers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {quellaveco4000Managers.map((u, k) => {
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
                onDrop={this.dropQuellaveco4000}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {quellaveco4000.map((u, k) => {
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
              <legend>Quellaveco 5000</legend>
              <fieldset
                className="areas-group-jefes"
                onDragOver={this.preventDefault}
                onDrop={this.dropQuellaveco5000Managers}
              >
                <legend>jefes</legend>
                <div className="jefes">
                  {quellaveco5000Managers.map((u, k) => {
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
                onDrop={this.dropQuellaveco5000}
              >
                <legend>miembros</legend>
                <div className="miembros">
                  {quellaveco5000.map((u, k) => {
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

const mapStateToProps = ({ data }, ownProps) => {
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
  let marketingManagers = []
  let marketing = []
  let seguridadManagers = []
  let seguridad = []
  let quellavecoGlobalManagers = []
  let quellavecoGlobal = []
  let quellavecoAdmManagers = []
  let quellavecoAdm = []
  let quellaveco1000Managers = []
  let quellaveco1000 = []
  let quellaveco2000Managers = []
  let quellaveco2000 = []
  let quellaveco3000Managers = []
  let quellaveco3000 = []
  let quellaveco4000Managers = []
  let quellaveco4000 = []
  let quellaveco5000Managers = []
  let quellaveco5000 = []

  const getAdmins = area => usersList.filter(u => u.area === area && u.role === roles.ADMIN)
  const getMembers = area => usersList.filter(u => u.area === area && u.role !== roles.ADMIN)

  if (usersList && usersList.length > 0) {
    usersToAssign = usersList.filter(u => !u.area)
    allReports = getAdmins(areas.TODAS_LAS_AREAS.key)

    topografiaManagers = getAdmins(areas.TOPOGRAFIA.key)
    topografia = getMembers(areas.TOPOGRAFIA.key)

    geomaticaManagers = getAdmins(areas.GEOMATICA.key)
    geomatica = getMembers(areas.GEOMATICA.key)

    administracionManagers = getAdmins(areas.ADMINISTRACION.key)
    administracion = getMembers(areas.ADMINISTRACION.key)

    operacionesManagers = getAdmins(areas.OPERACIONES_AEREAS.key)
    operaciones = getMembers(areas.OPERACIONES_AEREAS.key)

    marketingManagers = getAdmins(areas.MARKETING_COMERCIAL.key)
    marketing = getMembers(areas.MARKETING_COMERCIAL.key)

    seguridadManagers = getAdmins(areas.SEGURIDAD_HSEC.key)
    seguridad = getMembers(areas.SEGURIDAD_HSEC.key)

    quellavecoGlobalManagers = getAdmins(areas.QUELLAVECO_GLOBAL.key)
    quellavecoGlobal = getMembers(areas.QUELLAVECO_GLOBAL.key)

    quellavecoAdmManagers = getAdmins(areas.QUELLAVECO_ADMINISTRACION.key)
    quellavecoAdm = getMembers(areas.QUELLAVECO_ADMINISTRACION.key)

    quellaveco1000Managers = getAdmins(areas.QUELLAVECO_1000.key)
    quellaveco1000 = getMembers(areas.QUELLAVECO_1000.key)

    quellaveco2000Managers = getAdmins(areas.QUELLAVECO_2000.key)
    quellaveco2000 = getMembers(areas.QUELLAVECO_2000.key)

    quellaveco3000Managers = getAdmins(areas.QUELLAVECO_3000.key)
    quellaveco3000 = getMembers(areas.QUELLAVECO_3000.key)

    quellaveco4000Managers = getAdmins(areas.QUELLAVECO_4000.key)
    quellaveco4000 = getMembers(areas.QUELLAVECO_4000.key)

    quellaveco5000Managers = getAdmins(areas.QUELLAVECO_5000.key)
    quellaveco5000 = getMembers(areas.QUELLAVECO_5000.key)
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
    marketingManagers,
    marketing,
    seguridadManagers,
    seguridad,
    quellavecoGlobalManagers,
    quellavecoGlobal,
    quellavecoAdmManagers,
    quellavecoAdm,
    quellaveco1000Managers,
    quellaveco1000,
    quellaveco2000Managers,
    quellaveco2000,
    quellaveco3000Managers,
    quellaveco3000,
    quellaveco4000Managers,
    quellaveco4000,
    quellaveco5000Managers,
    quellaveco5000,
    isAllReports: ownProps.user.role === 'ADMIN' && ownProps.user.area === 'TODAS_LAS_AREAS',
  }
}

const mapDispatchToProps = dispatch => ({
  listUsers: () => dispatch(listUsersAction()),
  updateUserProfile: user => dispatch(updateUserProfileAction(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
