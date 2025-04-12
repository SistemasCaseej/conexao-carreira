"use client"

// Este código é um componente funcional do React, chamado 'Home', que busca e exibe uma lista de usuários.
import {Accordion, AccordionContent, AccordionTrigger, AccordionItem} from "../components/ui/accordion";
import {useEffect, useState} from "react";

export default function Home() {

    // Definindo o estado 'users' para armazenar a lista de usuários
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Função assíncrona para buscar os dados dos usuários da API
        async function loadUsers() {
            const response = await fetch("api/users");// Essa rota é referente ao arquivo route.js
            const data = await response.json();
            setUsers(data);
        }
        loadUsers();
    }, []);

  return (
      <Accordion type="single" collapsible>
          {users.map((user, index) => (
              <AccordionItem key={index} value={String(index)}>
                  <AccordionTrigger>Membro {index}</AccordionTrigger>
                  <AccordionContent>{user}</AccordionContent>
              </AccordionItem>
          ))}
      </Accordion>
  );
}
