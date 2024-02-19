import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center justify-between gap-x-2">
        <Image width={40} height={40} alt="Image" src="/logo.svg" />
        <span className="font-semibold text-xl text-[#394149]">OUTBREAK</span>
      </Link>
    </div>
  );
};

export default Logo;
