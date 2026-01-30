import * as React from 'react';
import { Minus, Plus } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';

import data from '../database/doc-sidebar.json';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-6rem)] overscroll-none bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2">
        <div className="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-linear-to-b blur-xs" />
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => {
              if (item.items?.length) {
                return (
                  <Collapsible
                    key={item.title}
                    defaultOpen={index === 1}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.title}{' '}
                          <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={subItem.isActive}
                              >
                                <a href={subItem.url}>{subItem.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              } else {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }
            })}
          </SidebarMenu>
        </SidebarGroup>
        <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
