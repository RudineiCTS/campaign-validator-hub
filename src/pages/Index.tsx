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
import { dtoParametersCampaign } from "@/interfaces/TypeCampaign";
import { CampaignController } from "@/Controller/CampaignController";


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
    
    const dataToSearch: dtoParametersCampaign = {
      dataCompetencia: competencyDate,
      isToSearchCampaingToPharma: categoryCampaign.campaignPharma === true ? 1 : 0,
      isToSearchCampaingToFeed:categoryCampaign.campignFeed === true ? 1 : 0,
      isToSearchToTelesales: categoryCampaign.campaignTeleSeller === true ? 1 : 0
    }

    const  campaignController = new CampaignController();

    const campaign = await campaignController.listAll(dataToSearch)
    console.log(campaign)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Dashboard de Validação de Campanhas
              </h1>
              <p className="text-muted-foreground mt-1">
                Valide e monitore suas campanhas em tempo real
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">SQL Conectado</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Visão Geral - Stats Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatsCard
              title="Total Analisadas"
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
          <h3 className="text-lg font-semibold mb-4">Quais campanhas você quer validar?</h3>
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
            <div className="flex gap-2 justify-center items-center">
              <input type="checkbox" name="campaignTeleSeller" onChange={(e)=>SelectedCampaignToSearch(e.target.name as keyof CategoryCampaign)} checked={categoryCampaign.campaignTeleSeller}/>
              <p className="text-center">Campanha Televendas</p>
            </div>
             <div className="flex gap-2 justify-center items-center">
              <input type="checkbox" name="campignFeed" onChange={(e)=>SelectedCampaignToSearch(e.target.name as keyof CategoryCampaign)} checked={categoryCampaign.campignFeed}/>
              <p className="text-center">Campanha Alimentar</p>
            </div>
             <div className="flex gap-2 justify-center items-center">
              <input type="checkbox" name="campaignPharma"  onChange={(e)=>SelectedCampaignToSearch(e.target.name as keyof CategoryCampaign)} checked={categoryCampaign.campaignPharma}/>
              <p className="text-center">Campanha Farma</p>
            </div>
            {/* botao de carregar campanhas */}
            <div className="ml-auto">
              <Button size="sm" onClick={CarregaCampanhas}>
                <Pickaxe className="h-4 w-4 mr-2" />
                Carregar tabela
              </Button>
            </div>            
          </div>
          <CampaignTable />
        </section>

        {/* Regras de Validação */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Regras de Validação</h2>
          <RulesList />
        </section>

        {/* Divergências */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Divergências Identificadas</h2>
          <DivergenceTable />
        </section>

        {/* Execução de Validação */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Executar Validação</h2>
          <ValidationPanel />
        </section>

        {/* Relatórios */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Relatórios e Histórico</h2>
          <ReportsSection />
        </section>
      </main>
    </div>
  </LocalizationProvider>
  );
};

export default Index;
