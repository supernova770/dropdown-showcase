import { useEffect, useState } from "react";

export const useDetectKeyPress = (targetKey: any) => {

  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {

    const downHandler = ( event: {key:any} ) => {
      if (event.key === targetKey) {
        setKeyPressed(true);
      }
    };

    window.addEventListener("keydown", downHandler);

    const upHandler = () => {
        setKeyPressed(false);
    };

    window.addEventListener("keyup", upHandler);

    // Cleanup the event listener.
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
  
};
