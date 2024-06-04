'use client';
import { useRouter } from 'next/navigation';

function BackBtn({className, children}) {
  const router = useRouter();
  
  return (
    <button className={className} onClick={() => router.back()}>
      {children}
    </button>
  );
}


export default BackBtn