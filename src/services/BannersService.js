import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js"

class BannersService {
  async getAds(){
    const res = await api.get('api/ads')
    AppState.ads = res.data;
    logger.log('ADS', res.data)
  }
   
}

export const bannersService = new BannersService()