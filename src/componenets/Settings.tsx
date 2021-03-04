import React, { useContext } from 'react'
import { ReactComponent as Mine } from '../assets/mine.svg'
import { GlobalContext, GlobalState } from './GlobalOptions'
import Modal from './Modal'

export default function Settings() {
  const { modalShow, setModalShow } = useContext(GlobalContext) as GlobalState

  return (
    <div className="header__settings"  onClick={() => setModalShow(true)}>
      <Mine />
      <Modal show={modalShow} setShow={setModalShow}>
        <div className="settings">
          {modalShow}
        </div>
      </Modal>
    </div>
  )
}