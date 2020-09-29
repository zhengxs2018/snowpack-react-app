import 'antd/es/date-picker/style/index'

import type { Dayjs } from 'dayjs'

import DayjsConfig from 'rc-picker/lib/generate/dayjs'
import withDatePicker from 'antd/es/date-picker/generatePicker'

const DatePicker = withDatePicker<Dayjs>(DayjsConfig)

DatePicker.displayName = 'DatePicker'

export default DatePicker
