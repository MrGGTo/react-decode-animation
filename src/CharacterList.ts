import { allowedCharacters_alphanumeric, allowedCharacters_letters, allowedCharacters_numbers, allowedCharacters_symbols } from "./constants";

export const allowedCharaters = ["numbers", "letters", "alphanumeric", "symbols"] as const;
export type AllowedCharaters = typeof allowedCharaters[number];

export class CharacterList {
  characters: string[];

  constructor(allowedCharacters?: AllowedCharaters, custom?: string) {
    if (custom) {
      this.characters = CharacterList.toCharacters(custom, false);
      return;
    }
    if (!allowedCharacters) {
      allowedCharacters = "alphanumeric";
    }
    switch (allowedCharacters) {
      case "letters":
        this.characters = CharacterList.toCharacters(allowedCharacters_letters, false);
        break;
      case "numbers":
        this.characters = CharacterList.toCharacters(allowedCharacters_numbers, false);
        break;
      case "symbols":
        this.characters = CharacterList.toCharacters(allowedCharacters_symbols, false);
        break;
      default:
        this.characters = CharacterList.toCharacters(allowedCharacters_alphanumeric, false);
        break;
    }
  }
  
  static *generateCode(loopString: string) {
    for (let index = 0; index < loopString.length; index++) {
      yield loopString[index];
      if (index + 1 >= loopString.length) {
        index = 0;
      }
    }
  }

  shuffle(): string {
    let characters = this.characters;
    let index = characters.length, randomIndex;
    while (index != 0) {
      randomIndex = Math.floor(Math.random() * index);
      index--;
      [characters[index], characters[randomIndex]] = [characters[randomIndex], characters[index]];
    }
    return characters.join("");
  }
  
  static toCharacters(value: string, allowDuplicates: boolean = true): string[] {
    const array = Array.from(value);
    return allowDuplicates ? array : Array.from(new Set(array));
  }
}