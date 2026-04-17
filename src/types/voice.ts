export interface TTSVoice {
  id: string
  name: string
  locale: string
  gender: string
  mode: "online" | "offline"
}

export type TTSMode = "online" | "offline"
