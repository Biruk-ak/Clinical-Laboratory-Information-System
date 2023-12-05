import { NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ModulePage } from './pages/ModulePage';

const MODULES = [
  'samples', 'tests', 'equipment', 'results', 'doctors', 'hospitals',
  'qualitycontrol', 'reports', 'analytics', 'patients', 'orders',
  'billing', 'inventory', 'auth', 'notifications',
] as const;

export default function App() {
  return (
    <div className="app-shell">
      <aside className="app-nav">
        <div className="brand">
          <span className="brand__mark">LIS</span>
          <span className="brand__name">Clinical Laboratory Information System</span>
        </div>
        <nav>
          <NavLink to="/" end>Overview</NavLink>
          {MODULES.map((m) => (
            <NavLink key={m} to={`/modules/${m}`}>{m}</NavLink>
          ))}
        </nav>
      </aside>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modules/:moduleId" element={<ModulePage />} />
        </Routes>
      </main>
    </div>
  );
}
