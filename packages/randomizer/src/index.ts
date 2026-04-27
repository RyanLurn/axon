import { femaleFirstNames, maleFirstNames } from "@/datasets/names/first";
import { capitalizeFirstLetter, getRandomItem } from "@/utils";
import { adjectives } from "@/datasets/adjectives";
import { lastNames } from "@/datasets/names/last";
import { nouns } from "@/datasets/nouns";

export function generateNickname() {
  const gender = Math.random() > 0.5 ? "male" : "female";
  const randomFirstName = getRandomItem(
    gender === "male" ? maleFirstNames : femaleFirstNames
  );
  const randomLastName = getRandomItem(lastNames);
  const randomAdjective = capitalizeFirstLetter(getRandomItem(adjectives));
  const randomNoun = capitalizeFirstLetter(getRandomItem(nouns));

  return `${randomFirstName} ${randomLastName} the ${randomAdjective} ${randomNoun}`;
}
