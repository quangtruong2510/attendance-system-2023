import { format, isAfter, subDays } from 'date-fns';
import React from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';
import { DateRange } from 'rsuite/esm/DateRangePicker/types';
import './style.scss';
import { useSelector } from '../../../store/configstore';
import { Roles } from '../../../utils/role';

interface Props {
  onUpdateDateRange: (startDay: string, endDay: string) => void;
}

const DateRangePickerCommon: React.FC<Props> = ({ onUpdateDateRange }) => {
  const role = useSelector(state => state.authentication.role)
  const endDate = new Date(); // Today
  const startDate = subDays(endDate, 7);
  const handleDateChange = (value: DateRange | null) => {
    if (value) {
      const formattedStartDate = format(value[0], 'dd-MM-yyyy');
      const formattedEndDate = format(value[1], 'dd-MM-yyyy');
      onUpdateDateRange(formattedStartDate, formattedEndDate);
    }
  };

  const disabledDate = (date: Date) => {
    // Disable dates after the current date
    return isAfter(date, new Date());
  };

  return (
    <div>
      <DateRangePicker
        onChange={handleDateChange}
        format="dd-MM-yyyy"
        cleanable={false}
        style={{ opacity: 1 }}
        locale={{
          ok: 'Chọn',
          today: 'Hôm nay',
          yesterday: 'Hôm qua',
          last7Days: '7 ngày trước',
          custom: 'Tùy chỉnh',
        }}
        placement={role === Roles.ADMIN ? "leftStart" : "bottom"}
        defaultValue={[startDate, endDate]}
        disabledDate={disabledDate} // Set the disabledDate prop
      />
    </div>
  );
};

export default DateRangePickerCommon;
