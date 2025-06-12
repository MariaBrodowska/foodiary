import React from "react";
import Logo2 from "../Logo2";
import NavbarAuth from "../NavbarAuth";
import BackgroundImages from "../common/BackgroundImages";

const PageLayout = ({ children, title, showBackground = true }) => {
  return (
    <div className="bg-[#F6F2E9] min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Logo2 />

      <div className="absolute top-0 left-0 w-full z-10">
        <NavbarAuth />
      </div>

      <div className="relative w-full pb-10">
        {showBackground && <BackgroundImages />}

        <div className="relative w-full flex justify-center mb-16">
          {title && (
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
