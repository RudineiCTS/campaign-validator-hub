export interface IPharmaCampign{
  idCampanha: number;
  campanha: string;
  competencia: string | Date;
  dataInicio: string | Date;
  dataFim: string | Date;
  calculo: string;
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

export interface ReturnCampaign {
  Campaign: Array<IPharmaCampign|ITelesalesCampaing|any>
}

export interface dtoParametersCampaign {
  dataCompetencia:string| Date, 
  isToSearchCampaingToFeed:number,
  isToSearchCampaingToPharma: number,
  isToSearchToTelesales: number
}
