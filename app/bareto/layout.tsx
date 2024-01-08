import React from "react";

export default function AboutLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Hello Root LayoAbout</h1>
      {children}
    </div>
  );
}