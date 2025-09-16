import { ThemeProvider } from './contexts/ThemeContext';

// Import CSS
import './css/variables.css';
import './css/base.css';
import './css/layout.css';
import './css/components.css';
import './css/pages.css';
import './css/themes.css';
import './css/responsive.css';
import './css/mobile-navbar-fix.css';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />

        <main id="main" role="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
        <BackToTop />

        <div className="sr-only" aria-live="polite" id="announcements"></div>
      </div>
    </ThemeProvider>
  );
}

export default App;
