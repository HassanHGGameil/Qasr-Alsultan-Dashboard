
"use client";
import { useEffect, useState } from "react";

const UseOrigin = () => {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  if (!origin) return null;

  return <div>{origin}</div>;
};

export default UseOrigin;
