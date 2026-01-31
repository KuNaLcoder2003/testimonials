// Decryption Approach: 

// Find the length L of the string.
// Find the ceil and floor values of ?Length and assign them to the variables.
// Create a 2D matrix and fill the matrix by characters of string column-wise.
// Read the matrix row-wise to get the decrypted string.


const decrypt = (string: string): string => {
    let lenght = string.length;
    let b = Math.ceil(Math.sqrt(lenght));
    let a = Math.floor(Math.sqrt(lenght));
    let decrypted: string = '';

    // Matrix to generate the
    // Encrypted let
    let arr = new Array();
    for (let i = 0; i < a; i++) {
        let temp = [];
        for (let j = 0; j < b; j++) {
            temp.push([])
        }
        arr.push(temp)
    }
    for (let i = 0; i < a; i++) {
        for (let j = 0; j < b; j++) {
            arr[i][j] = " "
        }
    }
    let k = 0;

    // Fill the matrix column-wise
    for (let j = 0; j < b; j++) {
        for (let i = 0; i < a; i++) {
            if (k < lenght) {
                arr[j][i] = string[k];
            }
            k++;
        }
    }

    // Loop to generate
    // decrypted let
    for (let j = 0; j < a; j++) {
        for (let i = 0; i < b; i++) {
            decrypted = decrypted + arr[i][j];
        }
    }
    return decrypted;
}

export default decrypt;