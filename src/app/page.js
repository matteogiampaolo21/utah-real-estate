import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="m-5 p-5 border-black border" >
      <h2 className="text-xl mb-3 font-bold">Homepage</h2>
      <Link className="hover:bg-blue-500 hover:text-white border-black border px-2 " href="/property">Property</Link>
    </div>
  );
}
