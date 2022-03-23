export const getTokenizeContent = (sampleString) => {
    try {

        let Qflag = false; //Quotation check
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
        return formattedStringArr
    }
    catch (e) {
        return []
    }
}