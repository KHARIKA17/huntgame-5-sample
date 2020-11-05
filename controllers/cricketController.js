/**
 *  cricket controller
 *  Handles requests related to plant (see routes)
 *
 * @author Praneeth Vallabhaneni <S541312@nwmissouri.edu>
 */

const db = require('../models/index');

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = (req, res) => {
  db.models.Cricket.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET one JSON by ID
exports.findOne = (req, res) => {
  const { id } = req.params;
  db.models.Cricket.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// HANDLE EXECUTE DATA MODIFICATION REQUESTS -----------------------------------

// POST /save
exports.saveNew = async (req, res) => {
  try {
    await db.models.Cricket.create(req.body);
    return res.redirect('/cricket');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.Cricket.update(req.body, {
      where: { id: reqId },
    });
    if (updated) {
      return res.redirect('/cricket');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const { reqId } = req.params.cricketId;
    const deleted = await db.models.Cricket.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/cricket');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show rabbit/index.ejs');
  res.render('cricket/index.ejs', { title: 'Cricket Teams', req });
};

// GET /create
exports.showCreate = (req, res) => {
  res.send(
    `NOT IMPLEMENTED: Will show cricket/create.ejs for ${req.params.id}`,
  );
};

// GET /delete/:id
exports.showDelete = (req, res) => {
  res.send(
    `NOT IMPLEMENTED: Will show cricket/delete.ejs for ${req.params.id}`,
  );
};

// GET /details/:id
exports.showDetails = (req, res) => {
  res.send(
    `NOT IMPLEMENTED: Will show cricket/details.ejs for ${req.params.id}`,
  );
};

// GET /edit/:id
exports.showEdit = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show cricket/edit.ejs for ${req.params.id}`);
};
