import { allowedCharacters_alphanumeric, allowedCharacters_letters, allowedCharacters_numbers, allowedCharacters_symbols } from "./constants";

export type AllowedCharaters = {
  type: "numbers" | "letters" | "alphanumeric" | "symbols" | "custom",
  custom?: string,
};

export class CharacterList {
  characters: string[];

  constructor(allowedCharacters?: AllowedCharaters) {
    if (!allowedCharacters) {
      allowedCharacters = { type: "alphanumeric" };
    }
    switch (allowedCharacters.type) {
      case "custom":
        if (!allowedCharacters.custom) throw new Error("AllowedCharaters is 'custom' type , but 'AllowedCharaters.custom' is ");
        this.characters = CharacterList.toCharacters(allowedCharacters.custom, false);
        break;
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