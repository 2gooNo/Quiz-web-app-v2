
export function HomePage() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-28 flex flex-row gap-13 justify-center items-center">
      <div className="flex gap-6 sm:gap-8 md:gap-12 flex-col">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-6xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl leading-tight sm:leading-snug md:leading-normal">
          Learn<br/> new concepts<br/> for each question
        </h1>
        <div className="border-solid border-l-2 border-l-[#333333] pl-4 sm:pl-6 md:pl-8 text-[#828282] text-sm sm:text-lg">
          We help you prepare for exams and quizzes 
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-12">
          <button className="bg-[#FFCD2E] h-10 sm:h-16 px-6 sm:px-6 md:w-40 text-white text-sm sm:text-lg rounded-sm hover:bg-[#E5B726] transition-colors">
            Start solving
          </button>
          <button className="flex items-center gap-2 justify-center sm:justify-start">
            <img className="h-auto w-4" src="/dropDownIconsvg.svg"/>
            <p className="text-[#FFCD2E] text-sm sm:text-lg">know more</p>
          </button>
        </div>
      </div>
      <img className="h-auto w-180" src="/homeIcon.svg"/>
    </div>
  );
}

