var Joi = require('joi');

module.exports = [
  {method: 'GET', path: '/issues', handler: getIssues, config: {validate: {query: {name: Joi.string()}}}},
  {method: 'GET', path: '/issues/{id}', handler: getIssue},
  {
    method: 'POST',
    path: '/issues',
    handler: addIssue,
    config: {
      payload: {parse: true},
      validate: {
        payload: {
          name: Joi.string().required().min(3)
        }
      },
      response: {
        schema: {
          id: Joi.number().required()
        }
      }
    }
  },
];

function getIssues(request, reply) {
  if (request.query.name) {
    reply(findIssues(request.query.name));
  } else {
    reply(issues);
  }
}

function findIssues(name) {
  return issues.filter(function (issue) {
    return issue.name.toLowerCase() === name.toLowerCase();
  });
}

function getIssue(request, reply) {
  var issue = issues.filter(function (issue) {
    return issue.id == request.params.id;
  }).pop();

  reply(issue);
}

function addIssue(request, reply) {
  var issue = {
    id: issues[issues.length - 1].id + 1,
    name: request.payload.name
  };

  issues.push(issue);

  reply({id: issue.id})
    .created('/issues/' + issue.id);
}

var issues = [
  {id: 1, name: 'Hack gadget'},
  {id: 2, name: 'Tweak widget'}
];
