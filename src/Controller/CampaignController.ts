import { dtoParametersCampaign } from "@/interfaces/TypeCampaign";
import { CampaignRepository } from "../repositories/CampaignRepositories";


export class CampaignController {
  private repository = new CampaignRepository();

  async listAll(data:dtoParametersCampaign) {
    const campaigns = await this.repository.getCampaigns(data)
    return campaigns
  }

  async getOne(id: number) {
    const campaign = await this.repository.getCampaignById(id);

    if (!campaign) {
      throw new Error("Campanha não encontrada.");
    }

    return campaign;
  }
}
