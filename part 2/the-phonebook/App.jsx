import { useState, useEffect } from "react";
import PersonServ from "./services/persons";

const Filter = ({ initialPersons, setPersons }) => {
  const [term, setTerm] = useState("");
  useEffect(() => {
    function filterNames() {
      const filteredNames = initialPersons.filter((person) =>
        person.name.toLowerCase().includes(term.toLowerCase())
      );
      setPersons(filteredNames);
    }
    filterNames();
  }, [term]);

  return <input value={term} onChange={(e) => setTerm(e.target.value)} />;
};

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);

    if (newName === "" || newPhone === "") {
      alert("All field should be filled");
      return;
    }
    if (nameExists) {
      const Msg = confirm(
        `${newName} is already added to phonebook, replace the old number?`
      );

      if (Msg === true) {
        const person = persons.find((person) => person.name === newName);
        const { id } = person;
        const newObject = { ...person, number: newPhone };
        PersonServ.replaceNumb(id, newObject).then(() => {
          const newArr = persons.map((person) =>
            person.name === newName ? (person = newObject) : person
          );
          setPersons(newArr);
        });
      }
      return;
    }

    const newObject = {
      name: newName,
      number: newPhone,
    };
    PersonServ.addPerson(newObject)
      .then((data) => setPersons(persons.concat(data)))
      .then(() => {
        setMessage({
          text: `Added ${newName}`,
          type: "success",
        });
      });
  };

  return (
    <form onSubmit={addNewPerson}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <br />
        number:{" "}
        <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const DeletePerson = ({ id, name, persons, setPersons, setMessage }) => {
  const deleteP = (id) => {
    const conf = window.confirm("Delete " + name);
    if (conf !== true) {
      return;
    }
    PersonServ.deletePer(id)
      .then((res) => {
        if (res.status === 404) {
          setMessage({
            text: `${name} has already been deleted`,
            type: "error",
          });
          return;
        }
        const NewPers = persons.filter((person) => person.id !== id);
        setPersons(NewPers);
      })
      .catch((err) => {
        console.log("Error during delete:", err);
      });
  };

  return <button onClick={() => deleteP(id)}>delete {id}</button>;
};

const Persons = ({ persons, setPersons, setMessage }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          <DeletePerson
            id={person.id}
            name={person.name}
            persons={persons}
            setPersons={setPersons}
            setMessage={setMessage}
          />
        </li>
      ))}
    </ul>
  );
};

const Message = ({ message, setMessage }) => {
  if (message === null) {
    return;
  } else {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
    return <div className={`message ${message.type}`}>{message.text}</div>;
  }
};

const App = () => {
  useEffect(() => {
    PersonServ.getAll().then((data) => {
      setInitialPersons(data);
      setPersons(data);
    });
  }, []);

  const [initialPersons, setInitialPersons] = useState([]);
  const [persons, setPersons] = useState(initialPersons);
  const [message, setMessage] = useState(null);

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} setMessage={setMessage} />
      filter shown with
      <Filter setPersons={setPersons} initialPersons={initialPersons} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
