export interface IPharmaCampign{
  type:string,
  idCampanha: number;
  campanha: string;
  competencia: string | Date;
  dataInicio: string | Date;
  dataFim: string | Date;
  Calculo: string;
  apuracao: string;
  objetivo: number;
  meta: string;
  ranking: string;
  valor: string;
  premiacaoTotal: number;
  recebimentoPremiacao: string;
  situacao: string;
}

export interface ITelesalesCampaing {
  type:string,
  idCampanha: number;
  campanha: string;
  dataInicio: string | Date;
  dataFim: string | Date;
  competencia: string | Date;
  tipoCampanha: 'POSITIVAÇÃO' | 'VENDAS' | 'QUANTIDADE VENDIDA' | 'POSITIVAÇÃO ESPECÍFICA';
  metaValor: number;
  regraValidacao: string;
  calculo: string;
  consideraExclusiva: 'SIM' | 'NÃO';
}


export interface dtoParametersCampaign {
  dataCompetencia:string| Date, 
  isToSearchCampaingToFeed:number,
  isToSearchCampaingToPharma: number,
  isToSearchToTelesales: number
}


export interface ReturnCampaign {
  Campaigns: CampaignRow[];
}

export type CampaignRow =
  | IPharmaCampign
  | ITelesalesCampaing

