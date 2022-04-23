import { PersistanceHandler } from "../PersistanceHandler/Store";

export class Comment{
    #Phandler;
    constructor(){
        this.#Phandler=new PersistanceHandler();

    }

    async makeComment(_timeStamp, _UserID, _inputValue, _postID,_userName,_userImage){
        return await this.#Phandler.addComment(_timeStamp, _UserID, _inputValue, _postID,_userName,_userImage)
    }

    async getPostComment(postID){
        return await this.#Phandler.getPostComment(postID);
    }

    async updatePostCommentCount(_postID, _length){
        return await this.#Phandler.updateCommentCount(_postID, _length)
    }
}