/**
 * Function to make the first letter a capital letter
 * 
 * @param word Word to capitalise
 * @returns Capitalised word
 */
function capitaliseFirstLetter(word) {
    let temp = word.substring(0,1).toUpperCase();
    return (temp + word.substring(1));
}
