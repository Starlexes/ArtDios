

export interface ModalOrderCallProps {
    className?: string | undefined,
    isOpen: boolean,
    closeModal: (isSubmit: boolean) => void,
    commentPlaceholder?: string
}

