import type {
  YearData,
  LocationData,
  CompanyData,
  MajorData,
} from '@/types/alumni-query';

/**
 * Helper function to group and count data by year
 */
export function groupAndCountByYear(
  data: YearData
): Array<{ year: number; count: number }> {
  const grouped = data.reduce(
    (acc, item) => {
      const value = item.year;
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    },
    {} as Record<number, number>
  );

  return Object.entries(grouped)
    .map(([key, count]) => ({
      year: parseInt(key),
      count: count as number,
    }))
    .sort((a, b) => (b.count as number) - (a.count as number));
}

/**
 * Helper function to group and count data by location
 */
export function groupAndCountByLocation(
  data: LocationData
): Array<{ location: string; count: number }> {
  const grouped = data.reduce(
    (acc, item) => {
      const value = item.location;
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(grouped)
    .map(([key, count]) => ({
      location: key,
      count: count as number,
    }))
    .sort((a, b) => (b.count as number) - (a.count as number));
}

/**
 * Helper function to group and count data by company
 */
export function groupAndCountByCompany(
  data: CompanyData
): Array<{ company: string; count: number }> {
  const grouped = data.reduce(
    (acc, item) => {
      const value = item.company;
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(grouped)
    .map(([key, count]) => ({
      company: key,
      count: count as number,
    }))
    .sort((a, b) => (b.count as number) - (a.count as number));
}

/**
 * Helper function to group and count data by major
 */
export function groupAndCountByMajor(
  data: MajorData
): Array<{ major: string; count: number }> {
  const grouped = data.reduce(
    (acc, item) => {
      const value = item.major;
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(grouped)
    .map(([key, count]) => ({
      major: key,
      count: count as number,
    }))
    .sort((a, b) => (b.count as number) - (a.count as number));
}
