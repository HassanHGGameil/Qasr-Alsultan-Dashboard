import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label';
import React from 'react'


interface ExtrasProps {
  id: string;
  name: string;
  price: number;
}

function Extras({extras}: {extras: ExtrasProps}) {
  const {id, name, price} = extras;


  return (
    <div className="flex items-center space-x-2 border-2 border-gray-100 rounded-md p-4">
    <Checkbox id={id} />
    <Label
      htmlFor="terms"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {name} {" "} {price}
    </Label>
  </div>
  )
}

export default Extras