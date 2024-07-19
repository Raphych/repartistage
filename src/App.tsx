import './App.css';

// css style sheets
import "./styles/base/variables.css";
import "./styles/themes/color-themes.css";
import "./styles/base/resets.css";
import "./styles/base/global.css";
import "./styles/ui/input.css";
import "./styles/ui/select.css";
import "./styles/ui/states.css";
import "./styles/ui/layout.css";
import "./styles/ui/anchor.css";
import "./styles/ui/button.css";
import "./styles/ui/heading.css";
import "./styles/ui/icons.css";
import "./styles/ui/table.css";

import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import Sidebar from './components/shared/Sidebar';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Spinner from './components/ui/spinner/Spinner';

export default function App() {
  
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}