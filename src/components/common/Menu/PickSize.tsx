import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatters";

interface SizesProps {
  id: string;
  name: string;
  price: number;
}

interface ItemProps {
  basePrice: number;
}

function PickSize({ sizes, item }: { sizes: SizesProps; item: ItemProps }) {
  const { id, name, price } = sizes;

  return (
    <RadioGroup defaultValue="comfortable">
      <div key={id} className="flex items-center space-x-2 border-gray-100 rounded-md p-4">
        <RadioGroupItem value="default" id={id} />
        <Label htmlFor={id}>
          {name}-and-{formatCurrency(price + item.basePrice)}
        </Label>
      </div>
    </RadioGroup>
  );
}

export default PickSize;
