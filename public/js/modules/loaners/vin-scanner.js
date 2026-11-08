// Minimal VIN helpers for the standalone scanner test.
const TRANSLITERATE = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
  0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9
};
const WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

const YEAR_BASE = {
  A: 1980, B: 1981, C: 1982, D: 1983, E: 1984, F: 1985, G: 1986, H: 1987,
  J: 1988, K: 1989, L: 1990, M: 1991, N: 1992, P: 1993, R: 1994, S: 1995,
  T: 1996, V: 1997, W: 1998, X: 1999, Y: 2000,
  1: 2001, 2: 2002, 3: 2003, 4: 2004, 5: 2005, 6: 2006, 7: 2007, 8: 2008, 9: 2009
};

const REGION_BY_FIRST = {
  1: "United States",
  2: "Canada",
  3: "Mexico",
  4: "United States",
  5: "United States",
  6: "Australia",
  7: "New Zealand",
  8: "Argentina",
  9: "Brazil / South America",
  J: "Japan",
  K: "South Korea",
  L: "China",
  M: "India / Asia",
  N: "Turkey / Asia",
  P: "Asia",
  R: "Asia",
  S: "United Kingdom",
  T: "Europe",
  V: "France / Spain",
  W: "Germany",
  X: "Russia / Europe",
  Y: "Sweden / Finland",
  Z: "Italy"
};

const WMI_MAKERS = {
  "19U": "Acura",
  "1C3": "Chrysler",
  "1C4": "Chrysler / Dodge / Jeep",
  "1C6": "Ram",
  "1FA": "Ford",
  "1FB": "Ford",
  "1FC": "Ford",
  "1FD": "Ford",
  "1FM": "Ford",
  "1FT": "Ford",
  "1F6": "Ford",
  "1G1": "Chevrolet",
  "1G4": "Buick",
  "1G6": "Cadillac",
  "1GC": "Chevrolet",
  "1GK": "GMC",
  "1GM": "Pontiac",
  "1GN": "Chevrolet",
  "1GT": "GMC",
  "1HG": "Honda",
  "1J4": "Jeep",
  "1J8": "Jeep",
  "1L1": "Lincoln",
  "1LJ": "Lincoln",
  "1LN": "Lincoln",
  "1ME": "Mercury",
  "1N4": "Nissan",
  "1N6": "Nissan",
  "1VW": "Volkswagen",
  "1V1": "Volkswagen",
  "1ZV": "Ford",
  "2C3": "Chrysler",
  "2C4": "Chrysler",
  "2G1": "Chevrolet",
  "2G4": "Buick",
  "2HG": "Honda",
  "2HH": "Acura",
  "2HJ": "Honda",
  "2HK": "Honda",
  "2LM": "Lincoln",
  "2T1": "Toyota",
  "2T2": "Lexus",
  "2T3": "Toyota",
  "3FA": "Ford",
  "3GN": "Chevrolet",
  "3HG": "Honda",
  "3N1": "Nissan",
  "3VW": "Volkswagen",
  "4S3": "Subaru",
  "4S4": "Subaru",
  "4T1": "Toyota",
  "4T3": "Toyota",
  "4T4": "Toyota",
  "5FN": "Honda",
  "5J6": "Honda",
  "5N1": "Nissan",
  "5TD": "Toyota",
  "5TE": "Toyota",
  "5TF": "Toyota",
  "5UX": "BMW",
  "5YJ": "Tesla",
  "5YM": "BMW",
  "7SA": "Tesla",
  "JA3": "Mitsubishi",
  "JA4": "Mitsubishi",
  "JF1": "Subaru",
  "JF2": "Subaru",
  "JH4": "Acura",
  "JHM": "Honda",
  "JM1": "Mazda",
  "JM3": "Mazda",
  "JN1": "Nissan",
  "JN8": "Nissan",
  "JT2": "Toyota",
  "JT3": "Toyota",
  "JT6": "Lexus",
  "JT8": "Lexus",
  "JTD": "Toyota",
  "JTE": "Toyota",
  "JTH": "Lexus",
  "JTJ": "Lexus",
  "JTM": "Toyota",
  "JTN": "Toyota",
  "KL1": "Chevrolet",
  "KMH": "Hyundai",
  "KNA": "Kia",
  "KND": "Kia",
  "MA3": "Suzuki",
  "ML3": "Mitsubishi",
  "MM8": "Mazda",
  "MRH": "Honda",
  "NMT": "Toyota",
  "SAJ": "Jaguar",
  "SAL": "Land Rover",
  "SAR": "Land Rover",
  "SCC": "Lotus",
  "TMB": "Skoda",
  "TRU": "Audi",
  "VF1": "Renault",
  "VF3": "Peugeot",
  "VF7": "Citroen",
  "VSS": "SEAT",
  "W1K": "Mercedes-Benz",
  "W1N": "Mercedes-Benz",
  "WA1": "Audi",
  "WAU": "Audi",
  "WBA": "BMW",
  "WBS": "BMW M",
  "WBX": "BMW",
  "WBY": "BMW",
  "WDB": "Mercedes-Benz",
  "WDC": "Mercedes-Benz",
  "WDD": "Mercedes-Benz",
  "WP0": "Porsche",
  "WP1": "Porsche",
  "WVG": "Volkswagen",
  "WV1": "Volkswagen",
  "WV2": "Volkswagen",
  "WVW": "Volkswagen",
  "YV1": "Volvo",
  "YV4": "Volvo",
  "YS3": "Saab",
  "ZAM": "Maserati",
  "ZAR": "Alfa Romeo",
  "ZFA": "Fiat",
  "ZFF": "Ferrari"
};

export function normalizeVin(raw) {
  return String(raw || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/O/g, "0")
    .replace(/I/g, "1")
    .replace(/Q/g, "0");
}

export function isValidVin(vin) {
  return typeof vin === "string" && /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
}

export function passesVinChecksum(vin) {
  if (!isValidVin(vin)) return false;
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const val = TRANSLITERATE[vin[i]];
    if (val === undefined) return false;
    sum += val * WEIGHTS[i];
  }
  const mod = sum % 11;
  const check = mod === 10 ? "X" : String(mod);
  return vin[8] === check;
}

function looksLikeVin(vin) {
  if (!isValidVin(vin) || !passesVinChecksum(vin)) return false;
  const letters = (vin.match(/[A-HJ-NPR-Z]/g) || []).length;
  const digits = (vin.match(/[0-9]/g) || []).length;
  if (letters < 2 || digits < 2) return false;
  if (YEAR_BASE[vin[9]] == null) return false;
  return true;
}

const VIN_GROUP_PATTERNS = [
  [17],
  [3, 6, 8],
  [3, 14],
  [9, 8],
  [8, 9],
  [4, 4, 4, 5],
  [4, 4, 5, 4],
  [4, 5, 4, 4],
  [5, 4, 4, 4]
];

function patternScore(parts) {
  if (parts.length === 1 && parts[0] === 17) return 100;
  if (parts[0] === 3 && parts[1] === 6 && parts[2] === 8) return 90;
  return 80;
}

function lineRuns(line) {
  const runs = [];
  const re = /[A-Z0-9]+/g;
  let match;
  while ((match = re.exec(line))) {
    runs.push({
      text: match[0].replace(/O/g, "0").replace(/I/g, "1").replace(/Q/g, "0"),
      start: match.index,
      end: match.index + match[0].length
    });
  }
  return runs;
}

function allowedGap(gap) {
  return typeof gap === "string" && gap.length > 0 && gap.length <= 3 && /^[ \t\-.:]+$/.test(gap);
}

function findIsolatedVinCandidates(raw) {
  const lines = String(raw || "")
    .toUpperCase()
    .replace(/[|!\\]/g, "1")
    .split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    const runs = lineRuns(line);
    for (const run of runs) {
      if (run.text.length === 17) out.push({ vin: run.text, score: 100 });
    }
    for (let i = 0; i < runs.length; i += 1) {
      for (const pattern of VIN_GROUP_PATTERNS) {
        if (pattern.length < 2 || i + pattern.length > runs.length) continue;
        const parts = runs.slice(i, i + pattern.length);
        if (!parts.every((part, idx) => part.text.length === pattern[idx])) continue;
        let grouped = true;
        for (let k = 1; k < parts.length; k += 1) {
          const gap = line.slice(parts[k - 1].end, parts[k].start);
          if (!allowedGap(gap)) {
            grouped = false;
            break;
          }
        }
        if (!grouped) continue;
        out.push({
          vin: parts.map((part) => part.text).join(""),
          score: patternScore(pattern)
        });
      }
    }
  }
  return out;
}

export function extractValidVin(raw) {
  const ranked = [];
  const seen = new Set();
  for (const candidate of findIsolatedVinCandidates(raw)) {
    const vin = normalizeVin(candidate.vin);
    if (seen.has(vin)) continue;
    if (!looksLikeVin(vin)) continue;
    seen.add(vin);
    ranked.push({ vin, score: candidate.score });
  }
  if (!ranked.length) return "";
  ranked.sort((a, b) => b.score - a.score);
  return ranked[0].vin;
}

function decodeModelYear(code) {
  const base = YEAR_BASE[code];
  if (base == null) return null;
  const latestAllowed = new Date().getFullYear() + 1;
  let year = base;
  while (year + 30 <= latestAllowed) year += 30;
  return year;
}

export function decodeVin(raw) {
  const vin = normalizeVin(raw);
  const valid = isValidVin(vin);
  const checksumPassed = valid && passesVinChecksum(vin);
  if (!valid) {
    return {
      vin,
      valid: false,
      checksumPassed: false,
      wmi: "",
      manufacturer: "",
      region: "",
      vds: "",
      checkDigit: "",
      modelYear: null,
      plantCode: "",
      serialNumber: "",
      vehicleDescriptor: ""
    };
  }
  const wmi = vin.slice(0, 3);
  const vds = vin.slice(3, 8);
  return {
    vin,
    valid: true,
    checksumPassed,
    wmi,
    manufacturer: WMI_MAKERS[wmi] || "Unknown",
    region: REGION_BY_FIRST[vin[0]] || "Unknown",
    vds,
    checkDigit: vin[8],
    modelYear: decodeModelYear(vin[9]),
    plantCode: vin[10],
    serialNumber: vin.slice(11),
    vehicleDescriptor: vds
  };
}
