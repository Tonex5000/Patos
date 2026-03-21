export const numberWithCommas = (x: any, digits = 3) => {
    if (!x) return '0';
    return Number(x).toLocaleString(undefined, { maximumFractionDigits: digits });
}

export const formatString = (str:string, startOffset:number, endOffset:number) => {
    if (str.length < startOffset + endOffset)
        return str;
    else return str.slice(0, startOffset - 1) + '...' + str.slice(-endOffset);
};