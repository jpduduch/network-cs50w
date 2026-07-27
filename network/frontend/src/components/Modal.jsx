import { createPortal } from 'react-dom';
import Button from './Button';

function Modal({ title, children }) {
    return createPortal(
        <div className="modal fade show" tabIndex={-1} style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="close"
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <Button label="Close" hierarchy="secondary" />
                        <Button label="Save changes" hierarchy="primary" />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
