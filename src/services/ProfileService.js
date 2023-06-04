import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
// import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
  async getProfileById(id) {
    const res = await api.get('api/profiles/'+ id)
    AppState.activeProfile = new Profile(res.data)
    // logger.log('[PROFILE]', res.data)
  }
  async changePage(url) {
    const res = await api.get(url);
    // logger.log(res.data);
    AppState.posts = res.data.posts.map(p=> new Post(p));
    AppState.older = res.data.older;
    AppState.newer = res.data.newer;
  }
}

export const profileService = new ProfileService()