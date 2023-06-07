export default function CountryBox({ country }) {
  return (
    <div key={country.name.common}>
      <img src={country.flags.png} alt={country.name.official} />
      <h3>{country.name.official}</h3>
      <h4>
        Population: <span>{country.population}</span>
      </h4>
      <h4>Region: {country.region}</h4>
      {country.capital && <h4>Capital: {country.capital[0]}</h4>}
      <div className="borders">
        {country.borders &&
          country.borders.map((border) => {
            return <div key={border}>{border}</div>;
          })}
      </div>
    </div>
  );
}
