import React, { useState, useEffect } from 'react';
import app from './firebase.js';

function App() {
  const [field, setField] = useState([])
  const [loading, setLoading] = useState(false)
  const array = ["Name", "Age"]

  // * * ONE TIME GET 
  // const getField = () => {
  //   setLoading(true)
  //   ref.get().then((item) => {
  //     const items = item.docs.map((doc) => doc.data());
  //     setField(items)
  //     setLoading(false)
  //   })
  // }

  // * * REAL TIME GET
  const getField = () => {
    setLoading(true)
    app.firestore().collection("users").onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setField(items)
      setLoading(false)
    })
  }

  const editField = (object) => {
    setLoading(true)
    app.firestore().collection("users").doc(object.id).update(object).then(() => {
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
  }

  const addField = (object) => {
    setLoading(true)
    app.firestore().collection("users").doc(object.id).set(object).then(() => {
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
  }

  const removeField = (object) => {
    setLoading(true)
    app.firestore().collection("users").doc(object.id).delete().then(() => {
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
  }

  const buttonClick = (e) => {
    // * * Get Documents
    const input = document.getElementById(e.target.id.replace('button',''))
    const save = document.getElementById(e.target.id.replace('button','save'))
    const cancel = document.getElementById(e.target.id.replace('button','cancel'))
    const del = document.getElementById(e.target.id.replace('button','delete'))
    // * * Remove and add classes
    input.classList.remove("hidden")
    save.classList.remove("hidden")
    cancel.classList.remove("hidden")
    e.target.classList.add("hidden")
    del.classList.add("hidden")
    // * * Save
    save.onclick = () => {
      editField({
        id: "user" + e.target.id.replace('button','').split("user")[1],
        name: input.value
      })
      // * * Remove and add classes
      input.classList.add("hidden")
      save.classList.add("hidden")
      cancel.classList.add("hidden")
      e.target.classList.remove("hidden")
      del.classList.remove("hidden")
    }
    // * * Cancel
    cancel.onclick = () => {
      input.classList.add("hidden")
      save.classList.add("hidden")
      cancel.classList.add("hidden")
      e.target.classList.remove("hidden")
      del.classList.remove("hidden")
    }
  }

  const ageClick = (e) => {
    // * * Get Documents
    const input = document.getElementById(e.target.id.replace('buttonage','age'))
    const save = document.getElementById(e.target.id.replace('buttonage','saveage'))
    const cancel = document.getElementById(e.target.id.replace('buttonage','cancelage'))
    // * * Remove and add classes
    input.classList.remove("hidden")
    save.classList.remove("hidden")
    cancel.classList.remove("hidden")
    e.target.classList.add("hidden")
    // * * Save
    save.onclick = () => {
      editField({
        id: "user" + e.target.id.replace('buttonage','').split("user")[1],
        age: input.value
      })
      // * * Remove and add classes
      input.classList.add("hidden")
      save.classList.add("hidden")
      cancel.classList.add("hidden")
      e.target.classList.remove("hidden")
    }
    // * * Cancel
    cancel.onclick = () => {
      input.classList.add("hidden")
      save.classList.add("hidden")
      cancel.classList.add("hidden")
      e.target.classList.remove("hidden")
    }
  }

  const deleteButton = (e) => {
    removeField({
      id: "user" + e.target.id.replace('delete','').split("user")[1],
    })
  }

  useEffect(() => {
    getField()
  }, [])

  if (loading) {
    return "Loading.."
  }

  return (
    <div className="container h-screen">
      <div className="container h-full flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-4">Users</h1>
        {field.length > 0 ? (
          field.map((item) => (
            <div className="mt-4" key={item.id}>
              <div className="flex flex-row">
                <p>Name: {item.name + " |"}</p>
                <button onClick={buttonClick} id={item.name+item.id+"button"} className="ml-2">Edit | </button>
                <button onClick={deleteButton} id={item.name+item.id+"delete"} className="ml-2 text-red-500">Delete</button>
                <input className="border-black border-[1px] ml-2 pl-2 hidden" id={item.name + item.id} type="text" placeholder="New name"/>
                <button id={item.name+item.id+"save"} className="ml-2 hidden">Save</button>
                <button id={item.name+item.id+"cancel"} className="ml-2 hidden">Cancel</button>
              </div>
              <div className="flex flex-row">
                <p>Age: {item.age + " |"}</p>
                <button onClick={ageClick} id={item.name+item.id+"buttonage"} className="ml-2">Edit </button>
                <input className="border-black border-[1px] ml-2 pl-2 hidden" id={item.name + item.id+"age"} type="text" placeholder="New name"/>
                <button id={item.name+item.id+"saveage"} className="ml-2 hidden">Save</button>
                <button id={item.name+item.id+"cancelage"} className="ml-2 hidden">Cancel</button>
              </div>
            </div>
          ))
        ):(<p className="mt-2">None</p>)}
        <h1 className="text-4xl font-bold mt-10">Add new field</h1>
        <div className="flex flex-col justify-end items-end mt-4">
          {array.map((item, i) => (
            <div key={i} className="flex flex-row">
              <p>{item}: </p>
              <input className="border-black border-[1px] mb-2 ml-2 pl-2" id={"input"+i.toString()} type="text" placeholder={item + " here"}/>
            </div>
          ))}
          <div className="flex justify-center items-center w-full">
            <button className="mb-16" onClick={() => addField({
              id: field.length > 0?"user" + (parseInt(field[field.length-1].id.split("user")[1]) + 1).toString():"user1",
              name: document.getElementById("input0").value,
              age: document.getElementById("input1").value,
            })} id="add">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
