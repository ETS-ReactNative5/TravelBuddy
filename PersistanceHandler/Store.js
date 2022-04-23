import { db } from "../firebase/firebase-config";
import { collection, getDoc, addDoc, doc, getDocs, updateDoc, setDoc, query, FieldValue, where } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage"
import { addStorage } from "../StateStorage";
import { commentDateSorter } from "../src/UtilPackages/Date";

export class PersistanceHandler {

    async makeUserDocument(_obj) {
        //add user document in user collection
        try {
            let documentToAdd = { email: _obj.email, uid: _obj.uid }
            await setDoc(doc(db, "user", _obj.uid), documentToAdd)

            return true;
        } catch (e) {
            return false;
        }
    }

    async isUserExist(_obj) {
        //check in firestore whether user exist or not.
        let flag = false;
        const docRef = collection(db, "user");
        const queryRef = query(docRef, where("uid", "==", _obj.uid));
        const snap = await getDocs(queryRef)
        snap.forEach(doc => {
            // console.log(doc.data())
            if (doc.data().uid == _obj.uid) flag = true;
        })
        return flag;
    }

    async checkProfileComplete(_id) {
        console.log("inside check profile", _id, "\n")
        let retFlag = true;
        const docRef = doc(db, "user", _id);
        const docSnap = await getDoc(docRef)
        try {
            const currentData = docSnap.data();
            if (currentData.name) {
                retFlag = true;
            } else {
                retFlag = false;
            }
        } catch (e) {
            retFlag = false;
        }
        return retFlag;
        // console.log("inside check profile\n")
        // let flag = true;
        // const docRef = collection(db, "user");
        // const queryRef = query(docRef, where("uid", "==", _id));
        // const snap = await getDocs(queryRef);
        // try {
        //     const data = snap[0].data();
        //     console.log("inside check profile complete:",data)
        //     if (data) {
        //         if (data.name) {
        //             addStorage("UserData", data)
        //             flag = true;
        //         }
        //         else flag = false;
        //     } else {
        //         flag = false;
        //     }
        // } catch (e) {
        //     flag = false;
        // }
        // return flag;
    }

    async fetchUserCompleteDetail(_id) {
        console.log("inside fetchUserCompleteDetail", _id, "\n")
        const docRef = doc(db, "user", _id);
        const docSnap = await getDoc(docRef)
        const currentData = docSnap.data();
        console.log(currentData)
        return currentData;
    }

    async saveImageStorage(_imageUrl, _additionalPath, _imageName) {
        console.log("inside trigger", _imageUrl)
        const response = await fetch(_imageUrl); //this is the local reference of the file
        const blobData = await response.blob();

        const storage = getStorage()
        const storageRef = ref(storage, `${_additionalPath}/${_imageName}`)
        await uploadBytes(storageRef, blobData).then((snapshot) => {
            console.log('Uploaded a base64 string!');
        });

        let result = await getDownloadURL(storageRef)
        return result;
    }

    async saveUserData(_name, _gender, _DOB, _address, _profession, _contact, _hobbies, _interest, _image, _id) {
        //save User to the firebase
        console.log("\ndisplays:", _name, _gender, _DOB, _address, _profession, _contact, _hobbies, _interest, _image, _id, "\n")
        let userData = { name: _name, gender: _gender, dob: _DOB, address: _address, profession: _profession, contact: _contact, hobbies: _hobbies, image: _image }
        // uid:_id
        await setDoc(doc(db, "user", _id), userData, { merge: true })
    }

    async getGroupList() {
        const docRef = collection(db, "group");
        const snap = await getDocs(docRef)
        let returnValue = []
        snap.forEach(doc => {
            returnValue.push(doc.data())
        })
        return returnValue;
    }

    async makeGroup(_id, _title, _image) {
        let _createdDate = new Date()
        _createdDate = _createdDate.toString()
        let documentToAdd = { admin: _id, groupID: "", imageUrl: "", lastComment: "No Comment yet", members: [_id], timeStamp: _createdDate, title: _title }
        try {
            addDoc(collection(db, "group"), documentToAdd)
                .then(async res => {
                    const docRef = doc(db, 'group', res.id);
                    let _result = null;
                    if (_image) _result = await this.saveImageStorage(_image, "Group", res.id)
                    updateDoc(docRef, { groupID: res.id, imageUrl: _result })
                })
                .then(err => console.log(err))

            return true;
        } catch (e) {
            return false;
        }
    }


    async getAllPost() {//fetch all post from collection  --firebase
        let snap = await getDocs(collection(db, "poster"))
        let POSTS = []
        snap.forEach((doc) => {
            //here make the id useful
            POSTS.push(doc.data())
        })
        console.log(POSTS)
        return POSTS;
    }

    async createPostDocument(_id, _comment) {
        let _postDate = new Date()
        _postDate = _postDate.toString();
        // console.log("inside creaet postMessage",_id,_comment)
        // const _id={_name:UserData.name,_image:UserData.image,_uid:_userIdentity}
        // const _comment={_bodyContent:_commentData,_image:Image}
        const _content = {
            bodyContent: _comment._bodyContent ? _comment._bodyContent : "",
            assets: [], //ternary check else  []
            profile_pictures: _id._image,
            user: _id._name,
            uid: _id._uid,
            timeStamp: _postDate,
            postID: "",
            likes: [],
            numberOfComments: 0,
            locationDesc: "",
            locationName: ""
        }
        // console.log(_content);
        // return true;
        try {
            console.log("\n", _comment._image, "\n")
            let _firstResponse = await addDoc(collection(db, "poster"), _content)
            let _result = await this.saveImageStorage(_comment._image, "poster", _firstResponse.id)
            const postRef = doc(db, 'poster', _firstResponse.id);
            await updateDoc(postRef, { postID: _firstResponse.id, assets: [{ imageUrl: _result }] })

            return true;
        } catch (e) {
            console.log("\nEror:\n", e)
            return false;
        }

    }



    async addComment(_timeStamp, _userID, _content, _referenceID, _userName, _userProfile) {//add comment to firebase - firebase - (no need for commentID,remove from UI as well.)
        let obj = {
            timeStamp: _timeStamp,
            userID: _userID,
            content: _content,
            referenceID: _referenceID,
            userData: {
                name: _userName,
                av: _userProfile
            }
            // commentID:_commentID
        }
        addDoc(collection(db, "comment"), obj)
            .then(res => {
                const commRef = doc(db, 'comment', res.id);
                updateDoc(commRef, { commentID: res.id })
            })
            .then(err => console.log(err))
    }



    async updateCommentCount(_PostID, _count) {//update comment count for post - firebase
        // console.log(_PostID)
        let incrementVal = _count + 1
        const postRef = doc(db, 'poster', _PostID);
        await updateDoc(postRef, { numberOfComments: incrementVal })
    }


    async getPostComment(postID) {
        console.log('inside store comment',postID);
        //it will return comment along with additional check (selfFlag=true currentUser typed/currentUser dont type)
        let CommentsData = await this._getCommentFromDB()
        let filterArr = CommentsData.filter((input) => input.referenceID == postID)
        filterArr.sort(commentDateSorter)
        // filterArr=filterArr.map((element)=> {
        //   return {
        //     content:element.content,
        //     userID:element.userID,
        //     timeStamp:element.timeStamp,
        //     userData:getUserNameAv(element.userID)
        //   }
        // })
        console.log("myFinalComments",filterArr)
        return filterArr;
    }

    async _getCommentFromDB() { //fetch all comment from collection --firebase
        let snap = await getDocs(collection(db, "comment"))
        let COMMENTS = []
        snap.forEach((doc) => {
            //here make the id useful
            COMMENTS.push(doc.data())
        })
        return COMMENTS;
    }

    async getChatUserData(userID){
        
    }

    async getChatData(postID){
        let CommentsData=await this._getCommentFromDB()
        let filterArr=CommentsData.filter((input)=>input.referenceID==postID)
        filterArr.sort(commentDateSorter);
        filterArr=filterArr.map((element)=> {
            return {
              _id:element.commentID,
              createdAt:element.timeStamp,
              text:element.content,
              user:{
                  _id:element.userID,
                  avatar:element.av,
                  name:element.name
              }
            }
          })
          filterArr.reverse();
          return filterArr;
    }


    // export const getChatUserData2=(userID)=>{//designed for chat 
    //     try{
    //       let data=UserData.find((element)=>element.userID==userID)
    //       return {_id:userID,avatar:data.profile_pictures,name:data.user}
    //     }
    //     catch(e){
    //       return {_id:null,avatar:null,name:null};
    //     }
    //   }
      
    //   export const getChatData=(postID)=>{
    //     //return chat content of user
    //     let filterArr=CommentsData.filter((input)=>input.referenceID==postID)
    //     filterArr.sort(commentDateSorter)
    //     filterArr=filterArr.map((element)=> {
    //       return {
    //         _id:element.commentID,
    //         createdAt:element.timeStamp,
    //         text:element.content,
    //         user:getChatUserData(element.userID)
    //       }
    //     })
    //     filterArr.reverse()
    //     // console.log(filterArr)
    //     return filterArr;
    //   }
}