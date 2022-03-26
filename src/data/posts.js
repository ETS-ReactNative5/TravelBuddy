import {commentDateSorter} from "../UtilPackages/Date"

let testDate=new Date()
testDate=testDate.toString();

export let POSTS = [
  {
    postID:"post_1",
    bodyContent:"hello this is the best \n in the world, \"feeling\" ",
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
    bodyContent:"This is the \n #hash \"apple in\" the world \n#layyah #multan",
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
  console.log(filterArr)
  return filterArr;
}

export const getCommentsFunction=(postID)=>{
  //it will return comment along with additional check (selfFlag=true currentUser typed/currentUser dont type)
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
  console.log(filterArr)
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
  CommentsData.push(obj)
}

export const updateCommentCount=(_PostID,_count)=>{
  //update with firebase check
  POSTS=POSTS.map((element)=>{
    if(element.postID==_PostID)
      element.numberOfComments=element.numberOfComments+_count;
    return element;
  })
}

export const getGroupList=()=>{
  return GroupsData;
}

// export const iconsDataSet=[
//   {
//     imageUrl:'https://img.icons8.com/small/64/000000/facebook-like.png',
//     imageName:'Interesting'
//   },
//   {
//     imageUrl:'https://img.icons8.com/fluency-systems-regular/96/000000/comments--v2.png',
//     imageName:'Comments'
//   },
// ]


//random time generator sample
// function randomDate(start, end) {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }

// console.log(randomDate(new Date(2012, 0, 1), new Date()));