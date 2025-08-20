interface DateFormatOptions {
  year: 'numeric' | '2-digit';
  month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day: 'numeric' | '2-digit';
}

const options: DateFormatOptions = { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric' 
};

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en', options);
}