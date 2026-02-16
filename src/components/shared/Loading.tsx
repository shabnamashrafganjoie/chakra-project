"use client"
import React from "react";
import { Circles } from "react-loader-spinner";


function Loading() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">

<Circles
height="80"
width="80"
color="red"
ariaLabel="Circles-Loader"
wrapperStyle={{}}
wrapperClass=""
visible={true}
>

</Circles>
        </div>
    );
  }
  
  export default Loading;
  