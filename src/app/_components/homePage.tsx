export function HomePage() {
  return (
    <div className="p-20">
      <div className="flex gap-10 flex-col">
        <h1 className="font-semibold text-5xl w-150 leading-17">
          Learn<br/> new concepts<br/> for each question
        </h1>
        <div className="border-solid border-l-2 border-l-[#333333] pl-8 text-[#828282]">We help you prepare for exams and quizzes </div>
        <div>
          <button>
            Start solving
          </button>
          <button className="flex ">
            <img src="/dropDownIcon.png" alt="Dropdown Icon"/>
            <p>know more</p>
          </button>
        </div>
      </div>
    </div>
  );
}

