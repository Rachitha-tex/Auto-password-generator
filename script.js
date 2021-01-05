//DOM ELEMENT
const resultEl=document.getElementById('result');
const lengthEl=document.getElementById('length');
const uppercaseEl=document.getElementById('uppercase');
const lowercaseEl=document.getElementById('lowercase');
const numberEl=document.getElementById('numbers');
const symbolEl=document.getElementById('symbols');
const generateEl=document.getElementById('generate');
const clipboard=document.getElementById('clipboard');


const randomFunction={
    upper:upperCaseRandom,
    lower:getLowerRandom,
    number:getnumberRandom,
    symbol:getsymbolRandom
};

 generateEl.addEventListener('click',()=>{
      const length=parseFloat(lengthEl.value);
      const isUpper=uppercaseEl.checked;
      const isLower=lowercaseEl.checked;
      const isNumber=numberEl.checked;
      const isSymbol=symbolEl.checked;

   resultEl.innerText=generatePassword(
       isUpper,   
       isLower,
       isNumber,
       isSymbol,
       length
   )

    //  console.log(isUpper,isLower,isNumber,isSymbol);
 });

//copy to clicpboard
   clipboard.addEventListener('click',()=>{
    const textArea=document.createElement('textarea');
    const password=resultEl.innerText;

    if(!password){
        return '';
    }
    textArea.value=password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Password is copied to clipboard!!');

})



 //generate pasword 
function generatePassword(upper,lower,number,symbol,length){
  
    let generatedPassword='';

    const typeCount=upper+lower+number+symbol;
   // console.log("typecount :"+typeCount);
     
    const typesArr=[{upper},{lower},{number},{symbol}].filter(
        items=>Object.values(items)[0]
    );
   // console.log("Types arr :",typesArr);

    if(typeCount===0){
        return ''; 
    }
    for(let i=0;i<length;i+=typeCount){
        typesArr.forEach(type=>{
            const funcName=Object.keys(type)[0];
            generatedPassword +=randomFunction[funcName]();
        })
    }
  //  console.log(generatedPassword.slice(0,length));
    const finalPassword=generatedPassword.slice(0,length);
    return finalPassword;
}



//function generator

//generate simple letter as 97 is lowest where "a"
//26 as alphabet
function getLowerRandom(){
  return String.fromCharCode(Math.floor(Math.random()*26)+97);
}
//console.log(getLowerRandom());

//generate capital letter as 65 is lowest where "A"
function upperCaseRandom(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
  }
 // console.log(upperCaseRandom());

  //generate number as 48 is lowest where "0"
  //10 as 0-9 numbers
function getnumberRandom(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
  }
  //console.log(getnumberRandom());


  function getsymbolRandom(){
      const symbol='!@#$%^&*(){}[]=<>/'
    return symbol[Math.floor(Math.random()*symbol.length)];
  }
  //console.log(getsymbolRandom());
