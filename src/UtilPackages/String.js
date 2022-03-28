// export const getTokenizeContent = (sampleString) => {
//     try {

//         let Qflag = false; //Quotation check
//         let stringArr = sampleString.split(' ') //convert string to token basis on spaces
//         let formattedStringArr = stringArr.map(elem => { //make formatted string with indicator
//             if (elem[0] == "#") {
//                 return [1, elem]
//             } else if (elem.includes("\"") || Qflag == true) {
//                 if (elem.includes("\"")) {
//                     if (Qflag == true) Qflag = false;
//                     else Qflag = true;
//                 }
//                 return [2, elem]
//             } else {
//                 return [0, elem]
//             }
//         })
//         return formattedStringArr
//     }
//     catch (e) {
//         return []
//     }
// }

const getHashQuoteToken=(lineQuoteFlag,sampleString)=>{
    //func to return quoted and hash format
    try{
        let Qflag = lineQuoteFlag; //Quotation check
        let stringArr = sampleString.split(' ') //convert string to token basis on spaces
        
        let formattedStringArr = stringArr.map(elem => { //make formatted string with indicator
            if (elem[0] == "#") {
                return [1, elem]
            } else if (elem.includes("\"") || Qflag == true) {
                if (elem.includes("\"")) {
                    if (Qflag == true) Qflag = false;
                    else Qflag = true;
                }
                return [2, elem]
            } else {
                return [0, elem]
            }
        })
        return [Qflag,formattedStringArr]
    }
    catch(e){
        return []
    }
}

export const getTokenizeContent = (sampleString) => {
    //chop token in sinlge lines and return quoted and hash format.
    try {
        let formattedStringArr=[]
        let singleLineChunks=sampleString.split('\n');
        let lineQuoteFlag=false;
        for(let i=0;i<singleLineChunks.length;i++){
           let singleLineSet=getHashQuoteToken(lineQuoteFlag,singleLineChunks[i])
           lineQuoteFlag=singleLineSet[0]
           singleLineSet=singleLineSet[1]
           formattedStringArr.push(singleLineSet)
        }
        return formattedStringArr;
    }
    catch (e) {
        return []
    }
}