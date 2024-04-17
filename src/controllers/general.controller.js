

// Función para manejar errores de consulta
const handleQueryError = (err, res, errorMsg) => {
  console.error(err);
  res.status(500).json({ err: errorMsg || "Error en la consulta a la base de datos" });
};

exports.createGeneral = (req, res) => {
  const { tabla } = req.params;
  const data = req.body;

  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ err });
    }

    conn.query(`INSERT INTO usuarios SET ?`, data, (err, result) => {
      conn.release();
      if (err) {
        console.error(err);
        return res.json({ err: createErr2 });
      }

      console.log(`${tabla} Added!`);
      res.json("Datos creados");
    });
  });
};

exports.search = (req, res) => {

  const query = `SELECT * FROM usuarios`;


  req.getConnection((err, conn) => {
    if (err) {
      return handleQueryError(err, res, "Error de conexión a la base de datos");
    }

    conn.query(query, (err, result) => {
      conn.release();
      if (err) {
        return handleQueryError(err, res);
      }

      const rowCount = result.length;

      rowCount === 0
        ? "Sin resultados"
        : rowCount === 1
          ? `${rowCount} resultado`
          : `${rowCount} resultados`;
      res.json(
        rowCount == 0 ? { err: "Los datos no se encuentran registrados en el sistema" }
          : result
      );
    });
  });
};


exports.update = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "UPDATE usuarios set ? WHERE " + req.params.name + " = ?",
      [req.body, req.params.value],
      (err, result) => {
        console.log(
          err
            ? "Err UPDATE " +
            "usuarios " +
            " set ? WHERE " +
            req.params.name +
            " = " +
            err
            : "usuario " + " Update!"
        );
        res.json(err ? { err: "Error al actualizar" + err } : { msg: "Actualizado exitosamente" });
      }
    );
  });
};

exports.delete = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "DELETE FROM usuarios WHERE " + req.params.name + " = ?",
      [req.params.value],
      (err, result) => {
        console.log(
          err
            ? "Err DELETE FROM " +
            "usuarios" +
            " WHERE " +
            req.params.name +
            " = " +
            req.params.value +
            " " +
            err
            : "usuario " + "Removida satisfactoriamente!"
        );
        res.json(err ? { err: "Error al eliminar" + err } : { msg: "Eliminado exitosamente" });
      }
    );
  });
};