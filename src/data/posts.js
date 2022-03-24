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


export const getCommentsFunction=(postID)=>{
  for(let i=0;i<POSTS.length;i++){
   if(POSTS[i].postID==postID){
     return POSTS[i].comments
   } 
  }
  return []
}

export const UserActivityData=[ //contain likes and other(not decided yet) activity of user.
  {
    name:"Comment",
    referenceID:"",
  },
  {
    name:"Post",
    referenceID:"post_1"
  }
]

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