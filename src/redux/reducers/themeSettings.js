import { createSlice } from '@reduxjs/toolkit'
import themeConfig from 'src/configs/themeConfig'

const themeSettings = createSlice({
  name: 'themeSettings',
  initialState: {
    themeColor: 'primary',
    mode: themeConfig.mode,
    contentWidth: themeConfig.contentWidth
  },
  reducers: {
    toggleMode: (state, _) => {
      const { mode } = state
      state.mode = mode === 'light' ? 'dark' : 'light'
    },
    setContentWidth: (state, { payload }) => {
      state.contentWidth = payload
    }
  }
})

export default themeSettings.reducer
export const { toggleMode, setContentWidth } = themeSettings.actions
