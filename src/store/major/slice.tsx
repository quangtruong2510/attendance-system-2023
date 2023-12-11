import { Major } from "../../model/Major";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/configstore";

const major: Major[] = [
  {
    id: 1,
    value: "software engriner",
  },
  {
    id: 2,
    value: "DTVT",
  },
  {
    id: 3,
    value: "HOA",
  },
];
const majors: Major[] = major;

export const fechthMajor = createAsyncThunk(
  "student/fechthMajors",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/major", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const jsonData = await response.json();
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(jsonData);
      }

      return jsonData;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
const initialState = {
  data: majors,
  isLoading: false,
  errorMessage: null,
};
export const majorSlice = createSlice({
  name: "major",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fechthMajor.pending, (state) => {
      state.isLoading = true;
    });
    // Request successful
    builder.addCase(
      fechthMajor.fulfilled,
      (state, payload: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = payload.payload;
      }
    );
    // Request fail
    // When a server responses with an error:
    builder.addCase(
      fechthMajor.rejected,
      (state, payload: PayloadAction<any>) => {
        // We show the error message
        // and change `status` back to `idle` again.
        state.errorMessage = payload.payload.errorMessage;
        state.isLoading = false;
      }
    );
  },
});
export const selectStudents = (state: RootState) => state.major.data;
export const selectLoading = (state: RootState) => state.major.isLoading;
export const selectErrorMessage = (state: RootState) =>
  state.major.errorMessage;
export default majorSlice.reducer;
