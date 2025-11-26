import { CampaignRepository } from "../repositories/CampaignRepositories";

export class CampaignService {
  private repository = new CampaignRepository();

  async listAll() {
    const campaigns = await this.repository.getCampaigns();

    return campaigns.map(c => ({
      ...c,
      status: c.totalValue === c.individualSum ? "OK" : "DIVERGENTE"
    }));
  }

  async getOne(id: number) {
    const campaign = await this.repository.getCampaignById(id);

    if (!campaign) {
      throw new Error("Campanha não encontrada.");
    }

    return campaign;
  }
}
