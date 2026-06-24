import { useEffect, useState } from "react";

function Following() {

    const [data, setData] = useState("Loading…");

    useEffect(() => {
        fetch('api/following')
        .then(response => response.json())
        .then(data => setData(data.data))
    }, [])

    return(
        <div>
            {data}
        </div>
    )
}

export default Following