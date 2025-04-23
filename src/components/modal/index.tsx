import { ModalProps } from "../../types/modalProps";

export function Modal({ show, onClose, children }: ModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 h-full"  >
            <div className="relative bg-white w-full max-w-[95%] md:max-w-[50%] max-h-[95%] rounded-md shadow-2xl p-5 h-[98vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-1 right-4 mb-8 text-gray-400 hover:text-gray-700 text-4xl font-bold transition"
                    aria-label="Fechar"
                >
                    &times;
                </button>

                <div className="mt-4 w-full">{children}</div>
            </div>
        </div>
    );
}
