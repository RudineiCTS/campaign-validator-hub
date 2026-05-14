import { Input } from "../ui/input";

export function ParametrosCampanha(){
  return(
    <>
        <div className="mt-2">
          
          <div className="mt-3 ">
            <h3 className="font-semibold">Parametros Base</h3>
            <div className="flex flex-col gap-4">

            
            <div className="flex gap-4">
              <div>
                <label className="font-normal text-gray-700">
                  Fabricantes
                  <Input 
                    value={"1 ;3 ;5"}
                    />
                </label>
              </div>
              <div>
                <label className="font-normal text-gray-700">
                  Linha de Produtos
                  <Input 
                    value={"1 ;3 ;5"}
                    />
                </label>
              </div>
            </div>
            
            <div>
                <label className="font-normal text-gray-700">
                  Tipo Meta
                  <Input 
                    value={"1 ;3 ;5"}
                    />
                </label>
              </div>
              <div>
                <label className="font-normal text-gray-700">
                  Tipo de Apuração
                  <Input 
                    value={"1 ;3 ;5"}
                    />
                </label>
              </div>         
            </div>
          </div>
        </div>
    </>
  )
}