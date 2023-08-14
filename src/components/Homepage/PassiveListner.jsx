'use client'
import { useEffect } from 'react'


const PassiveListner = () => {
     // add passive event listener to improve scrolling performance
 useEffect(() => {
    const passiveHandler = (e) => {
      // console.log("Touchmove or Wheel Event Occurred!");
    };
    document.body.addEventListener("touchmove", passiveHandler, {
      passive: true,
    });
    document.body.addEventListener("wheel", passiveHandler, {
      passive: true,
    });
    return () => {
      document.body.removeEventListener("touchmove", passiveHandler);
      document.body.removeEventListener("wheel", passiveHandler);
    };
  }, []);

  return 
}

export default PassiveListner