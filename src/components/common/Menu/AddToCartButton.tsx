"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { Label } from "@/components/ui/label";
import PickSize from "./PickSize";
import Extras from "./Extras";

interface PopupProps {
  name: string;
  description?: string;
  basePrice: number;
  image: string | StaticImageData;
}

function AddToCartButton({ item }: { item: PopupProps }) {
  const { name, image, description } = item;

  const sizes = [
    {
      id: crypto.randomUUID(),
      name: "Small",
      price: 0,
    },

    {
      id: crypto.randomUUID(),
      name: "Meduim",
      price: 4,
    },

    {
      id: crypto.randomUUID(),
      name: "Large",
      price: 8,
    },
  ];

  const extras = [
    {
      id: crypto.randomUUID(),
      name: "Chesse",
      price: 8,
    },

    {
      id: crypto.randomUUID(),
      name: "Onion",
      price: 6,
    },

    {
      id: crypto.randomUUID(),
      name: "Tomato",
      price: 10,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          className="mt-4 text-white rounded-full !px-8"
        >
          <span className="">Add To Cart</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center">
          <Image src={image} alt={name} width={350} height={350} />
          <DialogTitle>{name}</DialogTitle>

          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <Label className="">Pick Your PKG-Size</Label>
            <div className="">
              {sizes.map((size) => (
                <PickSize key={size.id} sizes={size} item={item} />
              ))}
            </div>
          </div>

          <div className="space-y-4 text-center">
            <Label className="">Add Extras</Label>
            <div className="">
              {extras.map((extra) => (
                <Extras key={extra.id} extras={extra} />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full h-10 " type="submit">Add To Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCartButton;
