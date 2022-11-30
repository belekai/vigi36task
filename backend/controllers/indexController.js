var pool = require("../helpers/database");

// create new group
async function createGroup(request, response) {
  let requestData = request.body;
  try {
    sqlQuery = "INSERT INTO groups(name, author_id) VALUES (?, ?)";
    await pool.query(sqlQuery, [requestData.groupName, request.user.id]);
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ error: "Something went wrong, please try again" });
  }
  return response.status(200).send("Group created successfully");
}

// add specific user to group
async function addAccountToGroup(request, response) {
  let requestData = request.body;
  let user = request.user;

  try {
    sqlQuery = "INSERT INTO accounts(group_id, user_id) VALUES (?, ?)";
    await pool.query(sqlQuery, [requestData.groupId, user.id]);
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ error: "Something went wrong, please try again" });
  }
  return response.status(200).send("User successfully added to group");
}

// add bill to group
async function addBill(request, response) {
  let requestData = request.body;
  try {
    sqlQuery =
      "INSERT INTO bills(group_id, amount, description) VALUES (?, ?, ?)";
    await pool.query(sqlQuery, [
      requestData.groupId,
      requestData.amount,
      requestData.description,
    ]);
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ error: "Something went wrong, please try again" });
  }

  return response.status(200).send("Bill successfully added");
}

//return all groups for specific user
async function getGroups(request, response) {
  let user = request.user;

  try {
    sqlQuery = "SELECT id, name FROM groups";
    var groups = await pool.query(sqlQuery);
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ error: "Something went wrong, please try again" });
  }
  response.status(200).json(groups);
}

async function getAccounts(request, response) {
  try {
    sqlQuery =
      "SELECT groups.id AS group_id, groups.name, accounts.user_id FROM accounts LEFT JOIN groups ON accounts.group_id = groups.id WHERE user_id = ?";
    var groups = await pool.query(sqlQuery, request.user.id);
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ error: "Something went wrong, please try again" });
  }
  return response.status(200).json(groups);
}

async function getBills( request, response){
    let id = request.params.id

    try {
        sqlQuery = "SELECT bills.*, groups.name FROM bills LEFT JOIN groups ON bills.group_id = groups.id WHERE group_id = (?)";
        var bills = await pool.query(sqlQuery, id);
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ error: "Something went wrong, please try again" });
      }
      response.status(200).json(bills);
}

async function getGroupName (request, response) {
  let id = request.params.id
  try {
    sqlQuery = 'SELECT id, name FROM groups WHERE id = (?)'
    var groupName = await pool.query(sqlQuery, id)
  } catch (error) {
    console.log(error);
    return response.status(400).send({ error: "Something went wrong, please try again" });
  }
  return response.status(200).send(groupName)
}
module.exports = {
  createGroup,
  addAccountToGroup,
  addBill,
  getGroups,
  getAccounts,
  getBills,
  getGroupName
};
