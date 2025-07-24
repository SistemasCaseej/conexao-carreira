'use client'

import {useEffect, useState} from "react";
import 'swagger-ui-react/swagger-ui.css';
import ReactSwagger from "@/app/api-doc/react-swagger";


export default function IndexPage() {
    const [spec, setSpec] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await fetch("/api/swagger", {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar documentação da API")
                }

                const data = await response.json();
                setSpec(data);
                setLoading(false);
            } catch (err) {
                setError(err.message)
            }
        };

        fetchDocs();
    }, []);

    if (loading) return <p>Carregando documentação...</p>
    if (error) return <p>Erro: {error}</p>

    return (
        <section className="container">
            <ReactSwagger spec={spec} />
        </section>
    );
}