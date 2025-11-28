import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useState } from "react";
import DialogPopUp from "../ProductDailog/PopUp";

const AdditionButton = () => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handlePopUpClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full">

      <DialogPopUp isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Welcoem On APP
      </DialogPopUp>
      <Button
        variant="default"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
        onClick={handlePopUpClick}
      >
        <span className="">{locale === "en" ? "Additions" : "الاضفات"}</span>
      </Button>
    </div>
  );
};

export default AdditionButton;
