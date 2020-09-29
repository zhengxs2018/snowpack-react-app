import 'antd/es/calendar/style'

import type { Dayjs } from 'dayjs'

import DayjsConfig from 'rc-picker/lib/generate/dayjs'
import withCalendar from 'antd/es/calendar/generateCalendar'

const Calendar = withCalendar<Dayjs>(DayjsConfig)

export default Calendar
