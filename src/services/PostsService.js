import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "../models/Post.js";

class PostsService{
  
    async getPosts(){
      const res = await api.get('api/posts')
      // logger.log(res.data)
      AppState.posts = res.data.posts.map(p=> new Post(p));
      AppState.older = res.data.older;
      AppState.newer = res.data.newer;

      logger.log('POSTS', res.data)
      
    
  }
  async changePage(url) {
    const res = await api.get(url);
    logger.log('POSTs',res.data);
    AppState.posts = res.data.posts.map(p=> new Post(p));
    AppState.older = res.data.older;
    AppState.newer = res.data.newer;
  }
  async getPostsByProfile(id) {
    AppState.posts = []
    const res = await api.get('/api/posts', {
      params: {
        creatorId: id
      }
    })
    AppState.posts = res.data.posts.map(p=> new Post(p));
    AppState.older = res.data.older;
    AppState.newer = res.data.newer;
    // logger.log('PROFILE', res.data)
}
}


export const postsService = new PostsService()