import { Link, List, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Provider } from "./Provider";

export default function Providers() {
  const BASE_URL = "http://localhost:3001";

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`${BASE_URL}/providers`);
      const data = await response.json();
      setProviders(data);
    };

    loadData();
  }, []);

  useEffect(() => {
    console.log("providers", providers);
  }, [providers]);

  return (
    <>
      <List>
        {providers.map((provider: Provider) => (
          <>
            <ListItem key={provider.id}>
              <ListItemText primary={provider.name} />
              {/* <Link component={RouterLink} to="/eligibility">Check Eligibility</Link> */}
              <Link component={RouterLink} to={provider.portal_url ? provider.portal_url : "/eligibility"}>Check Eligibility</Link>
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
}

