import axios from "axios";
import React, { useEffect, useState } from "react";

const Crypto = () => {
  //1. setear los hoooks
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  // 2. funcion para traer la data

  const endpoint = `https://api.coingecko.com/api/v3/coins`;
  const showData = () => {
    axios.get(endpoint).then((resp) => {
      console.log(resp.data);
      setCrypto(resp.data);
    });
  };

  useEffect(() => {
    showData();
  }, []);

  // 3. funcion de busqueda

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // 4. funcion de filtrado
  const results = !search
    ? crypto
    : crypto.filter((value) =>
        value.name.toLowerCase().includes(search.toLowerCase())
      );

  // redefinir el componente
  return (
    <>
      <input
        type="text"
        placeholder="Buscar"
        onChange={searcher}
        className="form-control"
      />

      <table className="table table-dark table-hover mt-3">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Price 24h</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.market_data.market_cap_rank}</td>
              <td>
                <small>
                  <img src={result.image.small} /> {result.name}{" "}
                </small>
              </td>
              <td>{result.symbol.toUpperCase()}</td>
              <td>{result.market_data.current_price.bmd.toFixed(2)}</td>
              <td>
                {result.market_data.price_change_percentage_24h < 0 ? (
                  <span className="badge bg-danger">
                    {result.market_data.price_change_percentage_24h}
                  </span>
                ) : (
                  <span className="badge bg-success">
                    {result.market_data.price_change_percentage_24h}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Crypto;
