import NavigatorItemModel from '../models/navigator'
import { EditNote, EventNoteOutlined, ManageAccountsOutlined, SchoolOutlined, SettingsOutlined, WcRounded } from '@mui/icons-material'
import { Roles } from '../utils/role'

const navigatorList: NavigatorItemModel[] = [
  {
    groupName: 'Quản lý',
    listItem: [
      {
        title: 'Quản lý lớp học',
        path: '/class',
        roles: [Roles.ADMIN]
      },
      {
        title: 'Quản lý giáo viên',
        path: '/teacher',
        roles: [Roles.ADMIN]
      },
      {
        title: 'Quản lý học sinh',
        path: '/student',
        roles: [Roles.ADMIN, Roles.TEACHER]
      },
    ],
    icon: <ManageAccountsOutlined />
  },
  {
    groupName: 'Chuyên cần',
    listItem: [
      {
        title: 'Hôm nay',
        path: '/attendanceToday',
        roles: [Roles.ADMIN, Roles.TEACHER]
      },
      {
        title: 'Thống kê',
        path: '/attendance',
        roles: [Roles.ADMIN]
      },
    ],
    icon: <EventNoteOutlined />
  },
  {
    groupName: 'Hệ thống',
    listItem: [
      {
        title: 'Cài đặt',
        path: '/setting',
        roles: [Roles.ADMIN, Roles.TEACHER]
      },
    ],
    icon: <SettingsOutlined />
  },
]

export default navigatorList
