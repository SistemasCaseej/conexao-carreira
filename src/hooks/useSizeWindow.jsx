
import { useEffect, useState } from 'react';

export function useWindowSize() {

    const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Adiciona o ouvinte de evento
        window.addEventListener('resize', handleResize);

        // Atualiza no primeiro carregamento
        handleResize();

        // Remove o ouvinte ao desmontar
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
