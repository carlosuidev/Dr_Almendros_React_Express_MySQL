import { pool } from "../db.js";

export const getAllServicios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM servicios");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los servicios", error: error });
  }
};

export const getOneServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM servicios WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(400).json({ message: "Servicio no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el servicio" });
  }
};

export const deleteServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM servicios WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(400).json({ message: "Servicio no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error al borrar el servicio", error: error });
  }
};

export const createServicio = async (req, res) => {
  try {
    const { servicio, coste } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO servicios (servicio, coste) VALUES (?, ?)",
      [servicio, coste]
    );
    res.status(200).json({ id: rows.insertId, servicio, coste });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el servicio", error: error });
  }
};

export const updateServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { servicio, coste } = req.body;

    const [result] = await pool.query(
      "UPDATE servicios SET servicio = IFNULL(?, servicio), coste = IFNULL(?, coste) WHERE id = ?",
      [servicio, coste, id]
    );

    if (result.affectedRows === 0){
      return res.status(400).json({ message: "Servicio no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM servicios WHERE id = ?", [
      id,
    ]);

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el servicio", error: error });
  }
};
