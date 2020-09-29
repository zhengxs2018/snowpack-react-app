import React from 'react'

import type { Dayjs } from 'dayjs'
import type { Omit } from 'antd/es/_util/type'

import DatePicker from './DatePicker'
import type { PickerTimeProps } from 'antd/es/date-picker/generatePicker'

export interface TimePickerProps extends Omit<PickerTimeProps<Dayjs>, 'picker'> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />
})

TimePicker.displayName = 'TimePicker'

export default TimePicker
