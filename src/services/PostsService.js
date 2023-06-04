import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "../models/Post.js";
// import { Profile } from "../models/Account.js";

class PostsService {

  async getPosts() {
    const res = await api.get('api/posts')
    // logger.log(res.data)
    AppState.posts = res.data.posts.map(p => new Post(p));
    AppState.older = res.data.older;
    AppState.newer = res.data.newer;

    // logger.log('POSTS', res.data)


  }
  async changePage(url) {
    const res = await api.get(url);
    logger.log('POSTs', res.data);
    AppState.posts = res.data.posts.map(p => new Post(p));
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
    AppState.posts = res.data.posts.map(p => new Post(p));
    AppState.older = res.data.older;
    AppState.newer = res.data.newer;
    // logger.log('PROFILE', res.data)
  }

  async likePost(id) {
    logger.log("LIKES?", id)
    const res = await api.post(`api/posts/${id}/like`)
    logger.log("LIKES?", res.data)
    let index = AppState.posts.findIndex((p) => p.id == id)
    AppState.posts.splice(index, 1, new Post(res.data))
  }

  async createPost(postData){
    const res = await api.post('api/posts', postData)
    // const newPost = new Post(res.data) this didn't remove from page without page refresh
    AppState.posts.unshift(new Post(res.data))
  }

  async deletePost(postId){
    const res = await api.delete(`api/posts/${postId}`)
    logger.log('Post Deleted', res.data)
    AppState.posts = AppState.posts.filter(p => p.id != postId)
  }

  async searchPosts(query){
    const res = await api.get('api/posts', {params: query})
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

}


export const postsService = new PostsService()