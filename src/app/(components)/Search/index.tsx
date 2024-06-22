"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  setSearchKeyword,
  setSearchLocation,
  setSelectedAvailability,
  setSelectedJobType,
  setSelectedSalaryRange,
  setSelectedSpecialties,
} from "@/state";
import { Search as Srch } from "lucide-react";
import LocationIcon from "../../../../public/Icons/location";

const Search = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    searchKeyword,
    searchLocation,
    selectedJobType,
    selectedSalaryRange,
    selectedSpecialties,
    selectedAvailability,
  } = useAppSelector((state) => state.global);

  const handleSearch = () => {
    const filters = {
      location: searchLocation,
      employmentType: selectedJobType.join(","),
      salaryRange: selectedSalaryRange.join("-"),
      specialties: selectedSpecialties.join(","),
      availability: selectedAvailability.join(","),
    };

    router.push(
      "?" + new URLSearchParams({ ...filters, title: searchKeyword })
    );
    const clearFilters = () => {
      dispatch(setSearchKeyword(""));
      dispatch(setSearchLocation(""));
      dispatch(setSelectedJobType([]));
      dispatch(setSelectedSalaryRange([10000, 500000]));
      dispatch(setSelectedSpecialties([]));
      dispatch(setSelectedAvailability([]));
    };
    clearFilters();
  };

  return (
    <div className="flex w-full gap-4 bg-gray-50 py-[17px] px-[28px] rounded-[18px] relative overflow-hidden">
      <div className="w-full grow flex gap-5">
        <div className="flex-1 flex items-center border-r-2 gap-2">
          <Srch className="w-6 h-6 text-gray-100" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-inherit border-none shadow-none placeholder-gray text-gray-100 text-base focus:outline-none focus:ring-0 focus:border-none"
            value={searchKeyword}
            onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
          />
        </div>
        <div className="flex-1 flex items-center gap-2">
          <LocationIcon className="w-6 h-6 text-gray-100" fill="#858585" />
          <input
            type="text"
            placeholder="Location..."
            className="w-full bg-inherit border-none shadow-none placeholder-gray text-gray-100 text-base focus:outline-none focus:ring-0 focus:border-none"
            value={searchLocation}
            onChange={(e) => dispatch(setSearchLocation(e.target.value))}
          />
        </div>
      </div>
      <Button
        onClick={handleSearch}
        className="bg-blue-100 hover:bg-blue-700 text-white font-bold py-[17px] px-[28px] absolute right-0 top-0 h-[100%] rounded-[18px]"
      >
        Find Jobs
      </Button>
    </div>
  );
};

export default Search;
