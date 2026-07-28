import { createPortal } from 'react-dom';
import Button from './Button';

function Modal({ title, primaryAction, onClose, children }) {
    return createPortal(
        <div className="modal fade show" tabIndex={-1} style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <Button label="Close" hierarchy="secondary" onClick={onClose} />
                        <Button label="Save changes" hierarchy="primary" onClick={primaryAction} />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
