import Header from "@/components/header"
import Hero from "@/components/hero"
import ImageEditor from "@/components/image-editor"
import Showcase from "@/components/showcase"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ImageEditor />
      <Showcase />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
