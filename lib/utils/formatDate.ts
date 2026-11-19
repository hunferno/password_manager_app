const FRENCH_MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Formate une date au format français long : "05 mars 2024 à 14h07".
 * Renvoie une chaîne vide si la date est absente ou invalide.
 */
export function formatDateTimeFr(input?: string | number | Date | null): string {
  if (input === undefined || input === null || input === "") return "";
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";

  return `${pad(date.getDate())} ${FRENCH_MONTHS[date.getMonth()]} ${date.getFullYear()} à ${pad(
    date.getHours()
  )}h${pad(date.getMinutes())}`;
}
