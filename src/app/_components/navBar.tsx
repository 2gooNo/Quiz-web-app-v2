export function NavBar() {
  return (
    <div className="w-full border-b-2 border-gray-200">
      <div className="flex w-auto flex-row items-center justify-between h-16 sm:h-20 md:h-24 px-4 sm:px-8 md:px-8 max-w-screen-xl mx-auto">
        <img className="h-8 sm:h-10 md:h-12 w-auto" src="/logo.svg" alt="Logo" />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-10 items-center">
          <button className="opacity-40 text-sm lg:text-base hover:opacity-60 transition-opacity">How It Works?</button>
          <button className="opacity-40 text-sm lg:text-base hover:opacity-60 transition-opacity">Features</button>
          <button className="opacity-40 text-sm lg:text-base hover:opacity-60 transition-opacity">About Us</button>
          <button className="border-[#FCC822] border-2 px-3 py-1 lg:px-5 lg:py-1 text-[#FCC822] text-sm lg:text-base hover:bg-[#FCC822] hover:text-white transition-colors">Login</button>
        </div>

        {/* Mobile Hamburger Menu */}
        {/* <div className="md:hidden flex flex-col gap-4">
          <button className="flex flex-col gap-1 p-2" aria-label="Menu">
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
          </button>
        </div> */}
      </div>
    </div>
  );
}