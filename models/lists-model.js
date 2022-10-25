const knex = require('../db');

class ListsModel {

  getAllLists() {
    return knex('lists').select('*');
  }

  getListById(listId) {
    return knex('lists').select('*').where('id',listId);
  }

  getTaskById(list_id, all) {
    if (all === 'true') {
        return knex('lists').select('*').where('list_id',list_id);
    } else {
        return knex('lists').select('*').where('list_id',list_id).andWhere(function() {this.where('done', '=', false)});
    }

  }

  post(title) {
    return knex('lists').insert({title: title}).returning('*');
  }

  put(listId, title) {
    return knex('lists').update({title: title}, ['id', 'title']);
  }

  delete(listId) {
    return knex('lists').where('id', listId).del();
  }

}


module.exports = new ListsModel();