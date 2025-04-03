import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-1/2 transform -translate-y-1/2 h-[20rem] w-[4rem] bg-white shadow-lg rounded-r-2xl flex flex-col items-center justify-center space-y-6 z-50">
      <SidebarIcon src="/product1.png" alt="Product1" />
      <SidebarIcon src="/product2.png" alt="Product2" />
      <SidebarIcon src="/product3.png" alt="Product3" />
      <SidebarIcon src="/product4.png" alt="Product4" />
      
    </aside>
  );
}

function SidebarIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl shadow-md hover:bg-gray-200 transition">
      <Image src={src} alt={alt} width={24} height={24} className="w-6 h-6 text-black" />
    </div>
  );
}
