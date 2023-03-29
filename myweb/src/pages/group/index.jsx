import React, { useState } from "react";
import Head from "next/head";

export default function Create() {

    const [title, setTitle] = useState("");
    const [users, setUsers] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setMessage("");
        if (title) {
            // send a request to the server.
            try {
                const body = { name: title, members: users };
                await fetch(`/api/group/create`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            setError("All fields are required");
            return;
        }
    }

    return (
        <>
            <Head>
                <title>Create Group</title>
            </Head>
            <div>
                <form onSubmit={handleSubmit}>
                    {
                        error ? (
                            <div className=" error form-group">
                                {error}
                            </div>
                        ) : null
                    }
                    {
                        message ? (
                            <div className="message form-group">
                                {message}
                            </div>
                        ) : null
                    }
                    <div className="form-group">
                            <label>Group name</label>
                            <input type="text" name="title" placeholder="Group name" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button type="submit">Add Group</button>
                    </div>
                </form>
            </div>
        </>
    )
}