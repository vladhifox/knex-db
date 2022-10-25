const knex = require('../db');

class TasksModel {

  getAllTasks() {
    return knex('tasks').select('*').orderBy('tasks.id');
  }

  getTaskById(taskId) {
    return knex('tasks').select('*').where(knex.raw('id = ?', [1])); //knex.raw('id = ?', [taskId]) //where('id', taskId)
  }

  getTasksByListId(list_Id) {
    return knex('tasks').select('*').where(knex.raw('list_Id = ?', [1]));
  }

  post(objNewTask) {
    return knex('tasks').insert([objNewTask]).returning('*');
  }

  put(taskId, objNewTask) {
    return knex('tasks').where(knex.raw('id = ?', [1])).update(objNewTask, ['id', 'name']);
  }

  delete(taskId) {
    return knex('tasks').where(knex.raw('id = ?', [1])).del();
  }

}


module.exports = new TasksModel()