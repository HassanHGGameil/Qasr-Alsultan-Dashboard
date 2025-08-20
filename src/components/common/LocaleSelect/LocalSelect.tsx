"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  defaultValue: string;
  className?: string;
};

const languageNames: Record<Locale, string> = {
  en: "English",
  ar: "العربيه",
  // Add more languages as needed
};

export default function LocalSelect({ defaultValue, className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleChange = (value: string) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: value as Locale }
    );
  };

  return (
    <div className={cn("relative", className)}>
      <Select defaultValue={defaultValue} onValueChange={handleChange}>
        <SelectTrigger className="flex w-full items-center gap-2 pl-3 pr-2">
          <Globe className="h-4 w-4 text-muted-foreground text-blue-900" />
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="min-w-[var(--radix-select-trigger-width)] ">
          {routing.locales.map((lang) => (
            <SelectItem key={lang} value={lang} className="group focus:bg-green-300">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium ">
                    {languageNames[lang] || lang.toUpperCase()}
                  </span>
                 
                </div>
                
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}