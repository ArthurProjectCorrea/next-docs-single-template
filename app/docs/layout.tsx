import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/doc-sidebar';
import { DocToc } from '@/components/doc-toc';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto flex h-full">
      <SidebarProvider className="flex">
        <AppSidebar />

        <SidebarInset
          id="docs-content"
          className="overflow-y-auto"
          style={{ scrollPaddingTop: 'var(--header-height)' }}
        >
          {children}
        </SidebarInset>

        <DocToc />
      </SidebarProvider>
    </div>
  );
}
