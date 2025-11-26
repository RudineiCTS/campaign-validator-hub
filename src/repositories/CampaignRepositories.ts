import sql from "mssql";
import { sqlConfig } from "../config/database";

export class CampaignRepository {
  async getCampaigns() {
    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .execute("usp_ListarCampanhas");

    return result.recordset;
  }

  async getCampaignById(id: number) {
    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("IDCampanha", sql.Int, id)
      .execute("usp_BuscarCampanhaPorID");

    return result.recordset[0];
  }
}


https://chatgpt.com/share/692763e1-823c-8013-8bf5-9fa76b4a84ba