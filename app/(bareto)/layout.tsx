import { Navbar } from "@/components";
import React from "react";

export default function BaretoLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
    <Navbar />
   <main className="flex flex-col items-center p-24">

<span className="text-gl"> Nea paguelo pues</span>
{children}
   </main>
   </>
  );
}