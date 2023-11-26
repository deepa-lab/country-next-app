import { useEffect, useState } from "react"
import Search from "./Search";
const Country = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("");
    const [paginate, setpaginate] = useState(8);
    useEffect(() => {
        const apiKey = 'xrOtFB3Yq1UhEumrNajxngf9v1wvdQsPP9BzoIzf';
        const request_headers = new Headers();
        request_headers.append("Authorization", `Bearer ${apiKey}`);
        request_headers.append("Content-Type", "application/json");


        const getCountries = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://countryapi.io/api/all?apikey=${apiKey}`);
                const data = await res.json();
                setCountries(data);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }
        getCountries();
    }, []);
    const data = Object.values(countries);
    const search_parameters = Object.keys(Object.assign({}, ...data));

    function search(data) {
        return data.filter(
            (item) =>
            item.region.includes(filter) && search_parameters.some((parameter) =>
                    item[parameter].toString().toLowerCase().includes(query)
                )
        );
    }
    const load_more = (event) => {
        setpaginate((prevValue) => prevValue + 8);
      };
    const filter_items = [...new Set(data.map((item) => item.region))];
    if (error) {
        return <>{error.message}</>;
    } else if (loading) {
        return <>loading...</>;
    } else {
        return (
            <div className="wrapper">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <span className="sr-only">Search countries here</span>
                    </label>
                   
                    <div className="select">
 <select
  onChange={(e) => setFilter(e.target.value)}
  className="custom-select"
  aria-label="Filter Countries By Region">
  <option value="">Filter By Region</option>
  {filter_items.map((item) => (
   <option value={item}>Filter By {item}</option>
  ))}
</select>
<span className="focus"></span>
</div>
</div>
                    <div className="wrapper">
                        <ul className="card-grid">
                            {search(data).slice(0, paginate).map((item) => (
                                <li key={item.alpha3Code}>
                                    <article className="card">
                                        <div className="card-image">
                                            <img src={item.flag.large} alt={item.name} />
                                        </div>
                                        <div className="card-content">
                                            <h2 className="card-name">{item.name}</h2>
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={load_more}>Load More</button>
            </div>
        );
    }

    //     
    //    return <div className="wrapper">
    //     <div className="search-wrapper">
    //       <label htmlFor="search-form">
    //         <input
    //           type="search"
    //           name="search-form"
    //           id="search-form"
    //           className="search-input"
    //           placeholder="Search for..."
    //           onChange={(e) => setQuery(e.target.value)}
    //         />
    //         <span className="sr-only">Search countries here</span>
    //       </label>
    //     </div>


    //             {if (loading) return <p>Loading....</p>}
    //             else if(error) return (<p>{error}</p>)
    //             else {

    //                 return <div className="wrapper">
    //                 <ul className="card-grid">
    //                   {data.map((item) => (
    //                     <li key={item.alpha3Code}>
    //                       <article className="card">
    //                         <div className="card-image">
    //                           <img src={item.flag.large} alt={item.name} />
    //                         </div>
    //                         <div className="card-content">
    //                           <h2 className="card-name">{item.name}</h2>
    //                           </div>
    //                       </article>
    //                     </li>
    //                   ))}
    //                 </ul>
    //               </div>
    //               </div>}

}
export default Country