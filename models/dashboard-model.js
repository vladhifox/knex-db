const knex = require('../db');

class DashboardsModel {

    getCountsTasksAndLists(nowDate) {

        const promise1 = knex('tasks').select(knex.raw('count(*)::int  as today ')).whereBetween('due_date', [nowDate, nowDate])
            .then(([today]) => (today))
            .then(({ today }) => (today));


        const promise2 = knex('tasks')
            .select(knex.raw('COUNT(tasks.done)::int AS undone, lists.id, lists.title'))
            .rightJoin('lists', function () {
                this
                    .on('lists.id', '=', 'tasks.list_id')
                    .andOn('tasks.done', '=', knex.raw('false'))
            })
            .groupBy('lists.id', 'lists.title')
            .orderBy('lists.id', 'asc');

        return Promise.all([promise1, promise2]).then(([today, lists]) => ({ today, lists }));
    }

    getAllTasksForToday(nowDate) {
        return knex('tasks').select('tasks.id', 'tasks.name', 'lists.title')
            .join('lists', function () {
                this
                    .on('lists.id', '=', 'tasks.list_id')
            })
            .whereBetween('due_date', [nowDate, nowDate])
            .groupBy('tasks.id', 'tasks.name', 'lists.title');

    }
}

module.exports = new DashboardsModel();