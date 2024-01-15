import { pool } from "../db.js";

export const getAllPacientes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pacientes");
    res.json(rows);
  } catch (error) {
    return res.json({ message: "Error al obtener los pacientes" });
  }
};

export const getOnePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM pacientes WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.json({ message: "Paciente no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.json({ message: "Error al obtener el paciente" });
  }
};

export const deletePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM pacientes WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.json({ message: "Paciente no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.json({ message: "Error al borrar el paciente" });
  }
};

export const createPaciente = async (req, res) => {
  try {
    const { nombre, correo, telefono, alergias } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO pacientes (nombre, correo, telefono, alergias) VALUES (?, ?, ?, ?)",
      [nombre, correo, telefono, alergias]
    );
    res.json({ id: rows.insertId, nombre, correo, telefono, alergias });
  } catch (error) {
    return res.json({ message: "Error al crear el paciente", error: error });
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, alergias } = req.body;

    const [result] = await pool.query(
      "UPDATE pacientes SET nombre = IFNULL(?, nombre), correo = IFNULL(?, correo), telefono = IFNULL(?, telefono), alergias = IFNULL(?, alergias) WHERE id = ?",
      [nombre, correo, telefono, alergias, id]
    );

    if (result.affectedRows === 0)
      return res.json({ message: "Paciente no encontrado" });

    const [rows] = await pool.query("SELECT * FROM pacientes WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.json({ message: "Error al actualizar el paciente", error: error });
  }
};
