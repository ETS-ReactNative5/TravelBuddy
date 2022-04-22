export const getMonthName=(index)=>{
    let months=["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]
    return months[index];
}

//return string in form 03:31 P.M.
export const getFormattedTimeForPost=(inputDate)=>{    
    let templateString=""
    let hr=inputDate.getHours()
    let min= inputDate.getMinutes()<10 ? `0${inputDate.getMinutes()}` : `${inputDate.getMinutes()}`

    if(hr<12){
        hr==0 ? templateString=`12:${min} A.M.`
        : hr>9 ? templateString= `${hr}:${min} A.M.`
          : templateString= `0${hr}:${min} A.M.`
    }else{
        hr=hr-12
        hr==0 ? templateString=`12:${min} P.M.`
        : hr>9 ? templateString= `${hr}:${min} P.M.`
          : templateString= `0${hr}:${min} P.M.`
    }
    return templateString
}

//return formatted string for Post component
export const getFormattedDateForPost=(inputString)=>{
    // Posted On "Mar 16 at 03:31 P.M."
    let inputDate=new Date(inputString);
    let monthName=getMonthName(inputDate.getMonth())
    let TimeString=getFormattedTimeForPost(inputDate)
    let templateString=`${monthName} ${inputDate.getDate()} at ${TimeString}`
    return templateString;
}

export const dateSorter=(a,b)=>{ //sort string of timestamp
    let d1=new Date(a);
    let d2=new Date(b);
    return d1-d2;
}

export const commentDateSorter=(a,b)=>{  //specific function for comments
    return dateSorter(a.timeStamp,b.timeStamp)
}


