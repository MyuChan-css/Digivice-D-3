import { DigiviceGolden } from './components/DigiviceGolden';
import { Instructions } from './components/Instructions';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 gap-10 p-4">
      {/* Desktop/Tablet Instructions - Left Side */}
      <div className="hidden md:block w-full max-w-sm">
        <Instructions />
      </div>

      <DigiviceGolden />

      {/* Mobile Instructions - Bottom */}
      <div className="md:hidden w-full max-w-sm mt-8">
        <Instructions />
      </div>
    </div>
  );
}
