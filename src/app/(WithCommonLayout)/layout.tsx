import { Navbar } from "@/src/components/UI/navbar";
import Footer from "@/src/components/UI/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen  bg-slate-200 pt-4">
      <Navbar />
      <main className=" bg-slate-300">{children}</main>
      <Footer />
    </div>
  );
}
