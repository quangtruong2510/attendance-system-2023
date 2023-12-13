import { format } from 'date-fns';
import React from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';
import { DateRange } from 'rsuite/esm/DateRangePicker/types';
import './style.scss';

interface Props {
  onUpdateDateRange: (startDay: string, endDay: string) => void;
}

const DateRangePickerCommon: React.FC<Props> = ({ onUpdateDateRange }) => {
  const handleDateChange = (value: DateRange | null) => {
    if (value) {
      const formattedStartDate = format(value[0], 'dd-MM-yyyy');
      const formattedEndDate = format(value[1], 'dd-MM-yyyy');
      onUpdateDateRange(formattedStartDate, formattedEndDate);
    }
  };

  return (
    <div>
      <DateRangePicker onChange={handleDateChange} format="dd-MM-yyyy" cleanable={false} style={{ opacity: 1 }} locale={{ // Set the locale for rsuite
        ok: 'Chọn',
        today: 'Hôm nay',
        yesterday: 'Hôm qua',
        last7Days: '7 ngày trước',
        custom: 'Tùy chỉnh',
      }}
        placement="bottomStart"
        defaultValue={[new Date(), new Date()]}
      />
    </div>
  );
}

export default DateRangePickerCommon;