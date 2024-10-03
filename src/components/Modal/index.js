import styles from './styles.module.scss';
import React, { forwardRef } from 'react';

const Modal = forwardRef(({ children, ...props }, ref) => {
    return (
        <div ref={ref} className="modal" {...props}>
            {children}
        </div>
    );
});

export default Modal;
