type VoiceModel = "online" | "offline"

export interface Voice {
  id: string
  name: string
  locale: string
  gender: string
  mode: VoiceModel
}
