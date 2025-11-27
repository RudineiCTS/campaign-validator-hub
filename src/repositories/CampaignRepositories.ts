import sql from "mssql";
import { sqlConfig } from "../config/database";
import { dtoParametersCampaign, ReturnCampaign } from "@/interfaces/TypeCampaign";

export class CampaignRepository {
  async getCampaigns(data: dtoParametersCampaign) {
    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("INdatDataCompetencia", data.dataCompetencia)
      .input("INbitBuscaCampanhaAlimentar", data.isToSearchCampaingToFeed)
      .input("INbitBuscaCampanhaFarma", data.isToSearchCampaingToPharma)
      .input("INbitBuscaCampanhaTelevendas", data.isToSearchToTelesales)
      .execute("uspSysBuscaCampanhaPorCategoria");

    
    return result.recordset as ReturnCampaign;
  }

  async getCampaignById(id: number) {
    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("IDCampanha", sql.Int, id)
      .execute("usp_BuscarCampanhaPorID");

    return result.recordset[0];
  }
  async getCampaignByCatergory(){

  }
}


// https://chatgpt.com/share/692763e1-823c-8013-8bf5-9fa76b4a84ba