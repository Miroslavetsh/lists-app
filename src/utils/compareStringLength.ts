export default function compareStringLength(text: string, maxLen: number) {
  return text.length > maxLen ? text.slice(0, maxLen - 3) + '...' : text
}
