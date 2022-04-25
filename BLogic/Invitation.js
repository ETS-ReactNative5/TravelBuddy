import {PersistanceHandler} from "../PersistanceHandler/Store"

export class Invitation {
    #PHandler;
    constructor(){
        this.#PHandler=new PersistanceHandler();
    }

    /**
     * 
     * @param {*} _id - current user id
     * @param {*} _groupID - groupid of the group whose invitation has sent 
     * @param {*} _recvID - recvID ,the user to whom invitation has sent
     * create invitaion in the record.
     */
    sendInvitation(_id,_groupID,_recvID){

    }

    /**
     * 
     * @param {*} _id - user id whose invitation you want to fetch.
     * return list of all active invitation from the databse.
     */
    getUserActiveInvitation(_id){
        //return list of invitations for user.

    }

    
    respondInvitation(_invitationID,respondStatus){

    }

    cancelInvitation(){

    }




}