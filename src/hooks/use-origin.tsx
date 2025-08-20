import { useEffect, useState } from "react";

const UseOrigin = () => {
  const [mounted, setMounted] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  return origin;

  return <div>use-origin</div>;
};

export default UseOrigin;
