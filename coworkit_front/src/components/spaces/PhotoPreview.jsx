import React, { useEffect, useRef} from 'react'
import "../../css/spaces/photoPreview.css"

// const inpFile = document.getElementById("inputFile");
// const previewContainer = document.querySelector("#imagePreview");
// const previewImg =document.querySelector(".imagePreviewImg");
// const previewDefaultText =document.querySelector(".imagePreviewDefaultText");
let previewContainer;
let previewDefaultText;
let previewImgFirst;
let previewImgSecond;
let previewImgThird;
let previewImgFourth;

const handlerLoad_1=(e)=>{
    previewImgFirst.setAttribute("src",e.currentTarget.result)
}
const handlerLoad_2=(e)=>{
    previewImgSecond.setAttribute("src",e.currentTarget.result)
}
const handlerLoad_3=(e)=>{
    previewImgThird.setAttribute("src",e.currentTarget.result)
}
const handlerLoad_4=(e)=>{
    previewImgFourth.setAttribute("src",e.currentTarget.result)
}


const handlerChange=(e)=>{
   console.log( e.target.files);
const [file1,file2, file3, file4] =e.target.files;
if(file1){
    const reader = new FileReader();
    previewDefaultText.style.display= "none";
    previewImgFirst.style.display ="block";
    reader.addEventListener("load", handlerLoad_1);
    reader.readAsDataURL(file1);
}
if(file2){
    const reader = new FileReader();
    // previewDefaultText.style.display= "none";
    previewImgSecond.style.display ="block";
    reader.addEventListener("load", handlerLoad_2);
    reader.readAsDataURL(file2);
}
if(file3){
    const reader = new FileReader();
    // previewDefaultText.style.display= "none";
    previewImgThird.style.display ="block";
    reader.addEventListener("load", handlerLoad_3);
    reader.readAsDataURL(file3);
}
if(file4){
    const reader = new FileReader();
    // previewDefaultText.style.display= "none";
    previewImgFourth.style.display ="block";
    reader.addEventListener("load", handlerLoad_4);
    reader.readAsDataURL(file4);
}
// else{
//     previewDefaultText.style.display= null;
//     previewImgFirst.style.display =null; 
//     previewImgSecond.style.display =null; 
//     previewImgThird.style.display =null;
//     previewImgFourth.style.display =null;
// }
  
}  

export default function PhotoPreview({register,errors, required}) {
        useEffect(()=>{
        
        previewContainer = document.querySelector("#imagePreview");
        previewImgFirst =document.querySelector(".first");
        previewImgSecond =document.querySelector(".second");
        previewImgThird =document.querySelector(".third");
        previewImgFourth =document.querySelector(".fourth");
        previewDefaultText =document.querySelector(".imagePreviewDefaultText");
  
        },[])


    return (
    <>
    <div className= "photopreviewContainer">
        <input  className="inputPreviewImg" onChange={(e)=> handlerChange(e)} 
        type="file" name="photos" multiple ref={register({
            required: {
              value: required,
              message: "Es necesario añadir al menos  es un campo obligatorio",
            },
          })} />
        <div className="imagePreview">
            <img className="imagePreviewImg first" src="" alt="iPreview 1" />
            <img className="imagePreviewImg second" src="" alt="Preview 2" />
            <img className="imagePreviewImg third" src="" alt="Preview 3" />
            <img className="imagePreviewImg fourth" src="" alt="Preview 4" />
        </div>
            <span className="imagePreviewDefaultText">No hay ninguna imagen</span>
        {errors.photos && <p>{errors.photos.message}</p>}
        </div>
    </>
    )
}
