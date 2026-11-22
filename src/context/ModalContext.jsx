import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ModalContext = createContext({
  activeModal: null,
  modalData: {},
  openModal: () => {},
  closeModal: () => {},
})

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null)
  const [modalData, setModalData] = useState({})

  const openModal = useCallback((type, data = {}) => {
    setActiveModal(type)
    setModalData(data)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
    setModalData({})
  }, [])

  // Lock background scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [activeModal])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeModal, closeModal])

  return (
    <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
