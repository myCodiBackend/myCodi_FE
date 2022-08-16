export const idCheck = (id) => {
    let regExp = /^[0-9a-zA-Z]/;
    // 대문자 포함
    return regExp.test(id)
}
