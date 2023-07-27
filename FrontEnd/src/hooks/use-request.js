import { useEffect, useState } from "react";

export default function useRequest({ requestFn }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      requestFn()
        .then((data) => setData(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
      setRefresh(false);
    }
  }, [requestFn, refresh]);

  return {
    loading,
    error,
    data,
    setRefresh,
  };
}
