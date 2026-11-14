export default function searchCountries(
  searchString: string,
  signal: AbortSignal
): Promise<unknown[]> {
  console.log(searchString, signal);
}
