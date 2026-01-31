// Encryption Approach: 

// Find the length L of the string.
// Find the ceil and floor values of ?Length and assign them to the variables.
// Check if the product of the two variables >= Length, if not then increments the variable having a lesser value by 1.
// Create a 2D matrix and fill the characters of the string row-wise.
// Read the matrix column-wise to get the encrypted string.

const encrypt = (string: string): string => {
    let lenght: number = string.length;
    let b = Math.ceil(Math.sqrt(lenght));
    let a = Math.floor(Math.sqrt(lenght));
    let encrypted: string = '';
    if (b * a < lenght) {
        if (Math.min(b, a) == b) {
            b = b + 1;
        }
        else {
            a = a + 1;
        }
    }

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

    // Fill the matrix row-wise
    for (let j = 0; j < a; j++) {
        for (let i = 0; i < b; i++) {
            if (k < lenght) {
                arr[j][i] = string[k];
            }
            k++;
        }
    }

    // Loop to generate
    // encrypted let
    for (let j = 0; j < b; j++) {
        for (let i = 0; i < a; i++) {
            encrypted = encrypted +
                arr[i][j];
        }
    }
    return encrypted;
}

export default encrypt