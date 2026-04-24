import { StatsCard } from "@/components/dashboard/StatsCard";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { RulesList } from "@/components/dashboard/RulesList";
import { DivergenceTable } from "@/components/dashboard/DivergenceTable";
import { ValidationPanel } from "@/components/dashboard/ValidationPanel";
import { ReportsSection } from "@/components/dashboard/ReportsSection";
import { Button } from "@/components/ui/button";
import {
  Database,
  TrendingUp,
  Pickaxe,
} from "lucide-react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { formatDateToSQL } from "@/utils/convertedDate";
import { CampaignRow, dtoParametersCampaign, IPharmaCampign } from "@/interfaces/TypeCampaign";
import service from '../service/service'
import serviceTest from "@/service/service.test";
import { HeaderDash } from "@/components/dashboard/HeaderDashBoard";
import { ContainerRadioButton } from "@/components/dashboard/ContainerRadioButton";
import { Modal } from "@/components/modal/ModalComponents";
import { Input } from "@/components/ui/input";


interface CategoryCampaign{
  campaignPharma: boolean,
  campaignTeleSeller:boolean,
  campignFeed: boolean
}

const Index = () => {
  const [competencyDate, setCompetencyDate]= useState<string>();
  const [categoryCampaign, setCategoryCampaign] = useState<CategoryCampaign>({ 
    campaignPharma:false,
    campaignTeleSeller: false,
    campignFeed:false
  }as CategoryCampaign);
  const [campaignPharma, SetCampaignPharma] = useState<CampaignRow[]>([]);
  // const [campaignTelesale, SetCampaignTelesale] = useState<CampaignRow[]>([]);

  const SelectedCampaignToSearch =(typeCampaign: keyof CategoryCampaign)=>{
    setCategoryCampaign(prev =>({
      ...prev,
      [typeCampaign]: !prev[typeCampaign]
    }))
  }

  const SelectedCompetencyDate = (value:Date)=>{    
    const dateFormated = formatDateToSQL(value);
    console.log(dateFormated);
    setCompetencyDate(dateFormated);
  }

  const CarregaCampanhas = async() =>{
    SetCampaignPharma([]);
    if(competencyDate === null){
      return;
    }
    try {
          const dataToSearch: dtoParametersCampaign = {
            dataCompetencia: competencyDate,
            isToSearchCampaingToPharma: categoryCampaign.campaignPharma === true ? 1 : 0,
            isToSearchCampaingToFeed:categoryCampaign.campignFeed === true ? 1 : 0,
            isToSearchToTelesales: categoryCampaign.campaignTeleSeller === true ? 1 : 0
          }

        // const campaign = await service.post('/api/campanhas',{
        //   competencyDate:dataToSearch.dataCompetencia,
        //   isToSearchCampaingToFeed:dataToSearch.isToSearchCampaingToFeed,
        //   isToSearchCampaingToPharma:dataToSearch.isToSearchCampaingToPharma,
        //   isToSearchToTelesales:dataToSearch.isToSearchToTelesales          
        // });
      
        // const campanhas =  campaign.data as CampaignRow[]
          
        const campaign = await serviceTest.get(
          "https://raw.githubusercontent.com/RudineiCTS/campaign-validator-hub/main/src/test/campanhas.json"
        );
        console.log(campaign)
    } catch (error) {
      console.log("erro")
    }    
    
  }
function CarregaDataTable(campanhas: CampaignRow[]) {


  console.log(campaignPharma);
}
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     <Modal isOpen={true} onClose={() => console.log()}>
        <h2 className="text-xl font-bold">Campanha teste</h2>
        <div className="mt-2">
          <ul className="flex gap-4 ">
            <li className="border-cyan-200 px-2 py-1 border-solid border-2 rounded-xl">Premio</li>
            <li className="border-cyan-200 px-2 py-1 border-solid border-2 rounded-xl">Produtos</li>
            <li className="border-cyan-200 px-2 py-1 border-solid border-2 rounded-xl">Clientes Participantes</li>            
          </ul>
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
        
      </Modal>
    <div className="min-h-screen bg-background">
      <HeaderDash/>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Visão Geral - Stats Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatsCard
              title="Campanhas Cadastradas"
              value="48"
              icon={TrendingUp}
              description="Campanhas processadas"
              variant="default"
            />           
          </div>
        </section>

        {/* Parâmetros das Campanhas */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Parâmetros das Campanhas</h2>
          <h3 className="text-muted-foreground mb-4">Selecione o filtro</h3>
          <div className="mt-4 ">
            <DatePicker
              label="Data de competência" 
              slotProps={{
                textField:{
                  size: "small"                
                }
              }}
              onChange={(e)=>SelectedCompetencyDate(e.toDate())}
            />
          </div>
          <div className="flex flex-row items-start gap-8 my-3">
          <ContainerRadioButton

          />
            {/* botao de carregar campanhas */}
            <div className="ml-auto">
              <Button size="sm" onClick={CarregaCampanhas}>
                <Pickaxe className="h-4 w-4 mr-2" />
                Carregar tabela
              </Button>
            </div>            
          </div>
          <CampaignTable data={campaignPharma as IPharmaCampign[]}/>
        </section>

        {/* Regras de Validação */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Regras de Validação</h2>
          <RulesList />
        </section>

      </main>
    </div>
  </LocalizationProvider>
  );
};

export default Index;
