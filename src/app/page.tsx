import { SearchParams } from "@/state/api";
import Wrapper from "./wrapper";
import MainContent from "@/app/(components)/MainContent";
import './globals.css';

export default function Home({ searchParams }: SearchParams) {
  return (
    <main>
      <MainContent searchParams={searchParams} />
    </main>
  );
}
