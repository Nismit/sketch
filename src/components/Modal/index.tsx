type Props = {
  isActive: boolean;
  toggleModal: (state: boolean) => void;
  children: JSX.Element;
  preventClose?: boolean;
};

export const Modal = ({
  isActive,
  toggleModal,
  children,
  preventClose,
}: Props) => {
  if (!isActive) {
    return null;
  }

  return (
    <div
      className="modal__overlay"
      onClick={() => !preventClose && toggleModal(false)}
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
