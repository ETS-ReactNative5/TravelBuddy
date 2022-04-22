import { PersistanceHandler } from "../PersistanceHandler/Store"
export class User{
   #PHandler;
   constructor(){
        this.#PHandler=new PersistanceHandler();
   }

   async registerIdentity(_email){
          let uniqueResponse=await this._verifyUniqueIdentity(_email)
          if(uniqueResponse) return await this._registerUser(_email)
          else return false; //user is already registered
   }

   async _registerUser(_email){
        //make document for the User in firestore.
        let response=await this.#PHandler.makeUserDocument(_email)
        return response
        //handle response from firestore and transform in true/false
   }

   async _verifyUniqueIdentity(_email){
        //call to firestore to check in the collection of table with the same record.
        let response=await this.#PHandler.isUserExist(_email);
        return !response
        //handle response from firestore and transform in true/false
   }

   async checkProfileComplete(_id){
     let response=await this.#PHandler.checkProfileComplete(_id);
     return response;
   }

   async enterDetail(_name,_gender,_DOB,_address,_profession,_contact,_hobbies,_interest,_image,_id){
        return await this._registerDetail(_name,_gender,_DOB,_address,_profession,_contact,_hobbies,_interest,_image,_id)
   }

   async _registerDetail(_name,_gender,_DOB,_address,_profession,_contact,_hobbies,_interest,_image,_id){
       return await this.#PHandler.saveUserData(_name,_gender,_DOB,_address,_profession,_contact,_hobbies,_interest,_image,_id);
    //call to firestore to store the detail in user collection.
   }

   async showProfileDetail(_id){
        let result=await this._fetchProfileDetail(_id)
        return result;
   }

   async _fetchProfileDetail(_id){
        //fetch details from the firebase.
        let result=await this.#PHandler.fetchUserCompleteDetail(_id)
        return result;
   }

   async updateProfileDetail(profileObj){
        let result=await this._changeProfileDetail(profileObj)
        return result;
   }

   async _changeProfileDetail(profileObj){
        //update query to firebase.
   }


}