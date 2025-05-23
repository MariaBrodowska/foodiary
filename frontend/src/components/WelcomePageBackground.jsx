import React from "react";

const WelcomePageBackground = () =>{
    return(
        <div>
            <img src="/welcomepage/yellow-ellipse.png" className="absolute top-0 left-0 lg:scale-90 scale-70 origin-top-left" alt="yellow"/>
            <img src="/welcomepage/blue-ellipse.png" className="absolute bottom-0 right-0 lg:scale-85 scale-70 origin-bottom-right" alt="blue"/>
            <img src="/welcomepage/green-ellipse.png" className="absolute top-0 right-0 lg:scale-85 scale-75 origin-top-right" alt="green"/>
            <img src="/welcomepage/blueberries.png" className="absolute top-0 left-0 lg:scale-85 scale-70 origin-top-left" alt="blueberries"/>
        </div>
    );
}

export default WelcomePageBackground;