import { useLocation } from "react-router-dom";
import { useMemo } from "react";

// Inspired by https://v5.reactrouter.com/web/example/query-parameters
const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

export default useQuery;
