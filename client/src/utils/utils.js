
// env variable = REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL;

// function for gettong day
function getToday() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentDate = new Date;
    const date = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()} `;
    return date;
}
// export default getToday;


// function for format video url adress 
function formatURLImage(image) {
    const currentImage = image.includes('http') ? image : `${API_URL}${image}`;
    return currentImage;
}

function getDayToday() {
    const currentDate = new Date;
    const dayToday = `${currentDate.getDate()}`
    return dayToday;
}

export { getToday, formatURLImage, getDayToday };




