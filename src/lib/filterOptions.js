// Muligheder for sortering af søgeresultater
export const SORT_OPTIONS = [
  { value: "a-z", label: "A - Å" },
  { value: "z-a", label: "Å - A" },
  { value: "new-old", label: "Nyeste - Ældste" },
  { value: "old-new", label: "Ældste - Nyeste" },
];

// Tilgængelige aldersintervaller
export const AGE_RANGES = [
  "18 - 20 år",
  "20 - 22 år",
  "22 - 24 år",
  "24 - 26 år",
  "26 - 28 år",
  "28 - 30 år",
  "30 - 32 år",
];

// Budgetintervaller pr. måned
export const PRICE_RANGES = [
  "1.000 kr.",
  "2.000 kr.",
  "3.000 kr.",
  "4.000 kr.",
  "5.000 kr.",
  "6.000 kr.",
  "7.000 kr.",
  "8.000 kr.",
  "9.000 kr.",
  "10.000 kr.",
];

// Muligheder for ønsket lejeperiode
export const LEASE_PERIOD_OPTIONS = [
  { value: "all", label: "Alle har interesse" },
  { value: "1-11", label: "1-11 måneder" },
  { value: "12-23", label: "12-23 måneder" },
  { value: "24plus", label: "24+ måneder" },
  { value: "unlimited", label: "Ubegrænset" },
];

// Mulige kønsmuligheder
export const GENDER_OPTIONS = [
  { value: "mand", label: "Mand" },
  { value: "kvinde", label: "Kvinde" },
  { value: "andet", label: "Andet" },
  { value: "ingen-preference", label: "Ingen præference" },
];

// Mapping fra filtervalg til databaseværdier for gender
export const GENDER_DB_MAP = {
  mand: ["Mand"],
  kvinde: ["Kvinde"],
  andet: ["Andet"],
  "ingen-preference": ["Mand", "Kvinde", "Andet"],
};

// Tilgængelige boligfaciliteter
export const FACILITIES = [
  "Opvaskemaskine",
  "Vaskemaskine",
  "Tørretumbler",
  "Parkering",
  "Altan",
];

// Mulige beskæftigelsestyper
export const OCCUPATION_OPTIONS = [
  "Studerende",
  "Fuldtidsarbejde",
  "Deltidsarbejde",
  "Jobsøgende",
  "Andet",
];

// Mapping fra filtervalg til databaseværdier for occupation
export const OCCUPATION_DB_MAP = {
  Studerende: ["Studerende"],
  Fuldtidsarbejde: ["Arbejder"],
  Deltidsarbejde: ["Arbejder"],
  Jobsøgende: ["Jobsøgende"],
  Andet: ["Elev"],
};

// Filtrering baseret på minimum matchscore
export const MATCHSCORE_OPTIONS = ["70+", "80+", "90+"];

// Konverterer dato til et format der kan bruges i filtreringen
export function normalizeDateInput(value) {
  const trimmed = value.trim();

  if (!trimmed) return "";

  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return trimmed;

  const dkMatch = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (dkMatch) {
    const [, day, month, year] = dkMatch;
    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }

  return "";
}
