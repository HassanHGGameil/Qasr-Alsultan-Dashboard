
interface IHeadingProps {
  title: string;
  description: string;
}

const HeadingTwo: React.FC<IHeadingProps> = ({ title, description }) => {
  return (
    <div className="flex items-center gap-4">
     
      <div className="">
        <h2 className="text-lg font-bold tracking-wide">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default HeadingTwo;
