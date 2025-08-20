import React, { ReactNode } from "react";

interface children {
    children: ReactNode;
  }

const FormWrap: React.FC<children> = ({ children }) => {
  return (
    <div
      className={`
        min-h-fit
        h-full
        flex
        items-center
        justify-center
        mx-5
        
        `}
    >
      <div
        className={`max-w-[650px] w-full flex flex-col gap-5 bg-white items-center shadow-lg shadow-slate-200 rounded-md p-4 md:p-8  `}
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
