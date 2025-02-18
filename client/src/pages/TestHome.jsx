import { useQuery } from "@apollo/client";

import TestNoteList from '../components/TestNoteList/index.jsx';

import { QUERY_NOTES } from "../utils/queries.js";

function TestHome() {
    const { loading, error, data } = useQuery(QUERY_NOTES);
    console.log(data);

    const notes = data?.notes || [];

    console.log(`Notes: ${notes}`);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <TestNoteList
                        notes={notes}
                        title="These are my notes"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default TestHome;