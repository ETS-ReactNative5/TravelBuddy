const getQuoteCheck=(flag,sampleString)=>{
    let firstFlag=false;
    let lastFlag=false;

    if(sampleString[0]=="\""){
        firstFlag=true;
    }
    if(sampleString[sampleString.length-1]=="\""){
        lastFlag=true;
    }

    //base case : 000 and 100
    if(firstFlag==false && lastFlag==false){
        if(flag){
            return [flag,[[2,sampleString,1]]]
        }else{
            return [flag,[[0,sampleString,1]]]
        }
    }

    /* 001 010 011 101 110 111 */
    if(flag==false && firstFlag==true && lastFlag==true){ //011
        return [false,[[2,sampleString,1]]]
    }
    if(flag==false && firstFlag==true && lastFlag==false){ //010
        return [true,[[2,sampleString,1]]]
    }
    if(flag==false && firstFlag==false && lastFlag==true){//001
        return [true,[[0,sampleString,1]]]
    }

    if(flag==true && firstFlag==true && lastFlag==true){ //!11
        return [true,[[0,sampleString,1]]]
    }
    if(flag==true && firstFlag==true && lastFlag==false){ //110
        return [false,[[0,sampleString,1]]]
    }
    if(flag==true && firstFlag==false && lastFlag==true){//101
        return [false,[[2,sampleString,1]]]
    }

}

const getHashQuoteToken=(lineQuoteFlag,sampleString)=>{
    //func to return quoted and hash format
    try{
        let Qflag = lineQuoteFlag; //Quotation check
        let stringArr = sampleString.split(' ') //convert string to token basis on spaces
        let mainReturnArr=[]
        let formattedStringArr = stringArr.map(elem => { //make formatted string with indicator
            if (elem[0] == "#") {
                mainReturnArr.push([1, elem,1])
            } else if (elem.includes("\"") || Qflag == true) {
                if (elem.includes("\"")) {
                    let retArr=getQuoteCheck(Qflag,elem)
                    Qflag=retArr[0]
                    retArr=retArr[1]
                    retArr.map(x=>mainReturnArr.push(x))
                    // if (Qflag == true) Qflag = false;
                    // else Qflag = true;
                }else { mainReturnArr.push([2, elem,1]) }
            } else {
                mainReturnArr.push([0, elem,1])
            }
        })
        return [Qflag,mainReturnArr]
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