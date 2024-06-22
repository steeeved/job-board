import Filters from "@/app/(components)/Filters";
import Search from "@/app/(components)/Search";
import JobDetails from "@/app/(components)/JobDetails";
import JobListContainer from "@/app/(components)/JobListContainer";
import { SearchParams } from "@/state/api";

const MainContent = ({ searchParams }: SearchParams) => {
  return (
    <div className="flex w-full max-w-screen-xl mx-auto h-auto py-[29px] px-[38px] gap-[25px] bg-gray-1 dark:bg-black">
      <Filters />
      <div className="flex flex-col flex-grow">
        <Search />
        <div className="flex justify-between my-4 gap-[22px]">
          <div>
            <div className="mb-2 px-[23px] py-[14px] bg-black dark:bg-gray-1 rounded-[17px]">
              <span className="text-gray-1 dark:text-black uppercase font-semibold">
                Search Results
              </span>
            </div>
            <div className="w-[358px]">
              <JobListContainer searchParams={searchParams} />
            </div>
          </div>
          <JobDetails />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
