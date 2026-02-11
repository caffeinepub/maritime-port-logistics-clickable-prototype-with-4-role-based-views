import { Outlet } from '@tanstack/react-router';
import { HeaderBar } from './HeaderBar';
import { SideNav } from './SideNav';

export function AppShell() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderBar />
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
