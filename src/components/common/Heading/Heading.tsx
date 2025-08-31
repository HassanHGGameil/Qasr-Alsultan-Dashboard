import Image from "next/image";
import logo from "../../../../public/icons/qasr-alsutan-logo.png";

interface IHeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<IHeadingProps> = ({ title, description }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[40px] md:w-[50px] lg:w-[70px]  bg-slate-800 p-2 rounded-lg flex items-center justify-center shadow-md dark:shadow-lg shadow-blue-300 dark:shadow-gray-500 ">
        <Image
          src={logo}
          alt="logo"
          width={400}
          height={400}
          className="w-full"
        />
      </div>
      <div className="">
        <h2 className="text-3xl font-bold tracking-wide">{title}</h2>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
