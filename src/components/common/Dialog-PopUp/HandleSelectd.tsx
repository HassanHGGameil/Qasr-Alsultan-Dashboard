import { useState } from "react";
import PopupPkg from "./PopupPkg";

const ParentComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Example pkgItem data
  const pkgItem = {
    id: "e80642c9-5686-4738-a1f3-667637fb9886",
    imageUrl: "https://res.cloudinary.com/dso04gj6a/image/upload/v1734887655/uy29g9nagajyslq2drf6.png",
    nameEn: "Afia-Oil",
    nameAr: "زيت عافيه",
    userPkgId: "39c41c4d-5491-4a01-8223-fd8b028d540f",
  };

  

  const handleSelect = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((item) => item !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <PopupPkg
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={pkgItem}
        selectedItems={selectedItems}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default ParentComponent;
