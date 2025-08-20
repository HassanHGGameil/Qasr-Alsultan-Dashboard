import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { CiShoppingCart } from "react-icons/ci";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    imageUrl: string;
    nameAr: string;
    nameEn: string;
    id: string;
    userPkgId: string;
  };
  selectedItems: string[];
  onSelect: (itemId: string) => void;
}

const PopupPkg: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  data,
  selectedItems,
  onSelect,
}) => {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const name = locale === "en" ? data.nameEn : data.nameAr;

  const isSelected = selectedItems.includes(data.id);

  const handleSelect = () => {
    onSelect(data.id);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[9999990]">
      {/* The backdrop */}
      <div className="fixed inset-0 bg-black/30 dark:bg-white/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto">
        {/* Center the dialog */}
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white dark:bg-[#1A1F2B] shadow-lg">
            {/* Close button */}
            <div className="bg-white dark:bg-[#1A1F2B] pt-2 mx-4 pb-3 flex justify-end">
              <button
                className="text-center cursor-pointer rounded-lg w-[30px] h-[30px] hover:text-red-600 focus:outline-none"
                onClick={onClose}
                aria-label="Close dialog"
              >
                X
              </button>
            </div>
            {data && (
              <div className="px-4" dir={dir}>
                {/* Image Section */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={data.imageUrl}
                    alt={name}
                    width={150}
                    height={150}
                    className="m-auto inline-block rounded-lg transition-transform duration-300 hover:scale-110 cursor-pointer"
                    priority
                  />
                </div>

                {/* Content Section */}
                <div className="py-4">
                  <h2 className="text-lg font-bold mb-2">{name}</h2>

                  {/* Price and Select Button */}
                  <div className="flex justify-between items-center pt-2 pb-2">
                    
                    <button
                      onClick={handleSelect}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-white ${
                        isSelected ? "bg-green-500 hover:bg-green-600" : "bg-primary hover:bg-primary-dark"
                      }`}
                    >
                      <CiShoppingCart size={18} />
                      <span className="text-sm">
                        {isSelected ? "Remove" : "Select"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default PopupPkg;
