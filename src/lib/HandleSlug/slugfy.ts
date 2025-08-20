export function generateSlug(text: string, isArabic = false): string {
  let result = text.toLowerCase().trim();

  if (isArabic) {
    result = result
      .normalize("NFD")
      .replace(/[\u064B-\u065F]/g, "")
      .replace(/[^\w\s\u0600-\u06FF-]/g, ""); // keep Arabic
  } else {
    result = result.replace(/[^\w\s-]/g, ""); // keep English
  }

  return result.replace(/\s+/g, "-").replace(/-+/g, "-");
}
