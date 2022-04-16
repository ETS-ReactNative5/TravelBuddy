import {commentDateSorter} from "../UtilPackages/Date"
import {db} from "../../firebase-config";
import { collection,getDoc, addDoc,doc, getDocs, updateDoc,setDoc, query,FieldValue } from "firebase/firestore"
import {ref,uploadBytes,getDownloadURL,getStorage} from "firebase/storage"

let testDate=new Date()
testDate=testDate.toString();

export let POSTS = [
  {
    postID:"post_1",
    bodyContent:"hello this is the best in the world, \"feeling\" ",
    numberOfComments:3,
    locationName:"Layyah",
    locationDesc:"The house of desert",
    likedByUser: false,
    timestamp: testDate,
    assets:[
      // {imageUrl: 'https://picsum.photos/id/10/2500/1667'},
    ],
    user: 'Jane Doe', //these 2 will be colleced from through userID
    profile_pictures: 'https://i.ibb.co/182bP1y/4k.png',
    likes: ["user5","user6","user7"],
    captions: 'Train rides to hogart',
    comments: [
      {
        user: 'jane doe',
        comment: 'Wow working on the react native'
      }
    ]
  },
  {
    postID:"post_2",
    bodyContent:"This is the #hash \"apple in\" the world #layyah #multan",
    numberOfComments:0,
    locationName:"Layyah",
    locationDesc:"The house of desert",
    likedByUser: false,
    timestamp: "date from db",
    assets:[
      {imageUrl: 'https://picsum.photos/id/100/500/500'},
    ],
    user: 'Jane Doe',
    likes: ["user5","user6","user1","user7"],
    captions: 'Train rides to hogart',
    profile_pictures: 'https://i.ibb.co/182bP1y/4k.png',
    comments: [
      {
        user: 'jane doe',
        comment: 'Wow working on the react native'
      }
    ]
  },
  {
    postID:"post_3",
    numberOfComments:0,
    locationName:"Layyah",
    // locationDesc:"The house of desert",
    likedByUser: false,
    timestamp: "date from db",
    assets:[
      {imageUrl:'https://picsum.photos/id/10/2500/1667'},
    ],
    user: 'Jane Doe',
    likes: ["user5","user6","user7"],
    captions: 'Train rides to hogart',
    profile_pictures: 'https://i.ibb.co/182bP1y/4k.png',
    comments: [
      {
        user: 'jane doe',
        comment: 'Wow working on the react native'
      }
    ]
  }
]


export const CommentsData=[
  // {
  //   timeStamp:"string format time", //sort on the basis of time
  //   userID:"user1", //this will get me useravatar and name
  //   content:"content of the comment",
  //   referenceID:"id of post or id of group",
  //   commentID:"id of comment h(first 10|timestamp)"
  // },
  {
    timeStamp:"Fri Apr 08 2016 17:59:33 GMT+0500 (Pakistan Standard Time)", //sort on the basis of time
    userID:"user1", //this will get me useravatar and name
    content:"content of the comment3",
    referenceID:"post_1",
    commentID:"c3"
  },
  {
    timeStamp:"Wed May 15 2013 07:30:58 GMT+0500 (Pakistan Standard Time)", //sort on the basis of time
    userID:"user2", //this will get me useravatar and name
    content:"content of the comment1",
    referenceID:"post_1",
    commentID:"c1"
  },
  {
    timeStamp:"Mon Jan 25 2016 07:01:16 GMT+0500 (Pakistan Standard Time)", //sort on the basis of time
    userID:"user3", //this will get me useravatar and name
    content:"content of the comment2",
    referenceID:"post_1",
    commentID:"c2"
  },
  {
    timeStamp:"Fri Apr 08 2016 17:59:33 GMT+0500 (Pakistan Standard Time)", //sort on the basis of time
    userID:"user1", //this will get me useravatar and name
    content:"content of the comment3",
    referenceID:"Group1",
    commentID:"c6"
  },
  {
    timeStamp:"Wed May 15 2013 07:30:58 GMT+0500 (Pakistan Standard Time)", //sort on the basis of time
    userID:"user2", //this will get me useravatar and name
    content:"content of the comment1",
    referenceID:"Group1",
    commentID:"c4"
  },
  {
    timeStamp:"Mon Jan 25 2016 07:01:16 GMT+0500 (Pakistan Standard Time)", //sort on the basis of time
    userID:"user3", //this will get me useravatar and name
    content:"content of the comment2",
    referenceID:"Group1",
    commentID:"c5"
  },

]

export const GroupsData=[
  {
    groupID:"Group1",
    name:"TesterGroup",
    members:3,
    timeStamp:"Mon Jan 25 2016 07:01:16 GMT+0500 (Pakistan Standard Time)",
    admin:"user1"
  },
  {
    groupID:"Group2",
    name:"TesterGroup2",
    members:3,
    timeStamp:"Mon Jan 25 2016 07:01:16 GMT+0500 (Pakistan Standard Time)",
    admin:"user1",
  }
]


export const UserData=[
  {
    userID:"user1",
    user: 'Jane Doe', //these 2 will be colleced from through userID
    profile_pictures: 'https://i.ibb.co/182bP1y/4k.png',
  },
  {
    userID:"user2",
    user: 'Jane Doe2', //these 2 will be colleced from through userID
    profile_pictures: 'https://i.ibb.co/182bP1y/4k.png',
  },
  {
    userID:"user3",
    user: 'Jane Doe3 _deelete this user', //these 2 will be colleced from through userID
    profile_pictures: 'https://i.ibb.co/182bP1y/4k.png',
  },
]

export const getUserNameAv=(userID)=>{//fetch userName and avatar
  try{
    let data=UserData.find((element)=>element.userID==userID)
    return {name:data.user,av:data.profile_pictures}
  }
  catch(e){
    return null;
  }
}

export const getCommentsFunction=async (postID)=>{
  //it will return comment along with additional check (selfFlag=true currentUser typed/currentUser dont type)
  let CommentsData=await getCommentFromDB()
  let filterArr=CommentsData.filter((input)=>input.referenceID==postID)
  filterArr.sort(commentDateSorter)
  filterArr=filterArr.map((element)=> {
    return {
      content:element.content,
      userID:element.userID,
      timeStamp:element.timeStamp,
      userData:getUserNameAv(element.userID)
    }
  })
  return filterArr;
}

export const addComment=(_timeStamp,_userID,_content,_referenceID,_commentID)=>{
  let obj={
    timeStamp:_timeStamp,
    userID:_userID,
    content:_content,
    referenceID:_referenceID,
    commentID:_commentID
  }
  addDoc(collection(db,"comment"),obj)
  .then(res=>
    {
      const commRef=doc(db,'comment',res.id);
      updateDoc(commRef,{commentID:res.id})
    })
  .then(err=>console.log(err))
}

export const updateCommentCount=async (_PostID,_count)=>{
  console.log(_PostID)
  let incrementVal=_count+1
  const postRef=doc(db,'post',_PostID);
  await updateDoc(postRef,{numberOfComments: incrementVal})
}

export const getChatUserData=(userID)=>{//designed for chat 
  try{
    let data=UserData.find((element)=>element.userID==userID)
    return {_id:userID,avatar:data.profile_pictures,name:data.user}
  }
  catch(e){
    return {_id:null,avatar:null,name:null};
  }
}

export const getChatData=(postID)=>{
  //return chat content of user
  let filterArr=CommentsData.filter((input)=>input.referenceID==postID)
  filterArr.sort(commentDateSorter)
  filterArr=filterArr.map((element)=> {
    return {
      _id:element.commentID,
      createdAt:element.timeStamp,
      text:element.content,
      user:getChatUserData(element.userID)
    }
  })
  filterArr.reverse()
  // console.log(filterArr)
  return filterArr;
}

export const getGroupList=()=>{
  return GroupsData;
}

export const saveImageFireStorage=async (_imageUrl,_additionalPath,_imageName)=>{
  console.log("inside trigger",_imageUrl)
  const response = await fetch(_imageUrl); //this is the local reference of the file
  const blobData = await response.blob();
  
  const storage=getStorage()
  const storageRef=ref(storage, `${_additionalPath}/${_imageName}`)
  await uploadBytes(storageRef, blobData).then((snapshot) => {
    console.log('Uploaded a base64 string!');
  });

  let result=await getDownloadURL(storageRef)
  return result;
}

export const savePost=(_postContent,_imageUrl)=>{
  let testDate=new Date()
  testDate=testDate.toString();
  let sample={
    postID:"test",
    bodyContent:_postContent,
    numberOfComments:0,
    locationName:"Test Location",
    locationDesc:"",
    likedByUser: false,
    timestamp: testDate,
    assets:[
      // {imageUrl: 'https://picsum.photos/id/10/2500/1667'},
    ],
    user: 'Jane Doe', //these 2 will be colleced from through userID
    profile_pictures: 'https://i.ibb.co/182bP1y/4k.png',
    likes: ["user5","user6","user7"],
  }

  addDoc(collection(db,"post"),sample)
  .then(async res=>
    {
      let _result=await saveImageFireStorage(_imageUrl,"postData",res.id)
      const postRef=doc(db,'post',res.id);
      updateDoc(postRef,{postID:res.id,assets:[{imageUrl:_result}]})
    })
  .then(err=>console.log(err))
}

export const getPost=async ()=>{
  let snap=await getDocs(collection(db,"post"))
  let POSTS=[]
  snap.forEach((doc)=>{
    //here make the id useful
    POSTS.push(doc.data())
  })
  console.log(POSTS)
  return POSTS;
}

const getCommentFromDB=async ()=>{
  let snap=await getDocs(collection(db,"comment"))
  let COMMENTS=[]
  snap.forEach((doc)=>{
    //here make the id useful
    COMMENTS.push(doc.data())
  })
  return COMMENTS;
}