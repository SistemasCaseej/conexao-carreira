"use client"

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {useEffect, useState} from "react";

export function NavMain({items, user}) {

  const visibleItems = items.filter(item => item.roles.includes(user?.role));
  const [rolePt, setRolePt] = useState("");

  useEffect(() => {
    if (user?.role) {
      const mapRole = {
        Admin: "Administrador",
        Employee: "Empresa",
        Candidate: "Estudante"
      };
      setRolePt(mapRole[user.role] || "Desconhecido");
    }
  }, [user]);

  return (
    (<SidebarGroup>
      <SidebarGroupLabel className="text-white">{rolePt || ""}</SidebarGroupLabel>
      <SidebarMenu>
        {visibleItems.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem className="rounded-md">
              <SidebarMenuButton asChild className="hover:bg-white hover:text-[#49257b]" tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight className="text-white"/>
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items
                          .filter(subItem =>  subItem.roles?.includes(user?.role))
                          .map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton className="hover:bg-white hover:text-[#49257b] text-white" asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                          )
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}
