/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
export function getRandomEnumValue<T>(en: T) {
    const values = Object.values(en as object);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}
