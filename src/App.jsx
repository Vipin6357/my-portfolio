import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/Projects/Projects";
import Education from "./sections/Education/Education";
import Experience from "./sections/Experience/Experience";
import Contact from "./sections/Contact/Contact";
import Footer from "./sections/Footer/Footer";

import Login from "./admin/pages/Login/Login";
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute";



function Portfolio() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
      </main>

      <About />
      <Skills />
      <Projects />
      <Education />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}



function App() {
  return (
    <BrowserRouter>
      <Routes>

        

        <Route
          path="/"
          element={<Portfolio />}
        />


        <Route
          path="/admin/login"
          element={<Login />}
        />


        <Route element={<ProtectedRoute />}>

          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;