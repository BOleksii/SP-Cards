import { checkAndFilterCard } from "./checkAndFilterCard.js"

export const renderFilteredCards = (array) => {
  console.log(array);
  console.log('rendering filtered cards');
  array.forEach(element => checkAndFilterCard(element));
};
