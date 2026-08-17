import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProgressHeroBackground from "@/components/ProgressHeroBackground";

export default function Home() {
  return (
    <main className="">
      <section className="relative isolate overflow-hidden min-h-screen flex items-center">
        <ProgressHeroBackground />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Set. Track. Achieve.
          </h1>
          <p className="mt-4 text-lg text-white/90">
            ProgressHit helps you turn goals into progress you can see.
          </p>
          {/* your CTA buttons */}
        </div>
      </section>
<Navbar></Navbar>
<Hero></Hero>
<Footer></Footer>
    </main>
  );
}
