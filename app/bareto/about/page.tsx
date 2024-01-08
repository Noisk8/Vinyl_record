import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Return to Reality",
  description: "Smoking zaza",
  keywords: ["About page", "noisk8"],
  authors: [],
};

export default function About() {
  return (
    <>
      <main className="flex flex-col items-center  p-24 ">
        {/* <div className="flex items-center justify-center ">
      </div> */}
        <span className=" animate-pulse text-lg">perro</span>
        <span className="  text-7xl"> 🥝 About Page 🥝</span>
      </main>
    </>
  );
}
