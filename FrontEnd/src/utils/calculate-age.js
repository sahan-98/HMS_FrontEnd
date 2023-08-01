export default function calculateAge(dob) {
    const birthYear = dob.getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age;

}