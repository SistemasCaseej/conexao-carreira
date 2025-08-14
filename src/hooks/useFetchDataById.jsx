import { useEffect, useState } from "react";

export function useFetchDataById(id, fetchFunction) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function fetchData() {
            setLoading(true);
            try {
                const result = await fetchFunction(id);
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id, fetchFunction]);

    return { data, setData, loading, error };
}