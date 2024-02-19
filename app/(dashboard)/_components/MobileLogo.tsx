import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileLogo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center justify-between gap-x-2">
        <Image width={50} height={50} alt="Image" src="/logo.svg" />
      </Link>
    </div>
  );
};

export default MobileLogo;
