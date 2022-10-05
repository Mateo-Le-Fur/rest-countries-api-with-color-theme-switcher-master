export async function fetchCountries(region: string | null): Promise<[]> {
  if (region !== "All") {
    return await (
      await fetch(`https://restcountries.com/v3.1/region/${region}`)
    ).json();
  }
  return await (await fetch("https://restcountries.com/v3.1/all")).json();
}

export async function fetchCountriesByName(
  name: string
): Promise<[] | boolean | undefined> {
  if (name !== "") {
    const countries = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=false`
    );

    if (!countries.ok) {
      return false;
    }

    return await countries.json();
  }
}
