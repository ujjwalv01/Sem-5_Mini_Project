export const indianLocations = {
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Tawang"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Rohtak"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  "Manipur": ["Imphal"],
  "Meghalaya": ["Shillong"],
  "Mizoram": ["Aizawl"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  "Puducherry": ["Puducherry", "Auroville"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Mohali"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "Sikkim": ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida", "Ghaziabad", "Meerut"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol"]
};

export const indianStates = Object.keys(indianLocations).sort();

// Abbreviations Google Places returns as `short_name` for administrative_area_level_1,
// mapped to the canonical names used in `indianLocations`.
const stateAbbreviations = {
  AN: "Andaman and Nicobar Islands",
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CH: "Chandigarh",
  CT: "Chhattisgarh",
  CG: "Chhattisgarh",
  DN: "Dadra and Nagar Haveli and Daman and Diu",
  DD: "Dadra and Nagar Haveli and Daman and Diu",
  DH: "Dadra and Nagar Haveli and Daman and Diu",
  DL: "Delhi",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JK: "Jammu and Kashmir",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  LA: "Ladakh",
  LD: "Lakshadweep",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OR: "Odisha",
  OD: "Odisha",
  PY: "Puducherry",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TG: "Telangana",
  TS: "Telangana",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UT: "Uttarakhand",
  UK: "Uttarakhand",
  WB: "West Bengal",
};

const stateLookup = Object.fromEntries(
  indianStates.map(st => [st.toLowerCase(), st])
);

// Resolve any spelling of a state (abbreviation, different casing, extra whitespace)
// to its canonical `indianStates` entry. Returns the trimmed input if unknown.
export function normalizeIndianState(value) {
  if (!value) return '';
  const trimmed = String(value).trim();
  const upper = trimmed.toUpperCase();
  if (stateAbbreviations[upper]) return stateAbbreviations[upper];
  const lower = trimmed.toLowerCase();
  if (stateLookup[lower]) return stateLookup[lower];
  // Common alternate names
  if (lower === 'nct of delhi' || lower === 'national capital territory of delhi') return 'Delhi';
  if (lower === 'orissa') return 'Odisha';
  if (lower === 'pondicherry') return 'Puducherry';
  if (lower === 'uttaranchal') return 'Uttarakhand';
  return trimmed;
}

// Older / alternate city names mapped to the spelling used in `indianLocations`.
const cityAliases = {
  gurgaon: "Gurugram",
  bangalore: "Bengaluru",
  bombay: "Mumbai",
  calcutta: "Kolkata",
  madras: "Chennai",
  mysore: "Mysuru",
  mangalore: "Mangaluru",
  hubli: "Hubballi",
  belgaum: "Belagavi",
  trivandrum: "Thiruvananthapuram",
  calicut: "Kozhikode",
  poona: "Pune",
  baroda: "Vadodara",
  trichy: "Tiruchirappalli",
  delhi: "New Delhi",
};

const cityToState = Object.fromEntries(
  Object.entries(indianLocations).flatMap(([st, cities]) =>
    cities.map(c => [c.toLowerCase(), st])
  )
);

// Look up the state a city belongs to (case-insensitive, alias-aware). Returns '' if unknown.
export function inferIndianStateFromCity(city) {
  if (!city) return '';
  const lower = String(city).trim().toLowerCase();
  const canonicalCity = cityAliases[lower] || lower;
  return cityToState[canonicalCity.toLowerCase()] || '';
}

// All spellings a city may have been stored under: the input plus any aliases of it
// (e.g. "Gurugram" -> ["Gurugram", "Gurgaon"]). Used by the search API.
export function getIndianCityVariants(city) {
  if (!city) return [];
  const trimmed = String(city).trim();
  const lower = trimmed.toLowerCase();
  const canonical = cityAliases[lower] || trimmed;
  const aliases = Object.entries(cityAliases)
    .filter(([, name]) => name.toLowerCase() === canonical.toLowerCase())
    .map(([alias]) => alias);
  return [...new Set([trimmed, canonical, ...aliases])];
}

// True when the value is one of the canonical `indianStates` entries.
export function isIndianState(value) {
  return indianStates.includes(value);
}

// All spellings a state may have been stored under: the canonical name, the raw input,
// and every known abbreviation. Used by the search API to match legacy rows.
export function getIndianStateVariants(value) {
  if (!value) return [];
  const canonical = normalizeIndianState(value);
  const abbreviations = Object.entries(stateAbbreviations)
    .filter(([, name]) => name === canonical)
    .map(([abbr]) => abbr);
  return [...new Set([canonical, String(value).trim(), ...abbreviations])];
}
