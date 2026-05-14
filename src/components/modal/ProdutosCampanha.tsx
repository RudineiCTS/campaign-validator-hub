import { Button } from "../ui/button";
import { Carousel } from "../ui/carousel";
import { Input } from "../ui/input";

export function ProdutosCampanha(){
  return(
    <>
    <div className="flex flex-col gap-3 mt-3">

      <h2>Produtos Participantes</h2>
      <div className="flex flex-col">
        <label> Pesquise um produto:</label>
        <Input/>

        <div className="flex flex-col">                    
          <h4>Fabricantes:</h4>
          <div>
            <div>
              {`${"1"} - ${"Nome Fabricante"}`}
            </div>
          </div>
          <div>
            <h4>Linha Produtos:</h4>
            <div>
               {`${"1"} - ${"Nome Fabricante"}`}
            </div>
          </div>
          <div>
            <h4>Produtos</h4>
            <ul className="flex gap-3">
              <li> 12312</li>
              <li>12211</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}