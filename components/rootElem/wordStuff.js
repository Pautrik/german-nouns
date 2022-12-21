const dataUrl = 'newdata2.json';

export const fetchData = async () => {
    const resp =  await fetch(dataUrl);
    return resp.json();
}

export const pickWord = (data, isRandom) => {
    // return ['grunka', 'Die Megalangeworeeeeeet', 'Die Megalangeworeeeeeete'];
    // return ['', 'Die Schwester', ''];
    let wordData;
    if(isRandom) {
        const index = Math.floor(Math.random() * data.length);
        wordData = data.splice(index, 1)[0];
    }
    else {
        wordData = data.shift();
    }

    return wordData;
}
