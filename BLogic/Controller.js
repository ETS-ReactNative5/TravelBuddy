import {User} from "./User"
import {Post} from "./Post"
import { Comment } from "./Comment";
import { Group } from "./Group";
import { PersistanceHandler } from "../PersistanceHandler/Store";
import { addStorage } from "../StateStorage";

export class Controller{
    #UserObj;
    #PHandler;
    #PostObj;
    #GroupObj;
    #CommentObj;


    constructor(){
        this.#UserObj=new User();
        this.#PHandler=new PersistanceHandler(); 
        this.#PostObj=new Post();
        this.#GroupObj=new Group();
        this.#CommentObj=new Comment();
    }
    
    //UC01
    async makeRegisteration(_email){
        //serve 2 purpose check whether user is registered or not ,register user to the database.
        let result=await this.#UserObj.registerIdentity(_email)
        return result;
    }

    async detailInformation(_name,_gender,_DOB,_address,_profession,_contact,_hobbies,_interest,_image,_id){
        //need id of the person to store information
        this.#UserObj.enterDetail(_name,_gender,_DOB,_address,_profession,_contact,_hobbies,_interest,_image,_id)
        let userData={name:_name,gender:_gender,dob:_DOB,address:_address,profession:_profession,contact:_contact,hobbies:_hobbies,image:_image,uid:_id}
        await addStorage("UserData",userData)
    }

    async uploadAvatarImageDB(_image,_uid){
        return await this.#PHandler.saveImageStorage(_image,"UserData",_uid)
    }

    async uploadImageDB(_image,_folderLocation,_referenceLocation){
        return await this.#PHandler.saveImageStorage(_image,_folderLocation,_referenceLocation)
    }

    async checkProfileCompleteness(_id){
        return await this.#UserObj.checkProfileComplete(_id)
    }

    //UC03
    async makePost(_id,_comment){
        return await this.#PostObj.makePost(_id,_comment);
    }

    //UC08
    async showProfile(_id){
        let result=await this.#UserObj.showProfileDetail(_id)
        return result;
    }

    async updateProfile(_profileObj){
        let result=await this.#UserObj.updateProfileDetail(_profileObj)
        return result;
    }

    async makeGroup(_id,_title,_imageUrl){
        //convert time to string.
        // let obj={admin:_id,groupID:"",imageUrl:_image,lastComment:"No Comment yet",members:[_id],timeStamp:"convert time to string",title:_title}
        console.log("inside makeGroup Screen:",_id,_title,_imageUrl)
        return await this.#GroupObj.makeGroup(_id,_title,_imageUrl);
    }

    async getAllGroup(){
        return await this.#GroupObj.getGroupList();
    }

    async getAllPost(){
        return await this.#PostObj.getAllPosts();
    }

    async addComment(_timeStamp, _UserID, _inputValue, _postID,_userName,_userImage){
        return await this.#CommentObj.makeComment(_timeStamp, _UserID, _inputValue, _postID,_userName,_userImage)    
    }

    async updateCommentCount(_postID, _length){
        return await this.#CommentObj.updatePostCommentCount(_postID, _length)
    }

    async getCommentsFunction(postID){
        return await this.#CommentObj.getPostComment(postID);
    }

}
