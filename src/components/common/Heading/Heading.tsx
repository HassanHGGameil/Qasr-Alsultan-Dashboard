
interface IHeadingProps {
    title: string;
    description: string;
}


const Heading: React.FC<IHeadingProps> = ({title, description}) => {
  return (
    <div>
        <h2 className="text-3xl font-bold tracking-tight">
            {title}
        </h2>
        <p className="">
            {description}
        </p>
    </div>
  )
}

export default Heading