export function NavBar() {
  return (
    <div className="flex flex-row items-center w-full h-24 justify-between px-16 border-b border-gray-200">
      <img className="" src="/logo.png" />
      <div className="flex gap-10">
        <button className="opacity-40">How It Works?</button>
        <button className="opacity-40">Features</button>
        <button className="opacity-40">About Us</button>
        <button className="border-[#FCC822] border-2 px-5 py-1 text-[#FCC822]">Login</button>
      </div>
    </div>
  );
}
