import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import WeatherNight from 'mdi-material-ui/WeatherNight'
import WeatherSunny from 'mdi-material-ui/WeatherSunny'
import { useSelector, useDispatch } from 'react-redux'

import { toggleMode } from 'src/redux/reducers/themeSettings'

const ThemeModeToggler = () => {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.themeSettings.mode)

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={() => dispatch(toggleMode())}>
      {mode === 'dark' ? <WeatherSunny /> : <WeatherNight />}
    </IconButton>
  )
}

export default ThemeModeToggler
