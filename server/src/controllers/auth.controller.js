import { pool } from "../db.js";

export const loginEmployee = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const [rows] = await pool.query(
      "SELECT id,nombre,cargo,email FROM empleados WHERE email = ? AND contrasena = ?",
      [email, contrasena]
    );

    if (rows.length !== 1) {
      return res.json({ message: "Las credenciales no coinciden" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error al iniciar sesión" });
  }
};

// Validar el correo del empleado por si ya está en uso
export const emailEmployee = async (req, res) => {
  try {
    const { email } = req.params;
    const [rows] = await pool.query(
      "SELECT id FROM empleados WHERE email = ?",
      [email]
    );

    if (rows.length >= 1) {
      return res.json({ uso: "Y" });
    }else{
      return res.json({ uso: "N" });
    }
    
  } catch (error) {
    console.log(error)
    return res.json({ message: "Error al validar el correo", error: error });
  }
};

// Actualizar contraseña
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { nueva } = req.body;

    const [result] = await pool.query(
      "UPDATE empleados SET contrasena=? WHERE id=?",
      [nueva, id]
    );

    if (result.affectedRows === 0){
      return res.status(404).json({ message: "Error al actualizar la contraseña" });
    }else{
      const [rows] = await pool.query("SELECT * FROM empleados WHERE id = ?", [
        id,
      ]);

      res.json(rows[0]);
    }

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar la contraseña", error: error });
  }
};
