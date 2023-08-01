export default function calculateAge(dob) {
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}