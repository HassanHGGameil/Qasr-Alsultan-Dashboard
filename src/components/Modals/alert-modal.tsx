'use client'

import { useEffect, useState } from "react";
import ModalDialog from "../ui/DailogModal/modal";
import { Button } from "../ui/button"; 



interface IAlertModlalProps {
    isOpen: boolean
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

const AlertModal: React.FC<IAlertModlalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading

}) => {

    const [isMounted, setIsmounted] = useState(false);

    useEffect(() => {
        setIsmounted(true);

    }, [])

    if (!isMounted) {
        return null;
    }




  return (
    <ModalDialog
     title="Are You Sure?"
     description="This action cannot be undone."
     isOpen={isOpen}
     onClose={onClose}
    >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button
              className=""
              disabled={loading}
              variant="outline"
              onClick={onClose}
            >
                Cancel
            </Button>

            <Button 
              className="bg-red-600 text-white hover:bg-red-400"
              disabled={loading}
              variant="destructive"
              onClick={onConfirm}
             
            >
                Continue
            </Button>

        </div>

    </ModalDialog>
  )
}

export default AlertModal