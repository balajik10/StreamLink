import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400"], // Ensure weights are separated by commas
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1">
          <Image
            src="/Ssslines.svg" // Ensure the image path is correct
            alt="gamehub"
            height={32} // height should be a number, not a string
            width={32}  // width should be a number, not a string
          />
        </div>
        <div>
          {/* Corrected the misplaced closing tags for paragraphs */}
          <p>gamehub</p>
          <p>Let's play</p>
        </div>
      </div>
    </Link>
  );
};
