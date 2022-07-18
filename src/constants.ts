import { AllowedCharaters } from "./CharacterList";

export const ALLOWED_CHARACTERS: Record<AllowedCharaters, string> = {
  uppercase: "QWERTYUIOPASDFGHJKLZXCVBNM",
  lowercase: "qwertyuiopasdfghjklzxcvbnm",
  numbers: "1234567890",
  symbols: "`~!@#$%^&*()-_=+{}[];:'\"|\\<>,.?/"
}