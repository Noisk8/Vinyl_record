import React from "react";

export default function AboutLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
   <main className="flex flex-col items-center p-24">

<span className="text-gl"> Nea paguelo pues</span>
{children}
   </main>
  );
}