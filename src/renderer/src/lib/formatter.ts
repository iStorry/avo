export function formatVoiceName(name: string): string {
  return name.replace("Microsoft ", "").replace(" Online (Natural)", "")
}
