import './Modal.css';

type Props = {
  message: string,
};

export const Modal: React.FC<Props>  = ({ message }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;