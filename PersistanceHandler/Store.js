import { db } from "../firebase/firebase-config";
import { collection, getDoc, addDoc, doc, getDocs, updateDoc, setDoc, query, FieldValue, where } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage"
import { addStorage } from "../StateStorage";
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


    async getPost() {//fetch all post from collection  --firebase
        let snap = await getDocs(collection(db, "post"))
        let POSTS = []
        snap.forEach((doc) => {
            //here make the id useful
            POSTS.push(doc.data())
        })
        console.log(POSTS)
        return POSTS;
    }
}