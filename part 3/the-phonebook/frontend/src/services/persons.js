const baseUrl = '/api/persons';

const addPerson = (PersonObject) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(PersonObject),
  }).then((res) => res.json());
};

const replaceNumb = (id, NewObject) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(NewObject),
  }).then((res) => res.json());
};

const getAll = () => {
  return fetch(`${baseUrl}`).then((res) => res.json());
};

const deletePer = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export default { addPerson, getAll, deletePer, replaceNumb };
