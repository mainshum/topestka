export default function Spinner({text}: {text: string}) {
    return (
    <div className="flex flex-col justify-center items-center gap-10 w-[470px]">
      <p className="font-outfit text-lg md:text-xl font-extralight">
        {text}
      </p>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ewhite"></div>
      </div>
    </div>
    )
}