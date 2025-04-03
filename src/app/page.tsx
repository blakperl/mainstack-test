import Header from "./components/Header";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="ml-[4rem] mt-[4rem] lg:pl-[4rem] lg:pr-[5rem] pt-4 container ">
        <Header />
      </main>
    </>
  );
}
