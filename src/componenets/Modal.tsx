import React, { useEffect } from 'react'

interface Props {
  title: string;
  children: JSX.Element;
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function Modal({ title, children, show, setShow }: Props) {
  const closeByEsc = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      setShow(false);
    }
  }
  
  useEffect(() => {
    document.addEventListener('keydown', closeByEsc)
    return () => document.removeEventListener('keydown', closeByEsc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!show) return null
  
  return (
    <div className="modal" onClick={() => setShow(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="close-modal" onClick={() => setShow(false)}>Close</button>
        </div>
      </div>
    </div>
  )
}