import { useEffect, useState } from "react";
import { Query, Headers } from "../utils/graphQlQuery";

export default function useGraphQLFetch(URL) {
  const [results, setResults] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(URL, {
          method: "POST",
          body: JSON.stringify(Query),
          headers: Headers,
        });

        if (response.ok) {
          const JSONData = await response.json();
          const results = JSONData?.data?.results;
          setResults({ ...results });
        } else {
          const error = new Error("Something went wrong!!!");
          throw error;
        }
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [URL]);

  return {
    isLoading,
    results,
    error,
  };
}
