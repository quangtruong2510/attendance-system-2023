import * as XLSX from "xlsx";
import { FilterCriteria } from "../Type/Utils";
class CommonUtils {
  async exportToExcel(
    fileName: string,
    sheetName: string,
    data: object[]
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      const dataArray = data.map((obj) => Object.values(obj));

      const header = Object.keys(data[0]);
      dataArray.unshift(header);

      const ws = XLSX.utils.aoa_to_sheet(dataArray);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName);

      const bufferOptions: XLSX.WritingOptions = {
        bookType: "xlsx",
        type: "array",
      };
      const arrayBuffer = XLSX.write(wb, bufferOptions);

      const blob = new Blob([arrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      resolve();
    });
  }

  filterData<T extends Record<string, any>>(
    dataList: T[],
    filterCriteria: FilterCriteria
  ): T[] {
    const activeFilters = Object.fromEntries(
      Object.entries(filterCriteria).filter(
        ([_, filter]) => filter.value !== ""
      )
    );

    return dataList.filter((item) => {
      return Object.entries(activeFilters).every(([property, filter]) => {
        const { value, strict } = filter;
        const itemValue = item[property];

        if (itemValue === undefined) {
          return true; // Bỏ qua nếu giá trị không tồn tại
        }

        if (typeof itemValue === "string" && typeof value === "string") {
          return strict ? itemValue === value : itemValue.includes(value);
        }

        if (typeof itemValue === "number" && typeof value === "number") {
          return strict
            ? itemValue === value
            : String(itemValue).includes(String(value));
        }

        return false;
      });
    });
  }

  getCurrentDate = (): string => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // January is 0
    const year = today.getFullYear();

    // Ensure that day and month are formatted with leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  formatDate = (inputDate: string): string => {
    if (!inputDate) {
      return "";
    }
    const [day, month, year] = inputDate.split("-");
    return `${year}-${month}-${day}`;
  };

}

export default new CommonUtils();
