import { NextResponse } from 'next/server';


export async function GET() {
  console.log('e')

  const res = await fetch("utah.json");
  const data = await res.json();
  console.log(data)


  return NextResponse.json(data);
}