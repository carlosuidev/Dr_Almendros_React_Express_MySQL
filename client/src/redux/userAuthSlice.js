import { createSlice } from '@reduxjs/toolkit';

const nullUserAuth = {
  id: null,
  nombre: "",
  cargo: "",
  correo: ""
}

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: localStorage.getItem("userAuth") ? JSON.parse(localStorage.getItem("userAuth")) :  nullUserAuth,
  reducers: {
    logIn: (state, action) => {
      const { id, nombre, cargo, correo } = action.payload;
      state.id = id;
      state.nombre = nombre;
      state.cargo = cargo;
      state.correo = correo;
    },
    logOut: (state) => {
      state.id = null;
      state.nombre = "";
      state.cargo = "";
      state.correo = "";
    },
    updateNombre: (state, action) => {
      state.nombre = action.payload;
    },
    updateCargo: (state, action) => {
      state.cargo = action.payload;
    },
    updateCorreo: (state, action) => {
      state.correo = action.payload;
    },
  },
});

export const { logIn, logOut, updateNombre, updateCargo, updateCorreo } = userAuthSlice.actions;
export default userAuthSlice.reducer;