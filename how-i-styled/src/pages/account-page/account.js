import React, {useEffect, useState} from "react";
import EditProfile from "./edit-profile";

export default function Account({session}) {
    if (session) {
        return (
            <EditProfile session={session}/>
        );
    } else {
        return <h3>you cannot access this page until you sign in</h3>
    }
}