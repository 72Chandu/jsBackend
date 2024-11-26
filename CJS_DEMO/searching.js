const ls=function search(arr,x){
    for(let i=0;i<arr.length;i++){
        if(arr[i]==x) return i;
    }
    return undefined;
}
const bs=function search(arr,x){
    let lo=0, hi=arr.length-1;
    while(lo<=hi){
        let mid=lo+Math.floor((hi-lo)/2);
        if(arr[mid]==x) return mid;
        else if(arr[mid]<x){
            lo=mid-1;
        }else{
            hi=mid+1;
        }
    }
    return undefined;
}
module.exports={ // inside module there is export object inside that object we are allocating it 
    ls:ls,
    bs:bs
}// now we can use it in any other file 

