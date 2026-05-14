import { ReactNode } from "react";
import { Input } from "../ui/input";
import { ParametrosCampanha } from "./ParametrosCampaignModal";
import { ProdutosCampanha } from "./ProdutosCampanha";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
       <div className="relative bg-white rounded-2xl p-6 shadow-lg z-10 min-w-[300px]">
        <h2 className="text-xl font-bold mb-4">Campanha teste</h2>
          <ul className="flex gap-4 ">
            <li 
              className={`border-cyan-200 px-2 py-1 border-solid border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:border-cyan-400 ${1 === 1 && "border-cyan-700  bg-cyan-100"} `}>
              Parametros 
            </li>
            <li className="border-cyan-200 px-2 py-1 border-solid border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:border-cyan-400">
              Premio
            </li>
            <li className="border-cyan-200 px-2 py-1 border-solid border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:border-cyan-400">
              Produtos
            </li>
            <li className="border-cyan-200 px-2 py-1 border-solid border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:border-cyan-400">
              Clientes Participantes
            </li>            
          </ul>
      {/* Conteúdo */}
        
                
        {/* {children} */}
        {/* <ParametrosCampanha /> */}
        <ProdutosCampanha/>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Fechar
        </button>
        </div>
    </div>
  );
}