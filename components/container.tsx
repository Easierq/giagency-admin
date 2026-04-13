import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: String;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("px-[3%] lg:px-[7%]", className)}>
      <div className="max-w-[1440px] mx-auto">{children}</div>
    </div>
  );
};

export default Container;
