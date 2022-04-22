//use to store state of the phone
let stateData={
    UserData:{
        "address": "Karachi",
        "contact": "03487812056",
        "dob": "",
        "gender": "",
        "hobbies": "cricket",
        "image": "https://firebasestorage.googleapis.com/v0/b/travel-3a80a.appspot.com/o/UserData%2Ftw1pFZ6xSVRULAkxO3laPsz8iNY2?alt=media&token=026977fd-5acd-4960-876a-003ecfc161b8 tw1pFZ6xSVRULAkxO3laPsz8iNY2",
        "name": "Nabeel khan",
        "profession": "",
        "uid": "tzGYdIqN5jSBRnzRepLfTAzNYoH2",
    }
};

export const addStorage=async (key,data)=>{
    stateData[key]=data;
}

export const getStorage=async (key)=>{
    return stateData[key]
}