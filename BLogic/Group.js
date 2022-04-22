import { PersistanceHandler } from "../PersistanceHandler/Store";
export class Group{
    #PHandler;
    constructor(){
        this.#PHandler=new PersistanceHandler();
    }

    async makeGroup(_id,_title,_image){
        // let obj={admin:_id,groupID:"",imageUrl:_image,lastComment:"No Comment yet",members:[_id],timeStamp:"convert time to string",title:_title}
        return await this.#PHandler.makeGroup(_id,_title,_image)
    }

    async getGroupList(){
        let response=await this.#PHandler.getGroupList();
        return response;
    }



}