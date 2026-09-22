exports.handler = async function (event) {

    const API_KEY = process.env.RAWG_API_KEY;
    const search = event.queryStringParameters?.search || "";
    const genre = event.queryStringParameters?.genre || "";

    try {

        let url =
            `https://api.rawg.io/api/games` +
            `?key=${API_KEY}` +
            `&page_size=12`;

        if (search !== "") {
            url +=
                `&search=${encodeURIComponent(search)}`;
        }

        if (genre !== "") {
            url +=
                `&genres=${encodeURIComponent(genre)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {

            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: "RAWG API request failed"
                })
            };

        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        };


        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Server error"
                })
            };
    }
};