import { ALLOWED_CHARACTERS } from "./constants";

export type AllowedCharaters =
	| "numbers"
	| "uppercase"
	| "lowercase"
	| "symbols";

export type AllowedCharatersList = AllowedCharaters | Array<AllowedCharaters>;

export class CharacterList {
	characters: string[];

	constructor(allowedCharacters?: AllowedCharatersList, custom?: string) {
		if (custom && custom.trim() !== "") {
			this.characters = CharacterList.toCharacters(custom, false);
			return;
		}
		if (!allowedCharacters) {
			allowedCharacters = ["uppercase", "lowercase"];
		}
		let charsList = "";
		if (typeof allowedCharacters === "string") {
			charsList = allowedCharacters;
		} else {
			allowedCharacters.forEach((chars) => {
				switch (chars) {
					case "lowercase":
						charsList += ALLOWED_CHARACTERS.lowercase;
						break;
					case "uppercase":
						charsList += ALLOWED_CHARACTERS.uppercase;
						break;
					case "numbers":
						charsList += ALLOWED_CHARACTERS.numbers;
						break;
					case "symbols":
						charsList += ALLOWED_CHARACTERS.symbols;
						break;
				}
			});
		}

		this.characters = CharacterList.toCharacters(charsList, false);
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
		let index = characters.length,
			randomIndex;
		while (index != 0) {
			randomIndex = Math.floor(Math.random() * index);
			index--;
			[characters[index], characters[randomIndex]] = [
				characters[randomIndex],
				characters[index],
			];
		}
		return characters.join("");
	}

	static toCharacters(
		value: string,
		allowDuplicates: boolean = true
	): string[] {
		const array = Array.from(value);
		return allowDuplicates ? array : Array.from(new Set(array));
	}
}
