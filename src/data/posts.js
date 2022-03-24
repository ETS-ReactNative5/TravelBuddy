let testDate=new Date()
testDate=testDate.toString();

export const POSTS = [
  {
    postID:"post_1",
    bodyContent:"hello this is the best \n in the world, \"feeling\" ",
    numberOfComments:25,
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
    numberOfComments:25,
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
    numberOfComments:25,
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
    timeStamp:"string format time", //sort on the basis of time
    userID:"user1", //this will get me useravatar and name
    content:"content of the comment",
    referenceID:"post_1",
    commentID:"c1"
  },
  {
    timeStamp:"string format time", //sort on the basis of time
    userID:"user2", //this will get me useravatar and name
    content:"content of the comment",
    referenceID:"post_1",
    commentID:"c2"
  },
  {
    timeStamp:"string format time", //sort on the basis of time
    userID:"user2", //this will get me useravatar and name
    content:"content of the comment",
    referenceID:"post_1",
    commentID:"c3"
  },

]



export const getCommentsFunction=(postID)=>{
  for(let i=0;i<POSTS.length;i++){
   if(POSTS[i].postID==postID){
     return POSTS[i].comments
   } 
  }
  return []
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