import {commentDateSorter} from "../UtilPackages/Date"

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
    userID:"user2", //this will get me useravatar and name
    content:"content of the comment2",
    referenceID:"post_1",
    commentID:"c2"
  },

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
]



export const getCommentsFunction=(postID)=>{
  //it will return comment along with additional check (selfFlag=true currentUser typed/currentUser dont type)
  let filterArr=CommentsData.filter((input)=>input.referenceID==postID)
  filterArr.sort(commentDateSorter)
  return filterArr;
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