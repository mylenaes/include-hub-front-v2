import { useEffect, useId } from "react";

interface ModalProps {
  titulo: string;
  onFechar: () => void;
  children: React.ReactNode;
}

const Modal = ({ titulo, onFechar, children }: ModalProps) => {
  const tituloId = useId();

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [onFechar]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        className="w-full max-w-[560px] rounded-2xl border border-white/20 bg-[#2A2E42] p-8"
      >
        <h2 id={tituloId} className="mb-6 text-2xl font-bold text-white">
          {titulo}
        </h2>
        {children}
      </div>
    </div>
  );
};
export default Modal;