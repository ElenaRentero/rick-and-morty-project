function fetchData() {
    return fetch ('')
    .then((response) => response.json())
    /*.then((data) => {
        const result = data.results.map((eachData) => {
            const adalaber = {
            id: eachData.id,
            name: eachData.name,
            counselor: eachData.counselor,
            promo: eachData.promo,
            speciality: eachData.speciality,
            social_networks: eachData.social_networks,
            };
            return adalaber;
        });
        return result
    });*/
};   

export default fetchData;