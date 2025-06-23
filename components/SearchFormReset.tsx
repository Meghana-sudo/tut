"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const SearchFormReset = () => {

  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
 console.log("reset k pehle form nhi mila")
    if (form){
        console.log("reset called")
        form.reset();
    }
  };

  return (
    <div>
      <button type="reset" onClick={reset}>
          <Link href="/" className="search-btn text-blue-800" >
        <X className="size-5"/>
      </Link>
      </button>
    
    </div>
  );
};

export default SearchFormReset;
