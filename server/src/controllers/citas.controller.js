import { pool } from "../db.js";

export const getAllCitas = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.estado, c.id_paciente, c.id_empleado, c.id_servicio, c.descripcion, c.fecha, c.hora, e.nombre AS nombre_empleado, p.nombre as nombre_paciente, p.alergias, s.servicio, s.coste FROM citas c, empleados e, servicios s, pacientes p 
      WHERE e.id = c.id_empleado 
      AND p.id = c.id_paciente
      AND s.id = c.id_servicio`
    );
    res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener las citas", error: error });
  }
};

export const getOneCita = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT c.id, c.estado, c.id_paciente, c.id_empleado, c.id_servicio, c.descripcion, c.fecha, c.hora, e.nombre AS nombre_empleado, p.nombre as nombre_paciente, p.alergias, s.servicio, s.coste FROM citas c, empleados e, servicios s, pacientes p 
      WHERE e.id = c.id_empleado 
      AND p.id = c.id_paciente
      AND s.id = c.id_servicio
      AND c.id = ?`,
      [id]
    );

    if (rows.length <= 0) {
      return res.status(400).json({ message: "Cita no encontrada" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener la cita", error: error });
  }
};

export const deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM citas WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(400).json({ message: "Cita no encontrada" });
    }

    return res.status(200).json({ message: "Borrada" });
  } catch (error) {
    return res.status(500).json({ message: "Error al borrar la cita", error: error });
  }
};

export const createCita = async (req, res) => {
  try {
    const { id_empleado, id_paciente, id_servicio, fecha, hora, descripcion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO citas (id_empleado, id_paciente, id_servicio, fecha, hora, descripcion, estado) VALUES (?, ?, ?, ?, ?, ?, 'Pendiente')",
      [id_empleado, id_paciente, id_servicio, fecha, hora, descripcion]
    );

    const [rows] = await pool.query(
      `SELECT c.id, c.estado, c.id_paciente, c.id_empleado, c.id_servicio, c.descripcion, c.fecha, c.hora, e.nombre AS nombre_empleado, p.nombre as nombre_paciente, p.alergias, s.servicio, s.coste FROM citas c, empleados e, servicios s, pacientes p 
      WHERE e.id = c.id_empleado 
      AND p.id = c.id_paciente
      AND s.id = c.id_servicio
      AND c.id = ?`,
      [result.insertId]
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({message: 'No se ha podido crear la cita', error: error});
  }
};

export const updateCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_empleado, id_paciente, id_servicio, fecha, hora, estado } = req.body;

    const [result] = await pool.query(
      "UPDATE citas SET id_empleado = IFNULL(?, id_empleado), id_paciente = IFNULL(?, id_paciente), id_servicio = IFNULL(?, id_servicio), fecha = IFNULL(?, fecha), hora = IFNULL(?, hora), estado = IFNULL(?, estado) WHERE id = ?",
      [id_empleado, id_paciente, id_servicio, fecha, hora, estado, id]
    );

    if (result.affectedRows === 0)
      return res.status(400).json({ message: "Cita no encontrada" });

    const [rows] = await pool.query(
      `SELECT c.id, c.estado, c.id_paciente, c.id_empleado, c.id_servicio, c.descripcion, c.fecha, c.hora, e.nombre AS nombre_empleado, p.nombre as nombre_paciente, p.alergias, s.servicio, s.coste FROM citas c, empleados e, servicios s, pacientes p 
      WHERE e.id = c.id_empleado 
      AND p.id = c.id_paciente
      AND s.id = c.id_servicio
      AND c.id = ?`,
      [id]
    );

    res.satus(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar la cita", error: error});
  }
};

export const getCitasEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT c.id, c.estado, c.id_paciente, c.id_empleado, c.id_servicio, c.descripcion, c.fecha, c.hora, e.nombre AS nombre_empleado, p.nombre as nombre_paciente, p.alergias, s.servicio, s.coste FROM citas c, empleados e, servicios s, pacientes p 
      WHERE e.id = c.id_empleado 
      AND p.id = c.id_paciente
      AND s.id = c.id_servicio
      AND c.id_empleado = ?`,
      [id]
    );

    if (rows.length <= 0) {
      return res.json({ message: "No se han encontrado citas del empleado" });
    }

    res.json(rows);
  } catch (error) {
    return res.json({ message: "Error al obtener la citas del empleado", error: error });
  }
};

export const getCitasPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT c.id, c.estado, c.id_paciente, c.id_empleado, c.id_servicio, c.descripcion, c.fecha, c.hora, e.nombre AS nombre_empleado, p.nombre as nombre_paciente, p.alergias, s.servicio, s.coste FROM citas c, empleados e, servicios s, pacientes p 
      WHERE e.id = c.id_empleado 
      AND p.id = c.id_paciente
      AND s.id = c.id_servicio
      AND c.id_paciente = ?`,
      [id]
    );

    if (rows.length <= 0) {
      return res.status(400).json({ message: "No se han encontrado citas del paciente" });
    }

    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la citas del paciente", error: error });
  }
};
