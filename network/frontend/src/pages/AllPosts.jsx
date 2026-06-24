import { useEffect, useState } from "react";

function AllPosts() {
    // Temporary setup.
    const [data, setData] = useState("Loading…");

    useEffect(() => {
        fetch('api/all-posts')
        .then(response => response.json())
        .then(data => setData(data.data))
    }, [])


    return (
        <div>
            {data}
        </div>
    )
}

export default AllPosts