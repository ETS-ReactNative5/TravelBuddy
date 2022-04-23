import { PersistanceHandler } from "../PersistanceHandler/Store";
export class Post{
    #PHandler;
    constructor(){
        this.#PHandler=new PersistanceHandler();
    }

    async makePost(_id,_comment){
        return await this._storePost(_id,_comment);
    }

    async _storePost(_id,_comment){
        return await this.#PHandler.createPostDocument(_id,_comment);
    }

    async validatePost(PostId,comment){
        //call to model to get the response.
        //and then add that response to the firebase.
    }

    async getAllPosts(){
        return await this.#PHandler.getAllPost();
    }
}