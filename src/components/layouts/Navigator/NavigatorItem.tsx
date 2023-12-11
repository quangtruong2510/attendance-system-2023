import { Collapse, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import NavigatorItemModel, { NavigatorRow } from '../../../models/navigator'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useSelector } from '../../../store/configstore'
import { selectRole } from '../../../store/authentication/slice'

interface Props {
  groupItem: NavigatorItemModel
}

const NavigatorItem: React.FC<Props> = (props) => {
  const [OpenFavorite, setOpenFavorite] = React.useState(true)
  const handleClick = () => {
    setOpenFavorite(!OpenFavorite)
  }
  const role = useSelector(selectRole);
  console.log("role", role);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        {props.groupItem.icon}
        <ListItemText
          sx={{ ml: 1, fontWeight: 400 }}
          primary={
            <Typography variant='body1' style={{ fontWeight: '700' }}>
              {props.groupItem.groupName}
            </Typography>
          }
        />
        {OpenFavorite ? <ExpandMore /> : <KeyboardArrowRightOutlinedIcon />}

      </ListItemButton>
      <Collapse in={OpenFavorite} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {props.groupItem.listItem.filter(navigatorRow => navigatorRow.roles.includes(role)).map((navigatorRow: NavigatorRow, index: number) => {
            return (
              <Link key={index} className='no-underline' to={navigatorRow.path}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText sx={{ ml: 2, textDecoration: 'none !important' }} primary={navigatorRow.title} />
                </ListItemButton>
              </Link>
            )
          })}
        </List>
      </Collapse>
    </>
  )
}

export default NavigatorItem
