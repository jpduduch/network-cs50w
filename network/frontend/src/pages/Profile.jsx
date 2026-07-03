import { useEffect, useState } from "react";

function Profile({ user }) {

    return(
        <main>
            <h1>{user.username}</h1>
            <div><span>{}</span></div>
        </main>
    )
}

export default Profile