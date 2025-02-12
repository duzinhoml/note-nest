import '../App.css'

import { useQuery } from '@apollo/client';
import { QUERY_NOTES } from '../utils/queries.js';

function Home() {
    console.log("✅ Home page is rendering!")

    const { loading, error, data } = useQuery(QUERY_NOTES);

    console.log("🔍 Loading:", loading);
    console.log("❌ Error:", error);
    console.log("📊 Data:", data);

    const notes = data?.notes || [];

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Here are all of my Notes</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                notes.map(note => (
                    <div key={note._id}>
                        <h2>{note.title}</h2>
                        <p>{note.text}</p>
                        <p>Created At: {note.createdAt}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;