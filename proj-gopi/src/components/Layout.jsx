import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#e8eaf6] flex flex-col">
      <Navbar />
      <main className="flex-1 w-full px-6 py-8">{children}</main>
    </div>
  );
};

export default Layout;
