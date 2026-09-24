import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Cloud from './components/Cloud/Cloud';
import Experience from './components/Experience/Experience';
import Value from './components/Value/Value';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import ScrollProgress from './components/common/ScrollProgress';

// Секція «Проєкти» вимкнена прапорцем SHOW_PROJECTS (src/config/site.ts).
// Код лишається в репозиторії; щоб повернути секцію — постав SHOW_PROJECTS = true.
// Поки прапорець false, збірник вирізає цей імпорт із бандла.
import Projects from './components/Projects/Projects';
import { SHOW_PROJECTS } from './config/site';

function AppShell() {
  const { t } = useTranslation();

  return (
    <>
      <a className="skip-link" href="#main">
        {t('actions.skipToContent')}
      </a>

      <ScrollProgress />
      <Header />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Cloud />
        {SHOW_PROJECTS && <Projects />}
        <Experience />
        <Value />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
