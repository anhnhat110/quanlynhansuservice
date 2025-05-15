function removeVietnameseAccents(str) {
    const map = {
        'a': 'áàảãạăắằẳẵặâấầẩẫậ',
        'e': 'éèẻẽẹêếềểễệ',
        'i': 'íìỉĩị',
        'o': 'óòỏõọôốồổỗộơớờởỡợ',
        'u': 'úùủũụưứừửữự',
        'y': 'ýỳỷỹỵ',
        'd': 'đ',
        'A': 'ÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ',
        'E': 'ÉÈẺẨẸÊẾỀỂỄỆ',
        'I': 'ÍÌỈĨỊ',
        'O': 'ÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ',
        'U': 'ÚÙỦŨỤƯỨỪỬỮỰ',
        'Y': 'ÝỲỶỸỴ',
        'D': 'Đ'
    };

    return str.split('').map(char => {
        for (let letter in map) {
            if (map[letter].includes(char)) {
                return letter;
            }
        }
        return char;
    }).join('');
}

module.exports = removeVietnameseAccents;