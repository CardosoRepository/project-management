import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Button } from "./Button";

export const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialogRef = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialogRef.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialogRef} className="backdrop:bg-stone-900/90 p-4 rounded shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById("modal-root")
    );
});
