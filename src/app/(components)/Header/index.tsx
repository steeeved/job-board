import Image from "next/image";

const Header = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-[38px] flex flex-col items-center justify-center w-full relative">
      <Image
        src="/banner.svg"
        alt="Jobbers Logo"
        className="w-full h-auto rounded bg-gray-50"
        width={1200}
        height={1080}
      />
      <div className="flex absolute top-[40%] left-[63px] flex-col gap-[6px]">
        <h2 className="text-gray-800 font-bold responsive-heading">
          Find your dream career
        </h2>
        <p className="text-gray-500 font-normal responsive-paragraph">
          Browse the latest job openings below and search results to apply
          today!
        </p>
      </div>
    </div>
  );
};

export default Header;
