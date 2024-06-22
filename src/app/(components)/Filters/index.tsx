"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { Checkbox } from "@/components/ui/checkbox";
import { Range, getTrackBackground } from "react-range";
import {
  setSearchKeyword,
  setSearchLocation,
  setSelectedJobType,
  setSelectedSalaryRange,
  setSelectedSpecialties,
  setSelectedAvailability,
} from "@/state";
import { CircleX } from "lucide-react";
import LocationIcon from "../../../../public/Icons/location";

const Filters = () => {
  // State
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    selectedJobType = [],
    selectedSalaryRange = [10000, 500000],
    selectedSpecialties = [],
    selectedAvailability = [],
  } = useAppSelector((state) => state.global);
  const [showMoreSpecialties, setShowMoreSpecialties] =
    useState<boolean>(false);

  const specialties: string[] = [
    "Product Management",
    "Product Development",
    "Agile Methodologies",
    "Graphic Design",
    "Visual Communication",
    "Brand Identity",
    "Node.js",
    "Python",
    "SQL",
    "UX Design",
    "UI Design",
    "User Research",
    "Business Analysis",
    "Data Analysis",
    "Strategic Planning",
    "AWS",
    "Azure",
    "Google Cloud",
    "Software Development",
    "Cloud Technologies",
    "Data Science",
    "Machine Learning",
    "Statistical Analysis",
    "JavaScript",
    "Node.js",
    "React",
    "Front End Dev",
    "Back End Dev",
    "UI/UX",
    "Design",
    "DevOps",
    "QA",
    "Data Science",
  ];

  const visibleSpecialties: string[] = showMoreSpecialties
    ? specialties
    : specialties.slice(0, 5);

  const handleCheckboxChange = (
    checked: boolean,
    value: string,
    type: string
  ) => {
    const updateArray = (
      array: string[],
      value: string,
      checked: boolean
    ): string[] =>
      checked ? [...array, value] : array.filter((item) => item !== value);

    if (type === "specialties") {
      dispatch(
        setSelectedSpecialties(updateArray(selectedSpecialties, value, checked))
      );
    } else if (type === "jobType") {
      dispatch(
        setSelectedJobType(updateArray(selectedJobType, value, checked))
      );
    } else if (type === "availability") {
      dispatch(
        setSelectedAvailability(
          updateArray(selectedAvailability, value, checked)
        )
      );
    }
  };

  const clearFilters = () => {
    dispatch(setSearchKeyword(""));
    dispatch(setSearchLocation(""));
    dispatch(setSelectedJobType([]));
    dispatch(setSelectedSalaryRange([10000, 500000]));
    dispatch(setSelectedSpecialties([]));
    dispatch(setSelectedAvailability([]));
    router.push("/");
    router.refresh();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-[20px] w-[232px] overflow-hidden">
      <div className="flex justify-between items-center mb-4 bg-black dark:bg-gray-1 py-[18px] px-[26px]">
        <h2 className="text-xl font-bold dark:text-black text-gray-1">
          Filters
        </h2>
        <button
          onClick={clearFilters}
          className="dark:text-black text-gray-1 inline-flex items-center gap-2"
        >
          clear all
          <CircleX className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col px-[26px] mt-[27px] gap-4">
        {/* Location Filter */}
        <div className="">
          <label className="block mb-2 text-base font-semibold text-black dark:text-gray-1">
            Location
          </label>
          <div className="relative">
            <LocationIcon
              className="absolute top-1 left-1"
              width={22}
              height={22}
            />
            <input
              type="text"
              placeholder="e.g. New York"
              onChange={(e) => dispatch(setSearchLocation(e.target.value))}
              className="w-full p-2 pl-8 border-none dark:border-gray-600 rounded placeholder-red text-red-1"
            />
          </div>
        </div>

        {/* Job Type Filter */}
        <div className="mb-4 ">
          <label className="block mb-2 font-semibold text-base text-black dark:text-gray-1">
            Job Type
          </label>
          {["Full-Time", "Part-Time", "Contract"].map((jobType) => (
            <div key={jobType} className="flex items-center mb-2">
              <Checkbox
                id={jobType.toLowerCase().replace(" ", "-")}
                value={jobType}
                checked={selectedJobType?.includes(jobType)}
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange(checked, jobType, "jobType")
                }
              />
              <label
                htmlFor={jobType.toLowerCase().replace(" ", "-")}
                className="ml-2 text-black font-[300] dark:text-gray-1 text-[14px]"
              >
                {jobType}
              </label>
            </div>
          ))}
        </div>

        {/* Salary Range Filter */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-base text-black dark:text-gray-1">
            Annual Salary Range
          </label>
          <div className="flex justify-between mb-2 text-sm text-black dark:text-gray-1">
            <span>${selectedSalaryRange[0] / 1000}K</span>
            <span>${selectedSalaryRange[1] / 1000}K</span>
          </div>
          <div className="flex items-center">
            <Range
              step={1000}
              min={10000}
              max={500000}
              values={selectedSalaryRange}
              onChange={(values) => dispatch(setSelectedSalaryRange(values))}
              renderTrack={({ props, children }) => {
                const { style, ...restProps } = props;
                return (
                  <div
                    {...restProps}
                    style={{
                      ...style,
                      height: "4px",
                      width: "100%",
                      background: getTrackBackground({
                        values: selectedSalaryRange,
                        colors: ["#ccc", "#2A9EF4", "#ccc"],
                        min: 10000,
                        max: 500000,
                      }),
                      borderRadius: "4px",
                    }}
                  >
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "16px",
                    width: "16px",
                    borderRadius: "50%",
                    backgroundColor: "#2A9EF4",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>
              )}
            />
          </div>
        </div>

        {/* Specialties Filter */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-base text-black dark:text-gray-1">
            Specialties
          </label>
          {visibleSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center mb-2">
              <Checkbox
                id={specialty.toLowerCase().replace(" ", "-")}
                value={specialty}
                checked={selectedSpecialties?.includes(specialty)}
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange(checked, specialty, "specialties")
                }
              />
              <label
                htmlFor={specialty.toLowerCase().replace(" ", "-")}
                className="ml-2 text-black font-[300] dark:text-gray-1 text-[14px]"
              >
                {specialty}
              </label>
            </div>
          ))}
          <button
            onClick={() => setShowMoreSpecialties(!showMoreSpecialties)}
            className="text-blue-500 font-semibold text-[14px] cursor-pointer"
          >
            {showMoreSpecialties ? "See Less" : "See More"}
          </button>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block mb-2 font-semibold text-base text-black dark:text-gray-1">
            Availability
          </label>
          {["On Site", "Remote", "Hybrid"].map((availability) => (
            <div key={availability} className="flex items-center mb-2">
              <Checkbox
                id={availability.toLowerCase().replace(" ", "-")}
                value={availability}
                checked={selectedAvailability?.includes(availability)}
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange(checked, availability, "availability")
                }
              />
              <label
                htmlFor={availability.toLowerCase().replace(" ", "-")}
                className="ml-2 text-black font-[300] dark:text-gray-1 text-[14px]"
              >
                {availability}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
