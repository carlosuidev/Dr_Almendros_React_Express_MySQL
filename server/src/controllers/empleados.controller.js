import { pool } from "../db.js";

export const getAllEmpleados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM empleados");
    res.send(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los empleados", error: error });
  }
};

export const getOneEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM empleados WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(400).json({ message: "Empleado no encontrado" });
    }

    res.send(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el empleado", error: error });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM empleados WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(400).json({ message: "Empleado no encontrado" });
    }

    res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: "Error al borrar el empleado", error: error });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, contrasena, email } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO empleados (nombre, cargo, contrasena, email) VALUES (?, ?, ?, ?)",
      [nombre, cargo, contrasena, email]
    );
    res.send(201).json({ id: rows.insertId, nombre, cargo, email });
  } catch (error) {
    return res.send(500).json({ message: "Error al crear el empleado", error: error });
  }
};

export const updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, cargo } = req.body;

    const [validate] = await pool.query(
      "SELECT email FROM empleados WHERE email = ? AND id != ?",
      [email, id]
    )

    if (validate[0]){
      return res.send(500).json({message: "Ese correo ya está en uso"})
    }

    const [result] = await pool.query(
      "UPDATE empleados SET nombre = IFNULL(?, nombre), email = IFNULL(?, email), cargo = IFNULL(?, cargo) WHERE id = ?",
      [nombre, email, cargo, id]
    );

    if (result.affectedRows === 0)
      return res.send(400).json({ message: "Empleado no encontrado" });

    const [rows] = await pool.query("SELECT * FROM empleados WHERE id = ?", [
      id,
    ]);

    res.send(200).json(rows[0]);
  } catch (error) {
    return res.send(500).json({ message: "Error al actualizar el empleado", error: error });
  }
};
