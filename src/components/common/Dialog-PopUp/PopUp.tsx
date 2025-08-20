import { Dialog } from "@headlessui/react";
import { X } from "lucide-react"; // Using Lucide icon instead of "X"
import { useLocale } from "next-intl";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const DialogPopUp: React.FC<DialogProps> = ({ isOpen, onClose, title }) => {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="relative z-[9999990]"
      dir={dir}
    >
      {/* Backdrop with transition */}
      <div
        className="fixed inset-0 bg-black/30 dark:bg-white/30 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Full-screen container */}
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Dialog panel with animations */}
          <Dialog.Panel 
            className={`
              w-full max-w-md rounded-lg bg-white dark:bg-[#1A1F2B] 
              shadow-xl transition-all duration-300
              ${dir === 'rtl' ? 'text-right' : 'text-left'}
            `}
          >
            {/* Header with proper close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              {title && (
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </Dialog.Title>
              )}
              <button
                onClick={onClose}
                className={`
                  p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                  ${dir === 'rtl' ? 'mr-auto' : 'ml-auto'}
                `}
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Form content */}
           
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogPopUp;