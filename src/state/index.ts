import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const MOCK_USER_ID = "c87653f0-e8a1-11e9-81b4-2a2ae2dbcce4";

export interface InitialStateTypes {
  searchKeyword: string;
  searchLocation: string;
  selectedJobType: string[];
  selectedSalaryRange: number[];
  selectedSpecialties: string[];
  selectedAvailability: string[];
  selectedJobId: string | null;
  isDarkMode: boolean;
}

const initialState: InitialStateTypes = {
  searchKeyword: "",
  searchLocation: "",
  selectedJobType: [],
  selectedSalaryRange: [10000, 500000],
  selectedSpecialties: [],
  selectedAvailability: [],
  selectedJobId: null,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    setSearchLocation: (state, action: PayloadAction<string>) => {
      state.searchLocation = action.payload;
    },
    setSelectedJobType: (state, action: PayloadAction<string[]>) => {
      state.selectedJobType = action.payload;
    },
    setSelectedSalaryRange: (state, action: PayloadAction<number[]>) => {
      state.selectedSalaryRange = action.payload;
    },
    setSelectedSpecialties: (state, action: PayloadAction<string[]>) => {
      state.selectedSpecialties = action.payload;
    },
    setSelectedAvailability: (state, action: PayloadAction<string[]>) => {
      state.selectedAvailability = action.payload;
    },
    setSelectedJobId: (state, action: PayloadAction<string | null>) => {
      state.selectedJobId = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {
  setSearchKeyword,
  setSearchLocation,
  setSelectedJobType,
  setSelectedSalaryRange,
  setSelectedSpecialties,
  setSelectedAvailability,
  setSelectedJobId,
  setIsDarkMode,
} = globalSlice.actions;

export default globalSlice.reducer;
