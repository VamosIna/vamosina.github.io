import Background from "@/components/Background";
import Nav from "@/components/Nav";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import AiChat from "@/components/AiChat";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Background />
      <ScrollProgress />
      <CursorGlow />

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <AiChat />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
