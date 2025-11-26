import { redirect } from "next/navigation";
import { DOMAIN } from "@/lib/constains/constains";

export default function RootPage() {
  // This will be server-side redirected to the dashboard
  redirect(`${DOMAIN}/en/dashboard`);
  
  // This return is needed for TypeScript, but won't be reached due to the redirect
  return null;
}
