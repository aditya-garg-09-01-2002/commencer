function isEmptyStr(str:string|undefined|null):boolean{
    if(["",undefined,null].includes(str)){
        return true
    }
    return false;
}
export {
    isEmptyStr,
}