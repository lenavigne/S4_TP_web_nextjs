import { useState } from 'react';
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession()
  const [list_gr, setListGr] = useState([])
  const [inputValue, setInputValue] = useState();


  const handleInputChange = (event) => { setInputValue(event.target.value); }

  const getGr = async () => {
    const resp = await fetch('/api/group/get', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    })
    const data = await resp.json()
    console.log("Data : ",data);
    setListGr(data);
    console.log("ETETETTTEETE : ",list_gr);
    if (!resp.ok) {
      throw new Error('Error! status: ${resp.status}');
    }
  };


  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <button><a href="./group">Add group</a></button>
        <div>
          <div>
            <h1>Liste de vos groupes : </h1>
            <button onClick={getGr}>&#128257;</button>
          </div>
          <div>
            
              {list_gr.map((item) => {
                return (
                  <div key={item.name}>
                    <a href={"/group/" + item.id}>{item.name}</a>
                  </div>
                )
              })
            }
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
