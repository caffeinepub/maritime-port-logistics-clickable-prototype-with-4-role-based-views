import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { RoleProvider } from './state/RoleProvider';
import { AppShell } from './components/layout/AppShell';
import { PortOpsDashboard } from './pages/dashboards/PortOpsDashboard';
import { BerthMasterDashboard } from './pages/dashboards/BerthMasterDashboard';
import { TugDispatcherDashboard } from './pages/dashboards/TugDispatcherDashboard';
import { MaintenanceDashboard } from './pages/dashboards/MaintenanceDashboard';
import { VesselsPage } from './pages/vessels/VesselsPage';
import { BerthingPage } from './pages/berthing/BerthingPage';
import { TugboatsPage } from './pages/tugboats/TugboatsPage';
import { AssignmentsPage } from './pages/assignments/AssignmentsPage';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: AppShell,
});

const portOpsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PortOpsDashboard,
});

const berthMasterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/berth-master',
  component: BerthMasterDashboard,
});

const tugDispatcherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tug-dispatcher',
  component: TugDispatcherDashboard,
});

const maintenanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/maintenance',
  component: MaintenanceDashboard,
});

const vesselsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vessels',
  component: VesselsPage,
});

const berthingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/berthing',
  component: BerthingPage,
});

const tugboatsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tugboats',
  component: TugboatsPage,
});

const assignmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assignments',
  component: AssignmentsPage,
});

const routeTree = rootRoute.addChildren([
  portOpsRoute,
  berthMasterRoute,
  tugDispatcherRoute,
  maintenanceRoute,
  vesselsRoute,
  berthingRoute,
  tugboatsRoute,
  assignmentsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RoleProvider>
        <RouterProvider router={router} />
        <Toaster />
      </RoleProvider>
    </ThemeProvider>
  );
}

export default App;
