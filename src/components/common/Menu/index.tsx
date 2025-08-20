
import React from "react";
import MenuItems from "./MenuItems";
import { StaticImageData } from "next/image";

interface menuProps {
    id: string;
    name: string;
    description: string;

    basePrice: number;
    image: string | StaticImageData;
}


function Menu({ item }: { item: menuProps[] }) {
    return (
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {item.map((item) => (
          <MenuItems key={item.id} {...item} />
        ))}
      </ul>
    );
  }

export default Menu;
