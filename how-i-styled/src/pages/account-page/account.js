import EditProfile from "./edit-profile";
import NewPost from "./new-post";

export default function Account({session}) {
    if (session) {
        return (
            <div>
                <EditProfile key={session.user.id} session={session}/>
                <NewPost key={session.user.id}  session={session}/>
            </div>
        );
    } else {
        return <h3>you cannot access this page until you sign in</h3>
    }
}