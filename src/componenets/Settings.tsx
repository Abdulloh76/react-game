import React, { useContext } from 'react'
import { ReactComponent as SettingsIcon } from '../assets/settings.svg'
import { GlobalContext, GlobalState } from './GlobalOptions'
import Modal from './Modal'

export default function Settings() {
  const { modalShow, setModalShow } = useContext(GlobalContext) as GlobalState

  return (
    <div className="header__settings"  onClick={() => setModalShow(true)}>
      <SettingsIcon />
      <Modal title="Options" show={modalShow} setShow={setModalShow}>
        <div className="settings">
          {modalShow}
        </div>
      </Modal>
    </div>
  )
}