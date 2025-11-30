/**
 * Helper to get kursEnabled from environment variable.
 * Used in getServerSideProps across pages.
 */
export function getKursEnabled(): boolean {
  const { KURS_ENABLED } = process.env;
  if (KURS_ENABLED == null) {
    throw new Error('KURS_ENABLED is not set');
  }
  return Boolean(KURS_ENABLED);
}

