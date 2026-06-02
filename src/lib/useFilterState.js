import { useState } from "react";

// Initial state samlet ét sted for alle filtre
const initialFilters = {
  sort: "",
  ageMin: "",
  ageMax: "",
  budgetMin: "",
  budgetMax: "",
  includeAcconto: false,
  takeoverDate: "",
  leasePeriod: "",
  city: "",
  postalCode: "",
  distance: 5,
  gender: "",
  roomiesCount: 1,
  facilities: {
    Opvaskemaskine: false,
    Vaskemaskine: false,
    Tørretumbler: false,
    Parkering: false,
    Altan: false,
  },
  occupation: {
    Studerende: false,
    Fuldtidsarbejde: false,
    Deltidsarbejde: false,
    Jobsøgende: false,
    Andet: false,
  },
  matchScore: "",
};

export default function useFilterState() {
  // State-hook til at holde styr på alle filtre
  const [filters, setFilters] = useState(initialFilters);

  // Opdaterer simple værdier i filter-objektet
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Opdaterer værdier i nested objekter (fx facilities eller occupation)
  const updateNestedFilter = (group, key, value) => {
    setFilters((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: value,
      },
    }));
  };

  // Toggler boolean værdier i nested objekter (bruges til checkboxes)
  const toggleNestedFilter = (group, key) => {
    setFilters((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: !prev[group][key],
      },
    }));
  };

  // Nulstiller alle filtre til deres startværdier
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Returnerer state og alle hjælpefunktioner
  return {
    filters,
    updateFilter,
    updateNestedFilter,
    toggleNestedFilter,
    resetFilters,
  };
}
