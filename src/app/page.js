import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="shadow bg-white rounded-t rounded-b p-5" >
      <h2 className="text-xl mb-3 font-bold">Homepage</h2>
      <Link className="font-bol px-2 bg-neutral-700 text-white py-1 rounded hover:bg-neutral-900" href="/property">Property</Link>
    </div>
  );
}
