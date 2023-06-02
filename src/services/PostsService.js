import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "../models/Post.js";

class PostsService{
  
    async getPosts(){
      const res = await api.get('api/posts')
      logger.log(res.data)
      AppState.posts = res.data.posts.map(p=> new Post(p));

      logger.log('POSTS', res.data)
      
    
  }
  async getPostsByProfile(id) {
    AppState.posts = []
    const res = await api.get('/api/posts', {
      params: {
        creatorId: id
      }
    })
    AppState.posts = res.data.posts.map(p=> new Post(p));
}
}


export const postsService = new PostsService()