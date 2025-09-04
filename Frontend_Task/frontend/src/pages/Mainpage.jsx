import { useState } from "react";
import {createShortUrl,getStats} from '../api/Sortapi.js'
function Mainpage()
{
   const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [shortLink, setShortLink] = useState(null);
  const [stats, setStats] = useState(null);
  const [shortcode, setShortcode] = useState("");

  const handleCreate = async () => {
    try {
      const data = await createShortUrl(url, validity);
      setShortLink(data.shortLink);
      setStats(null);
    } catch (err) {
      alert("Error creating short URL");
    }
  };

  const handleStats = async () => {
    try {
      const data = await getStats(shortcode);
      setStats(data);
    } catch (err) {
      alert("Error fetching stats");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>URL Shortener</h2>

      <div>
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Validity (mins)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          style={{ width: "100px", marginRight: "10px" }}
        />
        <button onClick={handleCreate}>Create Short URL</button>
      </div>

      {shortLink && (
        <div style={{ marginTop: "20px" }}>
          <p><b>Short URL:</b> <a href={shortLink}>{shortLink}</a></p>
        </div>
      )}

      <hr />

      <div>
        <input
          type="text"
          placeholder="Enter shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleStats}>Get Stats</button>
      </div>

      {stats && (
        <div style={{ marginTop: "20px" }}>
          <h3>Stats</h3>
          <p><b>Original URL:</b> {stats.url}</p>
          <p><b>Clicks:</b> {stats.clicks}</p>
          <p><b>Expiry:</b> {stats.expiry}</p>
        </div>
      )}
    </div>
  );
}
export default Mainpage
